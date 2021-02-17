export default () => {
    console.log('Heading¬')
    
    const element = document.createElement('h2')

    element.textContent = 'Hello world'
    element.classList.add('heading')
    element.addEventListener('click', () => {
        altert('Hello webpack')
    })

    return element
}