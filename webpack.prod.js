const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(common, {
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new CleanWebpackPlugin(['build']),
  ],
});
