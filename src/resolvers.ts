import type { ClientSession } from 'mongoose'
import type { GraphQLResolveInfo } from 'graphql'
import type { IResolvers } from 'graphql-tools'
import type { IToken } from '@graphql/auth'
import type { IUserSchema } from '@models/user'
import type { IContext } from '@src/index'
import type { IArgument } from '@src/types'

import authService from '@graphql/auth/service'
import userService from '@graphql/user/service'

import withAuth from '@middlewares/withAuth'
import withTransaction from '@middlewares/withTransaction'

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
    me: async (...args): Promise<IUserSchema> =>
      withAuth<IUserSchema>(...args)(
        async (_parent: ParentNode, _args: IArgument, ctx: IContext) => await userService.me(ctx)
      ),
  },
  Mutation: {
    login: async (...args): Promise<IUserSchema> =>
      withTransaction<IUserSchema>(...args)(
        async (
          _parent: ParentNode,
          args: IArgument,
          _ctx: IContext,
          _info: GraphQLResolveInfo,
          session: ClientSession
        ) => await authService.login(args.input, session)
      ),
    register: async (...args): Promise<IUserSchema> =>
      withTransaction<IUserSchema>(...args)(
        async (
          _parent: ParentNode,
          args: IArgument,
          _ctx: IContext,
          _info: GraphQLResolveInfo,
          session: ClientSession
        ) => await authService.register(args.input, session)
      ),
    requestAccessToken: async (...args): Promise<IToken> =>
      withTransaction<IToken>(...args)(
        async (_parent: ParentNode, args: IArgument) => await authService.requestAccessToken(args.input)
      ),
  },
}
