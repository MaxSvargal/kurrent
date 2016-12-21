import { ERROR_MESSAGE } from 'actions/types'

export function action(type, payload = {}) {
  return { type, ...payload }
}

export function errorMessage(message, errorActionType) {
  return { type: ERROR_MESSAGE, message, errorActionType }
}
