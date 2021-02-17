// ESM 中没有 CommonJs 中的那些模块全局成员了


// console.log(import.meta.url) 获取当前文件路径 file:///G:/fed-task-02-02/code/ESM/07-differences/esm.mjs 

import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)

console.log(__filename)

const __dirname = dirname(__filename)

console.log(__dirname)