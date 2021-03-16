import { ApolloError } from 'apollo-server-errors'
import * as mongoose from 'mongoose'

import type { IError, NextError } from '@src/types'
import type { IToken } from '@src/graphql/auth'

import { EMAIL_IS_ALREADY_EXIST } from '@src/constants/errors/user'

export interface IUser extends mongoose.Document {
  firstName: string
  lastName: string
  email: string
  password: string
  token: IToken
}

const TokenSchema = {
  accessToken: { type: String },
  refreshToken: { type: String },
}

const UserSchema: mongoose.Schema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token: { type: TokenSchema },
  },
  {
    timestamps: true,
  }
)

UserSchema.pre('save', (next: NextError) => {
  next()
})

UserSchema.post('save', (error: IError, next: NextError) => {
  if (error.code === 11000) {
    next(new ApolloError(EMAIL_IS_ALREADY_EXIST.message, EMAIL_IS_ALREADY_EXIST.code))
  } else {
    next()
  }
})

export default mongoose.model<IUser>('users', UserSchema)
