import { ApolloError } from 'apollo-server-errors'

import type { IErrorPayload } from '@constants/errors'

function errorHandler(error: IErrorPayload | Record<string, any>): void {
  throw new ApolloError(error.message, error.code)
}

export default errorHandler
