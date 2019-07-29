const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const isProduct =  process.env.NODE_ENV === 'production'

function newHtmlWebpackPlugin(option) {
  return new HtmlWebpackPlugin(option)
}
exports.getEntry = function() {
  const entry = {};
  //读取src目录所有page入口
  glob.sync('src/pages/*/index.js')
  .forEach(function (filePath) {
      var name = filePath.match(/\/pages\/(.+)\/index.js/);
      name = name[1];
      entry[name] = path.resolve(__dirname, '..', filePath) ;
  });
  return entry;
}

exports.getHtmlPlugin = function() {
  const htmlPluginArray = [];
  //读取src目录所有page入口
  const rootHtml = config.dev.rootHtml
  glob.sync('src/pages/*/index.js')
  .forEach(function (filePath, index) {
    var name = filePath.match(/\/pages\/(.+)\/index.js/)[1];
    const _filePath = '../src/pages/' + name + '/index.html'
    htmlPluginArray.push(newHtmlWebpackPlugin({
      // filename: path.resolve(__dirname, _filePath),
      filename: (name + '.html') === rootHtml ? 'index.html': (name + '.html'),
      template: path.resolve(__dirname, _filePath) ,
      favicon: path.resolve(__dirname, '..', 'public/favicon.ico'),
      minify:isProduct
      ? {
          removeComments: true, // 移除HTML中的注释
          collapseWhitespace: true, // 删除空白符与换行符
          minifyCSS: true// 压缩内联css
        }
      : false
    }))

  });
  return htmlPluginArray;
}
// 生成打包文件后 生成到哪个文件夹
exports.assetsPath = function(_path) {
  const assetsSubDirectory = process.env.NODE_ENV == 'production'
  ? config.prod.assetsSubDirectory
  : config.dev.assetsSubDirectory
  return path.join(assetsSubDirectory, _path)
}


exports.cssLoaders = function(_sourceMap, _postCss, _extract) {
  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: _sourceMap
    }
  } 
  const postCssLoader = {
    loader: 'postcss-loader'
  }
  function getLoaders (loaderKey, loaderOption) {
    const _loaderOption = loaderOption?loaderOption:{}
    const loaders = _postCss? [cssLoader, postCssLoader] : [cssLoader]
    if(loaderKey) {
      loaders.push({
        loader: loaderKey+'-loader',
        options: Object.assign({},_loaderOption, {
          sourceMap: _sourceMap
        })
      })
    }
    if(_extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'style-loader'
      })
    }else {
      return ['style-loader'].concat(loaders)
    }
  }
  return {
    css: getLoaders(),
    less: getLoaders('less'),
  }
}

// 生成styleLoaders
exports.getStyleLoaders = function(_sourceMap, _postCss, _extract) {
  const sytleLoaders = []
  const loaders = exports.cssLoaders(_sourceMap, _postCss, _extract)
  for(const loaderKey in  loaders){
    const speKeyloaders = loaders[loaderKey]
    sytleLoaders.push({
      test: new RegExp('\\.'+ loaderKey + '$'),
      use: speKeyloaders
    })
  }
  return sytleLoaders;
}

