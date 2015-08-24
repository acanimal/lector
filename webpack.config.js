var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var merge = require('webpack-merge');

var TARGET = process.env.npm_lifecycle_event;
var ROOT_PATH = path.resolve(__dirname);

var common = {
  entry: {
    app: path.resolve(ROOT_PATH, 'app/main'),
    vendors: [path.resolve(ROOT_PATH, 'vendors/kk')]
  },
  output: {
    path: path.resolve(ROOT_PATH, 'build'),
    filename: 'assets/app.js'
  },
  module: {
    loaders: [
      {
        test: /\.less$/,
        loaders: ['style', 'css', 'less'],
        include: path.resolve(ROOT_PATH, 'app')
      }
    ]
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: 'Lector'
    }),
    new webpack.optimize.CommonsChunkPlugin('vendors', 'assets/vendors.js')
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
