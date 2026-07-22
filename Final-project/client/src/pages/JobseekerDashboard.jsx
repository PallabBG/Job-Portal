import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaBriefcase,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaRobot,
} from "react-icons/fa";


const JobseekerDashboard = () => {
  const [stats, setStats] = useState({
    appliedJobs: 0,
    pending: 0,
    accepted: 0,
    rejected: 0,
  });

  const navigate = useNavigate();
  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5500/api/applications/jobseeker-dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const cards = [
    {
      title: "Applied Jobs",
      value: stats.appliedJobs,
      icon: <FaBriefcase className="text-blue-600 text-2xl" />,
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: <FaClock className="text-yellow-500 text-2xl" />,
    },
    {
      title: "Accepted",
      value: stats.accepted,
      icon: <FaCheckCircle className="text-green-600 text-2xl" />,
    },
    {
      title: "Rejected",
      value: stats.rejected,
      icon: <FaTimesCircle className="text-red-600 text-2xl" />,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        Job Seeker Dashboard
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">
                  {card.title}
                </p>

                <h2 className="text-3xl font-bold mt-3">
                  {card.value}
                </h2>
              </div>

              {card.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 bg-white rounded-2xl shadow p-8">
        <div className="flex items-center gap-4">
          <FaRobot className="text-4xl text-blue-600" />

          <div>
            <h2 className="text-2xl font-bold">
              AI Career Assistant
            </h2>

            <p className="text-gray-600 mt-2">
              Need help choosing a career path, improving your resume, or preparing for interviews? Chat with our AI assistant.
            </p>
          </div>
        </div>

        <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl" onClick={()=>navigate("/job-chatbot")}>
          Start Chat
        </button>
      </div>
    </div>
  );
};

export default JobseekerDashboard;