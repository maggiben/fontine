import path from 'path';
import fs from 'fs';
import webpack from 'webpack';
import HtmlwebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import ElectronConnectWebpackPlugin from 'electron-connect-webpack-plugin';
import ElectronPlugin from 'electron-webpack-plugin';
import WebpackCleanupPlugin from 'webpack-cleanup-plugin'

const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
};

export default {
  context: path.resolve(__dirname, 'app'),
  entry: {
    'bundle': ['babel-polyfill','./index.jsx'],
    'vendor': ['react']
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].js'
  },
  devtool: 'inline-source-map',
  target: 'electron-renderer',
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.bundle.js'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.BABEL_ENV': JSON.stringify('client')
    }),
    new webpack.NamedModulesPlugin(),
    new HtmlwebpackPlugin({
      template: require('html-webpack-template'),
      title: 'App',
      appMountId: 'app',
      inject: false
    }),
    new ElectronConnectWebpackPlugin({
      path: path.resolve('dist'),
      logLevel: 0
    }),
    new ElectronPlugin({
      // if a file in this path is modified/emitted, electron will be restarted
      // *required*
      relaunchPathMatch: "./main",
      // the path to launch electron with
      // *required*
      path: path.resolve('dist'),
      // the command line arguments to launch electron with
      // optional
      args: ["--enable-logging"],
      // the options to pass to child_process.spawn
      // see: https://nodejs.org/api/child_process.html#child_process_child_process_spawnsync_command_args_options
      // optional
      options: {
        env: { NODE_ENV: JSON.stringify(env) }
      }
    }),
    new WebpackCleanupPlugin({
      exclude: ["package.json", "main.js", "index.html", 'bootstrapper.js'],
    })
  ],
  resolve: {
    //extensions: [ '', '.js', '.jsx', '.coffee', '.less', '.ttf', '.eot', '.woff' ],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, './app/lib')
    ]
  },
  /*resolveLoader: {
    moduleDirectories: [ 'node_modules' ]
  },*/
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]",
      },
      {
        test: /\.json$/,
        loader: "json-loader"
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 30000,
            name: '[name]-[hash].[ext]'
          }
        }]
        //loaders: 'file?hash=sha512&digest=hex&name=[hash].[ext]'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 30000,
            minetype: 'application/font-woff'
          }
        }]
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          'file-loader'
        ]
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
