import type { CallbackError, NativeError } from 'mongoose'

import { IUser } from '@models/user'
import { JwtHeader } from 'jsonwebtoken'

interface PaginationOption {
  limit: number
  totalPages: number
  page: number
}

type JwtExpiration = {
  iat: number
  exp: number
}

export type UserJwt = IUser & JwtExpiration

export type NextError = (err?: CallbackError) => void

export interface Error extends NativeError {
  code?: number
}

export interface Argument {
  input?: any
  pagination?: PaginationOption
}

export interface Authentication {
  token: string
}

export interface JwtResult {
  header: JwtHeader
  payload: UserJwt
  signature: string
}
