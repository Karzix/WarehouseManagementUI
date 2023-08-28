import axios from 'axios';
import axiosConfig from 'axios'
export const axiosInstance = axios.create ({
    baseURL:"https://localhost:7234/api/",
    // timeout:1000,
    headers: {'x-Custom-Header':'foobar'}
})