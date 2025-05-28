// api.js
// frontend/src/api.js
import axios from 'axios';
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const API = axios.create({
baseURL: import.meta.env.VITE_API_URL,
baseURL,
});


export default API;


// export const API_URL = import.meta.env.VITE_API_URL;
