import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getResumeFeedback } from "../api/servicesApi";
import AIJobCard from "../components/AIJobCard";
import {
  FaBriefcase,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaRobot,
} from "react-icons/fa";
import CareerAssistantCard from "../components/dashboard/CareerAssistantCard";
import DashboardStats from "../components/dashboard/DashboardStats";
import ResumeReport from "../components/dashboard/ResumeReport";
import ResumeAnalysisCard from "../components/dashboard/ResumeAnalysisCard";
import {
  getJobRecommendations,
} from "../api/servicesApi";

const JobseekerDashboard = () => {
  const [stats, setStats] = useState({
    appliedJobs: 0,
    pending: 0,
    accepted: 0,
    rejected: 0,
  });

  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(true);

  const [resumeFeedback, setResumeFeedback] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [loadingResume, setLoadingResume] = useState(true);
  const [showReport, setShowReport] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboard();
    fetchResumeAnalysis();
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
  try {
    setLoadingRecommendations(true);

    const res = await getJobRecommendations();

    setRecommendedJobs((res.recommendations || []).slice(0, 3));
  } catch (err) {
    console.error(err);
  } finally {
    setLoadingRecommendations(false);
  }
};

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/applications/jobseeker-dashboard`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setStats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleResumeAnalysis = async () => {
    try {
      setAnalyzing(true);

      const res = await getResumeFeedback();

      setResumeFeedback(res.aiFeedback);
    } catch (err) {
      alert(err.response?.data?.message || "Resume analysis failed.");
    } finally {
      setAnalyzing(false);
    }
  };

  const cards = [
    {
      title: "Applied Jobs",
      value: stats.appliedJobs,
      icon: <FaBriefcase className="text-blue-600 text-2xl" />,
      bg: "bg-blue-100",
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: <FaClock className="text-yellow-500 text-2xl" />,
      bg: "bg-yellow-100",
    },
    {
      title: "Accepted",
      value: stats.accepted,
      icon: <FaCheckCircle className="text-green-600 text-2xl" />,
      bg: "bg-green-100",
    },
    {
      title: "Rejected",
      value: stats.rejected,
      icon: <FaTimesCircle className="text-red-600 text-2xl" />,
      bg: "bg-red-100",
    },
  ];

  const { user } = useAuth();

  const hour = new Date().getHours();
  const firstName = user?.name?.split(" ")[0];
  let greeting = "Good Evening 🌙";

  if (hour < 12) greeting = "Good Morning ☀️";
  else if (hour < 17) greeting = "Good Afternoon 🌤️";

  const fetchResumeAnalysis = async () => {
    try {
      setLoadingResume(true);

      const res = await getResumeFeedback();

      if (res.success && res.aiFeedback) {
        setResumeFeedback(res.aiFeedback);
      }
    } catch (err) {
      // Ignore errors like "Resume not analyzed yet"
      console.log(err.response?.data?.message);
    } finally {
      setLoadingResume(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Hero */}

      <div className="relative overflow-hidden rounded-3xl border border-gray-200 dark:border-slate-700 bg-gradient-to-br from-indigo-600 via-blue-600 to-violet-700 shadow-2xl">
        <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative p-8 lg:p-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 backdrop-blur px-4 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                AI Powered Dashboard
              </span>

              <h1 className="mt-5 text-4xl lg:text-5xl font-bold text-white">
                {greeting}
              </h1>

              <h2 className="mt-3 text-2xl font-semibold text-blue-100">
                {firstName}
              </h2>

              <p className="mt-4 max-w-2xl text-blue-100 leading-7">
                Track your applications, improve your resume, discover
                AI-powered job recommendations, and take the next step toward
                your dream career.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => navigate("/")}
                className="rounded-2xl bg-white px-6 py-4 font-semibold text-indigo-700 shadow-lg transition-all duration-300 hover:scale-105"
              >
                Browse Jobs
              </button>

              <button
                onClick={() => navigate("/job-chatbot")}
                className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur px-6 py-4 font-semibold text-white transition-all duration-300 hover:bg-white/20"
              >
                AI Assistant
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Statistics */}

      <DashboardStats cards={cards} />

      {/* Resume Section */}

      <div className="grid xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <ResumeAnalysisCard
            handleResumeAnalysis={handleResumeAnalysis}
            analyzing={analyzing}
            resumeFeedback={resumeFeedback}
            showReport={showReport}
            setShowReport={setShowReport}
            loadingResume={loadingResume}
          />
        </div>

        {/* Quick Actions */}

        <div className="rounded-3xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg p-6 transition-colors duration-300">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Quick Actions
          </h2>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Frequently used career tools.
          </p>

          <div className="mt-6 space-y-4">
            <button
              onClick={() => navigate("/")}
              className="w-full flex items-center justify-between rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 px-5 py-4 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all"
            >
              <span className="font-medium text-gray-900 dark:text-white">
                Browse Jobs
              </span>

              <FaBriefcase className="text-indigo-600 dark:text-indigo-400" />
            </button>

            <button
              onClick={() => navigate("/my-applications")}
              className="w-full flex items-center justify-between rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 px-5 py-4 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all"
            >
              <span className="font-medium text-gray-900 dark:text-white">
                My Applications
              </span>

              <FaCheckCircle className="text-emerald-600 dark:text-emerald-400" />
            </button>

            <button
              onClick={() => navigate("/profile")}
              className="w-full flex items-center justify-between rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 px-5 py-4 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all"
            >
              <span className="font-medium text-gray-900 dark:text-white">
                Update Profile
              </span>

              <FaRobot className="text-violet-600 dark:text-violet-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Resume Report */}

      {showReport && <ResumeReport resumeFeedback={resumeFeedback} />}

      {/* AI Recommended Jobs */}

      <div className="rounded-3xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg transition-colors duration-300">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-8 border-b border-gray-200 dark:border-slate-700">
          <div>
            <span className="inline-flex items-center rounded-full bg-indigo-100 dark:bg-indigo-900/30 px-3 py-1 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
              AI Matching
            </span>

            <h2 className="mt-3 text-2xl font-bold text-gray-900 dark:text-white">
              Recommended Jobs
            </h2>

            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Personalized opportunities based on your resume and profile.
            </p>
          </div>

          <Link
            to="/job-recommendations"
            className="inline-flex items-center justify-center rounded-xl bg-indigo-600 hover:bg-indigo-700 px-5 py-3 font-medium text-white transition-all"
          >
            View All
          </Link>
        </div>

        <div className="p-8">
          {loadingRecommendations ? (
            <div className="space-y-5">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-36 rounded-2xl bg-gray-200 dark:bg-slate-700 animate-pulse"
                />
              ))}
            </div>
          ) : recommendedJobs.length > 0 ? (
            <div className="space-y-5">
              {recommendedJobs.map((job) => (
                <AIJobCard key={job._id} job={job} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 dark:border-slate-600 py-14 text-center">
              <FaRobot className="mx-auto text-5xl text-gray-400 dark:text-gray-500" />

              <h3 className="mt-5 text-xl font-semibold text-gray-900 dark:text-white">
                No AI Recommendations Yet
              </h3>

              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Complete your profile and analyze your resume to receive
                personalized job recommendations.
              </p>
            </div>
          )}
        </div>
      </div>

      <CareerAssistantCard />
    </div>
  );
};

export default JobseekerDashboard;
