'use strict';

require('dotenv').config();

const { DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const production = process.env.NODE_ENV === 'production';

const webpackConfig = module.exports = {};

webpackConfig.entry = `${__dirname}/src/main.js`;

webpackConfig.output = {
  filename: `[name].[hash].js`,
  path: `${__dirname}/build`,
  publicPath: process.env.CDN_URL,
};

webpackConfig.plugins = [
  //Plugin that simplifies creation of HTML files to serve your bundles
  new HtmlWebpackPlugin({
    title: 'React App',
    template: `${__dirname}/src/index.html`,
  }),

  new DefinePlugin({
    API_URL: JSON.stringify(process.env.API_URL),
  }),
];

webpackConfig.module = {};

webpackConfig.module.rules = [{
  test: /\.(png|svg|jpg|gif)$/,
  use: [
    'file-loader',
  ],
},
{
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['env', 'stage-0', 'react'],
      plugins: ['transform-react-jsx-source'],
      cacheDirectory: true,
    },
  },
},];