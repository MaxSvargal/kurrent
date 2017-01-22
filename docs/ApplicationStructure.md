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
[Redux action creators](http://redux.js.org/docs/basics/Actions.html#action-creators) separated by entities type.

### `types.js`
Contains all action types constants as a simple strings. Requires [`utils.js`](#utilsjs)

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
Modules that exports [reducers](http://redux.js.org/docs/basics/Reducers.html) functions for redux. Are combined in `index.js`


## Sagas
This modules implements all application business logic through [generators functions](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/function*) and using [redux-saga](https://github.com/redux-saga/redux-saga) helpers. Sagas watch the actions pulled to redux store then execute and catch side effects. The way it works is very much similar to [CSP (Communicating Sequential Processes)](https://en.wikipedia.org/wiki/Communicating_sequential_processes).

All sagas are combined in `index.js`

### `api.js`
Contains sagas and helpers for making API requests.

#### `createRequestTypes(baseType)`
Creates a simple "key-value" object with keys `REQUEST`, `SUCCESS` and `FAILURE`, where values are the strings based on keys and `baseType` i.e. `ITEMS_SUCCESS`.

#### `createRequestHandlers(actions)`
Returns object with request, success and failure actions creators.

#### `bindFetchEntity({ request, success, failure }, apiFn)`
Returns function generator which calls the passed functions depending on the request state.

### `fetch(callerFn, params)`
Calls `callerFn` with `params`. Controls authorization errors and pushes `API_REQUEST` errors to the store.

### `requests.js`
Doesn't have any sagas. Contains bindings of request handlers (request, success and failure actions) to api calls functions listed in `services/api.js`
Requires helpers of `sagas/api.js`


## Services
Modules which exports libraries interfaces with side-effects. Supposed to be used by sagas.

### `schemas.js`
Contains [normalizr](https://github.com/paularmstrong/normalizr) schemas and relations of models and collections received by API. Apply within the method `fetchJson()` of `services/fetch.js`


## Store

### `configureStore.js`
Exports configured [redux store](http://redux.js.org/docs/api/Store.html) instance for development or production environment. Requires [`reducers`](#reducers) and [`sagas`](#sagas) combined.


## Styles
Contains helpers for inline styles. Works independently of [radium](https://github.com/FormidableLabs/radium).

### `categoriesIcons.js`
Associated object of category labels with slugs. Slugs are linked with icons file names `images/icons/categories/[slug].svg`

### `colors.js`
Contains all colors constants of a theme.

### `flex.js`
Utilities for [flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout). All layouts are based on Flexible Box Model. Don't use floats here!

### `normalize.js`
Contains [normalize.css](https://github.com/necolas/normalize.css) rules converted to js object. It is injected into `components/app.jsx`


## Utils

### `connectedRouter.js`
Bindings to keep `react-router` and `redux` in sync. Also adds the ability to use the history methods from sagas and components.

### `radium.js`
Isomorphic tools for [radium](https://github.com/FormidableLabs/radium) usage on server-side.

### `svgResolver.js`
Isomorphic helper for using inline SVG on both server and browser.


## `routes.js`
Contains simple object-based config for `react-router@4`. Requires [`pages`](#pages).

## `main.jsx`
Root browser-side react component which configures redux store, runs sagas and connects router.
