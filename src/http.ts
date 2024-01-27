import axios from "axios";

export const http = axios.create({
  baseURL: "http://212.233.79.177:8000/",
});
