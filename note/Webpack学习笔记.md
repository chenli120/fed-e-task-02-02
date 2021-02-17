# 任务二：Webpack打包
## 1.模块打包工具的由来
    引用模块化产生的问题
        * 1.ESM存在环境兼容问题
        * 2.模块文件过多，网络请求频繁
        * 3.所有的前端资源都需要模块化（模块化之后的发散）
    需要的功能
        1.新特性代码编译功能-兼容
        2.模块化JS打包功能-频繁请求问题
        3.需要支持不同类型的前端资源（.html,.css,.jpg.....）

## 2.模块打包工具概要
    ·模块打包器（module bundler）—— 打包
    ·模块加载器 (Loader) —— 编译庄园
    ·代码拆分（Code Spiltting）——将应用中的代码按照需要打包 (文件大的问题)
        —— —— 将应用加载过程中初次运行的时候必须的模块单独打包到一起，把其他模块单独存放，等到应用工作中需要哪些模块采用异步加载这个模块，实现增量加载（渐进式加载）（文件太碎的问题）
    ·资源模块（Asset Module）—— 以模块化的模式载入任何文件
    ·**打包工具解决的是前端整体的模块化，并不单指JavaScript模块化**

## 3.Webpack快速上手
 ..\code\Webpack\00-case
 ·初始化
    yarn init --yes
 ·安装核心模块和CLI模块
    yarn add webpack webpack-cli --dev
 ·快速找到cli并运行
    yarn webpack --version
 ·打包
 ·yarn webpack
 ·更改html中的<script type="module" src="src/index.js"></script> 为<script src="dist/main.js"></script>
 ·yarn add serve
 ·yarn serve .
 ·package.json 中添加
    "scripts": {
        "build": "webpack"
    },
·yarn  build

## 4.Webpack配置文件
    ·支持0配置： `src/index.js` -> `dist/main.js`
    ·自定义配置 
    ..\code\Webpack\01-case
        项目根目录下面添加 webpack.config.js 文件


## 5.Webpack 工作模式
    针对于不同环境的几种预设的配置  
    1.命令参数：yarn webpack --mode production/development/none
    2.配置文件参数: mode:'production/development/none'

## 6.Webpack 打包结果运行原理
    mode: 'none',
    ctrl+k
    ctrl+0
    G:\fed-task-02-02\code\Webpack\01-case\output\bundle.js
    
## 7.Webpack 资源模块加载
   js file -->default Loader --> Bundle.js (webpack默认只加载Js文件)
   other file --> Other Loader --> Bundle.js （其他文件需要安装对应的loader）
  1.css
    yarn add css-loader --dev
    yarn add style-loader --dev 将CSS转换的结果用style标签追加到页面上行
  ·Loader是Webpack的核心特性，借助于Loader就可以加载任何类型的资源
    

## 8.Webpack 导入资源模块
    打包入口 -> 运行入口
    JavaScript 驱动整个前端应用的业务
    main.js ---import---->css
    根据代码的需要动态导入资源，需要资源的不是应用，而是代码
    **JavaScript 驱动整个前端应用**
        ·逻辑合理，JS确实需要这些资源文件
        ·确保上线资源不缺失，都是必要的
    **新事物的思想才是突破点**

## 9.Webpack 文件资源加载器
    yarn add file-loader --dev
    图片、字体等资源文件 ---File Loader--> 图片、字体等资源文件--->Bundle.js

## 10.Webpack URL加载器
    Data URLs 与 url-loader
    ·Data URLs：是一种特殊的协议，可以直接表示一个文件,当前URL直接表示文件内容，不需要发送HTTP请求
        data:[<mediatype>][;base64],<data>
        data：协议
        [<mediatype>][;base64]：媒体类型和编码
        <data>：文件内容
        ·例如： data:text/html;charset=UTF-8,<h1>html content</h1>
                data:image/png;base64,ivBOR...（图片的base64编码）
        ·打包：
            yarn add url-loader --dev
        **小文件使用Data URLs，减少请求次数 url-loader**
        **大文件单独提取存放，提高加载速度 file-loader**

