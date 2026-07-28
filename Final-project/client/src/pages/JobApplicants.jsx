import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ApplicationAPI from "../api/applicationApi";
import { analyzeResume } from "../api/servicesApi";

const STATUS = [
  "Applied",
  "Under Review",
  "Shortlisted",
  "Interview",
  "Selected",
  "Rejected",
];

const JobApplicants = () => {
  const { jobId } = useParams();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [analyzingId, setAnalyzingId] = useState(null);

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await ApplicationAPI.get(`/job/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setApplications(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (applicationId, status) => {
    try {
      const token = localStorage.getItem("token");

      await ApplicationAPI.patch(
        `/${applicationId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setApplications((prev) =>
        prev.map((app) =>
          app._id === applicationId ? { ...app, status } : app,
        ),
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update status.");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-20 text-xl">Loading Applicants...</div>
    );
  }

  const handleAnalyze = async (applicationId) => {
    try {
      setAnalyzingId(applicationId);

      const res = await analyzeResume(applicationId);

      setApplications((prev) =>
        prev.map((app) =>
          app._id === applicationId
            ? {
                ...app,
                aiScreening: res.aiScreening,
              }
            : app,
        ),
      );
    } catch (err) {
      console.error(err);
      alert("AI Resume Screening failed.");
    } finally {
      setAnalyzingId(null);
    }
  };

  const rankedCandidates = [...applications]
    .filter((app) => app.aiScreening?.score !== undefined)
    .sort((a, b) => b.aiScreening.score - a.aiScreening.score);

  const analyzedCount = rankedCandidates.length;
  const pendingCount = applications.length - analyzedCount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-950 dark:to-slate-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Job Applicants</h1>
        {rankedCandidates.length > 0 && (
          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl shadow-md p-6 mb-6 transition-colors duration-300">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">🏆 AI Candidate Ranking</h2>

              <div className="text-sm text-gray-600 dark:text-gray-300">
                <p>Total: {applications.length}</p>
                <p>Analyzed: {analyzedCount}</p>
                <p>Pending: {pendingCount}</p>
              </div>
            </div>

            <div className="space-y-4">
              {rankedCandidates.map((candidate, index) => (
                <div key={candidate._id} className="border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-lg p-4 transition-colors duration-300">
                  <div className="flex justify-between items-center">
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {index === 0 && "🥇 "}
                      {index === 1 && "🥈 "}
                      {index === 2 && "🥉 "}
                      {index > 2 && `${index + 1}. `}

                      {candidate.applicant.name}
                    </div>

                    <div className="font-bold text-lg text-gray-900 dark:text-white">
                      {candidate.aiScreening.score}%
                    </div>
                  </div>

                  <div className="w-full bg-gray-200 dark:bg-slate-600 rounded-full h-2 mt-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{
                        width: `${candidate.aiScreening.score}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {applications.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl shadow p-8 text-center text-gray-500 dark:text-gray-400">
            No applicants yet.
          </div>
        ) : (
          applications.map((app) => (
            <div
              key={app._id}
              className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl shadow-md p-6 mb-6 transition-colors duration-300"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
                {/* Left */}

                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{app.applicant?.name}</h2>

                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    📧 {app.applicant?.email}
                  </p>

                  {app.applicant?.phone && (
                    <p className="text-gray-600 dark:text-gray-300">📞 {app.applicant.phone}</p>
                  )}

                  {app.coverLetter && (
                    <>
                      <h3 className="font-semibold mt-4">Cover Letter</h3>

                      <p className="text-gray-700 dark:text-gray-300 mt-1">{app.coverLetter}</p>
                    </>
                  )}

                  {app.aiScreening && (
                    <div className="mt-6 rounded-2xl border border-gray-200 dark:border-slate-600 shadow-md overflow-hidden">
                      {/* Header */}
                      <div className="bg-gradient-to-r from-violet-600 to-blue-600 text-white px-5 py-3 flex items-center justify-between">
                        <h3 className="text-lg font-bold">
                          🤖 AI Resume Screening
                        </h3>

                        <span className="text-sm opacity-90">
                          {new Date(
                            app.aiScreening.analyzedAt,
                          ).toLocaleString()}
                        </span>
                      </div>

                      <div className="p-5 bg-white dark:bg-slate-800">
                        {/* Score */}
                        <div className="mb-6">
                          <div className="flex justify-between mb-2">
                            <span className="font-semibold text-gray-900 dark:text-white">Match Score</span>

                            <span className={`font-bold text-lg ${
  app.aiScreening.score >= 80
    ? "text-green-600 dark:text-green-400"
    : app.aiScreening.score >= 60
      ? "text-blue-600 dark:text-blue-400"
      : app.aiScreening.score >= 40
        ? "text-yellow-600 dark:text-yellow-400"
        : "text-red-600 dark:text-red-400"
}`}>
                              {app.aiScreening.score}%
                            </span>
                          </div>

                          <div className="w-full bg-gray-200 dark:bg-slate-600 rounded-full h-3">
                            <div
                              className={`h-3 rounded-full transition-all duration-700 ${
                                app.aiScreening.score >= 80
                                  ? "bg-green-500"
                                  : app.aiScreening.score >= 60
                                    ? "bg-blue-500"
                                    : app.aiScreening.score >= 40
                                      ? "bg-yellow-500"
                                      : "bg-red-500"
                              }`}
                              style={{
                                width: `${app.aiScreening.score}%`,
                              }}
                            />
                          </div>
                        </div>

                        {/* Recommendation */}

                        <div className="mb-5">
                          <span
                            className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                              app.aiScreening.score >= 80
  ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-700"
  : app.aiScreening.score >= 60
    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-700"
    : app.aiScreening.score >= 40
      ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border border-yellow-700"
      : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-700"
                            }`}
                          >
                            {app.aiScreening.recommendation}
                          </span>
                        </div>

                        {/* Experience & Education */}

                        <div className="grid md:grid-cols-2 gap-4 mb-5">
                          <div className="border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 rounded-xl p-3">
                            <p className="text-gray-500 dark:text-gray-400 text-sm font-semibold">
                              Experience Match
                            </p>

                            <p className="font-semibold text-gray-900 dark:text-white">
                              {app.aiScreening.experienceMatch}
                            </p>
                          </div>

                          <div className="border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 rounded-xl p-3">
                            <p className="text-gray-500 dark:text-gray-400 text-sm font-semibold">
                              Education Match
                            </p>

                            <p className="font-semibold text-gray-900 dark:text-white">
                              {app.aiScreening.educationMatch}
                            </p>
                          </div>
                        </div>

                        {/* Summary */}

                        <div className="mb-5">
                          <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">AI Summary</h4>

                          <p className="text-gray-700 dark:text-gray-300">
                            {app.aiScreening.summary}
                          </p>
                        </div>

                        {/* Strengths */}

                        <div className="mb-5">
                          <h4 className="font-semibold mb-2 text-green-600 dark:text-green-400">✅ Strengths</h4>

                          <div className="flex flex-wrap gap-2">
                            {app.aiScreening.strengths?.map((item, index) => (
                              <span
                                key={index}
                                className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-transparent dark:border-green-700 px-3 py-1 rounded-full text-sm transition-colors"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Missing Skills */}

                        <div>
                          <h4 className="font-semibold mb-2 text-red-600 dark:text-red-400">
                            ❌ Missing Skills
                          </h4>

                          <div className="flex flex-wrap gap-2">
                            {app.aiScreening.missingSkills?.map(
                              (item, index) => (
                                <span
                                  key={index}
                                  className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-transparent dark:border-red-700 px-3 py-1 rounded-full text-sm transition-colors"
                                >
                                  {item}
                                </span>
                              ),
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right */}

                <div className="flex flex-col gap-3 min-w-[220px]">
                  <div className="flex flex-col gap-3 min-w-[220px]">
                    <Link
                      to={`/candidate/${app.applicant._id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-center"
                    >
                      View Profile
                    </Link>

                    <Link
                      to={`/chat/${app.applicant._id}`}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-center"
                    >
                      💬 Chat
                    </Link>

                    {app.resume?.resumeFile && (
                      <a
                        href={`http://localhost:5500/uploads/resumes/${app.resume.resumeFile}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-center"
                      >
                        Download Resume
                      </a>
                    )}

                    {/* 🤖 ADD HERE */}
                    <button
                      onClick={() => handleAnalyze(app._id)}
                      disabled={analyzingId === app._id}
                      className={`px-4 py-2 rounded-lg text-white transition ${
                        analyzingId === app._id
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-purple-600 hover:bg-purple-700"
                      }`}
                    >
                      {analyzingId === app._id
                        ? "🤖 Analyzing..."
                        : app.aiScreening
                          ? "✅ View AI Analysis"
                          : "🤖 Analyze Resume"}
                    </button>

                    <select
                      value={app.status}
                      onChange={(e) => updateStatus(app._id, e.target.value)}
                      className="border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white rounded-lg p-2 transition-colors duration-300"
                    >
                      {STATUS.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default JobApplicants;
