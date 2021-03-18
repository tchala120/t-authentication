import type { IToken } from '../auth'

export interface IUser {
  firstName: string
  lastName: string
  email: string
  password: string
  token: IToken
}
