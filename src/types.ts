import type { CallbackError, NativeError } from 'mongoose'

import type { IUser } from '@models/user'
import { JwtHeader } from 'jsonwebtoken'

interface IPaginationOption {
  limit: number
  totalPages: number
  page: number
}

type JwtExpiration = {
  iat: number
  exp: number
}

export type UserJwt = IUser & JwtExpiration

export type NextFunction = (err?: CallbackError) => void

export interface IError extends NativeError {
  code?: number
}

export interface IArgument {
  input?: any
  pagination?: IPaginationOption
}

export interface IAuthentication {
  token: string
}

export interface IJwtResult {
  header: JwtHeader
  payload: UserJwt
  signature: string
}