## 11.Webpack 常用加载器分类
    ·编译转换类：把加载到的资源模块转换为JavaScript代码，css-loader
    ·文件操作类：把加载到的资源模块拷贝到输出的目录，同时将文件的访问路径向外导出，file-loader
    ·代码检查类：对我们所加载的资源文件一般是代码进行校验，目的是统一代码风格，提高代码质量，一般不会修改生产环境的代码

    
## 12.Webpack 处理ES2015
    因为模块打包需要，所以处理import和export
    ·需要编译转换：babel-loader
        ·安装
            yarn add babel-loader @babel/core @babel/preset-env --dev
        ·配置babel需要的插件
    **总结**
        ·Webpack 只是打包工具
        ·加载器可以用来编译转换代码
    
## 13.Webpack 加载资源的方式
    ·Webpack模块加载方式(不要混合，一个项目用一种就行了)：
        1.遵循 ES Modules 标准的 import 声明
        2.遵循 CommonJS 标准的 require 函数
        3.遵循 AMD 标准的 define 函数和 require 函数
          4.Loader 加载的非 JavaScript 也会触发资源加载
            *样式代码中的 @import 指令 和 url 函数
            *HTML 代码中图片标签中的 src 属性
                yarn add html-loader --dev

    
## 14.Webpack 核心工作原理
    打包入口（js文件） ——> 根据import,export解析文件，形成依赖树 ——> 递归依赖树，找到每个节点的资源 ——> 根据配置文件中的rules属性加载模块 ——> 将加载结果放入输出文件中实现项目的打包
    **Loader机制是Webpack的核心**
    
## 15.开发一个 Loader
    markdown-loader
    Loader 负责资源文件从输入到输出的转换, 对于同一个资源可以依次使用多个 Loader (工作管道)


 **16.Webpack 插件机制**
    **插件机制是Webpack的另一个核心**
    ·Loader 专注实现资源模块加载
    ·Plugin 解决其他自动化工作
        G:\fed-task-02-02\code\Webpack\01-case
        ·eg: 1.清除dist目录 yarn add clean-webpack-plugin --dev
             2.拷贝静态文件至输出目录
             3.压缩输出的代码
    ·Webpack + Plugin


**17.Webpack 自动生成HTML插件**
    yarn add html-webpack-plugin --dev
    自动生成使用打包结果(bundle.js)的HTML
        ·硬编码的问题
            1.发布的时候需要同时发布src/index.html和dist下面的文件，相对比较麻烦
            2.上线过后还要确保src/index.html中的引用路径都是正确的
              如果输出的目录或者文件名发生改变，打包结果的配置发生了变化，src/index.html中script中的引用路径需要手动更改
        ·通过Webpack输出HTML文件
            自动生成HTML文件，让HTMl文件参与到构建过程，在构建过程中Webpack知道生成了多少个bundle,会自动将打包的bundle添加到页面当中
              1.html也输出到了dist目录中
              2.html中对于bundle的引用时通过注入，避免硬编码，确保路径的应用是正确的
    **使用总结**
        ·copy-webpack-plugin

        
**18.Webpack 开发一个插件**
    相比于Loader, Plugin拥有更宽的能力范围——Loader只在加载模块的环节工作，但是plugin可以触及到Webpack工作的每一个工作环节
    **插件机制的工作原理：plugin通过钩子机制实现**
        钩子机制: 通过在生命周期的钩子中挂载函数实现扩展，预设钩子，然后在上面挂在任务，
            api:webpack.js.org/api/compiler-hooks/
        webpack要求插件是一个函数或者是一个apply方法的对象， 把插件定义为一个类型，在这个类型上定义一个apply方法
        使用时通过这个类型定义一个实例去使用
        
**19.Webpack 开发体验问题**
    原始方式（效率低下）：编写源代码-->WEBPACK打包-->运行应用-->刷新浏览器、
    设想:
        1.以HTTP Server运行 yarn dev
        2.自动编译 + 自动刷新
        3.提供Source Map 支持，快速定位错误位置
    
