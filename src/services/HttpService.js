import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8080/api';

class HttpService {
  async get() {
    const res = await axios.get('/memo');
    return res.data;
  }
}

export default new HttpService();