import { GraphQLResolveInfo } from 'graphql'
import type { IResolvers } from 'graphql-tools'

import authService from '@graphql/auth/service'
import userService from '@graphql/user/service'

import type { IContext } from '@src/index'

import type { IUser } from '@models/user'

import type { IArgument } from '@src/types'
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
    me: async (...args): Promise<IUser> => withAuth<IUser>(...args)(await userService.me(args[2])),
  },
  Mutation: {
    login: async (...args): Promise<IUser> => await authService.login(args[1].input),
    register: async (...args): Promise<IUser> => await authService.register(args[1].input),
  },
}
