任务一：模块化开发
**1.模块化概述**
    是当下最重要的前端开发范式之一
    一种代码组织方式，通过把复杂代码按照不同的功能划分为不同的模块单独维护，提高开发效率，较低维护成本
    模块化只是一种思想
    ·内容概要
        1.模块化演变过程
        2.模块化规范
        3.常用的模块化打包工具
        4.基于模块化工具构建现代Web应用
        5.基于模块化工具构建现代Web应用
        6.打包工具的优化技巧



**2.模块化的演进过程**
    ·早期在没有工具和规范的情况下对模块化的落地方式有如下三个阶段
    stage1:文件划分方式:每个文件是一个模块，
            污染全局作用域
            命名冲突问题
            无法管理模块依赖关系
            早期模块化完全依靠约定
    stage1:命名空间方式：每个模块只暴露一个全局对象，模块内容挂载在这个对象里面
            减小命名冲突，但是模块仍然没有私有空间，依赖关系无法管理
    stage1:IIFE---立即执行函数为模块提供私有空间：将模块放在函数中，私有化了
            确保私有变量的安全性，利用自执行函数的参数作为依赖声明去使用，使依赖关系得到管理



**3.模块化规范的出现**
    ·以上方式以原始模块系统为基础，通过约定，不同开发者实现方式不同，统一不同开发者和不同项目之前的差异，需要一个标准规定模块化的实现方式
    ·针对模块加载的方式通过script引入，模块不受代码控制，不利于维护
    -->模块化的标准 + 模块加载器
       1. CommonJS规范（nodejs）
            1).一个文件就是一个模块
            2).每个模块都有单独的作用域
            3).通过module.export导出成员
            4).通过require函数载入模块
         以同步模式加载模块，浏览器端加载效率低下（AMD）
       2.AMD规范(Asynchronous Module Definition)--异步定义规范
         Require.js库
         约定每个模块通过define关键字定义，用require载入一个模块
         目前绝大多数第三方库都支持AMD规范
            ·AMD使用相对复杂
            ·模块JS文件请求频繁
       3.sea.js + CMD 通用模块规范 后被Require.js兼容了


**4.模块化标准规范**
    模块化的最佳实践
    ES Modules (浏览器Browers) + CommonJS（nodejs）
    ES Modules:ES2015定义---最主流的前端模块化规范

**5.ES Modules 特性**
    基本特性
        <!-- 通过给 script 添加 type = module 的属性，就可以以 ES Module  的标准执行其中的 JS 代码了 -->
        1. ESM 自动采用严格模式， 忽略 'use strict', 不能再全局范围直接使用this, 非严格模式下this指向全局对象
        2. 每个 ES Module 都是运行在单独的私有作用域中
        3. ESM 是通过 CORS 的方式请求外部 JS 模块的 （跨域的错误）
        4. ESM 的 script 标签会延迟执行脚本
    兼容性问题


**6.ES Modules 导入，导出**
    ·导入-import
    ·导出-export  见../code/ESM/02-export
        使用 Browser sync 监视热更新
        browser-sync . --files **/*.js
        // --files 路径是相对于运行该命令的项目（目录） 
        browser-sync start --server --files **/*.js
    ·导入导出注意事项 
        export:
        import: 1.引用文件的路径
                    ·必须要有完整的文件名称
                    ·相对路径不能省略./
                    ·可以用绝对路径，或者完整URL
                        import {} from '/02-export/app.js'
                        import {} from 'http://localhost:3000/02-export/app.js'
                2.只执行/加载某个模块，而不提取模块里面的成员，提取外界不需要控制的子功能模块
                    ·import {} from './app.js' 
                    ·import './app.js' 
                3.导出的模块成员特别多，而且导入时都会用到他们，通过AS将所有成员放到一个对象中，每个成员都会成为对象的属性
                    import * as mod from './app.js'
                4.动态导入模块：
                   使用导入模块时，IMPORT可以理解为导入模块的声明，在开发阶段就明确文件模块的路径，需要在文件最顶层导入
                    ·在开发阶段才知道路径，在某些条件满足的情况下才能导入时需要动态导入
                        import('./app.js')返回的是一个promise
                        import('./app.js').then(function (module) {
                            console.log(module)
                        })
                5.如果在一个模块中同时导入命名成员，和一个默认成员
                     ·import {name, age, default as title} from './app.js' 
                     == import title, {name, age } from './app.js'  默认成员放{}左边，可以起任意名称
    ·导入导出成员
        export {name, age, default as title} from './app.js' 
        在导入的文件下直接导出模块的成员，在当前作用下不能使用这些成员，可以组织一些散落的组件

        
**7.ES Modules 浏览器环境 Polyfill**
    ES Modules in Brower —— ——Polyfill兼容方案（生产阶段不支持，开发阶段可以使用，因为在运行阶段动态解析脚本，消耗的资源特别大）
    —— ——（原理：用babel转换浏览器不识别的ES Module,对于需要import的文件用AJAX导入再用babel转换这些文件）
    ·将文件引入到页面中 https://unpkg.com/browse/browser-es-module-loader@0.4.1/dist/
        
**8.ES Modules in Node.js 支持情况**
    ·运行
        cjs——commomJS
        esm —— node的版本大于8,是一个实验特性，暂时不要在生产环境使用
        使用步骤
            1.cd 到使用文件路径: cd code/ESM/05-esm-suport
            2.运行命令执行文件： node --experimental-modules index.mjs
    ·与CommonJS模块交互 code/ESM/06-interoperability
        node --experimental-modules es-module.mjs
        · ES Modules 中可以导入 CommonJS 模块
        · CommonJS 中不能导入ES Modules 模块
        · CommonJS 始终只会导出一个默认成员
        · 注意 import 不是解构导出对象
    ·与CommonJS模块的差异 code/ESM/07-differences
    ·ES Modules in Node.js =新版本进一步支持 code/ESM/08-new-version
        在package.json中加了"type": "module"之后，文件都是按照ESM规范，文件后缀名改为.js，
        如果想在这种情况下使用CommonJS规范则需要将文件后缀改为.cjs
    ·ES Modules in Node.js - Babel兼容方案 code/ESM/09-babel
        yarn add @babel/node @babel/core @babel/preset-env --dev
        node -v v8.0.0
        yarn babel-node
        yarn babel-node .\index.js  --报错，因为Babel实现ESM的模块需要对应的插件
        preset-env 包含了所有ESM中的新特性
        1.yarn babel-node .\index.js --presets=@babel/preset-env
        2. 添加.babelrc文件，添加"presets":["@babel/preset-env"]
        3.用插件
         yarn remove @babel/preset-env
         yarn add @babel/plugin-transform-modules-commonjs --dev




