module.exports = {
  // 标记运行环境 全局环境 变量 判断是否为全局对象成员 可以定义多个
  env: {
    browser: true,
    es2020: true
  },
  // 继承配置
  extends: [
    'standard',
    'plugin:react/recommended'
  ],
  // 设置语法显示器 控制是否使用某一个版本的ES语言, 只是检测语法是否可用,而不代表某成员是否可用（env）
  parserOptions: {
    ecmaVersion: 11
  },
  rules: {
    // 设置eslint中某个校验规则的开启或者关闭
    // off:关闭
    // WARM:发出警告
    // error:报错
    'no-alert': 'error',
    // 'react/jxs-use-react': 2,
    // 'react/jxs-use-vars': 2
  },
  // 设置全局成员
  globals: {
    'jQuery': 'readonly',
    '$': 'readonly',
  },
  // plugins:[
  //     'react'
  // ]
}
