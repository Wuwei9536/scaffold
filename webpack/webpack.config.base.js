const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Manifest = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const path = require('path');
const { alias } = require('../config');

module.exports = {
    entry: {
        app: path.resolve(__dirname, "../src/index.js")
    },
    externals: [
        'ioredis'
    ],
    optimization: {
        splitChunks: {
            chunks: 'initial'
        }
    },
    plugins: [
        new Manifest(),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'), // src文件
            filename: 'index.html' // dist文件
        }),
        new FriendlyErrorsWebpackPlugin()
    ],
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                include: [path.resolve(__dirname, '../src'), path.resolve(__dirname, '../node_modules/antd/es/')],
                options: {}
            },
            {
                test: /\.(css|less)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            modules: true,
                            localIdentName: '[local].[hash:8]'
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [autoprefixer()]
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true
                        }
                    }
                ]
            },
            {
                test: /\.(css|less)$/,
                include: /node_modules/,
                use: [{
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {}
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [autoprefixer()]
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true
                        }
                    }
                ]
            },

            {
                test: /\.(png|jpe?g|svg|gif)$/i,
                use: [{
                        loader: 'file-loader',
                        options: {
                            limit: 500,
                            outputPath: 'public/images/',
                            name: '[name].[hash:8].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    resolve: {
        alias
    }
};
