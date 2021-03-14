import { ARGUMENT_IS_REQUIRED } from '@constants/errors/args'

import errorHandler from '@handler/error'

import UserModel, { IUser } from '@models/user'
import { signToken } from '@src/utils/token'

import { isObjectEmpty } from '@utils/validate'

import { ILoginInput } from '.'
import { IRegisterInput } from './interface'

async function register(input: IRegisterInput): Promise<IUser> {
  if (isObjectEmpty(input)) throw errorHandler(ARGUMENT_IS_REQUIRED)

  const { password, ...data } = input

  const token = signToken<IRegisterInput>({ ...data })
  const newUser = new UserModel({ ...input, token })

  await newUser.save()

  return newUser
}

async function login(input: ILoginInput): Promise<IUser> {
  console.log('Login input', input)

  const user = await UserModel.findById('helloworld')

  if (!user) throw errorHandler({ message: 'not found user', code: 'USER_NOT_FOUND' })

  return user
}

export default {
  register,
  login,
}
