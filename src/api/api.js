import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URI}/api`, // all requests go through API Gateway
  withCredentials: true, // ensures cookies (like session) are sent automatically
});


export default API;
