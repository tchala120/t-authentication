import { EMAIL_IS_ALREADY_EXIST } from '@src/constants/errors/user'
import errorHandler from '@src/handler/error'
import { IError } from '@src/types'
import mongoose, { ClientSession } from 'mongoose'

import type { WrapperResultSync } from './type'

type TransactionResult<T> = (wrapper: WrapperResultSync<T>) => Promise<T>

function withTransaction<T>(...args: any[]): TransactionResult<T> {
  let writeResults: Promise<T>

  const onTransaction = (session: ClientSession, fn: WrapperResultSync<T>) =>
    fn(...args, session)
      .then(async (results: any) => {
        await session.commitTransaction()

        writeResults = results
      })
      .catch(async (error: IError) => {
        await session.abortTransaction()

        if (error.code === 11000) {
          throw errorHandler(EMAIL_IS_ALREADY_EXIST)
        } else {
          console.log('Error code', error.code)
          throw errorHandler(error)
        }
      })
      .finally(() => {
        session.endSession()
      })

  return async (wrapper: WrapperResultSync<T>) => {
    const useTransaction = await mongoose.startSession()

    await useTransaction.withTransaction((session: ClientSession) => onTransaction(session, wrapper))

    console.log('result', writeResults)

    return writeResults
  }
}

export default withTransaction
