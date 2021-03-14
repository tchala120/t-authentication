import { ErrorPayload } from '.'

export const EMAIL_IS_ALREADY_EXIST: ErrorPayload = {
  message: 'This email is already exist. Try another.',
  code: 'EMAIL_ALREADY_EXIST',
}

export const EMAIL_NOT_FOUND: ErrorPayload = {
  message: 'This email not found. Please register first.',
  code: 'EMAIL_NOT_FOUND',
}

export const EMAIL_OR_PASSWORD_NOT_CORRECT: ErrorPayload = {
  message: 'Email or password not correct.',
  code: 'EMAIL_OR_PASSWORD_NOT_CORRECT',
}
