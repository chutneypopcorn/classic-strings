import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { galleryItems } from "@db/schema";
import { eq, desc } from "drizzle-orm";

export const galleryRouter = createRouter({
  list: publicQuery
    .input(
      z
        .object({
          category: z
            .enum([
              "ceremony",
              "reception",
              "proposal",
              "corporate",
              "behind-scenes",
            ])
            .optional(),
        })
        .optional(),
    )
    .query(async ({ input }) => {
      const db = getDb();
      if (input?.category) {
        return db.query.galleryItems.findMany({
          where: eq(galleryItems.category, input.category),
          orderBy: [desc(galleryItems.createdAt)],
        });
      }
      return db.query.galleryItems.findMany({
        orderBy: [desc(galleryItems.createdAt)],
      });
    }),

  featured: publicQuery.query(async () => {
    const db = getDb();
    return db.query.galleryItems.findMany({
      where: eq(galleryItems.featured, true),
      orderBy: [desc(galleryItems.createdAt)],
    });
  }),
});
