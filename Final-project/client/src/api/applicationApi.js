import axios from "axios";

const ApplicationAPI = axios.create({
  baseURL: "http://localhost:5500/api/applications",
});

export default ApplicationAPI;