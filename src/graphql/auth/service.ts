import type { ClientSession } from 'mongoose'
import type { ILoginInput, ITokenSign } from '.'
import type { IRefreshTokenInput, IRegisterInput } from './interface'
import type { IUserSchema } from '@models/user'
import type { ITokenSchema } from '@models/token'

import { ARGUMENT_IS_REQUIRED } from '@constants/errors/args'
import { EMAIL_NOT_FOUND, EMAIL_OR_PASSWORD_NOT_CORRECT } from '@src/constants/errors/user'

import errorHandler from '@handler/error'

import TokenModel from '@models/token'
import UserModel from '@models/user'

import { hashingPassword, isPasswordCorrect } from '@src/utils/crypto'
import { signToken } from '@src/utils/token'
import { isObjectEmpty } from '@utils/validate'
import { TOKEN_NOT_FOUND } from '@src/constants/errors/auth'

async function register(input: IRegisterInput, session: ClientSession): Promise<IUserSchema> {
  if (isObjectEmpty(input)) throw errorHandler(ARGUMENT_IS_REQUIRED)

  const newUser = new UserModel({ ...input, token: null, password: await hashingPassword(input.password) })

  await newUser.save()

  const token = signToken<ITokenSign>({ id: newUser._id })

  newUser.token = token

  await session.commitTransaction()

  return newUser
}

async function login(input: ILoginInput): Promise<IUserSchema> {
  const user = await UserModel.findOne({ email: input.email })

  if (!user) throw errorHandler(EMAIL_NOT_FOUND)

  if (!isPasswordCorrect(input.password, user.password)) throw errorHandler(EMAIL_OR_PASSWORD_NOT_CORRECT)

  const token = signToken<ITokenSign>({
    id: user._id,
  })

  user.token = token

  return user
}

async function requestAccessToken(input: IRefreshTokenInput): Promise<ITokenSchema> {
  const token = await TokenModel.findOne({ refreshToken: input.refreshToken })

  if (!token) {
    throw errorHandler(TOKEN_NOT_FOUND)
  }

  return token
}

export default {
  register,
  login,
  requestAccessToken,
}
