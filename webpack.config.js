var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var merge = require('webpack-merge');
var path = require('path');

var TARGET = process.env.npm_lifecycle_event;
var APP_PATH = path.resolve(__dirname, 'app');
var BUILD_PATH = path.resolve(__dirname, 'build');

var common = {
  entry: [
    'webpack/hot/dev-server',
    path.resolve(APP_PATH, 'alt')
  ],
  output: {
    path: BUILD_PATH,
    filename: 'lector.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader"),
        include: APP_PATH
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader"),
        include: APP_PATH
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("lector.css")
  ]
};

if(TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    devServer: {
      contentBase: './build',
      colors: true,
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true
    },
    module: {

    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  });
}
