// @flow
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'
import { hashHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import rootReducer from 'reducers'
import rootSaga from 'sagas'

const router = routerMiddleware(hashHistory)
const sagaMiddleware = createSagaMiddleware()

const enhancer = applyMiddleware(thunk, router)

export default function configureStore(initialState: {} | void) {
  const store = createStore(rootReducer, initialState, enhancer)
  sagaMiddleware.run(rootSaga)
  return store
}
