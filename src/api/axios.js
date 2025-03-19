import axios from "axios";


const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // link for your backend API
  withCredentials: true,
});

export default api;
