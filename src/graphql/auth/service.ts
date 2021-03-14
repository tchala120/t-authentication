import errorHandler from '../../handler/error'

import UserModel, { IUser } from '../../models/user'

import { ILoginInput } from '.'

async function login(input: ILoginInput): Promise<IUser> {
  console.log('Login input', input)

  const user = await UserModel.findById('helloworld')

  if (!user) throw errorHandler({ message: 'not found user', code: 'USER_NOT_FOUND' })

  return user
}

export default {
  login,
}
