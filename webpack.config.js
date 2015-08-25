var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');
var merge = require('webpack-merge');

var TARGET = process.env.npm_lifecycle_event;
var ROOT_PATH = path.resolve(__dirname);

var common = {
  entry: {
    app1: path.resolve(ROOT_PATH, 'app/main'),
    app2: path.resolve(ROOT_PATH, 'app/main2'),
    vendors: [path.resolve(ROOT_PATH, 'vendors/kk')]
  },
  output: {
    path: path.resolve(ROOT_PATH, 'build'),
    filename: 'assets/[name].entry.js',
    chunkFilename: "assets/[id].chunk.js"
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader"),
        include: path.resolve(ROOT_PATH, 'app')
      },
      {
        test: /\.less$/,
        // loaders: ['style', 'css', 'less'],
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader"),
        include: path.resolve(ROOT_PATH, 'app')
      }
    ]
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: 'Lector',
      filename: 'index1.html',
      chunks: 'app1'
    }),
    new HtmlwebpackPlugin({
      title: 'Lector 2222',
      filename: 'index2.html',
      chunks: 'app2'
    }),
    new ExtractTextPlugin("[name].css"),
    new webpack.optimize.CommonsChunkPlugin('init.js')
    // new webpack.optimize.CommonsChunkPlugin('vendors', 'assets/vendors.js')
  ]
};

if(TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    devServer: {
      colors: true,
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true
    },
    module: {
      preLoaders: [
        {
          test: /\.jsx?$/,
          // we are using `eslint-loader` explicitly since
          // we have ESLint module installed. This way we
          // can be certain that it uses the right loader
          loader: 'eslint-loader',
          include: path.resolve(ROOT_PATH, 'app')
        }
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  });
}
