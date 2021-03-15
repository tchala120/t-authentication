import { IErrorPayload } from '.'

export const EMAIL_IS_ALREADY_EXIST: IErrorPayload = {
  message: 'This email is already exist. Try another.',
  code: 'EMAIL_ALREADY_EXIST',
}

export const EMAIL_NOT_FOUND: IErrorPayload = {
  message: 'This email not found. Please register first.',
  code: 'EMAIL_NOT_FOUND',
}

export const EMAIL_OR_PASSWORD_NOT_CORRECT: IErrorPayload = {
  message: 'Email or password not correct.',
  code: 'EMAIL_OR_PASSWORD_NOT_CORRECT',
}

export const USER_NOT_FOUND: IErrorPayload = {
  message: 'User is not found',
  code: 'USER_NOT_FOUND',
}
