import jwt from 'jsonwebtoken'

import { TOKEN_NOT_BEARER_TYPE } from 'src/constants/errors/auth'
import errorHandler from 'src/handler/error'

export interface TokenResult {
  payload: any
  isVerify: boolean
}

export function checkToken(token: string): any {
  const isTokenBearerType = token.startsWith('Bearer')

  if (!isTokenBearerType) throw errorHandler(TOKEN_NOT_BEARER_TYPE)

  const isTokenVerify = jwt.verify(token, 'hello')

  return isTokenVerify
}
