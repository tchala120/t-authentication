import dotenv from 'dotenv'

dotenv.config({
  path: `.env.${process.env.NODE_ENV || 'local'}`,
})

export const USERNAME = process.env.DB_USERNAME
export const PASSWORD = process.env.DB_PASSWORD

export const SECRET_KEY = process.env.SECRET_KEY
