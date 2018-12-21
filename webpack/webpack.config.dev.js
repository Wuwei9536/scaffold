const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { proxy, alias } = require('../config');
const base = require('./webpack.config.base.js');

process.env.NODE_ENV = "development";

module.exports = merge(
    base,
    {
        mode: 'development',
        devtool: 'source-map',
        devServer: {
            contentBase: './dist',
            hot: true,
            host: '0.0.0.0',
            port: 8000,
            historyApiFallback: {
                disableDotRule: true
            },
            overlay: true,
            inline: true,
            stats: "errors-only",
            proxy
        },
        output: {
            hotUpdateChunkFilename: "public/[id].[hash].hot-update.js",
            hotUpdateMainFilename: "public/[hash].hot-update.json",
            filename: 'public/js/[name].js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/'
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new MiniCssExtractPlugin({
                filename: 'public/styles/[name].css',
                chunkFilename: 'public/styles/chunk.[name].css'
            })
        ],
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    enforce: 'pre',
                    use: [{
                        loader: require.resolve('eslint-loader'),
                        options: {
                            eslintPath: require.resolve('eslint'),
                            emitWarning: false
                        }
                    }],
                    exclude: /node_modules/,
                    include: [
                        path.resolve(__dirname, '../src/')
                    ]
                }
            ]
        }
    }
);
