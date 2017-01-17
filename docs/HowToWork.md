# How To Work
Let create new entity for our application step-by-step.

1. [Action Types Constants](#action-types-constants)
2. [Action Creators](#action-creators)
3. [Reducers](#reducers)
4. [Sagas](#sagas)
  * [Selectors](#selectors)
  * [Requests](#requests)
5. [Services](#services)
  * [Fetch Service](#fetch-service)
  * [API Service](#api-service)
6. [React Components](#react-components)
  * [Containers](#containers)
  * [Pages](#pages)
    * [Items Page Component](#items-page-component)

## Action Types Constants
Let's add some constants to the file `actions/types.js`. This file contain all constant types of actions as simple strings. This allow to avoid a misprints and make work with actions more convenient.
``` javascript
...
export const GET_ITEMS = 'GET_ITEMS'
export const REQUEST_ITEM = 'REQUEST_ITEM'
export const REQUEST_ITEMS = 'REQUEST_ITEMS'
export const SET_ITEM = 'SET_ITEM'
export const SET_ITEMS = 'SET_ITEMS'
...
```

## Action Creators
Action creators are functions that returns a static objects with our data as [standard redux actions] for passing to [`reducers`](#reducers). Pass the only one object argument for simplify destructuring assignments.

Call them on user input events from react components wrapped inside the store's `dispatch()` method. In other situations, call them from saga's `put()` helper.

Let's create a file `items.js` in the `actions` directory.

``` javascript
import { action } from 'actions/utils'
import { GET_ITEMS, SET_ITEM, SET_ITEMS } from 'actions/types'

export const getItems = () => action(GET_ITEMS)
export const setItem = item => action(SET_ITEM, { item })
export const setItems = items => action(SET_ITEMS, { items })
```


## Reducers
Reducer declare how to store our data.

We store our collection as key-value object where key is an id, value is an object of `entity` model. Just one more thing to store separately their `id` in array. This will make our structure and filtering process easier, make our collections immutable without any libraries.

Let's create a file `items.js` in the `reducers` directory.

``` typescript
// @flowtype
type entitiesActionTypes = {
  type: string,
  item: ?{ id: number },
  items: ?{ id: number }[]
}

type idsActionTypes = {
  type: string,
  item: ?{ id: number },
  items: ?{ id: number }[]
}
```

``` javascript
import { combineReducers } from 'redux'
import { SET_ITEMS } from 'actions/types'

// store items as key-value object
// don't mutate state! Return only new instances!
// the empty object is default value for this reducer
export const entities = (state = {}, action: entitiesActionTypes) => {
  switch (type) {
    case SET_ITEM:
      return { ...state, [action.id]: action.item }
    case SET_ITEMS:
      return {
        ...state,
        ...action.items.reduce((obj, item) => ({ ...obj, [item.id]: item }), {})
      }
    // don't forget to return unmodified state by default
    default: return state
  }
}

// store all ids of items
// the empty array is default value for this reducer
export const ids = (state = [], action: idsActionTypes) => {
  switch (type) {
    case SET_ITEM:
      // simple add value to array
      return [ ...state, item.id ]
    case SET_ITEMS:
      // wrap to Set for eliminate duplicates
      return [ ...new Set([ ...state, ...items.map(item => item.id) ]) ]
    default: return state
  }
}

// let's combine our reducers to single one!
export default combineReducers({ entities, ids })
```

We can add another reducers like `filtered` or `activated` arrays on which we will iterate.

Combine our reducers to root reducer. For this, open file `reducers/index.js`, import our combined reducer and add it to the list.

``` javascript
import { combineReducers } from 'redux'

import some from './some'
import items from './items'

// our data will be available as store.items.entities and store.items.ids
const rootReducer = combineReducers({ some, items })

export default rootReducer
```


## Sagas
Sagas aims to make side effects in application easier and better.
It uses an ES6 feature called Generators to make those asynchronous flows easy to read, write and test.
See documentation of [redux-saga](https://github.com/redux-saga/redux-saga).

Create file `items.js` in `sagas` directory.

``` javascript
import { fork, select, take, call, put } from 'redux-saga/effects'
import fetch from 'sagas/api'
import { getAuthToken } from 'sagas/selectors'
import { itemRequest, itemsRequest } from 'sagas/requests'
import { requestSubItemsOf } from 'sagas/subItems'

import { setItems, reloadCount } from 'actions/items'
import { GET_ITEM } from 'actions/types'

const getLength = response =>
  (response && response.ids) ? response.ids.length : 0

export function* getItemSaga(id) {
  while (true) {
    try {
      // waiting for the action with type GET_ITEM
      const { id } = yield take(GET_ITEM)
      // select another required parameters from store
      const token = yield select(getAuthToken)
      // call request to API
      // fetch is our hight-order function generator
      // for control flow of all our requests centralized
      // i.e. authorization, redirects, logging
      const { response, error } = yield call(fetch, itemRequest, id)
      // we also can add some checks for errors
      if (error) throw Error(`Have a trouble with item #${id} request! ${JSON.stringify(error)}`)

      // notify the store
      yield put(setItems(response))
      // exec other effects
      yield put(reloadCount(getLength(response.items)))

    } catch(err) {
      // put error to the store
      // we need to pass action to store as simple object
      // call action creator to get this object
      yield put(errorMessage(err, GET_ITEMS))
      // ... do anything else
    }
  }
}

// sagas composition

export function* getItemsSaga() {
  // fetch items immediately
  yield call(getItemsFetch)
  // after what
  // wait in loop for every GET_ITEMS actions
  while (true) {
    const response = yield call(getItemsFetch)
    // after call you can do anything else
    // i.e. get sub items required for items
    yield call(requestSubItemsOf(response))
  }
}

export function* getItemsFetch() {
  yield take(GET_ITEMS)
  const { response } = yield call(fetch, itemsRequest)
  if (response) yield put(setItems(response.items))
  return response
}

export default function* itemsSagas() {
  yield [
    fork(getItemSaga)
    fork(getItemsSaga)
  ]
}
```

### Selectors
The `sagas/selectors.js` contains a pure functions for select data from the store. The first argument is the current state and others are parameters passed by sagas.

``` javascript
// simple get auth token
export const getAuthToken = state => state.user.token

// pass items ids and get its subItems ids
export const getSubItemsByItems = ({ entities: { subItems } }, ids) =>
  // Set() will clear duplicates
  [ ...new Set(ids.map(id => subitems.entities[id].itemId)) ]

// example of simple search in collections
export const searchItems = ({ entities: { items } }, request) => {
  const regExp = new RegExp(request, 'i')
  return items.ids.filter(id =>
    items.entities[id] && items.entities[id].someProp.search(regExp) >= 0)
}

```

### Requests
We can make abstraction over unified API requests.
Make a sagas which do requests to server and handle their states. This sagas calls actions by self and notify the store with actions types like  `REQUEST_ITEM_REQUEST`, `REQUEST_ITEM_SUCCESS` and `REQUEST_ITEM_FAILURE`.
You don't need to call a `put()` effect for store values after this sagas if you write a single reducer for handle this actions types.

You can invent other sagas as hight-level interfaces like this examples:

``` javascript
import * as api from 'services/api'
import * as actions from 'actions/types'

import {
  bindFetchEntity as bind,
  createRequestHandlers as handlers,
  createRequestTypes as types
} from 'sagas/api'

export const itemRequest = bind(handlers(types(actions.REQUEST_ITEM)), api.fetchItem)
export const itemsRequest = bind(handlers(types(actions.REQUEST_ITEMS)), api.fetchItems)
```

## Services
Services are an interfaces to libraries which has a side effects. It will be used by sagas. You must return a promise or a final value from service.

### Fetch Service
Here is an example of service over ES6 method `fetch()`

``` typescript
// @flowtype
type endpointType = string
type paramsType = { schema: ?{}, method: ?string, body: ?string, headers: ?{} }
type outputType = Promise<{ response: ?string | ?Blob, error: ?string }>
```

``` javascript
import { normalize } from 'normalizr'
import { camelizeKeys } from 'humps'

export const fetch = (endpoint: endpointType, params: paramsType): outputType =>
  fetch(endpoint, params)
    .then(response =>
      response.json().then(json => ({ json, response })))
    .then(({ json, response }) => {
      // on error pass response to errorHandle and after that to saga
      if (!response.ok) throw response
      // convert underscore'd object keys to camelCase'd
      const camelizedJson = camelizeKeys(json)

      // make our collections flattern
      return params.schema ?
        normalize(camelizedJson, params.schema) :
        camelizedJson
    })
    .then(responseHandle, errorHandle)
```
Read documentations of [normalizr](https://github.com/paularmstrong/normalizr)

### API Service
Here is the configurable interfaces for all types of API requests, for example:

``` javascript
import { fetch, authHeader } from 'services/fetch'
import { items } from 'services/schemas'

export const requestItems = () =>
  fetch('items', { ...authHeader() }) })

export const requestItem = id =>
  fetch(`items/${id}`, { ...authHeader() }) })

export const requestItemPut = ({ item, id, authToken }) =>
  fetch(`items/${id}`, { method: 'PUT', body: JSON.stringify(item), ...authHeader(authToken) } )
```


## React Components
And now, lets render our data. Read [react]() documentation.

### Containers
Connect our pages to redux store.
``` javascript
import { connect } from 'react-redux'
import { getItems, setItem } from 'actions/items'
import ItemsPage from 'pages/itemsPage'

const mapToProps = ({ entities: { items } }) => ({ items })
const mapDispatchToProps = { getItems, setItem }

export default connect(mapToProps, mapDispatchToProps)(ItemsPage)

```
Read documentation of [react-redux]( https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options).

### Pages
These modules are the root components as pages.

#### Items Page Component
Just call an action in `componentWillMount`, `componentDidMount` or in event handlers to communicate.
`getItems` and `setItem` actions are already bind to store with react-redux `connect()`.

Step `yield take()` inside `getItemSaga` generator will see event type and go to the next step.
React call render() method automatically after items in store will be changed.

``` javascript
import React, { Component } from 'react'

class ItemsPage extends Component {
  // @flowtype
  props: {
    items: {
      entities: {
        [id: string]: {
          id: number
        }
      },
      ids: number[]
    },
    params: {
      page: string
    },
    getItems: (id: number) => void
    setItem: (value: { id: number, someProp: string }) => void
  }

  componentWillMount() {
    // but the better way is call from sagas, this is only example
    // the all current router params is already in the store, just take it
    this.props.getItems(this.props.params.page)
  }

  addItemHandle = event => {
    event.preventDefault()
    // just call the action which create a new dummy item
    this.props.setItem({ id: new Date().getTime(), someProp: 'foo' })
  }

  render() {
    const { items: { entities, ids } } = this.props
    const { list, child } = this.getStyles()

    return (
      // yeah, use inline styles
      <ul style={ list } >
        // iterate by array of ids
        // you don't need to create a new objects instances
        { ids.map(id =>
          <li key={ id } style={ child } >
            Item #${entities[id].id}
          </li>
        ) }
        <button onClick={ this.addItemHandle }>Add dummy item</button>
      </ul>
    )
  }

  getStyles() {
    return {
      list: {
        listStyle: 'none'
      },
      child: {
        display: 'block'
      }
    }
  }
}

export default PaymentPage
```
