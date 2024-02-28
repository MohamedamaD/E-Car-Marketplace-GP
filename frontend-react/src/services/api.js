import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const formDataApi = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-type": "multipart/form-data",
  },
});

export default api;
