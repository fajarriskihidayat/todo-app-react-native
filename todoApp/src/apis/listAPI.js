import axios from 'axios';

const listAPI = axios.create({
  baseURL: 'http://192.168.122.152:5000/lists',
});

export default listAPI;
