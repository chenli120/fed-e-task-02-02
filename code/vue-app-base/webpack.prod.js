const path = require('path')
const common = require('./webpack.common.js')
const { merge } = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')


// yarn add webpack-merge --dev
// yarn webpack --config webpack.prod.js
module.exports = merge(common, {
    mode: 'production',
    // devtool: 'nosources-source-map',  // 没有源代码，但是提供了行列信息，为了在生产环境保护源代码不被暴露
    // plugins: [
    //     new CopyWebpackPlugin({
    //         patterns: [
    //         // 'public/**'
    //         'public'
    //         ],
    //     }),
    // ],

    // 集中配置Webpack的优化功能
    // 手动开启Tree-Shaking
    optimization: {
        // Webpack 提取公共模块 Split chunck
        splitChunks: {
            chunks: 'all'
        },
        // 副作用
        sideEffects: true,
        // usedExports 负责标记“枯树叶，枯树枝”
        usedExports: true,
        // 尽可能的将所有模块合并输出到一个函数中，既提升了运行效率，又减少了代码的体积
        concatenateModules: true,
        // minimize 负责“摇掉”它们
        minimize: true,
    }
})

// // Object.assign 第三个参数完全覆盖之前的属性, 不适用于需要的合并的数据
// module.exports = Object.assign({}, common, {
//     mode: 'production',
//     plugins:[
//     new CleanWebpackPlugin(),
//     new CopyWebpackPlugin({
//             patterns: [
//             // 'public/**'
//             'public'
//             ],
//         }),
//     ]
// })


