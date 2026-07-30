import { useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaClock,
  FaBuilding,
} from "react-icons/fa";

const AIJobCard = ({ job }) => {
  const navigate = useNavigate();
  const scoreColor =
    job.matchScore >= 80
      ? "text-green-600"
      : job.matchScore >= 60
        ? "text-yellow-500"
        : "text-red-500";

  return (
    <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="grid grid-cols-[70px_1fr_110px_150px] gap-5 items-center">
        {/* Company Logo */}

        <div className="w-16 h-16 rounded-xl overflow-hidden border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-900">
          <img
            src={
              job.companyLogo
                ? job.companyLogo?.startsWith('http') ? job.companyLogo : `${import.meta.env.VITE_API_URL}${job.companyLogo}`
                : "/company-placeholder.png"
            }
            alt="Company Logo"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Job Info */}

        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{job.title}</h2>

          <p className="text-gray-600 dark:text-gray-300 font-medium mt-1">
            {job.company || "Company"}
          </p>

          <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <FaMapMarkerAlt />
              {job.location || "Location not provided"}
            </span>

            <span className="flex items-center gap-1">
              <FaMoneyBillWave />
              {job.salary ? `₹${job.salary} LPA` : "Not Disclosed"}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-gray-200 text-sm">
              💼 {job.jobType}
            </span>

            <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-gray-200 text-sm">
              👨 {job.experienceLevel}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {job.matchedSkills?.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Match */}

        <div className="flex justify-center">
          <div
            className={`w-20 h-20 rounded-full border-4 flex flex-col items-center justify-center
          ${
            job.matchScore >= 80
              ? "border-green-500 text-green-600 bg-green-50"
              : job.matchScore >= 60
                ? "border-yellow-500 text-yellow-600 bg-yellow-50"
                : "border-red-500 text-red-600 bg-red-50"
          }`}
          >
            <span className="text-2xl font-bold">{job.matchScore}%</span>

            <span className="text-xs font-semibold">MATCH</span>
          </div>
        </div>

        {/* Button */}

        <div className="flex justify-end">
          <button
            onClick={() => navigate(`/job/${job._id}`)}
            className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-5 py-3 rounded-xl font-medium transition"
          >
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIJobCard;
