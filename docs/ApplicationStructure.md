# Application Structure

* /app
  * [`actions`](#actions)
    * [`types.js`](#typesjs)
    * [`utils.js`](#utilsjs)
  * [`components`](#components)
  * [`containers`](#containers)
  * [`pages`](#pages)
  * [`reducers`](#reducers)
  * [`sagas`](#sagas)
    * [`api.js`](#apijs)
    * [`requests.js`](#requestsjs)
  * [`services`](#services)
    * [`schemas.js`](#schemasjs)
  * [`store`](#store)
    * [`configureStore.js`](#configurestorejs)
  * [`styles`](#styles)
    * [`categoriesIcons.js`](#categoriesiconsjs)
    * [`colors.js`](#colorsjs)
    * [`flex.js`](#flexjs)
    * [`normalize.js`](#normalizejs)
  * [`utils`](#utils)
    * [`connectedRouter.js`](#connectedrouterjs)
    * [`radium.js`](#radiumjs)
    * [`svgResolver.js`](#svgresolver)
  * [`routes.js`](#routesjs)
  * [`main.jsx`](#routesjs)


## Actions
[Redux action creators](http://redux.js.org/docs/basics/Actions.html#action-creators) separated by entities types.

### `types.js`
Contains all actions types constants as simple strings. Requires [`utils.js`](#utilsjs)

### `utils.js`
Utilities and helpers for action creators.


## Components
React components as pure functions without side-effects.

**Components connected to the redux store:**
  * `coupons/couponsListSubChild.jsx`
  * `dealContainer/dealContainerSpotAddress.jsx`
  * `dealContainer/dealContainerSpots.jsx`
  * `dealContainer/dealLocationsPreview.jsx`
  * `navBar/navBarBackLink.jsx`
  * `navBar/navBarInput.jsx`
  * `payments/paymentMethodForm.jsx`
  * `shared/tabs/tabs.jsx`
  * `shared/citySelector.jsx`
  * `shared/progressBar.jsx`


## Containers
Exports React [`pages`](#pages) components connected to redux store with [react-redux](https://github.com/reactjs/react-redux).


## Pages
React components separated by type `pages` specified in [`routes`](#routes).


## Reducers
Modules exports [reducers](http://redux.js.org/docs/basics/Reducers.html) functions for redux. Combined together in `index.js`


## Sagas
This modules implements all application business logic through [generators functions](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/function*) and using [redux-saga](https://github.com/redux-saga/redux-saga) helpers. Sagas watch the actions pulled to redux store then execute and catch side effects. The way it works is very much similar to [CSP (Communicating Sequential Processes)](https://en.wikipedia.org/wiki/Communicating_sequential_processes).

All sagas combined through `index.js`

### `api.js`
Contains sagas and helpers for making API requests.

#### `createRequestTypes(baseType)`
Create a simple key-value object with keys `REQUEST`, `SUCCESS` and `FAILURE`. Where values is strings based on keys and `baseType` i.e. `ITEMS_SUCCESS`.

#### `createRequestHandlers(actions)`
Returns object with request, success and failure actions creators.

#### `bindFetchEntity({ request, success, failure }, apiFn)`
Return function generator which call the passed functions depending on the request state.

### `fetch(callerFn, params)`
Call `callerFn` with `params`. Control authorization errors and push `API_REQUEST` errors to store.

### `requests.js`
Not has a sagas. Contains binds of request handlers (request, success and failure actions) to api calls functions listed on `services/api.js`
Requires helpers of `sagas/api.js`


## Services
Modules which exports libraries interfaces with side-effects. Using by sagas.

### `schemas.js`
Contains [normalizr](https://github.com/paularmstrong/normalizr) schemas and relations of models and collections received by API. Apply within the method `fetchJson()` of `services/fetch.js`


## Store

### `configureStore.js`
Exports configured [redux store](http://redux.js.org/docs/api/Store.html) instance for development or production environment. Requires combined [`reducers`](#reducers) and [`sagas`](#sagas).


## Styles
Contains helpers for inline styles. Works independently of [radium](https://github.com/FormidableLabs/radium).

### `categoriesIcons.js`
Associated object of categories labels with slugs. Slugs linked with icons files names `images/icons/categories/[slug].svg`

### `colors.js`
Contains all theme colors constants.

### `flex.js`
Utilities for [flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout). All layouts based on Flexible Box Model. Don't use floats!

### `normalize.js`
Contains [normalize.css](https://github.com/necolas/normalize.css) rules converted to js object. Injected in `components/app.jsx`


## Utils

### `connectedRouter.js`
Bindings to keep `react-router` and `redux` in sync. Also added the ability to use the history methods from sagas and components.

### `radium.js`
Isomorphic tools for using [radium](https://github.com/FormidableLabs/radium) on server-side.

### `svgResolver.js`
Isomorphic helper for using inline SVG on server and browser.


## `routes.js`
Contains simple object-based config for `react-router@4`. Requires [`pages`](#pages).

## `main.jsx`
Root browser-side react component which configure redux store, run sagas and connect router.
