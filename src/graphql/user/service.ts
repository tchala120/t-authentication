import UserModel, { ICreateUser, IUser } from '../../models/user'

async function findAll(): Promise<IUser[]> {
  return await UserModel.find({})
}

async function addUser(input: ICreateUser): Promise<IUser> {
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
