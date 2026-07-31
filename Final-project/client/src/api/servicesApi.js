import axios from "axios";

export const analyzeResume = async (applicationId) => {
  const token = localStorage.getItem("token");

  const res = await axios.post(
    `https://job-portal-v3nf.onrender.com/api/ai/resume-screening/${applicationId}`,
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
    "https://job-portal-v3nf.onrender.com/api/ai/resume-feedback",
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
    "https://job-portal-v3nf.onrender.com/api/ai/job-recommendations",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};
