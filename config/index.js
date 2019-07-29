const path = require('path')

module.exports = {
  dev: {
    proxy_table: {
      '/api': {
          target: 'http://api.8bjl.cn',
          changeOrigin: true,
          ws: true,
          pathRewrite: {
            '^/api': '/api'
          }
      }
    },
    host: 'localhost',
    port: 8080,
    rootHtml:  'home.html',
    assetsPublicPath: '/',
    assetsSubDirectory: 'static',
    devtool: 'cheap-module-eval-source-map',
  },
  prod: {
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsPublicPath: './',
    assetsSubDirectory: 'static',
    devtool: '#source-map',
    sourceMap: true
  }
}