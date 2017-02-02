import { ERROR_MESSAGE } from 'actions/types'

const errors = (state = {}, { type, message, errorActionType }) =>
  type === ERROR_MESSAGE ? {
    ...state,
    [errorActionType]: state[errorActionType] ?
      [ ...state[errorActionType], message ] :
      [ message ]
  } : state

export default errors
