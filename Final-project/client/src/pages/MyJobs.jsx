import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/jobApi";

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/my-jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setJobs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this job?")) return;

    try {
      const token = localStorage.getItem("token");

      await API.delete(`/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setJobs((prev) => prev.filter((job) => job._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete job");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-950 dark:to-slate-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          My Posted Jobs
        </h1>
        {jobs.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-300">
              No Jobs Posted Yet
            </h2>

            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Create your first job posting to start receiving applications.
            </p>

            <Link
              to="/add-job"
              className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-colors"
            >
              + Post a Job
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-slate-700 overflow-hidden"
              >
                {/* Header */}
                <div className="flex justify-between items-center p-5 border-b border-gray-200 dark:border-slate-700">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      {job.title}
                    </h2>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {job.category}
                    </p>
                  </div>

                  <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full font-semibold text-sm">
                    👥 {job.applicantCount}
                  </span>
                </div>

                {/* Body */}

                <div className="grid grid-cols-2 gap-4 p-5 text-sm">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Salary</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      ₹ {job.salary} LPA
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Job Type</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {job.jobType}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500 dark:text-gray-400">
                      Experience
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {job.experienceLevel}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500 dark:text-gray-400">
                      Vacancies
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {job.vacancies}
                    </p>
                  </div>
                </div>

                {/* Footer */}

                <div className="flex gap-3 p-5 border-t border-gray-200 dark:border-slate-700">
                  <Link
                    to={`/job/${job._id}/applicants`}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl text-center"
                  >
                    👥 Applicants
                  </Link>

                  <Link
                    to={`/edit-job/${job._id}`}
                    className="px-4 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-200 rounded-xl flex items-center hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors duration-300"
                  >
                    ✏
                  </Link>

                  <button
                    onClick={() => handleDelete(job._id)}
                    className="px-4 border border-gray-300 dark:border-slate-600 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-300"
                  >
                    🗑
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyJobs;
