
const utils = require('./utils')
const path = require('path')
const config = require('../config')
const webpack = require('webpack')

const isProd  = process.env.NODE_ENV === 'production'


function _resolve(dir) {
  return path.resolve(__dirname, '..', dir)
}
console.log('--> node env ', process.env.NODE_ENV === 'production'
? config.prod.assetsPublicPath
: config.dev.assetsPublicPath)
module.exports = {
  entry: utils.getEntry(),
  output: {
    path: _resolve('dist'),
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
    ? config.prod.assetsPublicPath
    : config.dev.assetsPublicPath
  },
  resolve: {
    // modules: [
    //   _resolve('src'), 
    //   _resolve('node_modules')
    // ],
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
      } ,
      {
        test:/\.html$/,
        use: [{
          loader:'html-withimg-loader',
        },
        {
          loader: 'html-loader',
          options: {
            attrs: ['img:src', 'img:data-src', 'audio:src'], //html图片输出
            minimize: true
          }
        }]
      }
    ]
  },
  plugins:[
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
  ],
  node: {
      fs: 'empty'
  },
}