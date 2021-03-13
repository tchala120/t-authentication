import { ApolloError } from 'apollo-server-errors'

function errorHandler(message: string, code: string): void {
  throw new ApolloError(message, code)
}

export default errorHandler
