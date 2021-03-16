import type { GraphQLResolveInfo } from 'graphql'
import type { IResolvers } from 'graphql-tools'
import type { IContext } from '@src/index'
import type { IUser } from '@models/user'
import type { IArgument } from '@src/types'

import authService from '@graphql/auth/service'
import userService from '@graphql/user/service'

import withAuth from './middlewares/withAuth'

type ResolverOptions = (
  parent: ParentNode,
  args: IArgument,
  ctx: IContext,
  info: GraphQLResolveInfo
) => unknown | Promise<unknown>

interface IGraphqlResolvers extends IResolvers {
  [key: string]: {
    [key: string]: ResolverOptions
  }
}

export const resolvers: IGraphqlResolvers = {
  Query: {
    me: async (...args): Promise<IUser> =>
      withAuth<IUser>(...args)(
        async (_parent: ParentNode, _args: IArgument, ctx: IContext) => await userService.me(ctx)
      ),
  },
  Mutation: {
    login: async (_parent: ParentNode, args: IArgument): Promise<IUser> => await authService.login(args.input),
    register: async (_parent: ParentNode, args: IArgument): Promise<IUser> => await authService.register(args.input),
  },
}
