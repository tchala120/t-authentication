import * as mongoose from 'mongoose'

import type { NextFunction } from '@src/types'
import type { IToken } from '@src/graphql/auth'

interface IUserSchema extends mongoose.Document {
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

UserSchema.pre('save', (next: NextFunction) => {
  next()
})

export default mongoose.model<IUserSchema>('users', UserSchema)
