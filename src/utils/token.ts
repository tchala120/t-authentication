import jwt from 'jsonwebtoken'

import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '@constants/environment'
import { SIGNING_TOKEN_OCCURED } from '@constants/errors/auth'

import errorHandler from '@handler/error'

import { Token } from '@src/graphql/auth'

type SignTokenData<T> = T | string

export function tokenDecode(token: string): any {
  const decoded = jwt.decode(token)
  return decoded
}

export function tokenVerify(token: string): any {
  return jwt.verify(token, ACCESS_TOKEN_SECRET || '')
}

export function isTokenVerify(token: string): boolean {
  return !!tokenVerify(token)
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
