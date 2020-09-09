/* eslint-disable import/no-extraneous-dependencies */
const PnpWebpackPlugin = require(`pnp-webpack-plugin`);
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: require.resolve('file-loader'),
            options: { name: '[path][name].[ext]' },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
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
    new CopyWebpackPlugin({ patterns: [{ from: 'manifest.json', },], }),
  ],
  resolve: {
    plugins: [
      PnpWebpackPlugin,
    ],
  },
  resolveLoader: {
    plugins: [
      PnpWebpackPlugin.moduleLoader(module),
    ],
  },
};
