// src/server/trpc/router/_app.ts
import { router } from '../trpc';
import { exampleRouter } from './example';
import { authRouter } from './auth';
import { chatRouter } from './chat';

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  chat: chatRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
