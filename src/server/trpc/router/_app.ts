// src/server/trpc/router/_app.ts
import { router } from '../trpc';
import { exampleRouter } from './example';
import { authRouter } from './auth';
import { chatRouter } from './chat';
import { userRouter } from './user';

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  chat: chatRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
