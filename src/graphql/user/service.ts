import type { IContext } from '@src/index'
import type { UserJwt } from '@src/types'

import { USER_NOT_FOUND } from '@src/constants/errors/user'

import { session } from '@src/database'

import UserModel, { IUser } from '@models/user'

import errorHandler from '@src/handler/error'

import { tokenVerify } from '@src/utils/token'

async function me(ctx: IContext): Promise<IUser> {
  const userJWT: UserJwt = tokenVerify(ctx.auth.token)

  try {
    const user = await UserModel.findOne({ email: userJWT.email }).session(session)

    if (!user) throw errorHandler(USER_NOT_FOUND)

    await session.commitTransaction()
    session.endSession()

    return user
  } catch (e) {
    await session.abortTransaction()
    session.endSession()
    throw errorHandler(e)
  }
}

export default {
  me,
}
