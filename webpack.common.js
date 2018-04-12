/* eslint-disable import/no-extraneous-dependencies */
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    background: './src/background.js',
    options_events: './src/options/options_events.js',
    popup: './src/popup/popup.js',
  },
  output: {
    filename: 'js/[name].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      }, {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: { name: '[path][name].[ext]' },
          },
        ],
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('css/[name].css'),
    new HtmlWebpackPlugin({
      chunks: ['options_events'],
      template: 'src/options/options.html',
      filename: 'options.html',
    }),
    new HtmlWebpackPlugin({
      chunks: ['popup'],
      template: 'src/popup/popup.html',
      filename: 'popup.html',
    }),
    new CopyWebpackPlugin([
      { from: 'manifest.json' },
    ]),
  ],
};
