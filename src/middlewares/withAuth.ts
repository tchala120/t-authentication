import type { IContext } from '..'
import type { WrapperResult } from './type'

import { AuthenticationError } from 'apollo-server-errors'

import { isTokenBearerType, isTokenExpired, isTokenVerify } from '@utils/token'

function withAuth<T>(...args: any[]): WrapperResult<T> {
  const ctx: IContext = args[2]

  const { token } = ctx.auth

  if (!token) throw new AuthenticationError('Must Authenticate')

  if (!isTokenBearerType(token)) throw new AuthenticationError('Please use bearer tokens.')

  if (isTokenExpired(token)) throw new AuthenticationError('Token is expired')

  if (!isTokenVerify(token)) throw new AuthenticationError('Token is not verified')

  return (wrapper: WrapperResult<T>): T => wrapper(...args)
}

export default withAuth
