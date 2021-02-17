const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')


// env: 通过CLI传递的环境参数
// argv： 运行cli时的所有参数
module.exports = (env, argv) => {
    const config = {
        mode: 'development',
        entry: './src/main.js',
        output: {
            filename: 'js/bundle.js',
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
                        'style-loader',
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
            new HtmlWebpackPlugin({
                title: 'Webpack Tuorial',
                // 模板路径
                template: './src/index.html'
            }),
            // new webpack.HotModuleReplacementPlugin()
        ]
    }
    if(env === 'production'){
        config.mode = 'production'
        config.devtool = false
        config.plugins = [
            ...config.plugins,
            new CleanWebpackPlugin(),
            new CopyWebpackPlugin({
                    patterns: [
                    // 'public/**'
                    'public'
                    ],
                }),
        ]
    }

    return config
}