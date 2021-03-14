import { GraphQLResolveInfo } from 'graphql'
import { IResolvers } from 'graphql-tools'

import authService from '@graphql/auth/service'

import { Context } from '@src/index'

import withAuth from '@middlewares/withAuth'

import { IUser } from '@models/user'

import { Argument } from '@src/types'

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
  Query: {},
  Mutation: {
    login: async (...args): Promise<IUser> => withAuth<IUser>(...args)(await authService.login(args[1].input)),
    register: async (...args): Promise<IUser> => await authService.register(args[1].input),
  },
}
