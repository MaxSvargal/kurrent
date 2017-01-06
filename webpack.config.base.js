/**
 * Base webpack config used across other specific configs
 */

import path from 'path'
import validate from 'webpack-validator'

export default validate({
  target: 'web',
  node: {
    console: 'empty',
    fs: 'empty',
    dgram: 'empty',
    winston: 'empty'
  },
  module: {
    noParse: [ 'ws' ],
    loaders: [ {
      test: /\.jsx?$/,
      loaders: [ 'babel' ],
      exclude: /node_modules/
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.png$|.\svg$/,
      loader: 'file'
    } ]
  },

  output: {
    path: path.join(__dirname, 'app'),
    filename: 'bundle.js',

    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2'
  },

  // https://webpack.github.io/docs/configuration.html#resolve
  resolve: {
    extensions: [ '', '.js', '.jsx', '.json' ],
    modulesDirectories: [ 'node_modules', 'app' ]
  },

  plugins: [],

  externals: [ 'fs', 'ws', 'dgram', 'winston' ]
})
