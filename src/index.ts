import { ApolloServer } from 'apollo-server'
import { Authentication } from './types'

import setupDatabase from './database'

import { resolvers } from './resolvers'
import { schema } from './schema'

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
