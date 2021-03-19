import type { UserJwt } from '@src/types'
import type { IContext } from '@src/index'
import type { IUser } from '@graphql/user'

import UserModel from '@models/user'

import { USER_NOT_FOUND } from '@src/constants/errors'
import { ACCESS_TOKEN } from '@src/constants/token'

import errorHandler from '@src/handler/error'

import { tokenVerify } from '@src/utils/token'

async function me(ctx: IContext): Promise<IUser> {
  const userJWT: UserJwt = tokenVerify(ctx.auth.token, ACCESS_TOKEN)

  try {
    const user = await UserModel.findById(userJWT.id)

    if (!user) throw errorHandler(USER_NOT_FOUND)

    return user
  } catch (e) {
    throw errorHandler(e)
  }
}

export default {
  me,
}
