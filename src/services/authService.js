import axios from 'axios';

const API_URL = 'http://localhost:5000/auth'; // Adjust if backend URL differs

export const signup = async (data) => {
  const res = await axios.post(`${API_URL}/signup`, data);
  return res.data;
};

export const login = async (data) => {
  const res = await axios.post(`${API_URL}/login`, data);
  return res.data;
};
