const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/assets/js/index'
  },
  output: {
    filename: 'js/[name].bundle.js',
    chunkFilename: 'js/[name].chunk.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'assets/',
  },
  module: {
      loaders: [
          {
              test: /\.jsx?$/,
              exclude: /node_modules/,
              loaders: ['babel-loader'],

          },
      ],
  },
  resolve: {
      extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'Code Splitting',
      filename: 'index.html',
      template: 'src/assets/view/index.html',
    })
  ],
};