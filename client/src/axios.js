import axios from 'axios';
// объясняем что надо axios делать запросы всегда на 'http://localhost:4444'
const instance = axios.create({
  baseURL: 'http://localhost:4444',
});

export default instance;
