import axios from 'axios';

const API = axios.create({
     baseURL:`https://job-portal-v3nf.onrender.com/api/jobs`,
});

export default API;