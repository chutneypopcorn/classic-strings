import { authRouter } from "./auth-router";
import { localAuthRouter } from "./local-auth-router";
import { bookingRouter } from "./booking-router";
import { userRouter } from "./user-router";
import { galleryRouter } from "./gallery-router";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  localAuth: localAuthRouter,
  booking: bookingRouter,
  user: userRouter,
  gallery: galleryRouter,
});

export type AppRouter = typeof appRouter;
