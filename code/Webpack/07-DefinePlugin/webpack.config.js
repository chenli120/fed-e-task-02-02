const webpack = require('webpack')


module.exports = {
    mode: 'none',
    // ·DefinePlugin
    // entry: './src/main.js',
    // Tree-Shaking
    entry: './src/index.js',
    output: {
        filename: 'bundle.js'
    },
    // module: {
    //     rules: [
    //         {
    //             test: /.js$/,
    //             use: {
    //                 // 'babel-loader'
    //                 loader: 'babel-loader',
    //                 options: {
    //                     presets: [
    //                         // // 强制执行转换 将导致Tree-Shaking不能使用
    //                         // ['@babel/preset-env', { modules: 'commonjs' } ]
    //                         // 最新版本的babel支持Tree-Shaking使用，或者加上module: false确保其工作
    //                         ['@babel/preset-env', { modules: false } ]
    //                     ]
    //                 }
        
    //             }
                
    //         },
            
    //     ]
    // },    
    plugins: [
        new webpack.DefinePlugin({
            // API_BASE_URL: '"https://api.example.com"'
            API_BASE_URL: JSON.stringify('https://api.example.com')
        })
    ],
    // 集中配置Webpack的优化功能
    // 手动开启Tree-Shaking
    optimization: {
        sideEffects: true,
        // // usedExports 负责标记“枯树叶，枯树枝”
        // usedExports: true,
        // // 尽可能的将所有模块合并输出到一个函数中，既提升了运行效率，又减少了代码的体积
        // concatenateModules: true,
        // // minimize 负责“摇掉”它们
        // minimize: true,
    }
}