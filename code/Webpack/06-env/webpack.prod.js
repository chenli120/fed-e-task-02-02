const common = require('./webpack.common.js')
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')


// yarn add webpack-merge --dev
// yarn webpack --config webpack.prod.js
module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
            // 'public/**'
            'public'
            ],
        }),
    ]
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


