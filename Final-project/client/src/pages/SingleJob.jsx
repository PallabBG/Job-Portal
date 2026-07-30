import { useAuth } from "../context/AuthContext";
import React, { useEffect, useState } from "react";
import API from "../api/jobApi";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Briefcase,
  User,
  Users,
  Calendar,
  Bot,
  CheckCircle2,
  Globe,
  Building2,
  Building,
  Target,
  Clock,
  Sparkles,
  ExternalLink,
  ChevronRight
} from "lucide-react";
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
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center items-center py-20 relative">
        <div className="absolute top-0 left-0 w-full h-[40vh] bg-gradient-to-b from-blue-100/50 to-slate-50 dark:from-blue-950/30 dark:to-slate-950 -z-10 pointer-events-none"></div>
        <div className="w-16 h-16 relative mt-20">
          <div className="w-16 h-16 rounded-full border-4 border-blue-200 dark:border-blue-900 border-t-blue-600 dark:border-t-blue-500 animate-spin absolute inset-0"></div>
        </div>
        <p className="text-slate-500 dark:text-slate-400 mt-4 font-medium animate-pulse">Loading job details...</p>
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
      setJob({ ...job, hasApplied: true });
    } catch (err) {
      alert(err.response?.data?.message || "Application failed");
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pb-20 transition-colors duration-300">
      
      {/* Decorative top background */}
      <div className="absolute top-0 left-0 w-full h-[40vh] bg-gradient-to-b from-blue-100/50 to-slate-50 dark:from-blue-950/30 dark:to-slate-950 -z-10 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Navigation */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Jobs
        </Link>

        {/* TOP HEADER CARD */}
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 sm:p-10 shadow-sm border border-slate-200 dark:border-slate-800 relative overflow-hidden mb-8">
          {/* Abstract decorative elements */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between w-full">
            
            {/* Left Side: Logo and Info */}
            <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
              {/* Logo */}
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center overflow-hidden shrink-0 shadow-sm p-4">
                {job.employer?.companyProfile?.companyLogo ? (
                  <img
                    src={job.employer.companyProfile.companyLogo?.startsWith('http') ? job.employer.companyProfile.companyLogo : `https://job-portal-v3nf.onrender.com${job.employer.companyProfile.companyLogo}`}
                    alt="Company Logo"
                    className="w-full h-full object-contain drop-shadow-sm"
                  />
                ) : (
                  <Building2 className="w-12 h-12 text-slate-300 dark:text-slate-600" />
                )}
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${job.status === 'Open' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}>
                    {job.status}
                  </span>
                  <span className="text-sm font-medium text-slate-500 flex items-center gap-1">
                    <Clock className="w-4 h-4" /> 
                    Posted recently
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-white leading-tight mb-3">
                  {job.title}
                </h1>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-slate-600 dark:text-slate-400 font-medium text-sm sm:text-base">
                  <div className="flex items-center gap-2">
                    <Building className="w-5 h-5 text-blue-500" />
                    <span className="text-slate-800 dark:text-slate-200">{job.employer?.companyProfile?.companyName || 'Unknown Company'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-purple-500" />
                    <span>{job.employer?.companyProfile?.industry || 'Various Industries'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-rose-500" />
                    <span>{job.employer?.companyProfile?.location || 'Remote / Not specified'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Salary and Apply CTA */}
            <div className="w-full lg:w-auto bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-6 lg:p-8 border border-slate-100 dark:border-slate-700/50 text-center shrink-0 shadow-sm min-w-[280px]">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Annual Salary</p>
              <h2 className="text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500 mb-6">
                ₹{job.salary} <span className="text-lg font-bold text-slate-500 dark:text-slate-400">LPA</span>
              </h2>

              <div className="flex flex-col gap-3">
                {user?.role === "jobseeker" && (
                  <button
                    onClick={handleApply}
                    disabled={job.hasApplied}
                    className={`w-full px-6 py-3.5 rounded-2xl font-bold transition-colors shadow-lg ${
                      job.hasApplied
                        ? "bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed shadow-none"
                        : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/30"
                    }`}
                  >
                    {job.hasApplied ? "Already Applied" : "Apply Now"}
                  </button>
                )}

                {user?.role === "employer" && job.employer?._id === user._id && (
                  <Link
                    to={`/edit-job/${job._id}`}
                    className="w-full flex items-center justify-center bg-amber-500 hover:bg-amber-600 text-white px-6 py-3.5 rounded-2xl font-bold transition-colors shadow-lg shadow-amber-500/30"
                  >
                    Edit Job
                  </Link>
                )}

                {!user && (
                  <Link
                    to="/login"
                    className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-2xl font-bold transition-colors shadow-lg shadow-blue-500/30"
                  >
                    Login to Apply
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* LEFT CONTENT AREA */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            
            {/* Job Overview Grid */}
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 shadow-sm border border-slate-200 dark:border-slate-800">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Job Overview</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1">
                    <Briefcase className="w-4 h-4 text-purple-500" />
                    <span className="text-xs font-semibold uppercase tracking-wider">Job Type</span>
                  </div>
                  <p className="font-medium text-slate-900 dark:text-slate-200">{job.jobType}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1">
                    <User className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-semibold uppercase tracking-wider">Experience</span>
                  </div>
                  <p className="font-medium text-slate-900 dark:text-slate-200">{job.experienceLevel}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1">
                    <Users className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-semibold uppercase tracking-wider">Vacancies</span>
                  </div>
                  <p className="font-medium text-slate-900 dark:text-slate-200">{job.vacancies} Openings</p>
                </div>
                <div className="flex flex-col gap-1 sm:col-span-3">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1">
                    <Calendar className="w-4 h-4 text-rose-500" />
                    <span className="text-xs font-semibold uppercase tracking-wider">Application Deadline</span>
                  </div>
                  <p className="font-medium text-slate-900 dark:text-slate-200">
                    {job.deadline ? new Date(job.deadline).toLocaleDateString("en-IN", { day: 'numeric', month: 'long', year: 'numeric' }) : "No Deadline"}
                  </p>
                </div>
              </div>
            </div>

            {/* Description Card */}
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 shadow-sm border border-slate-200 dark:border-slate-800">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                <Target className="w-5 h-5 text-blue-500" />
                Job Description
              </h2>
              <div className="prose prose-slate dark:prose-invert max-w-none prose-p:leading-relaxed prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-headings:font-bold">
                <p className="dark:text-slate-200 whitespace-pre-line">{job.description}</p>
              </div>
            </div>

            {/* Required Skills Card */}
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 shadow-sm border border-slate-200 dark:border-slate-800">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {job.skills?.length > 0 ? (
                  job.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-semibold flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-slate-500 text-sm">No specific skills listed.</p>
                )}
              </div>
            </div>

          </div>

          {/* RIGHT SIDEBAR */}
          <div className="lg:col-span-1 flex flex-col gap-8 sticky top-8">
            
            {/* CTA / Action Card */}
            

            {/* AI Match Badge (if jobseeker) */}
            {user?.role === "jobseeker" && (
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[2rem] p-8 shadow-xl shadow-indigo-500/20 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
                
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md mb-4 shadow-inner">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-1">AI Match Score</h3>
                  <p className="text-indigo-100 text-sm mb-6 max-w-[200px]">Our AI analyzed your profile against this role.</p>

                  <div className="relative w-32 h-32 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90 absolute inset-0" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" className="stroke-white/20" strokeWidth="8" />
                      <circle 
                        cx="50" cy="50" r="45" fill="none" 
                        className={`stroke-white drop-shadow-md transition-all duration-1000 ease-out`}
                        strokeWidth="8" 
                        strokeLinecap="round"
                        strokeDasharray="283"
                        strokeDashoffset={283 - (283 * (job.matchScore || 0)) / 100}
                      />
                    </svg>
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-3xl font-black">{job.matchScore ?? 0}%</span>
                    </div>
                  </div>
                  
                  <p className="mt-4 font-semibold text-white bg-white/20 px-4 py-1.5 rounded-full backdrop-blur-sm text-sm border border-white/20">
                    {job.matchScore >= 80 ? "Excellent Match" : job.matchScore >= 60 ? "Good Match" : "Low Match"}
                  </p>
                  
                  <div className="w-full h-px bg-white/20 my-6"></div>
                  
                  <Link
                    to={`/interview/${job._id}`}
                    className="w-full bg-white text-indigo-600 hover:bg-indigo-50 px-6 py-3.5 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Bot className="w-5 h-5" />
                    Start AI Interview
                  </Link>
                </div>
              </div>
            )}

            {/* Company Info Card */}
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 shadow-sm border border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">About Company</h3>
              
              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Company Size</p>
                  <p className="font-medium text-slate-900 dark:text-slate-200">{job.employer?.companyProfile?.companySize || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Founded Year</p>
                  <p className="font-medium text-slate-900 dark:text-slate-200">{job.employer?.companyProfile?.foundedYear || 'Not specified'}</p>
                </div>
              </div>

              {job.employer?.companyProfile?.website && (
                <a
                  href={job.employer.companyProfile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 dark:bg-blue-500/10 dark:hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 px-4 py-3 rounded-xl font-bold transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  Visit Website
                  <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-50" />
                </a>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleJob;
