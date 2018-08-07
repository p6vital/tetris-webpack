const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        index: './src/client/js/index',
        style: './src/client/css/index',
        react: [
            'react',
            'react-dom',
            'react-loadable',
        ],
        redux: [
            'redux',
            'react-redux',
        ],
        mui: [
            'material-ui',
        ],
        jquery: [
            'jquery',
        ],
    },
    output: {
        filename: 'js/[name].bundle.js',
        chunkFilename: 'js/[name].chunk.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.scss$/,
                exclude: /(node_modules)/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: 'Explosive',
            filename: 'index.html',
            template: 'index.html',
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
            },
        }),
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: false,
                    mangle: false,
                    output: {
                        beautify: false,
                        preserve_line: true,
                    },
                },
            }),
        ],
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            maxSize: 0,
            minChunks: 2,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
    },
};
