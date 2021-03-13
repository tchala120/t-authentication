import errorHandler from '../../handler/error'

import UserModel, { ICreateUser, IUser } from '../../models/user'

import { ARGUMENT_IS_REQUIRED } from '../../constants/errors/args'
import { isObjectEmpty } from '../../utils/validate'

async function findAll(): Promise<IUser[]> {
  return await UserModel.find({})
}

async function addUser(input: ICreateUser): Promise<IUser> {
  if (isObjectEmpty<ICreateUser>(input)) errorHandler(ARGUMENT_IS_REQUIRED.message, ARGUMENT_IS_REQUIRED.code)
  const newUser = new UserModel({
    ...input,
  })
  await newUser.save()
  return newUser
}

export default {
  findAll,
  addUser,
}
