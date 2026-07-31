import axios from "axios";

const API = axios.create({
  baseURL: "https://job-portal-v3nf.onrender.com/api/ai",
});

// Generate AI Interview Questions
export const generateInterviewQuestions = (jobId) => {
  const token = localStorage.getItem("token");

  return API.post(
    `/generate/${jobId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export default API;
