// // 导入模块成员
// import _ from 'lodash-es'
// import { log } from './logger' 
// import message from './message' 
// import { name, version} from '../package.json'
// import cjs from './cjs-module'


// // 使用模块成员
// const msg = message.hi

// log(msg)
// log(name)
// log(version)
// log(_.camelCase('hello world'))
// log(cjs)



// // ## Rollup 代码拆分 Code Spliting  Dynamic Imports 动态导入
// import('./logger').then(({ log }) => {
//     log('Code Spliting~')
// })
import fetchApi from './fetch' 
import { log } from './logger' 

fetchApi('/posts').then(data => {
    data.forEach(item => {
        log(item)
    })
})

