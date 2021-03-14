import 'module-alias/register'

import { ApolloServer } from 'apollo-server'

import setupDatabase from '@src/database'

import { Authentication } from '@src/types'

import { resolvers } from '@src/resolvers'

import { schema } from '@src/schema'

export interface Context {
  auth: Authentication
}

setupDatabase()

const server: ApolloServer = new ApolloServer({
  typeDefs: schema,
  resolvers: resolvers,
  context: ({ req }): Context => {
    const token = req.headers.authorization || ''
    let isLoggedIn = false

    if (token) isLoggedIn = true

    return {
      auth: {
        isLoggedIn,
        token,
      },
    }
  },
})

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
