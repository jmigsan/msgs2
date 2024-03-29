import { z } from 'zod';
import { router, publicProcedure, protectedProcedure } from '../trpc';

export const userRouter = router({
  setUsername: protectedProcedure
    .input(z.object({ username: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (input.username === '') {
        throw new Error('Please enter a name.');
      }

      const nameSearch = await ctx.prisma.user.findFirst({
        where: {
          // unignoring // @ts-ignore. i don't know why it says 'UserWhereInput' and why this isn't assingable to it.
          username: input.username,
        },
      });

      if (nameSearch !== null) {
        throw new Error('Username already taken.');
      }

      return ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          // unignoring // @ts-ignore. i don't know why it says 'UserUpdateInput' and why this isn't assingable to it.
          username: input.username,
        },
      });
    }),
  setPublicStatus: protectedProcedure.mutation(({ ctx }) => {
    return ctx.prisma.user.update({
      where: {
        id: ctx.session.user.id,
      },
      data: {
        public: !ctx.session.user.public,
      },
    });
  }),
  getPublicUsers: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany({
      where: {
        public: true,
      },
    });
  }),
  getUsername: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findFirst({
      where: {
        id: ctx.session.user.id,
      },
      select: {
        username: true,
      },
    });

    return user?.username;
  }),
});
