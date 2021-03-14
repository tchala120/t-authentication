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

  input LoginInput {
    email: String
    password: String
  }

  type Query {
    getUsers: [User]
  }

  type Mutation {
    login(input: LoginInput): User
  }
`