**如何增强Webpack开发体验**
    **webpack 自动编译**
        watch 工作模式： 监听文件变化，自动重新打包
        yarn webpack --watch 
    **webpack 自动刷新**
        BrowserSync:操作比较麻烦，需要运行两个工具；效率降低了，多出了磁盘操作
        browser-sync dist --file "**/*"     
    **webpack Dev Server**
        ·安装与运行
            yarn add webpack-dev-server --dev
            yarn webpack-dev-server
            yarn webpack-dev-server --open
        ·静态资源访问
            Dev Server 默认只会serve打包输出
            只要 Webpack 输出的文件都可以被正常访问到，其他静态资源也需要 serve
            添加一个配置
        ·代理 API 服务
            开发阶段接口跨域请求问题
                跨域资源共享（CORS）:但是使用CORS的前提是API必须支持，并不是任何情况下API都应该支持(例如同源部署)
                API 服务器    <---跨域问题---   浏览器

                API 服务器  <---代理请求---- 开发服务器 <---API请求---   浏览器
        ·webpack Dev Server支持配置代理
            目标：将GitHub API 代理到开发服务器




**20.Source Map 介绍**
    ·构建编译的问题：
        1.运行代码与源代码之间完全不同，如果调需要试应用，错误信息无法定位
            原因：调试和报错都是基于转换过过后运行代码
    ·Source Map：源代码地图，映射源代码和转换之后的代码之间的关系，可以逆向解析得到源代码
            解决了源代码与运行代码不一致所产生的问题
    ·Webpack 配置 Source Map
        ·Webpack支持12种Source Map， 每种方式的效率和效果各不相同
        1.eval模式： JS中的函数，可以运行字符串中的JS代码，默认运行在临时的虚拟机环境中
            只能定位文件，不会生成 Source Map文件，构建速度最快，不能获取具体行列信息
            eval(`console.log(123)`)
            eval(`console.log(123)`) //# sourceURL=./foo/bar.js
    ·Webpack devtool 模式对比
        1.eval:
        2.eval-source-map:定位到文件，行和列，生成了source-map
        3.cheap-eval-source-map:阉割版source-map，生成了source-map，能定位到行，但是不能到列
                               ，定位代码与编译过后的代码一样
        4.cheap-model-eval-source-map:只能定位到行，定位代码与编写的源代码一样
        5.inline-source-map:source-map使用dataUrl嵌入代码中，不好用
        6.hidden-source-map:生成source-map文件，但在代码中没有引入，开发第三方包的时候用比较好
        7.nosource-source-map:没有源代码，但是提供了行列信息，为了在生产环境保护源代码不被暴露
    ·模式特点
        1. eval - 是否使用 eval 执行模块代码
        2. cheap-Source Map 是否包含行信息
        3. module -是否能够得到 Loader 处理之前的源代码
    ·选择适合的Source Map 
        ·开发模式：cheap-model-eval-source-map
            1.每行代码不超过80个字符，不需要定位到列
            2.使用框架比较多，经过Loader转换过后的差异较大
            3.首次打包速度慢无所谓，重写打包相对较快
        ·生产模式：nosource-source-map
            1.Source Map会暴露源代码
            2.调试代码应该是开发阶段完成的事情，在开发阶段将所有问题和错误尽量解决
         

