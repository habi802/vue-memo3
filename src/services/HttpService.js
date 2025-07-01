import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8080/api';

class HttpService {
  async post(item) {
    const res = await axios.post('/memo', item);
    return res.data;
  }
  
  async get() {
    const res = await axios.get('/memo');
    return res.data;
  }

  async getById(memoId) {
    const res = await axios.get(`/memo/${memoId}`);
    return res.data;
  }

  async put(item) {
    const res = await axios.put('/memo', item);
    return res.data;
  }
}

export default new HttpService();