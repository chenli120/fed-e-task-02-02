
// // // 加载资源的方式： 4. 部分 loader 加载的资源也会触发资源模块的加载
// import './main.css'

// import footerHtml from './footer.html'

// document.write(footerHtml)

import createHeading from './heading.js'
import './main.css'
import icon from './aaa.png'

const heading = createHeading()

document.body.append(heading)

const img = new Image()
img.src = icon

document.body.append(img)