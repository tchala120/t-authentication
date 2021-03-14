import jwt from 'jsonwebtoken'

import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '@constants/environment'
import { SIGNING_TOKEN_OCCURED, TOKEN_NOT_BEARER_TYPE } from '@constants/errors/auth'

import errorHandler from '@handler/error'

import { Token } from '@src/graphql/auth'

type SignTokenData<T> = T | string

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

export function signToken<T extends Record<string, any>>(data: SignTokenData<T>): Token {
  try {
    const accessToken = jwt.sign(data, ACCESS_TOKEN_SECRET || '', { expiresIn: '3m' })
    const refreshToken = jwt.sign(data, REFRESH_TOKEN_SECRET || '', { expiresIn: '7d' })

    return {
      accessToken,
      refreshToken,
    }
  } catch {
    throw errorHandler(SIGNING_TOKEN_OCCURED)
  }
}
