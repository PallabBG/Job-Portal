import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const JobCard = ({ job, onDelete }) => {
  const { user } = useAuth();
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-6 hover:shadow-xl hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300">
      <div className="flex gap-4 items-start">
        {" "}
        {/* Logo */}
        <div className="w-14 h-14 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-900 flex items-center justify-center overflow-hidden shrink-0">
          <img
            src={
              job.employer?.companyProfile?.companyLogo
                ? `http://localhost:5500${job.employer.companyProfile.companyLogo}`
                : "/company-placeholder.png"
            }
            alt="Company Logo"
            className="w-full h-full object-contain p-2"
          />
        </div>
        {/* Center */}
        <div className="flex-1">
          {/* Header */}

          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{job.title}</h2>

              <h3 className="text-base font-semibold text-gray-700 dark:text-gray-200 mt-1">
                {job.employer?.companyProfile?.companyName}
              </h3>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                {job.employer?.companyProfile?.industry}
              </p>
            </div>

            <div className="text-right shrink-0">
              <span className="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 text-xs px-3 py-1 rounded-full">
                {job.status}
              </span>

              <h2 className="text-xl font-bold text-green-600 mt-3">
                ₹{job.salary} LPA
              </h2>

              <p className="text-xs text-gray-500 dark:text-gray-400">Annual Salary</p>
            </div>
          </div>

          {/* Meta */}

          <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mt-5">
            <span>📍 {job.employer?.companyProfile?.location}</span>

            <span>💼 {job.jobType}</span>

            <span>⭐ {job.experienceLevel}</span>

            <span>👥 {job.vacancies} Vacancies</span>

            <span>
              📅{" "}
              {job.deadline
                ? new Date(job.deadline).toLocaleDateString("en-IN")
                : "No Deadline"}
            </span>
          </div>

          {/* Bottom */}

          <div className="flex flex-wrap justify-between items-end gap-4 mt-5">
            <div className="flex flex-wrap gap-2">
              {job.skills?.slice(0, 4).map((skill) => (
                <span
                  key={skill}
                  className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="flex gap-3">
              <Link
                to={`/job/${job._id}`}
                className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-5 py-2 rounded-xl font-medium"
              >
                View Details →
              </Link>

              {(user?.role === "admin" || user?.role === "employer") && (
                <button
                  onClick={() => onDelete(job._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
