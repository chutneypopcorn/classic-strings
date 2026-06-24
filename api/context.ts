import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import type { User, LocalUser } from "@db/schema";
import { authenticateRequest } from "./kimi/auth";
import { verifyLocalToken } from "./local-auth-utils";

export type UnifiedUser = {
  id: number;
  name: string;
  email?: string;
  avatar?: string;
  role: "user" | "admin";
  authType: "oauth" | "local";
};

export type TrpcContext = {
  req: Request;
  resHeaders: Headers;
  user?: UnifiedUser;
};

function oauthUserToUnified(user: User): UnifiedUser {
  return {
    id: user.id,
    name: user.name || "User",
    email: user.email || undefined,
    avatar: user.avatar || undefined,
    role: user.role as "user" | "admin",
    authType: "oauth",
  };
}

function localUserToUnified(user: LocalUser): UnifiedUser {
  return {
    id: user.id,
    name: user.displayName || user.username,
    email: undefined,
    avatar: undefined,
    role: user.role as "user" | "admin",
    authType: "local",
  };
}

export async function createContext(
  opts: FetchCreateContextFnOptions,
): Promise<TrpcContext> {
  const ctx: TrpcContext = { req: opts.req, resHeaders: opts.resHeaders };

  // Try OAuth first
  try {
    const oauthUser = await authenticateRequest(opts.req.headers);
    if (oauthUser) {
      ctx.user = oauthUserToUnified(oauthUser);
      return ctx;
    }
  } catch {
    // OAuth auth failed, try local
  }

  // Try local auth
  try {
    const localToken = opts.req.headers.get("x-local-auth-token");
    if (localToken) {
      const localUser = await verifyLocalToken(localToken);
      if (localUser) {
        ctx.user = localUserToUnified(localUser);
      }
    }
  } catch {
    // Local auth failed
  }

  return ctx;
}
