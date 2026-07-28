import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUsers, FaBriefcase, FaBuilding } from "react-icons/fa";

const AdminDashboard = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5500/api/admin/dashboard",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setData(res.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const stats = [
    {
      label: "Total Users",
      value: data.totalUsers,
      icon: FaUsers,
      accent: "indigo",
    },
    {
      label: "Total Jobs",
      value: data.totalJobs,
      icon: FaBriefcase,
      accent: "emerald",
    },
    {
      label: "Employers",
      value: data.employers,
      icon: FaBuilding,
      accent: "amber",
    },
  ];

  const accentClasses = {
    indigo: "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
    emerald: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    amber: "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400",
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="p-8 max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
            Admin Dashboard
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Overview of platform activity
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {stats.map(({ label, value, icon: Icon, accent }) => (
            <div
              key={label}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl"
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

              <h3 className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white">
                {loading ? (
                  <span className="inline-block h-8 w-16 rounded bg-slate-100 dark:bg-slate-800 animate-pulse" />
                ) : (
                  value ?? "—"
                )}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;