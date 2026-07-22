import React, { useEffect, useState } from "react";
import API from "../api/jobApi.js";
import JobList from "../components/Joblist.jsx";
import { FaSearch, FaTimes, FaBriefcase, FaFilter } from "react-icons/fa";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    category: "",
    location: "",
    jobType: "",
    experience: "",
    salary: "",
    sort: "newest",
  });
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
        setLoading(true);

        const res = await API.get("/search", {
          params: {
            keyword: search,
            category: filters.category,
            location: filters.location,
            sort: filters.sort,
          },
        });

        setJobs(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [search, filters]);

  // Delete job
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?",
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await API.delete(`/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Jobs Found</h2>

            {search && (
              <p className="text-sm text-gray-500">Results for "{search}"</p>
            )}
          </div>

          <span className="text-2xl font-bold text-blue-600">
            {jobs.length}
          </span>
        </div>

        {/* Search */}
        {/* Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Search jobs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-12 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {search && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500"
              >
                <FaTimes />
              </button>
            )}
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white border rounded-xl shadow hover:bg-blue-50 transition"
          >
            <FaFilter />
            Filter
          </button>
        </div>
        {showFilters && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 animate-fadeIn">
            <h2 className="text-xl font-bold mb-6">Advanced Filters</h2>

            <div className="grid md:grid-cols-3 gap-5">
              {/* Category */}

              <select
                value={filters.category}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    category: e.target.value,
                  })
                }
                className="border rounded-xl p-3"
              >
                <option value="">Category</option>
                <option>Software Development</option>
                <option>Web Development</option>
                <option>Data Science</option>
                <option>AI / ML</option>
                <option>UI / UX</option>
                <option>Marketing</option>
              </select>

              {/* Location */}

              <input
                type="text"
                placeholder="Location"
                value={filters.location}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    location: e.target.value,
                  })
                }
                className="border rounded-xl p-3"
              />

              {/* Job Type */}

              <select
                value={filters.jobType}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    jobType: e.target.value,
                  })
                }
                className="border rounded-xl p-3"
              >
                <option value="">Job Type</option>
                <option>Full-Time</option>
                <option>Part-Time</option>
                <option>Internship</option>
                <option>Contract</option>
                <option>Remote</option>
              </select>

              {/* Experience */}

              <select
                value={filters.experience}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    experience: e.target.value,
                  })
                }
                className="border rounded-xl p-3"
              >
                <option value="">Experience</option>
                <option>Fresher</option>
                <option>1-2 Years</option>
                <option>3-5 Years</option>
                <option>5+ Years</option>
              </select>

              {/* Salary */}

              <select
                value={filters.salary}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    salary: e.target.value,
                  })
                }
                className="border rounded-xl p-3"
              >
                <option value="">Salary</option>
                <option>0-3 LPA</option>
                <option>3-6 LPA</option>
                <option>6-10 LPA</option>
                <option>10+ LPA</option>
              </select>

              {/* Sort */}

              <select
                value={filters.sort}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    sort: e.target.value,
                  })
                }
                className="border rounded-xl p-3"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="salaryHigh">Highest Salary</option>
                <option value="salaryLow">Lowest Salary</option>
              </select>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => {
                  setSearch("");

                  setFilters({
                    category: "",
                    location: "",
                    jobType: "",
                    experience: "",
                    salary: "",
                    sort: "newest",
                  });
                }}
                className="px-5 py-2 rounded-xl bg-gray-200 hover:bg-gray-300"
              >
                Clear
              </button>

              <button
                onClick={() => setShowFilters(false)}
                className="px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-2xl font-semibold text-gray-600">
              No matching jobs found
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
