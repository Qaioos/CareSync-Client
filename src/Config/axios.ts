import axios from "axios";

export  const axiosInstance = axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    /* baseURL:'http://localhost:1337/api', */
    headers:{
        "Content-Type": "application/json",
        "Accept":"application/json"
    }
})
