import axios from 'axios';
// объясняем что надо axios делать запросы всегда на 'http://localhost:3001'
const instance = axios.create({
  baseURL: 'http://localhost:3001',
});

export default instance;
