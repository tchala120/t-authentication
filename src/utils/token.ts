import jwt from 'jsonwebtoken'
import dayjs from 'dayjs'

import type { IToken } from '@src/graphql/auth'
import type { IJwtResult, UserJwt } from '@src/types'

import { INVALID_SIGNATURE, SIGNING_TOKEN_OCCURED, TOKEN_NOT_BEARER_TYPE } from '@constants/errors/auth'
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '@constants/environment'
import { ACCESS_TOKEN, REFRESH_TOKEN, TOKEN_TYPE } from '@constants/token'

import errorHandler from '@handler/error'

import TokenModel from '@src/models/token'
import { isBefore } from './date'

type SignTokenData<T> = T | string

function filterTokenType(token: string): string {
  return token.substring(TOKEN_TYPE.length)
}

function getTypeofToken(type: string): string {
  let tokenSecret = ACCESS_TOKEN as string
  switch (type) {
    default:
    case 'access':
      tokenSecret = ACCESS_TOKEN_SECRET as string
      break
    case 'refresh':
      tokenSecret = REFRESH_TOKEN_SECRET as string
      break
  }

  return tokenSecret
}

function convertTimeToMillis(exp: number): number {
  return exp * 1000
}

export function tokenWithBearer(token: string): string {
  return `Bearer ${token}`
}

export function tokenVerify(token: string, type: string): UserJwt {
  if (!isTokenBearerType(token)) throw errorHandler(TOKEN_NOT_BEARER_TYPE)

  token = filterTokenType(token)

  return jwt.verify(token, getTypeofToken(type)) as UserJwt
}

export function isTokenExpired(token: string): boolean {
  token = filterTokenType(token)

  const userJWT: IJwtResult = jwt.decode(token, { complete: true }) as IJwtResult

  return isBefore(convertTimeToMillis(userJWT.payload.exp))
}

export function isTokenVerify(token: string, type: string): boolean {
  return !!tokenVerify(token, type)
}

export function isTokenBearerType(token: string): boolean {
  return token.split(' ')[0] === 'Bearer'
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

export async function saveRefreshTokenToDB(refreshToken: string): Promise<void> {
  const withBearer = tokenWithBearer(refreshToken)

  if (!isTokenVerify(withBearer, REFRESH_TOKEN)) throw errorHandler(INVALID_SIGNATURE)

  const refreshTokenDecoded = tokenVerify(withBearer, REFRESH_TOKEN)

  const refreshTokenModel = await TokenModel.findOne({ userId: refreshTokenDecoded.id })

  const expiresIn = convertTimeToMillis(refreshTokenDecoded.exp)

  const defaultTokenPayload = {
    userId: refreshTokenDecoded.id,
    refreshToken,
    expiresIn,
  }

  if (!refreshTokenModel) {
    const newToken = new TokenModel({
      ...defaultTokenPayload,
    })

    await newToken.save()
  } else {
    if (isBefore(refreshTokenModel.expiresIn)) {
      refreshTokenModel.expiresIn = dayjs(expiresIn).add(7, 'day').valueOf()
    }

    refreshTokenModel.refreshToken = refreshToken

    await refreshTokenModel.save()
  }
}
