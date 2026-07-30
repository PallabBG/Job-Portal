import axios from "axios";

const ApplicationAPI = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/applications`,
});

export default ApplicationAPI;