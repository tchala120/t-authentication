import { compare, hash, genSaltSync } from 'bcryptjs'

const SALT = genSaltSync(10)

export async function isPasswordCorrect(password: string, hashPassword: string) {
  return (await compare(password, hashPassword)).valueOf
}

export async function hashingPassword(password: string): Promise<string> {
  return await hash(password, SALT)
}
