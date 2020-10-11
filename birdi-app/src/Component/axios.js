import axios from 'axios'

const instance = axios.create({
      baseURL: 'https://birdy-em.herokuapp.com/',
    // baseURL: 'http://localhost:8080/Projet/'
    
})

export default instance