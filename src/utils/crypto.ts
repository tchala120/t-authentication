import { compare } from 'bcryptjs'

export async function isPasswordCorrect(password: string, hashPassword: string) {
  return (await compare(password, hashPassword)).valueOf
}
