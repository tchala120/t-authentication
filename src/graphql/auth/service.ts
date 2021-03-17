import type { ClientSession } from 'mongoose'
import type { ILoginInput, ITokenSign } from '.'
import type { IRegisterInput } from './interface'

import { ARGUMENT_IS_REQUIRED } from '@constants/errors/args'
import { EMAIL_NOT_FOUND, EMAIL_OR_PASSWORD_NOT_CORRECT } from '@src/constants/errors/user'

import errorHandler from '@handler/error'

import UserModel, { IUser } from '@models/user'

import { hashingPassword, isPasswordCorrect } from '@src/utils/crypto'
import { signToken } from '@src/utils/token'
import { isObjectEmpty } from '@utils/validate'

async function register(input: IRegisterInput, session: ClientSession): Promise<IUser> {
  if (isObjectEmpty(input)) throw errorHandler(ARGUMENT_IS_REQUIRED)

  const newUser = new UserModel({ ...input, token: null, password: await hashingPassword(input.password) })

  await newUser.save()

  const token = signToken<ITokenSign>({ id: newUser._id })

  newUser.token = token

  await session.commitTransaction()

  return newUser
}

async function login(input: ILoginInput): Promise<IUser> {
  const user = await UserModel.findOne({ email: input.email })

  if (!user) throw errorHandler(EMAIL_NOT_FOUND)

  if (!isPasswordCorrect(input.password, user.password)) throw errorHandler(EMAIL_OR_PASSWORD_NOT_CORRECT)

  const token = signToken<ITokenSign>({
    id: user._id,
  })

  user.token = token

  return user
}

export default {
  register,
  login,
}
