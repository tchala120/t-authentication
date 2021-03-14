import jwt from 'jsonwebtoken'

import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '@constants/environment'
import { INVALID_SIGNATURE, SIGNING_TOKEN_OCCURED, TOKEN_NOT_BEARER_TYPE } from '@constants/errors/auth'

import errorHandler from '@handler/error'

import { ITokenSign, Token } from '@src/graphql/auth'
import { TOKEN_TYPE } from '@src/constants/token'

type SignTokenData<T> = T | string

export interface TokenResult {
  payload: any
  isVerify: boolean
}

function tokenDecode(token: string): ITokenSign {
  const decoded = jwt.decode(token) as ITokenSign

  return decoded
}

export function checkToken(token: string): ITokenSign {
  const isTokenBearerType = token.startsWith('Bearer')
  if (!isTokenBearerType) throw errorHandler(TOKEN_NOT_BEARER_TYPE)

  token = token.substring(TOKEN_TYPE.length).trim()

  const isTokenVerify = jwt.verify(token, ACCESS_TOKEN_SECRET || '')

  if (isTokenVerify) return tokenDecode(token)
  else throw errorHandler(INVALID_SIGNATURE)
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
