
const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require("path");
const webpackBaseConfig = require('./webpack.base')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const utils = require('./utils')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default

 const  prdConfig = merge(webpackBaseConfig, {
  mode: 'production',
  module: {
    rules: utils.getStyleLoaders(config.prod.sourceMap, true, true) // sourceMap postcc  extrack
  },
  devtool: config.prod.devtool,
  output: {
    path: config.prod.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          name: 'common',
          chunks: 'all',
          minSize: 0,
          minChunks: 2,
        },
        vendor: {
          priority: 1,
          name: 'vendor',
          test: /node_modules/,
          chunks: 'all',
          minSize: 0,
          minChunks: 2
        }
      }
    }
  },
  plugins: [
    ...utils.getHtmlPlugin(),
    new webpack.DefinePlugin({   // 增加自定义变量
      "process.env": require('../config/dev.env')
    }),
    new CopyWebpackPlugin([  // 将static中的文件复制到打包后的static
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
    //css extract
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[hash].css'),
      allChunks: true,
    }),
    //  css优化
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.prod.sourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
     // 压缩
    new UglifyJsPlugin({
      uglifyOptions: {
        warnings: false
      },
      exclude:  /node_modules/,
      sourceMap: config.prod.sourceMap,
      parallel: true
    }),
    new CleanWebpackPlugin({path: path.resolve(__dirname, '..', 'dist')}),
    new WebpackDeepScopeAnalysisPlugin(),

    // new webpack.optimize.ModuleConcatenationPlugin(),
  ]
})

// console.log('---> prdConfig', prdConfig)
module.exports = prdConfig
