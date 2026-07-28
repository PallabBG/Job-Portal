import React from "react";
import {
  FaRobot,
  FaFileAlt,
  FaChartLine,
  FaCalendarAlt,
  FaBolt,
} from "react-icons/fa";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FaSyncAlt, FaEye, FaEyeSlash } from "react-icons/fa";

const ResumeAnalysisCard = ({
  handleResumeAnalysis,
  analyzing,
  resumeFeedback,
  showReport,
  setShowReport,
  loadingResume,
}) => {
  if (loadingResume) {
    return (
      <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-3xl shadow-lg p-8 animate-pulse transition-colors duration-300">
        <div className="h-8 w-72 rounded-lg bg-gray-200 dark:bg-slate-700 mb-8" />

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-32 rounded-2xl bg-gray-200 dark:bg-slate-700"
            />
          ))}
        </div>
      </div>
    );
  }

  const getBadgeColor = (rating) => {
    switch (rating) {
      case "Excellent":
        return "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300";

      case "Good":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300";

      case "Average":
        return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300";

      default:
        return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300";
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg transition-colors duration-300">
      {/* Background */}

      <div className="absolute -top-16 -right-16 w-60 h-60 rounded-full bg-gradient-to-br from-indigo-100/60 to-blue-100/20 dark:from-indigo-500/10 dark:to-blue-500/5 blur-2xl" />

      <div className="relative p-8">
        {/* Header */}

        <div className="flex flex-col xl:flex-row justify-between xl:items-center gap-8">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center shadow">
              <FaRobot className="text-3xl text-indigo-600 dark:text-indigo-400" />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                AI Resume Analysis
              </h2>

              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Improve your ATS score with AI-powered resume insights and
                recommendations.
              </p>
            </div>
          </div>

          {resumeFeedback ? (
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleResumeAnalysis}
                disabled={analyzing}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all shadow
              ${
                analyzing
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }`}
              >
                <FaSyncAlt className={analyzing ? "animate-spin" : ""} />

                {analyzing ? "Analyzing..." : "Re-analyze"}
              </button>

              <button
                onClick={() => setShowReport(!showReport)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all"
              >
                {showReport ? <FaEyeSlash /> : <FaEye />}

                {showReport ? "Hide Report" : "View Report"}
              </button>
            </div>
          ) : (
            <button
              onClick={handleResumeAnalysis}
              disabled={analyzing}
              className={`px-8 py-3 rounded-xl font-semibold text-white shadow transition-all
            ${
              analyzing
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-600 to-blue-600 hover:scale-105"
            }`}
            >
              {analyzing ? "Analyzing..." : "🤖 Analyze My Resume"}
            </button>
          )}
        </div>

        {/* Status Cards */}

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 mt-10">
          <div className="rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 p-5">
            <div className="flex items-center gap-3">
              <FaFileAlt className="text-indigo-600 dark:text-indigo-400" />

              <span className="font-semibold text-gray-900 dark:text-white">
                Resume Status
              </span>
            </div>

            <p className="mt-4 font-bold text-emerald-600 dark:text-emerald-400">
              Uploaded
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 p-5">
            <div className="flex items-center gap-3">
              <FaChartLine className="text-emerald-600 dark:text-emerald-400" />

              <span className="font-semibold text-gray-900 dark:text-white">
                ATS Score
              </span>
            </div>

            <h2 className="mt-4 text-4xl font-bold text-gray-900 dark:text-white">
              {resumeFeedback ? `${resumeFeedback.atsScore}%` : "--"}
            </h2>
          </div>

          <div className="rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 p-5">
            <div className="flex items-center gap-3">
              <FaCalendarAlt className="text-orange-500" />

              <span className="font-semibold text-gray-900 dark:text-white">
                Last Analysis
              </span>
            </div>

            <p className="mt-4 text-gray-600 dark:text-gray-400">
              {resumeFeedback
                ? new Date(resumeFeedback.analyzedAt).toLocaleDateString()
                : "--"}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 p-5">
            <div className="flex items-center gap-3">
              <FaBolt className="text-yellow-500" />

              <span className="font-semibold text-gray-900 dark:text-white">
                Rating
              </span>
            </div>

            <div className="mt-4">
              {resumeFeedback ? (
                <span
                  className={`inline-flex px-4 py-2 rounded-full text-sm font-semibold ${getBadgeColor(
                    resumeFeedback.overallRating,
                  )}`}
                >
                  {resumeFeedback.overallRating}
                </span>
              ) : (
                "--"
              )}
            </div>
          </div>
        </div>

        {/* ATS Progress */}

        {resumeFeedback && (
          <div className="mt-10">
            <div className="flex justify-between mb-3">
              <span className="font-semibold text-gray-900 dark:text-white">
                ATS Compatibility
              </span>

              <span className="font-bold text-indigo-600 dark:text-indigo-400">
                {resumeFeedback.atsScore}%
              </span>
            </div>

            <div className="h-4 rounded-full overflow-hidden bg-gray-200 dark:bg-slate-700">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-green-500 to-teal-400 transition-all duration-1000"
                style={{
                  width: `${resumeFeedback.atsScore}%`,
                }}
              />
            </div>
          </div>
        )}
        {/* Toggle Report */}

        {resumeFeedback && (
          <div className="mt-8 border-t border-gray-200 dark:border-slate-700 pt-6">
            <button
              onClick={() => setShowReport(!showReport)}
              className="w-full flex items-center justify-center gap-3 rounded-2xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 px-6 py-4 text-lg font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-300"
            >
              {showReport ? (
                <>
                  <FaChevronUp />
                  Hide Detailed AI Report
                </>
              ) : (
                <>
                  <FaChevronDown />
                  View Detailed AI Report
                </>
              )}
            </button>

            <p className="mt-3 text-center text-sm text-gray-500 dark:text-gray-400">
              View a detailed AI-generated report including strengths,
              weaknesses, ATS recommendations, formatting suggestions and career
              guidance.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeAnalysisCard;
