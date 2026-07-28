import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Brain, Loader2 } from "lucide-react";
import { generateInterviewQuestions } from "../api/aiApi";

const InterviewQuestions = () => {
  const { jobId } = useParams();

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState(null);
  const [error, setError] = useState("");

  const handleGenerateQuestions = async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await generateInterviewQuestions(jobId);

      setQuestions(data.questions);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to generate interview questions.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-slate-100 to-gray-200 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Back */}

        <Link
          to={-1}
          className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium transition mb-8"
        >
          <ArrowLeft size={18} />
          Back
        </Link>

        {/* Hero */}

        <div className="relative overflow-hidden rounded-3xl border border-gray-200 dark:border-slate-700 bg-gradient-to-br from-indigo-600 via-blue-600 to-violet-700 shadow-2xl">
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/10 blur-3xl"></div>

          <div className="absolute -bottom-24 -left-20 w-72 h-72 rounded-full bg-cyan-300/10 blur-3xl"></div>

          <div className="relative px-8 py-8 lg:px-12 lg:py-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur px-4 py-2 text-sm font-semibold text-white">
                <Brain size={18} />
                AI Powered
              </div>

              <h1 className="mt-6 text-4xl lg:text-5xl font-bold text-white">
                Interview Question Generator
              </h1>

              <p className="mt-4 max-w-2xl text-blue-100 leading-8 text-lg">
                Generate personalized Technical, HR and Coding interview
                questions based on this job description using AI.
              </p>

              <button
                onClick={handleGenerateQuestions}
                disabled={loading}
                className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-white text-indigo-700 hover:bg-gray-100 px-7 py-4 font-semibold shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-60 disabled:hover:scale-100"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Generating Questions...
                  </>
                ) : (
                  <>
                    <Brain size={20} />
                    Generate Questions
                  </>
                )}
              </button>
            </div>

            <div className="hidden lg:flex">
              <div className="w-28 h-28 rounded-3xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center shadow-xl">
                <Brain size={60} className="text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Error */}

        {error && (
          <div className="mt-6 bg-red-100 border border-red-300 text-red-700 rounded-xl p-4">
            {error}
          </div>
        )}

        {/* Questions */}

        {/* Questions */}

        {questions && (
          <div className="space-y-8 mt-10">
            {/* Technical */}

            <div className="rounded-3xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xl overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200 dark:border-slate-700 bg-gradient-to-r from-indigo-600 to-violet-700">
                <h2 className="text-2xl font-bold text-white">
                  💻 Technical Questions
                </h2>
              </div>

              <div className="p-7">
                <ol className="list-decimal pl-6 space-y-5">
                  {questions.technical?.map((question, index) => (
                    <li
                      key={index}
                      className="leading-8 text-gray-700 dark:text-gray-300"
                    >
                      {question}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* HR */}

            <div className="rounded-3xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xl overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200 dark:border-slate-700 bg-gradient-to-r from-emerald-500 to-green-600">
                <h2 className="text-2xl font-bold text-white">
                  👨‍💼 HR Questions
                </h2>
              </div>

              <div className="p-7">
                <ol className="list-decimal pl-6 space-y-5">
                  {questions.hr?.map((question, index) => (
                    <li
                      key={index}
                      className="leading-8 text-gray-700 dark:text-gray-300"
                    >
                      {question}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Coding */}

            {questions.coding && questions.coding.length > 0 && (
              <div className="rounded-3xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xl overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200 dark:border-slate-700 bg-gradient-to-r from-amber-500 to-orange-500">
                  <h2 className="text-2xl font-bold text-white">
                    👨‍💻 Coding Questions
                  </h2>
                </div>

                <div className="p-7">
                  <ol className="list-decimal pl-6 space-y-5">
                    {questions.coding.map((question, index) => (
                      <li
                        key={index}
                        className="leading-8 text-gray-700 dark:text-gray-300"
                      >
                        {question}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewQuestions;
