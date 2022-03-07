const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = ({ extractCSS = false }) => {
  return {
    entry: {
      index: path.resolve(__dirname, '../src/index.tsx'),
    },
    output: {
      filename: '[name].[contenthash:8].js',
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
          // 使用该配置，否则fullCalendar样式无法加载
          test: /\.css$/,
          use: [
            extractCSS
              ? {
                  loader: MiniCssExtractPlugin.loader,
                }
              : {
                  loader: 'style-loader',
                },
            {
              loader: 'css-loader',
            },
          ],
        },
        {
          test: /\.(sa|sc)ss$/,
          use: [
            extractCSS
              ? {
                  loader: MiniCssExtractPlugin.loader,
                }
              : {
                  loader: 'style-loader',
                },
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[path][name]__[local]--[hash:base64:5]',
                },
                importLoaders: 1,
              },
            },
            {
              loader: 'sass-loader',
            },
          ],
        },
        {
          test: /\.less$/,
          use: [
            extractCSS
              ? {
                  loader: MiniCssExtractPlugin.loader,
                }
              : {
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
                  modifyVars: {
                    '@ant-prefix': 'ant',
                  },
                },
              },
            },
          ],
        },
        {
          test: /\.(png|gif|jpe?g|bmp)$/,
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
          test: /\.(svg|woff|woff2|eot|ttf|otf)$/,
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
      extractCSS &&
        new MiniCssExtractPlugin({
          filename: 'static/css/[name].[hash:8].css',
          chunkFilename: 'static/css/[id].[hash:8].css',
          ignoreOrder: true
        }),
    ].filter(Boolean),
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
  };
};
