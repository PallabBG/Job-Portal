import React, { useEffect, useState } from "react";
import API from "../api/jobApi.js";
import JobList from "../components/Joblist.jsx";
import { FaSearch, FaTimes, FaBriefcase } from "react-icons/fa";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch all jobs
  const getJobs = async () => {
    try {
      setLoading(true);
      const res = await API.get("/");
      setJobs(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  // Search jobs
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      try {
        if (search.trim() === "") {
          getJobs();
        } else {
          setLoading(true);
          const res = await API.get(`/search/${search}`);
          setJobs(res.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  // Delete job
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );
    if (!confirmDelete) return;

    try {
      await API.delete(`/${id}`);
      getJobs();
    } catch (error) {
      console.error(error);
    }
  };

  const clearSearch = () => {
    setSearch("");
    getJobs();
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-10">
        
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-3xl p-10 mb-10 shadow-xl relative overflow-hidden">
          <div className="flex items-center gap-4">
            <FaBriefcase className="text-5xl opacity-90" />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                Find Your Dream Job
              </h1>
              <p className="text-lg opacity-90">
                Explore jobs, apply easily, and grow your career.
              </p>
            </div>
          </div>

          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-2xl shadow-md p-4 mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-700">
            Total Jobs
          </h2>
          <span className="text-2xl font-bold text-blue-600">
            {jobs.length}
          </span>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search jobs by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {search && (
            <button
              onClick={clearSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-500"
            >
              <FaTimes />
            </button>
          )}
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-2xl font-semibold text-gray-600">
              No jobs found
            </h3>
            <p className="text-gray-500 mt-2">
              Try searching with a different keyword.
            </p>
          </div>
        ) : (
          <JobList jobs={jobs} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
};

export default Home;