**21.Webpack 自动刷新**
    ·自动刷新的问题：在页面中改变的状态随自动刷新会丢失
    ·小办法：1.代码中写死编辑器的内容
            2.额外代码实现刷新钱保存，刷新后速去
        弊端：没有解决自动刷新导致的页面状态丢失的核心问题

    ·如何在页面不刷新的前提下，更新代码------HMR
    ·Webpack HMR 体验
        模块热替换(Hot Module Replacement): 应用运行过程中实时替换某个模块,应用运行状态不收影响，
                    自动刷新导致页面状态丢失，热替换只将修改的模块实时替换至应用中。
            热拔插: 在一个正在运行的机器上随时插拔设备
        HMR 是 Webpack 中最强大的功能之一，极大程度的提高了开发者的工作效率
    ·Webpack 开启 HMR
        1. 集成在了 webpack-dev-server中
            运行命名： webpack-dev-server中 --hot
        2.也可以通过配置文件开启  G:\fed-task-02-02\code\Webpack\04-HMR
    ·Webpack HMR 的疑问
        Webpack 中的 HMR并不可以开箱即用，Webpack 中的 HMR 需要手动处理模块热替换逻辑
            Q1.为什么样式文件的热更新开箱即用？
                样式文件经过loader处理了
            Q2.凭什么样式可以自动处理？
                样式模块更新过后，只需要将更新的CSS更新到页面就可以了，但是js文件的更新是毫无根据的。
            Q3.我的项目没有手动处理，JS照样可以热替换。
                框架下的开发，每个文件都是有规律的。通过脚手架创建的项目内部都集成了HMR方案
            总结：我们需要手动处理JS模块更新后的热替换
    ·Webpack 使用 HMR API
        G:\fed-task-02-02\code\Webpack\04-HMR\src\main.js
        两个参数： 路径，处理函数
        module.hot.accept('./editor', () => {
            console.log('editor 模块更新了， 需要这里手动处理热替换逻辑')
        })
    ·Webpack 处理 JS 模块热替换
        G:\fed-task-02-02\code\Webpack\04-HMR\src\main.js
    ·Webpack 处理图片模块热替换
        G:\fed-task-02-02\code\Webpack\04-HMR\src\main.js
    ·Webpack HMR 注意事项
        1.处理 HMR 的代码报错会导致自动刷新 --HOT ONLY
        2.没启用 HMR 的情况下， HMR API 报错 --if(module.hot){}
        3.代码中多了一些与业务无关的代码
            --打包只会生成 if(false){} 在压缩过程中会被去掉



**22.Webpack 生产环境优化**
    ·生产环境与开发环境不同，生产环境注重运行效率，开发环境注重开发效率
        --模式（mode）： 为不同工作环境创建不同的配置
    ·不同环境下的配置 G:\fed-task-02-02\code\Webpack\05-Better
        1.配置文件根据环境不同导出不同配置：只适应中小型项目
            返回生产环境：yarn webpack --env production
        2.一个环境对应一个配置文件
            G:\fed-task-02-02\code\Webpack\06-env
            // yarn add webpack-merge --dev
            // yarn webpack --config webpack.prod.js
    ·DefinePlugin 插件: 为代码注入全局成员  G:\fed-task-02-02\code\Webpack\07-DefinePlugin
        在production模式下默认启动这个插件，并往代码中注入了process.env.NODE_ENV ，通过判断这个条件是否存在 决定是否打印日志等。
        —— —— process.env.NODE_ENV : 这个常量，判断当前环境
    ·Webpack 体验 Tree Shaking  G:\fed-task-02-02\code\Webpack\07-DefinePlugin
        1.Tree-Shaking:(摇掉)代码中未引用部分，未引用代码（dead code）,去掉冗余代码,在生产模式自动开启
        2.Tree-Shaking的使用：
            Tree-Shaking不是指某个配置选项，而是一组功能搭配使用后的优化效果,在生产模式自动开启
            工作过程与优化功能：
                    // 集中配置Webpack的优化功能
                    // 手动开启Tree-Shaking
                    optimization: {
                        // usedExports 负责标记“枯树叶，枯树枝”
                        usedExports: true,
                        // minimize 负责“摇掉”它们
                        minimize: true
                    }
    ·Webpack 合并模块：Scope Hoistion(concatenateModules)--作用域提升
        普通打包结果将每一个模块放在一个单独的函数中，如果模块很多，则模块函数也会很多
        concatenateModules:尽可能的将所有模块合并输出到一个函数中，既提升了运行效率，又减少了代码的体积
    ·Tree-Shaking & Babel
        Tree-Shaking 前提是 ES Module, 也就是说由 Webpack 打包的代码必须使用 ESM
        为了转换代码中的ECMAScript新特性，Bable-Loader:ES Module->CommonJS
    ·Webpack sideEffects（副作用）
        允许我们通过配置的方式去标识我们代码是否有副作用，从而使 Tree-Shaking 有更大的压缩空间
        副作用：模块执行时除了导出成员之外所作的事情
        sideEffects 一般用于 npm 包标记是否有副作用
            ·配置
                1.webpack.config.js中开启功能
                2.package.json中加入 "sideEffects": false：用于标识代码没有副作用
            ·注意事项
                1.确保你的代码真的没有副作用，否则就会误删有副作用的代码



