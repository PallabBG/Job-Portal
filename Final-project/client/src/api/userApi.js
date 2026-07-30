import axios from "axios";

const UserAPI = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/auth`,
});

export default UserAPI;