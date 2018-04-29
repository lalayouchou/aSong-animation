const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");//css分离插件
const HtmlWebpackPlugin = require('html-webpack-plugin');//生成html

module.exports = {
  entry:'./src/aSong.js',//入口文件，可以多个
  output:{
    path:__dirname+'/dist',//出口地址
    filename:'aSong.min.js'//出口文件名
  },
  module:{
    rules:[
      {
        test:/\.js$/,
        exclude:/(node_modules|bower_components)/,
        use:{
          loader:'babel-loader',
          options:{
            presets:['env']
          }
      }
    },
      {
        test:/\.css$/,
        exclude:/(node_modules|bower_components)/,
        use:[
          MiniCssExtractPlugin.loader, //css分离
          {loader:'css-loader',
          options:{
            importLoaders: 1,
          }
        },
          {loader:'postcss-loader'}
      ]
    }
  ]},
  plugins:[
  new webpack.BannerPlugin('版权所有，翻版必究'),
  new HtmlWebpackPlugin({
      template: __dirname + "/aSong.html" 
  }),
  new MiniCssExtractPlugin({//css分离
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
}