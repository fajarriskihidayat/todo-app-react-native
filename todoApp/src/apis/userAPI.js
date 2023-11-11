import axios from 'axios';

const userAPI = axios.create({
  baseURL: 'http://192.168.122.152:5000/users',
});

export default userAPI;
