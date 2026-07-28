import { useEffect, useState } from "react";
import { getJobRecommendations } from "../api/servicesApi";
import AIJobCard from "../components/AIJobCard";

const JobRecommendations = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("All");
  const [jobType, setJobType] = useState("All");
  const [experience, setExperience] = useState("All");

  useEffect(() => {
    loadRecommendations();
  }, []);

  const loadRecommendations = async () => {
    try {
      setLoading(true);

      const res = await getJobRecommendations();
      console.log(res.recommendations[0]);

      setJobs(res.recommendations || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10">Loading AI recommendations...</div>
    );
  }
  const averageMatch =
    jobs.length > 0
      ? Math.round(
          jobs.reduce((sum, job) => sum + (job.matchScore || 0), 0) /
            jobs.length,
        )
      : 0;

  const filteredJobs = jobs.filter((job) => {
    const companyName = job.employer?.companyProfile?.companyName || "";

    const matchSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      companyName.toLowerCase().includes(search.toLowerCase());

    const matchCategory = category === "All" || job.category === category;

    const matchLocation =
      location === "All" || job.employer?.companyProfile?.location === location;

    const matchJobType = jobType === "All" || job.jobType === jobType;

    const matchExperience =
      experience === "All" || job.experienceLevel === experience;

    return (
      matchSearch &&
      matchCategory &&
      matchLocation &&
      matchJobType &&
      matchExperience
    );
  });
  return (
    <div className="max-w-7xl mx-auto p-6 min-h-screen bg-transparent">
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 text-white mb-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h1 className="text-4xl font-bold">🤖 AI Job Recommendations</h1>

            <p className="mt-3 text-blue-100 max-w-2xl">
              Personalized recommendations based on your resume, skills,
              experience and career preferences.
            </p>
          </div>

          <div className="flex gap-3">
            <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 min-w-[170px] shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-2xl">
                  🤖
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-blue-100">
                    AI Recommendations
                  </p>

                  <h2 className="text-3xl font-bold leading-none mt-1">
                    {jobs.length}
                  </h2>

                  <p className="text-xs text-blue-100 mt-1">
                    Best matches found
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-5 mb-6 transition-colors duration-300">
        <div className="grid lg:grid-cols-5 gap-4">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition"
          >
            <option value="All">Category</option>

            {[...new Set(jobs.map((job) => job.category))].map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>

          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition"
          >
            <option value="All">Location</option>

            {[...new Set(jobs.map((job) => job.location))].map((loc) => (
              <option key={loc}>{loc}</option>
            ))}
          </select>

          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition"
          >
            <option value="All">Job Type</option>

            <option>Full-Time</option>
            <option>Part-Time</option>
            <option>Internship</option>
            <option>Remote</option>
          </select>

          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition"
          >
            <option value="All">Experience Level</option>

            <option>Fresher</option>
            <option>Junior</option>
            <option>Mid-Level</option>
            <option>Senior</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-5 shadow-sm transition-colors duration-300">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            🎯 Profile Match
          </p>
          <h2 className="text-3xl font-bold text-green-600">{averageMatch}%</h2>
        </div>

        <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-5 shadow-sm transition-colors duration-300">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            💼 Jobs Found
          </p>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {jobs.length}
          </h2>
        </div>

        <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-5 shadow-sm transition-colors duration-300">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            🧠 Matched Skills
          </p>
          <h2 className="text-3xl font-bold text-blue-600">
            {new Set(jobs.flatMap((job) => job.matchedSkills || [])).size}
          </h2>
        </div>

        <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-5 shadow-sm transition-colors duration-300">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            📍 Preferred Location
          </p>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {jobs[0]?.employer?.companyProfile?.location || "Not Set"}
          </h2>
        </div>
      </div>
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Left Side */}

        <div className="lg:col-span-3">
          {filteredJobs.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 py-10">
              No recommendations available.
            </p>
          ) : (
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <AIJobCard key={job._id} job={job} />
              ))}
            </div>
          )}
        </div>

        {/* Right Side */}

        <div>
          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-6 sticky top-24 transition-colors duration-300">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5">AI Insights</h2>

            <div className="mb-5">
              <p className="text-gray-500 dark:text-gray-400">Overall Match</p>

              <h1 className="text-4xl font-bold text-green-600">
                {jobs.length
                  ? Math.round(
                      jobs.reduce(
                        (sum, job) => sum + (job.matchScore || 0),
                        0,
                      ) / jobs.length,
                    )
                  : 0}
                %
              </h1>
            </div>

            <button
              onClick={loadRecommendations}
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-xl py-3 font-semibold transition-all duration-300"
            >
              🔄 Refresh Recommendations
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobRecommendations;
