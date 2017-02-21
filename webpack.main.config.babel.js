
import path from 'path';

module.exports = {
  context: path.resolve(__dirname, 'app'),
  entry: ['babel-polyfill', './main.es6'],
  output: {
    filename: './dist/window.js'
  },
  devtool: 'sourcemap',
  target: 'electron-main',
  module: {
    rules: [
      {
        test: /\.json$/,
        loader: "json-loader"
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'react-hot-loader',
          'babel-loader'
        ]
      }
    ]
  }
}
