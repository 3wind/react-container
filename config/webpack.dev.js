const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common({ extractCSS: false }), {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    static: path.resolve(__dirname, '../dist'),
    host: '0.0.0.0', // 默认是localhost
    port: 3000, // 端口
    hot: true, // 开启热更新
    open: false, // 自动打开浏览器

    proxy: {
      '/mock': {
        target: 'http://127.0.0.1:9528',
        changeOrigin: true,
        pathRewrite: {
          '^/mock': '/'
        }
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'react container',
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html',
    }),
  ],
});
