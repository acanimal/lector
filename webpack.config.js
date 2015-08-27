var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');

var TARGET = process.env.npm_lifecycle_event;
var APP_PATH = path.resolve(__dirname, 'app');
var BUILD_PATH = path.resolve(__dirname, 'build');

var config = {
  devtool: 'eval-source-map',
  entry: {
    lector: path.resolve(APP_PATH, 'app.js'),
    email: path.resolve(APP_PATH, 'email.js')
  },
  output: {
    path: BUILD_PATH,
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: "style-loader!css-loader",
        // loader: ExtractTextPlugin.extract("style-loader", "css-loader"),
        // include: APP_PATH
      },
      {
        test: /\.less$/,
        loader: "style-loader!css-loader!less-loader",
        // loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader"),
        // include: APP_PATH
      }
      ,
      {
        test: /\.jsx?$/,
        // loader: 'eslint-loader!babel-loader',
        loader: 'babel-loader',
        include: APP_PATH
      }
    ]
  },
  plugins: [
    // new ExtractTextPlugin("lector.css"),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: path.resolve(APP_PATH, 'index.html'),
    }),
    new HtmlWebpackPlugin({
      filename: 'email.html',
      template: path.resolve(APP_PATH, 'email.html'),
    })
  ]
};

module.exports = config;
