const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: path.resolve(__dirname, '../src/index.tsx'),
  },
  output: {
    filename: '[name].[chunkhash:8].js',
    path: path.resolve(__dirname, '../dist'),
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  module: {
    // strictExportPresence: true,
    rules: [
      {
        test: /\.(jsx?|tsx?)$/,
        include: path.resolve(__dirname, '../src'),
        exclude: /node_modules/,
        // use: "ts-loader",
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env', // 将es5+转换成es5
                '@babel/preset-react', // 将react中的jsx语法转换成js语法
                '@babel/preset-typescript', // 将react中ts
              ],
              cacheDirectory: true, // 缓存：第二次编译时，会读取之前的缓存，节省编译时间
            },
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'static/pic/[name].[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'react container',
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html',
    }),
    // 显示百分比编译
    new webpack.ProgressPlugin({
      activeModules: false,
      entries: true,
      modules: true,
      modulesCount: 5000,
      profile: false,
      dependencies: true,
      dependenciesCount: 10000,
      percentBy: 'entries',
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};
