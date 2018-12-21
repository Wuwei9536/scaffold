const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const merge = require('webpack-merge');
const base = require('./webpack.config.base.js');

process.env.NODE_ENV = "production";

const webpackConfig = merge(
base,
    {
        devtool: 'none',
        mode: 'production',
        output: {
            filename: 'public/js/[name].[chunkhash:8].js',
            chunkFilename: "public/js/chunk.[name].[chunkhash:8].js",
            path: path.resolve(__dirname, '../dist/client'),
            publicPath: '/'
        },
        stats: {
            children: false
        },
        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    parallel: true,
                    cache: true,
                    sourceMap: false
                }),
                new OptimizeCSSAssetsPlugin({})
            ],
            splitChunks: {
                chunks: "initial"
            }
        },
        plugins: [
            new CleanWebpackPlugin(['dist'], {
                root: path.resolve(__dirname, '../')
            }),
            new MiniCssExtractPlugin({
                filename: 'public/styles/[name].[contenthash:8].css',
                chunkFilename: 'public/styles/chunk.[name].[contenthash:8].css'
            })
        ]
    }
);
// 模块占用报告
if (process.env.npm_config_report) {
    webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;
