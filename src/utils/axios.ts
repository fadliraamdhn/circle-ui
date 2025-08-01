import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://circle-api-production.up.railway.app/",
    withCredentials: true
})