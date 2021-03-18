import type { IErrorPayload } from '.'

export const MUST_AUTHENTICATE: IErrorPayload = {
  message: 'Must Authenticate.',
  code: 'MUST_AUTHENTICATE',
}

export const TOKEN_EXPIRED: IErrorPayload = {
  message: 'This token is already expired.',
  code: 'TOKEN_EXPIRED',
}

export const TOKEN_NOT_BEARER_TYPE: IErrorPayload = {
  message: 'This token is not bearer type, please re-check',
  code: 'TOKEN_NOT_BEARER_TYPE',
}

export const SIGNING_TOKEN_OCCURED: IErrorPayload = {
  message: 'Signing token occurred',
  code: 'SIGNING_TOKEN_OCCURED',
}

export const INVALID_SIGNATURE: IErrorPayload = {
  message: 'Invalid sigature',
  code: 'INVALID_SIGNATURE',
}

export const TOKEN_NOT_FOUND: IErrorPayload = {
  message: 'Token not found.',
  code: 'TOKEN_NOT_FOUND',
}

export const REFRESH_TOKEN_EXPIRED: IErrorPayload = {
  message: 'Refresh token has expired. Please re-login again.',
  code: 'REFRESH_TOKEN_EXPIRED',
}
