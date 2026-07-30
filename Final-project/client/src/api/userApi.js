import axios from "axios";

const UserAPI = axios.create({
  baseURL: `https://job-portal-v3nf.onrender.com/api/auth`,
});

export default UserAPI;