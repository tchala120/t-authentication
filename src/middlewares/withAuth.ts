import { AuthenticationError } from 'apollo-server-errors'

type AuthenticationResult<T> = (wrapper: T) => T

function withAuth<T>(...args: any[]): AuthenticationResult<T> {
  const ctx = args[2]

  const { isLoggedIn, token } = ctx.auth

  if (!isLoggedIn || !token) throw new AuthenticationError('Must Authenticate')

  return (wrapper: T): T => {
    return wrapper
  }
}

export default withAuth
