import { GraphQLResolveInfo } from 'graphql'
import { IResolvers } from 'graphql-tools'

import userService from './graphql/user/service'

import { Context } from './index'

import { IUser } from './models/user'

import { GraphQLArgument } from './types'

type ResolverOptions = (
  parent: ParentNode,
  args: GraphQLArgument,
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
    getUsers: async (): Promise<IUser[]> => await userService.findAll?.(),
  },
  Mutation: {
    addUser: async (_: ParentNode, args: GraphQLArgument): Promise<IUser> => await userService.addUser(args.input),
  },
}
