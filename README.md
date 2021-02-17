# fed-e-task-02-02
fed-e-task-02-02
一、简答题
1、Webpack 的构建流程主要有哪些环节？如果可以请尽可能详尽的描述 Webpack 打包的整个过程。
    答：环节:打包入口（js文件） ——> 根据import,export解析文件，形成依赖树 ——> 递归依赖树，找到每个节点的资源
             ——> 根据配置文件中的rules属性加载模块 ——> 将加载结果放入输出文件中实现项目的打包。
        其中：Loader机制是Webpack的核心。
        详细描述：在项目当中散落着各种各样的代码及资源文件，Webpack一般会根据配置找到其中的一个.js文件作为打包的入口，顺着入
                口文件中的代码， 根据import,export，require之类的语句解析推断出来文件所依赖的资源模块，接着分别去解析每一
                个资源模块对应的依赖，形成一个整个项目中文件与文件之间的依赖关系的依赖树，Webpack就可以递归这个依赖树，并找到每个节点所对应的资源文件，
				根据配置文件中的rules属性找到模块对应的加载器（Loader），交给加载器去加载对应的模块，最后将加载结果放入输出文件中实现项目的打包。

2、Loader 和 Plugin 有哪些不同？请描述一下开发 Loader 和 Plugin 的思路。
    答：不同：1.Loader 专注实现资源模块加载，loader描述了webpack如何处理非javascript模块，并且在bundle中引入这些依赖。
					loader的使用很简单：
						在webpack.config.js中指定loader。module.rules可以指定多个loader，对项目中的各个loader有个全局概览。
						loader是运行在NodeJS中，可以用options对象进行配置。plugin可以为loader带来更多特性。loader可以进行压缩，打包，语言翻译等等。
	            Plugin 目的在于解决loader无法实现的其他自动化工作，从打包优化和压缩，到重新定义环境变量，功能强大到可以用来处理各种各样的任务。
					   webpack提供了很多开箱即用的插件：CommonChunkPlugin主要用于提取第三方库和公共模块，
					   避免首屏加载的bundle文件，或者按需加载的bundle文件体积过大，导致加载时间过长，是一把优化的利器。
					   而在多页面应用中，更是能够为每个页面间的应用程序共享代码创建bundle。
              2.相比于Loader, Plugin拥有更宽的能力范围——Loader只在加载模块的环节工作，但是plugin可以触及到Webpack工作的每一个工作环节。
        思路：
            1.Loader 负责资源文件从输入到输出的转换, 对于同一个资源可以依次使用多个 Loader (工作管道)
			loader可以将文件从不同的语言（如TypeScript）转换为JavaScript，或者将内联图像转换为data URL。比如说：CSS-Loader，Style-Loader等。
            2.插件机制的工作原理：plugin通过钩子机制实现
              钩子机制: 通过在生命周期的钩子中挂载函数实现扩展，预设钩子，然后在上面挂在任务，
                         要求插件是一个函数或者是一个apply方法的对象， 把插件定义为一个类型，在这个类型上定义一个apply方法
                         使用时通过这个类型定义一个实例去使用

二、编程题
编程题 见CODE目录： https://github.com/chenli120/fed-e-task-02-02\code\vue-app-base
       视频演示目录：https://github.com/chenli120/fed-e-task-02-02\code\homework
1、使用 Webpack 实现 Vue 项目打包任务
具体任务及说明：

先下载任务的基础代码  百度网盘链接: https://pan.baidu.com/s/1pJl4k5KgyhD2xo8FZIms8Q 提取码: zrdd

这是一个使用 Vue CLI 创建出来的 Vue 项目基础结构

有所不同的是这里我移除掉了 vue-cli-service（包含 webpack 等工具的黑盒工具）

这里的要求就是直接使用 webpack 以及你所了解的周边工具、Loader、Plugin 还原这个项目的打包任务

尽可能的使用上所有你了解到的功能和特性

作业要求

本次作业中的编程题要求大家完成相应代码后（二选一）

1.  简单录制一个小视频介绍一下实现思路，并演示一下相关功能。

2.  提交一个项目说明文档，要求思路流程清晰。

最终将录制的视频或说明文档和代码统一提交至作业仓库。

