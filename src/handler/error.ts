import { ApolloError } from 'apollo-server-errors'

import { IErrorPayload } from '@constants/errors'

function errorHandler(error: IErrorPayload): void {
  throw new ApolloError(error.message, error.code)
}

export default errorHandler
