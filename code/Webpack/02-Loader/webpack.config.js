const path = require('path')

module.exports = {
    mode: 'none',
    // ./不能省略
    entry: './src/main.js',
    // // ./不能省略
    // entry: './src/main.css',
    // 输出文件位置
    output: {
        filename: 'bundle.js',
        // 需要时一个绝对路径
        // path: path.join(__dirname, 'output')
        path: path.join(__dirname, 'dist'),
        // 定义资源路径，/不能省略
        publicPath: 'dist/'
    },
    // 其他资源的加载属性
    module: {
        rules: [
            {
                test: /.md$/,
                // use: {
                //     loader: './markdown-loader'
                // }
                use: [ 
                        'html-loader',
                        './markdown-loader'
                ],
                
            }
        ]
    }
}