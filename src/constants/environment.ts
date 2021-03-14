import path from 'path'
import { config } from 'dotenv'

config({
  path: path.join(__dirname, '../../', `.env.${process.env.NODE_ENV || 'local'}`),
})

export const USERNAME = process.env.DB_USERNAME
export const PASSWORD = process.env.DB_PASSWORD
export const SECRET_KEY = process.env.SECRET_KEY
