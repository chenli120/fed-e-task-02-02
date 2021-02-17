
import { foo, bar } from './index.mjs'
console.log(foo, bar)

// import fs from 'fs'

// fs.writeFileSync('./foo.txt','es module working')

// 系统内置的模块，官方都做了兼容===内置模块兼容两人 ESM 的提取成员 
import { writeFileSync } from 'fs'
writeFileSync('./foo.txt','es module working')

// import _ from 'lodash'
// console.log(_.camelCase('ES Module'))

// 不支持， 因为第三方模块都是导出默认成员
// import { camelCase } from 'lodash'
// console.log(camelCase('ES Module'))