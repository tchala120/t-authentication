import { AuthenticationError } from 'apollo-server-errors'

import { isTokenExpired, isTokenVerify } from '@utils/token'

type AuthenticationResult<T> = (wrapper: T) => T

function withAuth<T>(...args: any[]): AuthenticationResult<T> {
  const ctx = args[2]

  const { token } = ctx.auth

  if (!token) throw new AuthenticationError('Must Authenticate')

  if (isTokenExpired(token)) throw new AuthenticationError('Token is expired')

  if (!isTokenVerify(token)) throw new AuthenticationError('Token is not verified')

  return (wrapper: T): T => {
    return wrapper
  }
}

export default withAuth
