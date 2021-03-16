import { EMAIL_IS_ALREADY_EXIST } from '@src/constants/errors/user'
import errorHandler from '@src/handler/error'
import mongoose, { ClientSession } from 'mongoose'

import type { WrapperResultSync } from './type'

type TransactionResult<T> = (wrapper: WrapperResultSync<T>) => Promise<T>

function withTransaction<T>(...args: any[]): TransactionResult<T> {
  let writeResults: T

  const onTransaction = async (session: ClientSession, fn: WrapperResultSync<T>): Promise<void> => {
    try {
      const results: T = await fn(...args, session)
      writeResults = results

      session.endSession()
    } catch (error) {
      await session.abortTransaction()
      session.endSession()

      if (error.code === 11000) {
        throw errorHandler(EMAIL_IS_ALREADY_EXIST)
      } else {
        console.log('Error code', error.code)
        throw errorHandler(error)
      }
    }
  }

  return async (wrapper: WrapperResultSync<T>) => {
    const useTransaction = await mongoose.startSession()

    await useTransaction.withTransaction(async (session: ClientSession) => await onTransaction(session, wrapper))

    return writeResults
  }
}

export default withTransaction
