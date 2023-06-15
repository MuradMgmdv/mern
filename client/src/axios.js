import axios from 'axios';
// объясняем что надо axios делать запросы всегда на 'http://localhost:4444'
const instance = axios.create({
  baseURL: 'http://localhost:3001',
});

// мидлвара которая проверяет есть токен или нет его
instance.interceptors.request.use((config) => {
  // при любом запросе проверяем есть ли в local storage токен
  config.headers.Authorization = window.localStorage.getItem('token');
  return config;
});

export default instance;
