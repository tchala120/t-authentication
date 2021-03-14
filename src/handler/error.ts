import { ApolloError } from 'apollo-server-errors'
import { ErrorPayload } from 'src/constants/errors'

function errorHandler(error: ErrorPayload): void {
  throw new ApolloError(error.message, error.code)
}

export default errorHandler
