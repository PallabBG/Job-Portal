import { useAuth } from "../context/AuthContext";
import React, { useEffect, useState } from "react";
import API from "../api/jobApi";
import { useParams, Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaBriefcase,
  FaUserTie,
  FaUsers,
  FaCalendarAlt,
  FaRobot,
  FaCheckCircle,
} from "react-icons/fa";
import ApplicationAPI from "../api/applicationApi";

const SingleJob = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [job, setJob] = useState(null);

  const getSingleJob = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get(`/${id}`, {
        headers: token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {},
      });
      setJob(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleJob();
  }, [id]);

  if (!job) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  const handleApply = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await ApplicationAPI.post(
        `/apply/${job._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Application failed");
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-950 dark:to-slate-900 min-h-screen py-10 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Back */}
        <Link
          to="/"
          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-6 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
        >
          <FaArrowLeft /> Back
        </Link>

        <div className="max-w-7xl mx-auto">
          <div className="w-full max-w-6xl mx-auto bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-3xl shadow-xl p-10 transition-colors duration-300">
            <div>
              {/* Company */}
              {/* ================= HEADER ================= */}

              <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
                {/* LEFT */}

                <div className="flex gap-5 flex-1">
                  <div className="w-24 h-24 rounded-2xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-900 shadow-sm overflow-hidden flex items-center justify-center shrink-0">
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

                  <div className="flex-1 min-w-0">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                      {job.title}
                    </h1>

                    <h2 className="text-2xl font-semibold mt-2 text-gray-800 dark:text-gray-200">
                      {job.employer?.companyProfile?.companyName}
                    </h2>

                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                      {job.employer?.companyProfile?.industry}
                    </p>

                    <div className="mt-8">
                      <p className="text-gray-500 dark:text-gray-400">Annual Salary</p>

                      <h2 className="text-4xl font-bold text-green-600">
                        ₹{job.salary} LPA
                      </h2>
                    </div>
                  </div>
                </div>

                {/* RIGHT */}

                <div className="flex flex-col items-end gap-4">
                  {user?.role === "jobseeker" && (
                    <>
                      <Link
                        to={`/interview/${job._id}`}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2"
                      >
                        <FaRobot />
                        AI Interview
                      </Link>

                      <button
                        onClick={handleApply}
                        className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold"
                      >
                        Apply Now
                      </button>
                    </>
                  )}

                  {user?.role === "employer" && (
                    <Link
                      to={`/edit-job/${job._id}`}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-xl font-semibold"
                    >
                      Edit Job
                    </Link>
                  )}

                  {!user && (
                    <Link
                      to="/login"
                      className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold"
                    >
                      Login to Apply
                    </Link>
                  )}

                  {/* AI MATCH */}

                  <div className="mt-2 flex flex-col items-center">
                    <div
                      className={`w-28 h-28 rounded-full border-[8px] flex items-center justify-center
      ${
        job.matchScore >= 80
          ? "border-green-500"
          : job.matchScore >= 60
            ? "border-yellow-500"
            : "border-red-500"
      }`}
                    >
                      <div className="text-center">
                        <h2
                          className={`text-3xl font-bold
          ${
            job.matchScore >= 80
              ? "text-green-600"
              : job.matchScore >= 60
                ? "text-yellow-500"
                : "text-red-500"
          }`}
                        >
                          {job.matchScore ?? 0}%
                        </h2>

                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                          AI Match
                        </p>
                      </div>
                    </div>

                    {user?.role === "jobseeker" && (
                      <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 text-center max-w-[180px]">
                        {job.matchScore >= 80
                          ? "Excellent Match"
                          : job.matchScore >= 60
                            ? "Good Match"
                            : "Low Match"}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Badges */}

              <div className="grid lg:grid-cols-2 gap-8 mt-10">
                {/* ================= LEFT ================= */}

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Job Information</h2>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 bg-gray-50 dark:bg-slate-700 rounded-xl p-4 transition-colors duration-300">
                      <FaMapMarkerAlt className="text-blue-600 text-lg" />

                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Location</p>

                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {job.employer?.companyProfile?.location}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-gray-50 dark:bg-slate-700 rounded-xl p-4 transition-colors duration-300">
                      <FaBriefcase className="text-purple-600 text-lg" />

                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Job Type</p>

                        <h4 className="font-semibold text-gray-900 dark:text-white">{job.jobType}</h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-gray-50 dark:bg-slate-700 rounded-xl p-4 transition-colors duration-300">
                      <FaUserTie className="text-orange-500 text-lg" />

                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Experience</p>

                        <h4 className="font-semibold text-gray-900 dark:text-white">{job.experienceLevel}</h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-gray-50 dark:bg-slate-700 rounded-xl p-4 transition-colors duration-300">
                      <FaUsers className="text-green-600 text-lg" />

                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Vacancies</p>

                        <h4 className="font-semibold text-gray-900 dark:text-white">{job.vacancies}</h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-gray-50 dark:bg-slate-700 rounded-xl p-4 transition-colors duration-300">
                      <FaCheckCircle
                        className={
                          job.status === "Open"
                            ? "text-green-600 text-lg"
                            : "text-red-600 text-lg"
                        }
                      />

                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Status</p>

                        <h4 className="font-semibold text-gray-900 dark:text-white">{job.status}</h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-gray-50 dark:bg-slate-700 rounded-xl p-4 transition-colors duration-300">
                      <FaCalendarAlt className="text-red-500 text-lg" />

                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Deadline</p>

                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {job.deadline
                            ? new Date(job.deadline).toLocaleDateString("en-IN")
                            : "No Deadline"}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ================= RIGHT ================= */}

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Job Description</h2>

                  <p className="text-gray-600 dark:text-gray-300 leading-8 whitespace-pre-line">
                    {job.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Buttons */}

            <div className="mt-10">
              {/* ================= BOTTOM SECTION ================= */}

              <div className="mt-12 border-t border-gray-200 dark:border-slate-700 pt-10">
                {/* Skills */}

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-5">Required Skills</h2>

                <div className="flex flex-wrap gap-3 mb-10">
                  {job.skills?.map((skill) => (
                    <span
                      key={skill}
                      className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Company */}

                <div className="border-t border-gray-200 dark:border-slate-700 pt-10">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Company Information
                  </h2>

                  <div className="grid md:grid-cols-3 gap-5">
                    {/* Website */}

                    <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-5 transition-colors duration-300">
                      <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-2">Website</h4>

                      <a
                        href={job.employer?.companyProfile?.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                      >
                        Visit Website
                      </a>
                    </div>

                    {/* Company Size */}

                    <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-5 transition-colors duration-300">
                      <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        Company Size
                      </h4>

                      <p className="font-semibold text-gray-900 dark:text-white">
                        {job.employer?.companyProfile?.companySize}
                      </p>
                    </div>

                    {/* Founded */}

                    <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-5 transition-colors duration-300">
                      <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-2">Founded</h4>

                      <p className="font-semibold text-gray-900 dark:text-white">
                        {job.employer?.companyProfile?.foundedYear}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleJob;
