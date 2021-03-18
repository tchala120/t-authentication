import * as mongoose from 'mongoose'

import type { NextFunction } from '@src/types'

interface ITokenSchema extends mongoose.Document {
  accessToken: string
  refresh: string
}

const TokenSchema: mongoose.Schema = new mongoose.Schema(
  {
    id: { type: mongoose.SchemaTypes.ObjectId },
    accessToken: { type: String },
    refreshToken: { type: String },
  },
  {
    timestamps: true,
  }
)

TokenSchema.pre('save', (next: NextFunction) => {
  next()
})

export default mongoose.model<ITokenSchema>('users', TokenSchema)
