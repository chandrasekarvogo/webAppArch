const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const _ = require('lodash');
const prodConfig = require('./src/config/prod_config.json');
const qaConfig = require('./src/config/qa_config.json');
const baseConfig = require('./src/config/base_config.json');

let envConfig = {};

const setPrefix = () => {
  if (process.env.NODE_ENV === 'production') {
    envConfig = _.merge(baseConfig, prodConfig);
  } else if (process.env.NODE_ENV === 'qa') {
    envConfig = _.merge(baseConfig, qaConfig);
  } else {
    envConfig = baseConfig;
  }
};

setPrefix();
const config = {
  mode: 'development',
  module: {},
};
// the path(s) that should be cleaned
const pathsToClean = [
  'dist',
];

// the clean options to use
const cleanOptions = {

};

const jsConfig = Object.assign({}, config, {
  name: 'JS bundler',
  entry: ['babel-polyfill', './src/js/index.js'],
  output: {
    filename: './js/bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [new CleanWebpackPlugin(pathsToClean, cleanOptions),
    new CopyWebpackPlugin([
      {
        from: './src/html/index.html',
        to: './index.html',
      },
    ]),
    new CopyWebpackPlugin([
      {
        from: './src/assets/**/*',
        to: './assets/images/[name].[ext]',
      },
    ]),
    new webpack.DefinePlugin(envConfig),
  ],
  node: {
    fs: 'empty',
  },
});

const mobileCSSConfig = Object.assign({}, config, {
  name: 'CSS bundler',
  entry: './src/css/devices/mobile.scss',
  output: {
    filename: './css/mobile.css',
  },
  module: {
    // Add loader
    rules: [
      {
        test: /\.(scss)$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
    ],
  },
  plugins: [
    // Specify output file name and path
    new ExtractTextPlugin({
      filename: './css/mobile.css',
    }),
  ],
});

const tabletCSSConfig = Object.assign({}, config, {
  name: 'CSS bundler',
  entry: './src/css/devices/tablet.scss',
  output: {
    filename: './css/tablet.css',
  },
  module: {
    // Add loader
    rules: [
      {
        test: /\.(scss)$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
    ],
  },
  plugins: [
    // Specify output file name and path
    new ExtractTextPlugin({
      filename: './css/tablet.css',
    }),
  ],
});

module.exports = [jsConfig, mobileCSSConfig, tabletCSSConfig];
