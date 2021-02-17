const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')


// 开发一个插件：删除bundle.js中的注释
class MyPlugin {
    apply (compiler) {
        console.log('MyPlugin 启动')

        compiler.hooks.emit.tap('MyPlugin', compilation => {
            // compilation => 可以理解为此次打包的上下文
            // compilation.assets
            for (const name in compilation.assets) {
                // console.log(name) //键
                console.log(compilation.assets[name].source()) // 值中的source()方法获取文件的内容
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
        // // 定义资源路径，/不能省略
        // publicPath: 'dist/'
    },
    // devtool: 'source-map',
    devtool: 'eval',
    devServer: {
        // contentBase 额外为开发服务器指定查找资源目录 
        // contentBase: './pulic',
        contentBase: ['./pulic'],
        // api代理
        proxy: {
            '/api': {
                // http://localhost:8080/api/users -> https://api.github.com/api/users
                target: 'https://api.github.com',
                // http://localhost:8080/api/users -> https://api.github.com/users
                pathRewrite: {
                    '^/api': ''
                },
                // 不能使用 localhost:8080 作为请求 GitHub 的主机名
                changeOrigin: true
            }
        }
    },
    // 其他资源的加载属性
    module: {
        rules: [
            // {
            //     test: /.js$/,
            //     use: {
            //         // 'babel-loader'
            //         loader: 'babel-loader',
            //         options: {
            //             presets: ['@babel/preset-env']
            //         }

            //     }
                
            // },
            {
                test: /.css$/,
                // 从后往前执行
                use: [
                    'style-loader',
                    'css-loader'
                ]
                
            },
            {
                test: /.png$/,
                // 从后往前执行
                use: {
                    // 'file-loader'                    
                    // 'url-loader'
                    loader: 'url-loader',
                    options: {
                        limit: 10 * 1024 // 10 KB 小于10kb用url-loader加载，大于的用file-loader加载 两个模块都要添加
                    }

                }  
            },
            // {test:/\.(png|jpeg|jpg|ttf|gif)/,loader:'file-loader'}
            {
                test: /.html$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        // attrs: ['img:src', 'a:href']
                        attributes: {
                            list: [
                                {
                                    tag: 'img',
                                    attribute: 'src',
                                    type: 'src',
                                },
                                {
                                    tag: 'a',
                                    attribute: 'href',
                                    type: 'src',
                                }
                            ]
                        }
                    }

                }  
            },
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
    },
    plugins: [
        new CleanWebpackPlugin(),
        // 用于生成 index.html
        new HtmlWebpackPlugin({
            title: 'Webpack Plugin Sample',
            meta: {
                viewport: 'width=device-width'
            },
            // 模板路径
            template: './src/index.html'
        }),
        // 用于生成 about.html
        new HtmlWebpackPlugin({
            filename: 'about.html'
        }),
        // // 开发阶段最好不要使用这个插件，开销太大
        // new CopyWebpackPlugin({
        //     patterns: [
        //     // 'public/**'
        //     'public'
        //     ],
        // }),
        new MyPlugin()
    ]
}