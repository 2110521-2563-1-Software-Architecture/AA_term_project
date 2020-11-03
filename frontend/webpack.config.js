const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  entry: {
    entry: './react-frontend/src/index.js'
  },
  output: {
    path: __dirname + '/../frontend-static',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
      },
      {
        use: ['file-loader'],
        test: /\.(png|svg|jpg|gif)$/,
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './react-frontend/public/index.html'
    }),
    new Dotenv({
      systemvars: true,
    }),
  ],
  devServer: {
    writeToDisk: true,
    historyApiFallback: true
  }
}
