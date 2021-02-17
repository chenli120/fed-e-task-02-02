# vue-app-base

1. 这是一个使用 Vue CLI 创建出来的 Vue 项目基础结构
2. 有所不同的是这里我移除掉了 vue-cli-service（包含 webpack 等工具的黑盒工具）
3. 这里的要求就是直接使用 webpack 以及你所了解的周边工具、Loader、Plugin 还原这个项目的打包任务
4. 尽可能的使用上所有你了解到的功能和特性



步骤：
        使用 Webpack 实现 Vue 项目打包任务：
1.定义打包的输入与输出
    entry:打包的入口文件
	output:{
		path: 打包的目标根目录
		filename：打包的目标输出文件，可以加分类文件夹也可以直接放在path下面
	}
2.安装webpack和webpack-cli:  npm i webpack webpack-cli --save-dev
  安装ESlint:npm i eslint --save-dev  查看版本 (cd .\node_modules\.bin\) .\eslint --version  npx eslint --version
3.配置loader和plugins:
	1)安装less-loader将less样式文件编译成js模块，同时安装styles-loader将样式文件加到style中
	2)
	  npm i vue-loader --save-dev
	  npm i vue-template-compiler --save-dev
	  单文件特殊语法处理： npm i vue-template-compiler --save-dev
	3) npm i css-loader style-loader --save-dev
	4) npm i url-loader --save-dev  与file-loader的区别是可以把一些小图片转换成base64的格式，能提高代码效率
	   npm i file-loader --save-dev
	5）npm i html-loader  --save-dev 
	   npm i html-webpack-plugin dotenv --save-dev
	   npm i clean-webpack-plugin  --save-dev
	   npm i webpack-dev-server --save-dev   
			执行npm run serve 报错 要更改webpack-cli的版本卸载当前的 webpack-cli npm uninstall webpack-cli
								   安装 webpack-cli 3.* 版本 npm install webpack-cli@3 -D
  4.运行结果