import 'module-alias/register'
import express from 'express'
import cors from 'cors'
import { ApolloServer } from 'apollo-server-express'

import setupDatabase from '@src/database'
import { Authentication } from '@src/types'
import { resolvers } from '@src/resolvers'
import { schema } from '@src/schema'

export interface Context {
  auth: Authentication
}

setupDatabase()

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolvers,
  context: ({ req }): Context => {
    const token = req.headers.authorization || ''

    return {
      auth: {
        token,
      },
    }
  },
})

server.applyMiddleware({
  app,
})

app.listen({ port: PORT }, () => console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`))
