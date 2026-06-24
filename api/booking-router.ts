import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { bookings } from "@db/schema";
import { eq, desc } from "drizzle-orm";

export const bookingRouter = createRouter({
  create: publicQuery
    .input(
      z.object({
        clientName: z.string().min(1),
        email: z.string().email(),
        phone: z.string().optional(),
        eventType: z.enum(["wedding", "proposal", "corporate", "other"]),
        eventDate: z.string().optional(),
        venue: z.string().optional(),
        guestCount: z.number().optional(),
        message: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(bookings).values({
        clientName: input.clientName,
        email: input.email,
        phone: input.phone || null,
        eventType: input.eventType,
        eventDate: input.eventDate ? new Date(input.eventDate) : null,
        venue: input.venue || null,
        guestCount: input.guestCount || null,
        message: input.message || null,
      });
      return { id: Number(result[0].insertId) };
    }),

  list: adminQuery.query(async () => {
    const db = getDb();
    return db.query.bookings.findMany({
      orderBy: [desc(bookings.createdAt)],
    });
  }),

  updateStatus: adminQuery
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["new", "pending", "confirmed", "completed"]),
      }),
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      await db
        .update(bookings)
        .set({ status: input.status })
        .where(eq(bookings.id, input.id));
      return { success: true };
    }),
});
