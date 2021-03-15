import jwt from 'jsonwebtoken'
import dayjs from 'dayjs'

import { SIGNING_TOKEN_OCCURED, TOKEN_NOT_BEARER_TYPE } from '@constants/errors/auth'
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '@constants/environment'
import { TOKEN_TYPE } from '@src/constants/token'

import errorHandler from '@handler/error'

import { IToken } from '@src/graphql/auth'

import { IJwtResult, UserJwt } from '@src/types'

type SignTokenData<T> = T | string

function filterTokenType(token: string): string {
  return token.substring(TOKEN_TYPE.length)
}

export function tokenVerify(token: string): UserJwt {
  if (!isTokenBearerType(token)) throw errorHandler(TOKEN_NOT_BEARER_TYPE)

  token = filterTokenType(token)

  return jwt.verify(token, ACCESS_TOKEN_SECRET || '') as UserJwt
}

export function isTokenExpired(token: string): boolean {
  token = filterTokenType(token)

  const userJWT: IJwtResult = jwt.decode(token, { complete: true }) as IJwtResult

  return dayjs(userJWT.payload.exp * 1000).isBefore(dayjs())
}

export function isTokenVerify(token: string): boolean {
  return !!tokenVerify(token)
}

export function isTokenBearerType(token: string): boolean {
  return token.startsWith('Bearer')
}

export function signToken<T extends Record<string, any>>(data: SignTokenData<T>): IToken {
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
