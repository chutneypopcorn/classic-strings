import { z } from "zod";
import { createRouter, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { users, localUsers } from "@db/schema";
import { eq, desc } from "drizzle-orm";

export const userRouter = createRouter({
  list: adminQuery.query(async () => {
    const db = getDb();

    const oauthUsers = await db.query.users.findMany({
      orderBy: [desc(users.createdAt)],
    });

    const localUsersList = await db.query.localUsers.findMany({
      orderBy: [desc(localUsers.createdAt)],
    });

    const unified = [
      ...oauthUsers.map((u) => ({
        id: u.id,
        name: u.name || "OAuth User",
        identifier: u.email || u.unionId,
        role: u.role as "user" | "admin",
        authType: "oauth" as const,
        createdAt: u.createdAt,
      })),
      ...localUsersList.map((u) => ({
        id: u.id,
        name: u.displayName || u.username,
        identifier: u.username,
        role: u.role as "user" | "admin",
        authType: "local" as const,
        createdAt: u.createdAt,
      })),
    ];

    return unified;
  }),

  updateRole: adminQuery
    .input(
      z.object({
        id: z.number(),
        authType: z.enum(["oauth", "local"]),
        role: z.enum(["user", "admin"]),
      }),
    )
    .mutation(async ({ input }) => {
      const db = getDb();

      if (input.authType === "oauth") {
        await db
          .update(users)
          .set({ role: input.role })
          .where(eq(users.id, input.id));
      } else {
        await db
          .update(localUsers)
          .set({ role: input.role })
          .where(eq(localUsers.id, input.id));
      }

      return { success: true };
    }),
});
