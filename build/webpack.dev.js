
const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require("path");
const webpackBaseConfig = require('./webpack.base')
const config = require('../config')
const utils = require('./utils')
const CopyWebpackPlugin = require('copy-webpack-plugin')

// const ExtractTextPlugin = require("extract-text-webpack-plugin");

const PORT = process.env.PORT ? process.env.PORT : config.dev.port
const HOST = process.env.HOST ? process.env.HOST :  config.dev.host

// const extractLess = new ExtractTextPlugin({
//   filename: utils.assetsPath('css/[name].[contenthash].css'),
//   disable: process.env.NODE_ENV === "development",
//   allChunks: true,
// });
module.exports = merge(webpackBaseConfig, {
  mode: 'development',
  module: {
    rules: utils.getStyleLoaders(true, true, false) // sourceMap postcc  extrack
  },
  devtool: config.dev.devtool,
  devServer: {
    // open: true,
    hot: true,    // 热更新
    host: HOST,
    port: PORT,
    proxy: config.dev.proxy_table
  },
  plugins: [
    ...utils.getHtmlPlugin(),
    // extractLess,
    new webpack.HotModuleReplacementPlugin(), // 热更新
    new webpack.DefinePlugin({   // 增加自定义变量
      "process.env": require('../config/dev.env')
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])  
    
  ],
})

