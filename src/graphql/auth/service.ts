import { ARGUMENT_IS_REQUIRED } from '@constants/errors/args'
import { EMAIL_NOT_FOUND, EMAIL_OR_PASSWORD_NOT_CORRECT } from '@src/constants/errors/user'

import errorHandler from '@handler/error'

import UserModel, { IUser } from '@models/user'

import { hashingPassword, isPasswordCorrect } from '@src/utils/crypto'
import { signToken } from '@src/utils/token'
import { isObjectEmpty } from '@utils/validate'

import { ILoginInput, ITokenSign } from '.'
import { IRegisterInput } from './interface'

async function register(input: IRegisterInput): Promise<IUser> {
  if (isObjectEmpty(input)) throw errorHandler(ARGUMENT_IS_REQUIRED)

  const { password, ...data } = input

  const token = signToken<ITokenSign>({ ...data })
  const newUser = new UserModel({ ...input, token, password: await hashingPassword(password) })

  await newUser.save()

  return newUser
}

async function login(input: ILoginInput): Promise<IUser> {
  const user = await UserModel.findOne({ email: input.email })

  if (!user) throw errorHandler(EMAIL_NOT_FOUND)

  if (!isPasswordCorrect(input.password, user.password)) throw errorHandler(EMAIL_OR_PASSWORD_NOT_CORRECT)

  const token = signToken<ITokenSign>({
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  })

  user.token = token

  return user
}

export default {
  register,
  login,
}
