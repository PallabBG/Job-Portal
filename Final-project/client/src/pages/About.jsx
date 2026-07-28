import React from "react";
import {
  FaRobot,
  FaBriefcase,
  FaUsers,
  FaCheckCircle,
} from "react-icons/fa";

const About = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-950 dark:to-slate-900 transition-colors duration-300 ">
      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            About Smart Job Portal
          </h1>

          <p className="mt-5 max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Smart Job Portal is an AI-powered recruitment platform designed to
            connect talented job seekers with the right employers through
            intelligent recommendations, seamless applications, and real-time
            communication.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">

          <div className="group bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-3xl p-5 shadow-md hover:shadow-2xl hover:-translate-y-2 hover:border-blue-500 transition-all duration-300">

            <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-6">
              <FaRobot className="text-3xl text-blue-600 dark:text-blue-400" />
            </div>

            <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-3">
              Smart Job Matching
            </h3>

            <p className="text-center text-gray-600 dark:text-gray-300">
              AI analyzes user profiles and skills to recommend the most
              relevant job opportunities.
            </p>

          </div>

          <div className="group bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-3xl p-5 shadow-md hover:shadow-2xl hover:-translate-y-2 hover:border-blue-500 transition-all duration-300">

            <div className="w-12 h-12 rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
              <FaBriefcase className="text-3xl text-green-600 dark:text-green-400" />
            </div>

            <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-3">
              Easy Applications
            </h3>

            <p className="text-center text-gray-600 dark:text-gray-300">
              Apply to jobs quickly, track applications, and communicate
              directly with employers.
            </p>

          </div>

          <div className="group bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-3xl p-5 shadow-md hover:shadow-2xl hover:-translate-y-2 hover:border-blue-500 transition-all duration-300">

            <div className="w-16 h-16 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto mb-6">
              <FaUsers className="text-3xl text-purple-600 dark:text-purple-400" />
            </div>

            <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-3">
              Employer Tools
            </h3>

            <p className="text-center text-gray-600 dark:text-gray-300">
              Post jobs, manage applications, and hire the best candidates
              using AI-assisted tools.
            </p>

          </div>

        </div>

        {/* Why Choose Us */}
        <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-3xl shadow-lg p-5">

          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Why Choose Smart Job Portal?
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="flex items-start gap-4">
              <FaCheckCircle className="text-green-500 text-xl mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  AI-Powered Recommendations
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  Personalized job recommendations based on your profile,
                  skills, and experience.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaCheckCircle className="text-green-500 text-xl mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Real-Time Chat
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  Connect instantly with employers and job seekers through
                  built-in messaging.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaCheckCircle className="text-green-500 text-xl mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Resume Screening
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  Employers can quickly evaluate resumes with AI-powered
                  screening and skill analysis.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaCheckCircle className="text-green-500 text-xl mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Secure & Easy to Use
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  A clean, secure, and user-friendly platform for both job
                  seekers and employers.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default About;