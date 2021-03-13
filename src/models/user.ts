import { ApolloError } from 'apollo-server-errors'
import * as mongoose from 'mongoose'
import { NextError, Error } from '../types'

interface Token {
  accessToken: string
  refreshToken: string
}

export interface IUser extends mongoose.Document {
  firstName: string
  lastName: string
  email: string
  token: Token
}

export interface ICreateUser {
  firstName: IUser['firstName']
  lastName: IUser['lastName']
  email: IUser['email']
  password: string
}

const UserSchema: mongoose.Schema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    token: { type: String },
  },
  {
    timestamps: true,
  }
)

UserSchema.pre('save', (next: NextError) => {
  next()
})

UserSchema.post('save', (error: Error, _: unknown, next: NextError) => {
  if (error.code === 11000) {
    next(new ApolloError('Duplicate email. Try another.'))
  } else {
    next(error)
  }
})

export default mongoose.model<IUser>('users', UserSchema)
