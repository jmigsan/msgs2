import { z } from 'zod';
import { router, publicProcedure, protectedProcedure } from '../trpc';

export const chatRouter = router({
  createChat: protectedProcedure
    .input(z.object({ username: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const nameSearch = await ctx.prisma.user.findFirst({
        where: {
          // unignoring // @ts-ignore. i don't know why it says 'UserWhereInput' and why this isn't assingable to it.
          username: input.username,
        },
      });

      if (nameSearch === null) {
        throw new Error('User not found.');
      }

      const currentUsername = await ctx.prisma.user.findFirst({
        where: {
          id: ctx.session.user.id,
        },
        select: {
          username: true,
        },
      });

      return ctx.prisma.chats.create({
        data: {
          users: {
            connect: [
              // unignoring // @ts-ignore. it says not assignable to 'UserWhereUniqueInput'. but i put @unique on the prisma already. not sure why angry.
              { username: currentUsername?.username },
              // unignoring // @ts-ignore. it says not assignable to 'UserWhereUniqueInput'. but i put @unique on the prisma already. not sure why angry.
              { username: input.username },
            ],
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
      include: {
        users: true,
      },
    });
  }),
  getChat: protectedProcedure
    .input(z.object({ chatId: z.string().nullish() }).nullish())
    .query(({ ctx, input }) => {
      if (input?.chatId !== undefined) {
        return ctx.prisma.chats.findFirst({
          where: {
            chatId: input.chatId as string,
          },
          include: {
            users: true,
          },
        });
      }
    }),
  sendMessage: protectedProcedure
    .input(z.object({ message: z.string(), chatId: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.messages.create({
        data: {
          message: input.message,
          chat: {
            connect: {
              chatId: input.chatId,
            },
          },
          user: {
            connect: {
              id: ctx.session.user.id,
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
          chat: {
            chatId: input.chatId,
          },
        },
      });
    }),
});
