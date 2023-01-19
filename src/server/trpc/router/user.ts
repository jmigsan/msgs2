import { z } from 'zod';
import { router, publicProcedure, protectedProcedure } from '../trpc';

export const userRouter = router({
  setUsername: protectedProcedure
    .input(z.object({ username: z.string() }))
    .mutation(({ ctx, input }) => {
      const nameSearch = ctx.prisma.user.findFirst({
        where: {
          username: input.username,
        },
      });

      if (nameSearch != null) {
        return 'Username already taken.';
      }

      ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          username: input.username,
        },
      });
    }),
});
