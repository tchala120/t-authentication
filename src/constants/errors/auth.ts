import { ErrorPayload } from '.'

export const MUST_AUTHENTICATE: ErrorPayload = {
  message: 'Must Authenticate.',
  code: 'MUST_AUTHENTICATE',
}

export const TOKEN_EXPIRED: ErrorPayload = {
  message: 'This token is already expired.',
  code: 'TOKEN_EXPIRED',
}

export const TOKEN_NOT_BEARER_TYPE: ErrorPayload = {
  message: 'This token is not bearer type, please re-check',
  code: 'TOKEN_NOT_BEARER_TYPE',
}
