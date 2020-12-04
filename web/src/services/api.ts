import axios from 'axios';

const api = axios.create({
  baseURL: 'https://receit.herokuapp.com',
});

export default api;
