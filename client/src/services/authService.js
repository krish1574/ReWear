import axios from 'axios';
const API = 'http://localhost:5000/api/auth';
export const login = (credentials) => axios.post(`${API}/login`, credentials);
export const signup = (data) => axios.post(`${API}/signup`, data);