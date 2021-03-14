import jwt from 'jsonwebtoken'
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '@constants/environment'

import { TOKEN_NOT_BEARER_TYPE } from '@constants/errors/auth'
import errorHandler from '@handler/error'
import { Token } from '@src/graphql/auth'

type SignTokenData<T> = T | string | number

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

export function signToken<T>(data: SignTokenData<T>): Token {
  const accessToken = jwt.sign(JSON.stringify(data), ACCESS_TOKEN_SECRET || '')
  const refreshToken = jwt.sign(JSON.stringify(data), REFRESH_TOKEN_SECRET || '')

  return {
    accessToken,
    refreshToken,
  }
}
