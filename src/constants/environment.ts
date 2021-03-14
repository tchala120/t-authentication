import path from 'path'
import { config } from 'dotenv'

config({
  path: path.join(__dirname, '../../', `.env.${process.env.NODE_ENV || 'local'}`),
})

export const USERNAME = process.env.DB_USERNAME
export const PASSWORD = process.env.DB_PASSWORD
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET
