
// yarn add marked --dev
const marked = require('marked')

module.exports = source => {
    console.log(source)
    // return 'hello ~ '  You may need an additional loader to handle the result of these loaders.
    // 返回的字符串会直接返回到输出文件中了 loader 运行的结果必须是一个js代码
    // return 'console.log("hello ~ ")'
    const html = marked(source)
    // return html   // 不是JS代码会报错
    // return `module.exports = "${html}"`  //换行符和空格符会被忽略
    // return `module.exports = ${JSON.stringify(html)}`  //CommonJs
    return `exports default ${JSON.stringify(html)}`  //ESM

    //返回 html 字符串交给下一个 loader 处理
    return html
}