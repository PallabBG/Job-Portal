import axios from "axios";

export const analyzeResume = async (applicationId) => {
  const token = localStorage.getItem("token");

  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/ai/resume-screening/${applicationId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const getResumeFeedback = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/ai/resume-feedback`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const getJobRecommendations = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/ai/job-recommendations`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};