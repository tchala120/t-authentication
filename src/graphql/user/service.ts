import type { UserJwt } from '@src/types'
import type { IContext } from '@src/index'

import { USER_NOT_FOUND } from '@src/constants/errors/user'

import UserModel, { IUser } from '@models/user'

import errorHandler from '@src/handler/error'

import { tokenVerify } from '@src/utils/token'

async function me(ctx: IContext): Promise<IUser> {
  const userJWT: UserJwt = tokenVerify(ctx.auth.token)

  try {
    const user = await UserModel.findOne({ email: userJWT.email })

    if (!user) throw errorHandler(USER_NOT_FOUND)

    return user
  } catch (e) {
    throw errorHandler(e)
  }
}

export default {
  me,
}
