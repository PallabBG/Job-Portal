import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/jobApi";
import { FaBriefcase, FaFileAlt, FaBell, FaPlus, FaList } from "react-icons/fa";

const EmployerDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    postedJobs: 0,
    applicationsReceived: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { label: "Posted jobs", value: stats.postedJobs, icon: FaBriefcase, accent: "indigo" },
    { label: "Applications", value: stats.applicationsReceived, icon: FaFileAlt, accent: "emerald" },
    { label: "Notifications", value: 0, icon: FaBell, accent: "amber" },
  ];

  const accentClasses = {
    indigo: "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
    emerald: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    amber: "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400",
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-6xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
            Employer dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Track your job postings and applicant activity
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 dark:border-red-500/30 bg-red-50 dark:bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-400">
            Couldn't load dashboard data. Showing last known values.
          </div>
        )}

        {/* Statistics */}
        <div className="grid md:grid-cols-3 gap-5">
          {statCards.map(({ label, value, icon: Icon, accent }) => (
            <div
              key={label}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {label}
                </p>
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center ${accentClasses[accent]}`}
                >
                  <Icon className="text-sm" />
                </div>
              </div>

              <p className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white">
                {loading ? (
                  <span className="inline-block h-8 w-14 rounded bg-slate-100 dark:bg-slate-800 animate-pulse" />
                ) : (
                  value
                )}
              </p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-10">
          <h2 className="text-lg font-medium text-slate-900 dark:text-white mb-4">
            Quick actions
          </h2>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/add-job")}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-5 py-3 rounded-xl transition-colors"
            >
              <FaPlus className="text-xs" />
              Post new job
            </button>

            <button
              onClick={() => navigate("/my-jobs")}
              className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-sm font-medium px-5 py-3 rounded-xl hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
            >
              <FaList className="text-xs" />
              My jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;