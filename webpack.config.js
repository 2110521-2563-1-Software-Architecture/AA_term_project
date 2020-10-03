const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: {
    entry: './assets/react-frontend/src/index.js'
  },
  output: {
    path: __dirname + '/.tmp/public',
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
      template: 'assets/react-frontend/public/index.html'
    }),
    new Dotenv({
      systemvars: true,
    }),
  ]
}
