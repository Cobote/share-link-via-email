const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    emailme: './src/emailme.js',
    options: './src/options/options_events.js',
    popup: './src/popup/popup.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build_dev'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
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
    new CleanWebpackPlugin(['build_dev']),
    new HtmlWebpackPlugin({
      title: 'Output Management',
    }),
    new CopyWebpackPlugin([
      { from: 'manifest.json' },
    ]),
  ],
};
