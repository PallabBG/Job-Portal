import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApplicationAPI from "../api/applicationApi";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await ApplicationAPI.get("/my-applications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setApplications(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-950 dark:to-slate-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          My Applications
        </h1>

        {applications.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-300">
              No Applications Yet
            </h2>

            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Start applying for jobs to see them here.
            </p>

            <Link
              to="/"
              className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-colors"
            >
              Browse Jobs
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {applications.map((app) => (
              <div
                key={app._id}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-slate-700 overflow-hidden"
              >
                {/* Header */}
                <div className="flex justify-between items-center p-5 border-b border-gray-200 dark:border-slate-700">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                      {app.job.title}
                    </h2>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {app.employer?.companyProfile?.companyName ||
                        app.employer?.name}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      app.status === "Accepted"
                        ? "bg-green-100 text-green-700"
                        : app.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {app.status}
                  </span>
                </div>

                {/* Body */}
                <div className="grid grid-cols-2 gap-4 p-5 text-sm">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Employer</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {app.employer?.name}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Salary</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      ₹ {app.job.salary} LPA
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Job Type</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {app.job.jobType}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500 dark:text-gray-400">
                      Experience
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {app.job.experienceLevel}
                    </p>
                  </div>
                </div>

                {/* Footer */}

                <div className="flex gap-3 p-5 border-t border-gray-200 dark:border-slate-700">
                  <Link
                    to={`/chat/${app.employer._id}`}
                    className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl"
                  >
                    💬 Chat
                  </Link>

                  <Link
                    to={`/job/${app.job._id}`}
                    className="flex-1 text-center border border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-700 py-2 rounded-xl transition-colors duration-300"
                  >
                    👁 View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
        {applications.length === 0 && (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-300">
              No Applications Yet
            </h2>

            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Start applying for jobs to see them here.
            </p>

            <Link
              to="/"
              className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
            >
              Browse Jobs
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;
