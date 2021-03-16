import type { CallbackError, NativeError } from 'mongoose'
import type { JwtHeader } from 'jsonwebtoken'

interface IPaginationOption {
  limit: number
  totalPages: number
  page: number
}

interface IJwtExpiration {
  iat: number
  exp: number
}

interface IJwtPayload {
  email: string
}

export type UserJwt = IJwtPayload & IJwtExpiration

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
