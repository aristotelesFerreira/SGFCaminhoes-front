import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
   // timeout: 1000,
    headers: {
        "Authorization": 'Bearer ' + localStorage.getItem('id_token') || undefined,
        'Content-Type': 'application/json',
        Accept: 'application/json'
    },
    
})

console.log(localStorage.getItem('id_token'))

export default axiosInstance 
