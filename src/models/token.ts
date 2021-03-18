import * as mongoose from 'mongoose'

import type { NextFunction } from '@src/types'

export interface ITokenSchema extends mongoose.Document {
  id: string
  refreshToken: string
  expiresIn: number
}

const TokenSchema: mongoose.Schema = new mongoose.Schema(
  {
    id: { type: mongoose.SchemaTypes.ObjectId },
    refreshToken: { type: String },
    expiresIn: { type: Number },
  },
  {
    timestamps: true,
  }
)

TokenSchema.pre('save', (next: NextFunction) => {
  next()
})

export default mongoose.model<ITokenSchema>('users', TokenSchema)
