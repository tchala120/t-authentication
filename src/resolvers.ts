import { GraphQLResolveInfo } from 'graphql'
import { IResolvers } from 'graphql-tools'

import authService from '@graphql/auth/service'
import userService from '@graphql/user/service'

import { Context } from '@src/index'

import { IUser } from '@models/user'

import { Argument } from '@src/types'
import withAuth from './middlewares/withAuth'

type ResolverOptions = (
  parent: ParentNode,
  args: Argument,
  ctx: Context,
  info: GraphQLResolveInfo
) => unknown | Promise<unknown>

interface Resolvers extends IResolvers {
  [key: string]: {
    [key: string]: ResolverOptions
  }
}

export const resolvers: Resolvers = {
  Query: {
    me: async (...args): Promise<IUser> => withAuth<IUser>(...args)(await userService.me(args[2])),
  },
  Mutation: {
    login: async (...args): Promise<IUser> => await authService.login(args[1].input),
    register: async (...args): Promise<IUser> => await authService.register(args[1].input),
  },
}
