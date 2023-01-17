import { z } from 'zod';
import { router, publicProcedure, protectedProcedure } from '../trpc';

export const chatRouter = router({
  createChat: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(({ ctx, input }) => {
      ctx.prisma.chats.create({
        data: {
          users: {
            connect: [{ id: ctx.session.user.id }, { id: input.userId }],
          },
        },
      });

      return;
    }),
  getChats: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.chats.findMany({
      where: {
        users: {
          some: {
            id: ctx.session.user.id,
          },
        },
      },
    });
  }),
});
