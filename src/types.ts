import type { CallbackError, NativeError } from 'mongoose'

interface PaginationOption {
  limit: number
  totalPages: number
  page: number
}

export type NextError = (err?: CallbackError) => void

export interface Error extends NativeError {
  code?: number
}

export interface Argument {
  input?: any
  pagination?: PaginationOption
}

export interface Authentication {
  isLoggedIn: boolean
  token: string
}
