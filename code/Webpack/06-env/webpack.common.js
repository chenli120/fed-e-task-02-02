const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports =  {
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