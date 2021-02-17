const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin =  require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js',
        album: './src/album.js'
    },
    output: {
        filename: '[name]-[hash].bundle.js',
        // filename: '[name]-[chunckhash].bundle.js',
        // filename: '[name]-[contenthash].bundle.js',
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        // 只有在生产环境中运行 webpack会认为不需要它自身的插件，而是用minimizer中的插件运行，所以要把原来的插件手动一起加进来
        minimizer: [
            new TerserWebpackPlugin(),
            new OptimizeCssAssetsWebpackPlugin()
        ]
    },
    devtool: 'source-map',
    devServer: {
        // hot: true
        // hotOnly: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    // 'style-loader', // 将样式通过 style 标注注入 
                    MiniCssExtractPlugin.loader, // 通过link标签去注入，如果样式文件体积不大则不需要提取，>150KB时考虑提取
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader',
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Multi Entry',
            template: './src/index.html',
            filename: 'index.html',
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            title: 'Multi Entry',
            template: './src/album.html',
            filename: 'album.html',
            chunks: ['album']
        }),
        new MiniCssExtractPlugin({
            filename: '[name]-[hash].bundle.css',
            // filename: '[name]-[chunckhash].bundle.js',
            // filename: '[name]-[contenthash:8].bundle.js',
        }),
        // new OptimizeCssAssetsWebpackPlugin() //在任何情况下都会工作
    ]
}