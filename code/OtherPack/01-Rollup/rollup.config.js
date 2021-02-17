import json from 'rollup-plugin-json'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default {
    // // 单入口打包
    // input: 'src/index.js',
    // 多入口打包
    // input: ['src/index.js','src/album.js'],
    input: {
        foo: 'src/index.js',
        bar: 'src/album.js'
    },
    output: {
        // 输出单个文件
        // file: 'dist/bundle.js',
        // format: 'iife'
        // 只设置目录可以输出多个文件
        dir: 'dist',
        format: 'amd'
    },
    plugins: [
        json(),
        resolve(),
        commonjs()
    ]
}