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

      console.log(input.message);
      console.log(input.chatId);

      return ctx.prisma.messages.create({
        data: {
          // message: 'yo',
          message: input.message,
          chat: {
            connect: {
              // chatId: 'cld0k2f950000xxlw7sme6fz7',
              chatId: input.chatId,
            },
          },
          user: {
            connect: {
              // id: 'cld0gn2lb0000xxawp4io16j5',
              id: ctx.session.user.id,
            },
          },
        },
      });
      // return ctx.prisma.test.create({
      //   data: {
      //     message: input.message,
      //     mtwo: input.chatId,
      //   },
      // });
    }),
  getMessages: protectedProcedure
    .input(z.object({ chatId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.messages.findMany({
        where: {
          chat: {
            chatId: input.chatId,
          },
        },
      });
    }),
});