**23.Webpack 代码分割**
    Code Splitting (代码分包/代码分割)
    ·通过 Webpack 整体模块化的弊端：所有代码最终都被打包到一起，应用复杂模块很多的时候会导致bundle体积过大，并不是每个模块在启动时都是必要的，浪费流量和带宽
    ·HTTP1.1的缺陷：
        1.同域并行请求限制
        2.每次请求都会有一定的延迟
        3.请求的Header浪费带宽流量
    ·模块打包是必要的，但是应用变大后需要变通
    ·分包，按需加载
        ·通过把模块按照我们设计的规则打包到不同的BUNDLE中，从而提高应用的响应速度
        ·分包方式
            1.多入口打包
            2.动态导入
    **多入口打包 multi entry**
        适用于多页应用程序，一个页面对应一个打包入口，公共部分单独提取
        问题：不同入口肯定会有公共模块,在不同的打包结果中有相同的模块出现
    **Webpack 提取公共模块 Split chunck**
        optimization: {
            splitChunks: {
                chunks: 'all'
            }
        },
    **Webpack 动态导入(Dynamic import)**
        G:\fed-task-02-02\code\Webpack\08-CodeSpliting\DynamicImport.js
        按需加载：应用运行过程中，需要用到某个模块式，再加载这个模块，可以极大节省带宽和流量
        动态导入：动态导入的模块会被自动分包，让模块实现分包和按需加载，提高应用内反映速度
        import('./posts/posts').then(({default:posts}) => {
            mainElement.appendChild(posts())
        } )
    **Webpack 魔法注释(Magic Comments)**
        G:\fed-task-02-02\code\Webpack\08-CodeSpliting\DynamicImport.js
        webpackChunkName不同，就会产生不同的结果，但是文件名如果名字一样则会打包到同一个文件中
        import(/* webpackChunkName: 'posts'*/'./posts').then(({default:posts}) => {
            mainElement.appendChild(posts())
        })
    **Webpack MiniCssExtractPlugin**
      提取CSS到单个文件
      yarn add mini-css-extract-plugin --dev
      小问题： yarn webpack --mode production
              生产环境自动压缩，但是只压缩JS文件，其他类型的文件压缩需要额外的压缩插件去完成
    **Webpack OptimizeCssAssetsWebpackPlugin**
      压缩输出的CSS文件
      yarn add optimize-css-assets-webpack-plugin --dev
    **输出文件名 Hask**
        substitutions
        部署前端的资源文件时，都会启用浏览器的静态资源缓存，对于用户的浏览器而言，就可以缓存住应用中的静态资源，后续不用再请求服务器获取这些静态资源，响应速度很快。
        静态资源缓存问题：
            缓存失效时间设置太短：效果不明显
            缓存失效时间设置太长：导致应用发生更新，重新部署过后，没有办法即时更新到客户端
        -->生产模式下，文件名使用Hash,一旦资源文件发生改变，文件名称改变，对于客户端而言，全新的文件名就是全新的请求，可以将缓存失效时间设置很长，而不会产生问题

        
    HTTP协议：
    收发数据
    HEAD: 附件--类型text-css, 资源的缓存时长, 生存周期
    DATA: 
    apache

    在项目下添加nginx
    HTTPS server
    server 相当于一个网址,代理服务器
    server{
        location / 
    }
    
                                              
