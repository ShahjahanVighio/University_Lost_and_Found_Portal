import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000', // Aapke NestJS ka URL
});

// Ye interceptor khud hi localStorage se token nikaal kar 
// har request ke Header mein 'Bearer Token' laga dega
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;