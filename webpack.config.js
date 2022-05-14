var webpack = require('webpack');
var path = require('path');
var package = require('./package.json');

var isProduction =
  process.argv.indexOf('-p') >= 0 || process.env.NODE_ENV === 'production';
var outPath = path.join(__dirname, './build');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var AntdScssThemePlugin = require('antd-scss-theme-plugin');

module.exports = {
  entry: {
    app: './src/index.tsx',
  },
  output: {
    path: outPath,
    publicPath: process.env.PUBLIC_PATH,
    filename: isProduction ? '[contenthash].js' : '[hash].js',
    chunkFilename: isProduction
      ? '[name].[contenthash].js'
      : '[name].[hash].js',
  },
  target: 'web',
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.scss'],
    mainFields: ['module', 'browser', 'main'],
    alias: {
      '@app': path.resolve(__dirname, './src/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                'react-hot-loader/babel',
                [
                  'import',
                  {
                    libraryName: 'antd',
                    style: true,
                  },
                ],
                '@babel/plugin-syntax-dynamic-import',
              ],
            },
          },
          'ts-loader',
        ],
      },
      {
        test: /\.css?$/,
        use: ['css-loader'],
      },
      {
        test: /\.scss?$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: !isProduction,
            },
          },
          AntdScssThemePlugin.themify({
            loader: 'sass-loader',
            options: {
              sourceMap: !isProduction,
            },
          }),
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: !isProduction,
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: !isProduction,
            },
          },
          AntdScssThemePlugin.themify('less-loader'),
        ],
      },
      { test: /\.html$/, use: 'html-loader' },
      { test: /\.(a?png|svg)$/, use: 'url-loader?limit=10000' },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
      },
    },
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      DEBUG: false,
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[hash].css',
      disable: !isProduction,
    }),
    new HtmlWebpackPlugin({
      template: './assets/index.html',
      minify: {
        minifyJS: true,
        minifyCSS: true,
        removeComments: true,
        useShortDoctype: true,
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
      },
      append: {
        head: `<script src="//cdn.polyfill.io/v3/polyfill.min.js"></script>`,
      },
      meta: {
        title: package.name,
        description: package.description,
        keywords: Array.isArray(package.keywords)
          ? package.keywords.join(',')
          : undefined,
      },
    }),
    new AntdScssThemePlugin(
      path.join(__dirname, 'src', 'modules/common/styles', '_global.scss'),
    ),
  ],
  devServer: {
    hot: false,
    inline: true,
    publicPath: '/',
    historyApiFallback: true,
    stats: 'minimal',
    clientLogLevel: 'warning',
  },
  devtool: isProduction
    ? 'hidden-source-map'
    : 'cheap-module-eval-source-map',
  node: {
    fs: 'empty',
    net: 'empty',
  },
};