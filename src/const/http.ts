import axios from "axios";

export const http = axios.create({
  baseURL: import.meta.env.APP_API_URL
});
// test branch comment

http.interceptors.request.use((config)=> {
  config.headers.Authorization = `Token ${localStorage.getItem('token')}`
  return config
})
