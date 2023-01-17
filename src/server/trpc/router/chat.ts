import { z } from 'zod';
import { router, publicProcedure, protectedProcedure } from '../trpc';

export const chatRouter = router({
  createChat: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.chats.create({
        data: {
          users: {
            connect: [{ id: ctx.session.user.id }, { id: input.userId }],
          },
        },
      });
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
  getChat: protectedProcedure
    .input(z.object({ chatId: z.string().nullish() }).nullish())
    .query(({ ctx, input }) => {
      if (input?.chatId) {
        return ctx.prisma.chats.findFirst({
          where: {
            chatId: input.chatId,
          },
        });
      }
    }),
  sendMessage: protectedProcedure
    .input(z.object({ message: z.string(), chatId: z.string() }))
    .mutation(({ ctx, input }) => {
      // return ctx.prisma.messages.create({
      //   data: {
      //     message: input.message,
      //     chatsChatId: input.chatId,
      //     userId: ctx.session.user.id,
      //   },
      // });
      return ctx.prisma.messages.create({
        data: {
          message: 'yo',
          chat: {
            connect: {
              chatId: 'cld0k2f950000xxlw7sme6fz7',
            },
          },
          user: {
            connect: {
              id: 'cld0gn2lb0000xxawp4io16j5',
            },
          },
        },
      });
    }),
  getMessages: protectedProcedure
    .input(z.object({ chatId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.messages.findMany({
        where: {
          chatsChatId: input.chatId,
        },
      });
    }),
});
