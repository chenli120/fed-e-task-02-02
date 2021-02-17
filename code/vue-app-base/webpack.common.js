const path = require('path')
const dotenv = require('dotenv')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const env = process.env.NODE_ENV || 'production'
dotenv.config({ path: '.env' + env }) // load .env.production
dotenv.config() //load .env

const envs = Object.keys(process.env).reduce((e, i) => {
    if(i.startsWith('MY_')){
        e[i] = JSON.stringify(process.env[i])
        return e
    }
}, {})

// console.log('envs',envs)

// 开发一个插件：删除bundle.js中的注释
class MyPlugin {
    apply (compiler) {
        console.log('MyPlugin 启动')

        compiler.hooks.emit.tap('MyPlugin', compilation => {
            // compilation => 可以理解为此次打包的上下文
            // compilation.assets
            for (const name in compilation.assets) {
                // console.log(name) //键
                // console.log(compilation.assets[name].source()) // 值中的source()方法获取文件的内容
                if(name.endsWith('.js')) {
                    const contents = compilation.assets[name].source()
                    const withoutComments = contents.replace(/\/\*\*+\*\//g, '')
                    compilation.assets[name] = {
                        source: () => withoutComments,
                        size: () => withoutComments.length
                    }
                }
            }
        })
    }
}


// @type 是jsdoc
// {import{'webpack'}.confuguration} 是ts
/**@type {import{'webpack'}.confuguration} */
module.exports = {
    mode: 'none',
    // ./不能省略
    entry: './src/main.js',
    // 输出文件位置
    output: {
        path: path.join(__dirname, 'dist'),
        // 定义一个文件名放置打包结果  定义一个指纹：contenthash 根据文件内容确定
        filename: 'js/bundle.[contenthash:6].js'
    },
    // 其他资源的加载属性
    module: {
        rules: [
            {
                test: /\.css$/,
                // 从后往前执行 , 管道执行
                use: [ 'style-loader', 'css-loader' ]
                
            },
            {
                test: /\.less$/,
                // 从后往前执行 , 管道执行
                use: [ 'style-loader', 'css-loader', 'less-loader']
                
            },
            {
                test: /\.vue$/,
                // 从后往前执行
                use: 'vue-loader'                 
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                // 从后往前执行
                use: {
                    // 'file-loader'                    
                    // 'url-loader'
                    loader: 'url-loader',
                    options: {
                        name:'img/[name].[contenthash:6].[ext]',
                        esModule:false, // 不以esModule模式输出
                        limit: 10 * 1024 // 10 KB 小于10kb用url-loader加载，大于的用file-loader加载 两个模块都要添加
                    }

                }  
            },
            // {test:/\.(png|jpeg|jpg|ttf|gif)/,loader:'file-loader'} 
            /**
             * HtmlWebpackPlugin内部会把HTML那个模板文件交给一个默认的loader去处理，
             * 而如果说你给HTML配置了loader的话，那它内置的那个loader就不会生效
             * 内置loader的作用，是一个ejs的模板引擎，所以才会走那些什么环境变量渲染之类的东西。
             * 所以如果一定要用到html-loader，应该给HtmlWebpackPlugin的模板文件，用一个特殊的扩展名，比如说用.ejs的扩展名，不要用HTML这样扩展名选择冲突。
             */
            // {
            //     test: /\.html$/,
            //     use: 'html-loader'
                // use: {
                //     loader: 'html-loader',
                    // options: {
                    //     // attrs: ['img:src', 'a:href']
                    //     attributes: {
                    //         list: [
                    //             {
                    //                 tag: 'img',
                    //                 attribute: 'src',
                    //                 type: 'src',
                    //             },
                    //             {
                    //                 tag: 'a',
                    //                 attribute: 'href',
                    //                 type: 'src',
                    //             }
                    //         ]
                    //     }
                    // }

                // }  
            // }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
        // 用于生成 index.html
        new HtmlWebpackPlugin({
            title: 'vue Webpack Plugin Sample',
            // 模板路径
            template: './public/index.html',
        }),
        new webpack.DefinePlugin({
            BASE_URL:'"/"',
            'process.env':  {
                NODE_ENV: '"production"'
              }
        }),
        new MyPlugin()
    ]
}

