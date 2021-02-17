// import album from './album'
// import posts from './posts'


const render = () => {
    const hash = window.hash || '#posts'

    const mainElement = document.querySelector('.main')

    mainElement.innerHTML = ''

    if(hash === '#posts') {
        // mainElement.appendChild(posts())
        import(/* webpackChunkName: 'posts'*/'./posts').then(({default:posts}) => {
            mainElement.appendChild(posts())
        })
    } else if (hash === '#album') {
        // mainElement.appendChild(album())
        import(/* webpackChunkName: 'album'*/'./album').then(({default:album}) => {
            mainElement.appendChild(album())
        })
    }
}


render()

window.addEventListener('hashChange', render)