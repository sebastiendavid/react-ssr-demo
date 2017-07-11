const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const isProd = process.env.NODE_ENV === 'production';

const loaders = {
  common: [
    {
      test: /\.js$/,
      exclude: [/node_modules/],
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        presets: [
          [
            'env',
            {
              targets: {
                chrome: 59,
                node: 8,
              },
              modules: false,
            },
          ],
          'react',
        ],
      },
    },
    {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {
            loader: 'css-loader',
            options: {
              minimize: isProd,
            },
          },
        ],
      }),
    },
    {
      test: /\.json$/,
      loader: 'json-loader',
    },
  ],
  dev: [],
  prod: [],
};

const plugins = {
  common: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: process.env.NODE_ENV || 'development',
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ExtractTextPlugin({
      filename: 'index.css',
      disable: false,
      allChunks: true,
    }),
  ],
  dev: [],
  prod: [new UglifyJSPlugin({ sourceMap: true })],
};

module.exports = [
  {
    entry: './src/server.js',
    output: {
      path: path.resolve('./dist'),
      filename: 'server.js',
      libraryTarget: 'commonjs2',
      publicPath: '/',
    },
    target: 'node',
    node: {
      console: false,
      global: false,
      process: false,
      Buffer: false,
      __filename: false,
      __dirname: false,
    },
    externals: nodeExternals(),
    plugins: plugins.common.concat(isProd ? plugins.prod : plugins.dev),
    module: {
      loaders: loaders.common.concat(isProd ? loaders.prod : loaders.dev),
    },
  },
  {
    entry: './src/app/browser.js',
    devtool: 'source-map',
    output: {
      path: path.resolve('./dist/static'),
      publicPath: '/',
      filename: 'bundle.js',
    },
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
    plugins: plugins.common.concat(isProd ? plugins.prod : plugins.dev),
    module: {
      loaders: loaders.common.concat(isProd ? loaders.prod : loaders.dev),
    },
  },
];
