const webpack = require('webpack');
/*const HtmlWebpackPlugin = require('html-webpack-plugin');/*//*/输出html*/

module.exports = {
  entry:'./src/aSong.js',//入口文件，可以多个
  output:{
    path:__dirname+'/dev',//出口地址
    filename:'dev.js',//出口文件名
    library:'aSong',
    libraryTarget:'umd'
  },
  devtool:'eval-source-map',//便于调试
  devServer:{//调试服务器
    contentBase:'./dev',
    inline:true,
    hot:true,
    historyApiFallback:true
  },
  module:{
    rules:[
      {
        test:/\.js$/,
        exclude:/(node_modules|bower_components)/,
        use:{
          loader:'babel-loader',//E6 => E5
          options:{
            presets:['env']
          }
      }
    },
      {
        test:/\.css$/,
        exclude:/(node_modules|bower_components)/,
        use:[
          {loader:'style-loader'}, //直接内联进HTML
          {loader:'css-loader',
          options:{
            importLoaders: 1,//添加前缀必须
          }
        },
          {loader:'postcss-loader'}//添加前缀必须
      ]
    }
  ]},
  plugins:[
  new webpack.HotModuleReplacementPlugin(),//热更新插件
/*  new HtmlWebpackPlugin({
      template: __dirname + "/aSong.html" //new 一个这个插件的实例，并传入相关的参数
  })*/
  ]
}