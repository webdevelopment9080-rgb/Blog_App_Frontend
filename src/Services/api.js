import axios from 'axios'


let API_BASE_URL = import.meta.env.VITE_API_BASE_URL ||'http://localhost:3000/api/v1'

const api = axios.create({

    baseURL: API_BASE_URL

})


api.interceptors.request.use(
    (config)=>{

        let token = localStorage.getItem("token");
        if (token) {
            
            config.headers.Authorization = `Bearer ${token}`
        }
        if (!config.headers["Content-Type"]) {
            
            config.headers['Content-Type'] = "application/json"
        }
        
        return config;
    }
)



api.interceptors.response.use((response)=>{
    return response;
}, 

(error)=>{
console.log(error, "Error in api 'api.js file'")

return Promise.reject(error);
})


export default api;