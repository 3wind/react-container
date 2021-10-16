const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    static: path.resolve(__dirname, '../dist'),
    host: '0.0.0.0', // 默认是localhost
    port: 3000, // 端口
    hot: true, // 开启热更新
    open: false, // 自动打开浏览器
  },
});
