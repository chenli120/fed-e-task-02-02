export default () => {
    const element = document.createElement('h2')

    element.textContent = 'Hello world'
    element.addEventListener('click', () => {
        altert('Hello webpack')
    })

    return element
}