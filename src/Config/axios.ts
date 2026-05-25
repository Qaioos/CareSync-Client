import axios from "axios";

export  const axiosInstance = axios.create({
    baseURL:"https://luminous-cherry-91ced558b9.strapiapp.com/api",
    headers:{
        "Content-Type": "application/json",
        "Accept":"application/json"
    }
})