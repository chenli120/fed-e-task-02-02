export default endpoit => {
    return fetch(`https://jsonplaceholder.typicode.com${endpoint}`)
    .then(response => response.json())
}