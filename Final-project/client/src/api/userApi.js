import axios from "axios";

const UserAPI = axios.create({
  baseURL: "http://localhost:5500/api/auth",
});

export default UserAPI;