
const utils = require('./utils')
const path = require('path')
const config = require('../config')

const isProd  = process.env.NODE_ENV === 'production'


function _resolve(dir) {
  return path.resolve(__dirname, '..', dir)
}
module.exports = {
  entry: utils.getEntry(),
  output: {
    path: _resolve('dist'),
    filename: '[name].js',
    // publicPath: process.env.NODE_ENV === 'production'
    // ? config.prod.assetsPublicPath
    // : config.dev.assetsPublicPath
  },
  resolve: {
    modules: [
      _resolve('src'), 
      _resolve('node_modules')
    ],
    extensions: ['.wasm', '.mjs', '.js', '.json'],
    alias: {
      '@' : _resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [_resolve('src'), _resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  // plugins:[
  //   new webpack.ProvidePlugin({
  //     $: "jquery",
  //     jQuery: "jquery"
  //   }),
  // ],
  node: {
      fs: 'empty'
  },
}