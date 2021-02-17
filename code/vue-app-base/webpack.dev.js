const path = require('path')
const dotenv = require('dotenv')
const webpack = require('webpack')
const common = require('./webpack.common.js')
const { merge } = require('webpack-merge')

const env = process.env.NODE_ENV || 'production'
dotenv.config({ path: '.env' + env }) // load .env.production
dotenv.config() //load .env

console.log('process',process)
const envs = Object.keys(process.env).reduce((e, i) => {
    if(i.startsWith('MY_')){
        e[i] = JSON.stringify(process.env[i])
        return e
    }
}, {})

console.log('process1',process)
console.log('env',env)
console.log('envs',envs)


module.exports = merge(common, {
    mode: 'development',
    devtool: 'source-map', // cheap-module-eval-source-map 速度快，能定位错误信息到行，在VUE框架下打包之后代码变化大， 虽然首次打包慢，但是重新打包快
    devServer: {
        open: true, // 自动打开浏览器
        hot: true, // 热更新
        // compress: true, // 启动gzip压缩
        // port: 3000, // 端口号
        // quiet:true
    },
    // 集中配置Webpack的优化功能
    // 手动开启Tree-Shaking
    optimization: {
        // // Webpack 提取公共模块 Split chunck
        // splitChunks: {
        //     chunks: 'all'
        // },
        // 副作用
        sideEffects: true,
        // 尽可能的将所有模块合并输出到一个函数中，既提升了运行效率，又减少了代码的体积
        concatenateModules: true,
        // usedExports 负责标记“枯树叶，枯树枝”
        // usedExports: true,
        // // minimize 负责“摇掉”它们
        // minimize: true,
    },
})