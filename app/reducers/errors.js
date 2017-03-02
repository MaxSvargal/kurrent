import { createReducer } from 'redux-act'
import { errorMessage } from 'actions'

const errors = createReducer({
  [errorMessage]: (state, { msg, type }) =>
    ({ ...state, [type]: state[type] ? [ ...state[type], msg ] : [ msg ] })
}, {})

export default errors
