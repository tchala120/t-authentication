import type { ClientSession } from 'mongoose'
import type { ILoginInput, ITokenSign } from '.'
import type { IRefreshTokenInput, IRegisterInput, IToken } from './interface'
import type { IUserSchema } from '@models/user'

import {
  EMAIL_NOT_FOUND,
  EMAIL_OR_PASSWORD_NOT_CORRECT,
  ARGUMENT_IS_REQUIRED,
  TOKEN_NOT_FOUND,
  REFRESH_TOKEN_EXPIRED,
} from '@src/constants/errors'

import errorHandler from '@handler/error'

import TokenModel from '@models/token'
import UserModel from '@models/user'

import { hashingPassword, isPasswordCorrect } from '@src/utils/crypto'
import { isTokenExpired, saveRefreshTokenToDB, signToken, tokenWithBearer } from '@src/utils/token'
import { isObjectEmpty } from '@utils/validate'

async function register(input: IRegisterInput, session: ClientSession): Promise<IUserSchema> {
  if (isObjectEmpty(input)) throw errorHandler(ARGUMENT_IS_REQUIRED)

  const newUser = new UserModel({ ...input, token: null, password: await hashingPassword(input.password) })

  await newUser.save()

  const token = signToken<ITokenSign>({ id: newUser._id })

  newUser.token = token

  await session.commitTransaction()

  return newUser
}

async function login(input: ILoginInput, session: ClientSession): Promise<IUserSchema> {
  const user = await UserModel.findOne({ email: input.email })

  if (!user) throw errorHandler(EMAIL_NOT_FOUND)

  if (!isPasswordCorrect(input.password, user.password)) throw errorHandler(EMAIL_OR_PASSWORD_NOT_CORRECT)

  const token = signToken<ITokenSign>({
    id: user._id,
  })

  await saveRefreshTokenToDB(token.refreshToken)

  user.token = token

  await session.commitTransaction()

  return user
}

async function requestAccessToken(input: IRefreshTokenInput): Promise<IToken> {
  const token = await TokenModel.findOne({ refreshToken: input.refreshToken }).populate('users')

  if (!token) {
    throw errorHandler(TOKEN_NOT_FOUND)
  }

  if (isTokenExpired(tokenWithBearer(token.refreshToken))) throw errorHandler(REFRESH_TOKEN_EXPIRED)

  const newToken = signToken<ITokenSign>({ id: token.userId })

  await saveRefreshTokenToDB(newToken.refreshToken)

  return newToken
}

export default {
  register,
  login,
  requestAccessToken,
}
