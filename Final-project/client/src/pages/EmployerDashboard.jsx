import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/jobApi";

const EmployerDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    postedJobs: 0,
    applicationsReceived: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/employer-dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Employer Dashboard</h1>

      {/* Statistics */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Posted Jobs</h3>

          <p className="text-3xl font-bold mt-3">{stats.postedJobs}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Applications</h3>

          <p className="text-3xl font-bold mt-3">
            {stats.applicationsReceived}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Notifications</h3>

          <p className="text-3xl font-bold mt-3">0</p>
        </div>
      </div>

      {/* Quick Actions */}

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-5">Quick Actions</h2>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => navigate("/add-job")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            + Post New Job
          </button>

          <button
            onClick={() => navigate("/my-jobs")}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
          >
            My Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
