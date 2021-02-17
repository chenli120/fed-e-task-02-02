import createEditor from './editor'
import './global.css'
import background from './wulian.jpg'

const editor = createEditor()
document.body.append(editor)

const img = new Image()
img.src = background
document.body.append(img)

// ==================== 以下用于处理 HMR， 与业务代码无关 ==================== //

// console.log(createEditor)

if(module.hot){
    let lastEditor = editor
    module.hot.accept('./editor', () => {
        // console.log('editor 模块更新了， 需要这里手动处理热替换逻辑')
        // console.log(createEditor)
    
        const value = lastEditor.innerHTML
        document.body.removeChild(lastEditor)
        const newEditor = createEditor()
        newEditor.innerHTML = value
        document.body.append(newEditor)
        lastEditor = newEditor
    })
    
    
    module.hot.accept('./wulian.jpg', () => {
        img.src = background
        console.log(background)
    })

}