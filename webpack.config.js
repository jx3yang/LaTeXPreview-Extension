const { resolve } = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const tsRule = {
  test: /\.ts(x?)$/,
  exclude: /node_modules/,
  use: 'ts-loader',
}

const cssRule = {
  test: /\.css$/,
  use: ['style-loader', 'css-loader'],
}

const plugins = [
  new HTMLWebpackPlugin({
    template: './src/pages/Popup/index.html',
    filename: 'Popup.html',
    chunks: ['Popup'],
  }),
  new CopyWebpackPlugin({
    patterns: [
      { from: 'public', to: '.' },
    ],
  }),
  new CleanWebpackPlugin(),
]

module.exports = {
  mode: 'production',
  entry: {
    Popup: './src/pages/Popup/index.tsx',
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'dist'),
  },
  module: {
    rules: [cssRule, tsRule],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      "@": resolve(__dirname, 'src/'),
    }
  },
  plugins,
}
