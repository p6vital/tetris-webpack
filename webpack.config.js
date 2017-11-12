const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './src/assets/js/index',
        vendor: [
            'react',
            'react-dom',
        ],
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
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'js/vendor.bundle.js',
        }),
    ],
};
