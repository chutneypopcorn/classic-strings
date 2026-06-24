import { z } from "zod";
import bcrypt from "bcryptjs";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { localUsers } from "@db/schema";
import { eq } from "drizzle-orm";
import { createLocalToken, verifyLocalToken } from "./local-auth-utils";
import { TRPCError } from "@trpc/server";

export const localAuthRouter = createRouter({
  register: publicQuery
    .input(
      z.object({
        username: z.string().min(3).max(50),
        password: z.string().min(6).max(100),
        displayName: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const db = getDb();

      // Check if username already exists
      const existing = await db.query.localUsers.findFirst({
        where: eq(localUsers.username, input.username),
      });
      if (existing) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Username already taken",
        });
      }

      const passwordHash = await bcrypt.hash(input.password, 12);

      const result = await db.insert(localUsers).values({
        username: input.username,
        displayName: input.displayName || input.username,
        passwordHash,
      });

      const userId = Number(result[0].insertId);
      const token = createLocalToken(userId);

      return { token, userId };
    }),

  login: publicQuery
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const db = getDb();

      const user = await db.query.localUsers.findFirst({
        where: eq(localUsers.username, input.username),
      });

      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid username or password",
        });
      }

      const valid = await bcrypt.compare(input.password, user.passwordHash);
      if (!valid) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid username or password",
        });
      }

      const token = createLocalToken(user.id);
      return { token, userId: user.id };
    }),

  me: publicQuery.query(async ({ ctx }) => {
    const localToken = ctx.req.headers.get("x-local-auth-token");
    if (!localToken) return null;

    const user = await verifyLocalToken(localToken);
    if (!user) return null;

    return {
      id: user.id,
      name: user.displayName || user.username,
      username: user.username,
      displayName: user.displayName,
      role: user.role,
      authType: "local" as const,
    };
  }),
});
