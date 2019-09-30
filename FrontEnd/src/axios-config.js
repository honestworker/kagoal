import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL, // or process.env.BASE_URL if not using CRA
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Authorization': localStorage.jwtToken,
  },
});

export default api;