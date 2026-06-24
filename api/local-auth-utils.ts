import jwt from "jsonwebtoken";
import { getDb } from "./queries/connection";
import { localUsers } from "@db/schema";
import { eq } from "drizzle-orm";
import type { LocalUser } from "@db/schema";

const JWT_SECRET = process.env.APP_SECRET || "classic-strings-secret-key";

export function createLocalToken(userId: number): string {
  return jwt.sign({ userId, type: "local" }, JWT_SECRET, { expiresIn: "30d" });
}

export async function verifyLocalToken(token: string): Promise<LocalUser | null> {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; type: string };
    if (decoded.type !== "local") return null;

    const db = getDb();
    const user = await db.query.localUsers.findFirst({
      where: eq(localUsers.id, decoded.userId),
    });
    return user || null;
  } catch {
    return null;
  }
}
