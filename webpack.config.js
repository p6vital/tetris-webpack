const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './src/assets/js/index',
        'react': [
            'react',
            'react-dom',
        ],
        'mui': [
            'material-ui',
        ],
        'jquery': [
            'jquery',
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
            names: ['react', 'mui', 'jquery'],
            filename: 'js/vendor/[name].bundle.js',
        }),
    ],
};
