import axios from "axios";

export const http = axios.create({
  baseURL: "http://localhost:8000",
  // baseURL: "http://212.233.79.177:8000",
});
