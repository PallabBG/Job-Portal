import axios from 'axios';

const API = axios.create({
     baseURL:"http://localhost:5500/api/jobs",
});

export default API;