
import fetchApi from './fetch' 
import { log } from './logger' 

fetchApi('/posts?albumId=1').then(data => {
    data.forEach(item => {
        log(item)
    })
})

