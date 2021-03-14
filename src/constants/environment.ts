import path from 'path'
import { config } from 'dotenv'

config({
  path: path.join(__dirname, '../../', `.env.${process.env.NODE_ENV || 'local'}`),
})

export const USERNAME = process.env.DB_USERNAME
export const PASSWORD = process.env.DB_PASSWORD
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET
export const SALT =
  process.env.SALT ||
  '20bf666f19107c20452be7c7ba5d0098c09c8567373eb11a821be8abf4c1c0040f8b662245a56daf2fd0625ab03c7af581633858cd3fa07d7c67a286c5789858'
