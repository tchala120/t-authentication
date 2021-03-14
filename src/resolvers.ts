import { GraphQLResolveInfo } from 'graphql'
import { IResolvers } from 'graphql-tools'

import userService from './graphql/user/service'

import { Context } from './index'
import withAuth from './middlewares/withAuth'

import { IUser } from './models/user'

import { Argument } from './types'

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
    getUsers: async (...args): Promise<IUser[]> => withAuth<IUser[]>(...args)(await userService.findAll?.()),
  },
  Mutation: {
    addUser: async (...args): Promise<IUser> => withAuth<IUser>(...args)(await userService.addUser(args[1].input)),
  },
}
