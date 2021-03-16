import type { WrapperResult } from './type'

import { AuthenticationError } from 'apollo-server-errors'

import { isTokenExpired, isTokenVerify } from '@utils/token'

function withAuth<T>(...args: any[]): WrapperResult<T> {
  const ctx = args[2]

  const { token } = ctx.auth

  if (!token) throw new AuthenticationError('Must Authenticate')

  if (isTokenExpired(token)) throw new AuthenticationError('Token is expired')

  if (!isTokenVerify(token)) throw new AuthenticationError('Token is not verified')

  return (wrapper: WrapperResult<T>): T => wrapper(...args)
}

export default withAuth
