import type { Context } from '@src/index'
import type { UserJwt } from '@src/types'

import { USER_NOT_FOUND } from '@src/constants/errors/user'

import UserModel, { IUser } from '@models/user'

import errorHandler from '@src/handler/error'

import { tokenVerify } from '@src/utils/token'

async function me(ctx: Context): Promise<IUser> {
  const userJWT: UserJwt = tokenVerify(ctx.auth.token)

  const user = await UserModel.findOne({ email: userJWT.email })

  if (!user) throw errorHandler(USER_NOT_FOUND)

  return user
}

export default {
  me,
}
