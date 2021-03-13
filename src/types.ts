import { CallbackError, NativeError } from 'mongoose'

export type NextError = (err?: CallbackError) => void

export interface Error extends NativeError {
  code?: number
}

export interface GraphQLArgument {
  input?: any
}

export interface Authentication {
  isLoggedIn: boolean
  token: string
}
