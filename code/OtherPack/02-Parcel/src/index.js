// import $ from 'jquery'
import foo from './foo'
import './style.css'
import logo from './heartIcon.jpg'

foo.bar()
import(jquery).then($ =>{
    $(document.body).append('<h1>hello parcel</h1>')
    $(document.body).append(`<img src="${logo}" />`)

})
if (module.hot) {
    module.hot.accept(() => {
        console.log('hmr')
    })

}