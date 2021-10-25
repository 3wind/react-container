const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common({ extractCSS: true }), {
  mode: 'production',
  devtool: 'cheap-source-map',
});
