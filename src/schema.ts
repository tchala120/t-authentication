import { gql } from 'apollo-server-core'

export const schema = gql`
  scalar Date

  type Token {
    accessToken: String
    refreshToken: String
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    token: Token
    createdAt: Date
    updatedAt: Date
  }

  type Query {
    getUsers: [User]
  }

  input CreateUserInput {
    firstName: String
    lastName: String
    email: String
    password: String
  }

  type Mutation {
    addUser(input: CreateUserInput): User
  }
`
