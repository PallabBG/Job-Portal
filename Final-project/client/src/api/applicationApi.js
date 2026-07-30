import axios from "axios";

const ApplicationAPI = axios.create({
  baseURL: `https://job-portal-v3nf.onrender.com/api/applications`,
});

export default ApplicationAPI;