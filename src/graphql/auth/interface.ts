export interface IToken {
  accessToken: string
  refreshToken: string
}

export interface ILoginInput {
  email: string
  password: string
}

export interface IRegisterInput {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface ITokenSign {
  id: string
}
