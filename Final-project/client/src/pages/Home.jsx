import React, { useEffect, useState } from "react";
import API from "../api/jobApi.js";
import JobList from "../components/Joblist";
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
  const [nearbyLoading, setNearbyLoading] = useState(false);
  const [nearbyMode, setNearbyMode] = useState(false);
  const [radius, setRadius] = useState(50);

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
            jobType: filters.jobType,
            experience: filters.experience,
            salary: filters.salary,
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

  const findNearbyJobs = () => {
    if (!navigator.geolocation) {
      return alert("Geolocation is not supported.");
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          setNearbyLoading(true);

          const res = await API.post("/nearby", {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            radius,
          });

          setJobs(res.data);
          setNearbyMode(true);
        } catch (err) {
          console.log(err);

          alert("Unable to fetch nearby jobs.");
        } finally {
          setNearbyLoading(false);
        }
      },

      () => {
        alert("Please allow location permission.");
      },
    );
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-950 dark:to-slate-900 min-h-screen transition-colors duration-300">
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
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-gray-200 dark:border-slate-700 p-4 mb-6 flex justify-between items-center transition-colors duration-300">
          <div>
            <h2 className="text-xl font-semibold text-gray-700 dark:text-white">
              Jobs Found
            </h2>

            {search && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Results for "{search}"
              </p>
            )}
          </div>

          <span className="text-2xl font-bold text-blue-600">
            {jobs.length}
          </span>
        </div>

        {/* Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />

            <input
              type="text"
              placeholder="Search jobs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-12 py-3 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
            />

            {search && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-red-500"
              >
                <FaTimes />
              </button>
            )}
          </div>

          <button
            onClick={findNearbyJobs}
            disabled={nearbyLoading}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 disabled:opacity-60 transition"
          >
            {nearbyLoading ? "Finding..." : "📍 Use My Location"}
          </button>
          <select
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="px-4 py-3 rounded-xl border dark:text-white dark:bg-slate-900 dark:border-slate-700"
          >
            <option value={10}>10 km</option>
            <option value={25}>25 km</option>
            <option value={50}>50 km</option>
            <option value={100}>100 km</option>
            <option value={250}>250 km</option>
          </select>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 text-gray-800 dark:text-white rounded-xl shadow hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors duration-300"
          >
            <FaFilter />
            Filter
          </button>
        </div>
        {nearbyMode && (
          <p className="text-green-600 dark:text-green-400 font-medium mb-5">
            📍 Showing jobs within {radius} km
          </p>
        )}
        {showFilters && (
          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl shadow-lg p-6 mb-8 animate-fadeIn transition-colors duration-300">
            <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
              Advanced Filters
            </h2>

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
                className="border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white rounded-xl p-3 transition-colors duration-300"
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
                className="border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white rounded-xl p-3 transition-colors duration-300"
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
                className="border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white rounded-xl p-3 transition-colors duration-300"
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
                className="border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white rounded-xl p-3 transition-colors duration-300"
              >
                <option value="">Experience</option>
                <option>Fresher</option>
                <option>Junior</option>
                <option>Mid-Level</option>
                <option>Senior</option>
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
                className="border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white rounded-xl p-3 transition-colors duration-300"
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
                className="border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white rounded-xl p-3 transition-colors duration-300"
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
                className="px-5 py-2 rounded-xl bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors duration-300"
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
            <h3 className="text-2xl font-semibold text-gray-600 dark:text-gray-300">
              No matching jobs found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
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
