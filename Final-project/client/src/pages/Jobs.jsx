import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import API from "../api/jobApi.js";
import JobList from "../components/Joblist";
import { 
  Search, X, MapPin, Navigation, SlidersHorizontal, 
  Sparkles, Briefcase, ChevronDown, CheckCircle2 
} from "lucide-react";

const Jobs = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSearch = queryParams.get("search") || "";

  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState(initialSearch);
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
      "Are you sure you want to delete this job?"
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
      }
    );
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300 pb-16">
      
      {/* Premium Hero Section */}
      <div className="relative pt-24 pb-32 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900 overflow-hidden mx-4 md:mx-8 mt-6 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[25%] -left-[10%] w-[50%] h-[100%] rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-600/20 blur-[100px] animate-pulse"></div>
          <div className="absolute top-[20%] -right-[10%] w-[40%] h-[80%] rounded-full bg-gradient-to-tl from-blue-500/20 to-cyan-400/20 blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-white/5 border border-blue-100 dark:border-white/10 text-blue-600 dark:text-blue-300 font-medium text-sm mb-8 shadow-sm dark:shadow-2xl">
            <Sparkles className="w-4 h-4" />
            <span>Over 10,000+ Active Jobs Available</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:via-blue-100 dark:to-white tracking-tight mb-6 leading-[1.1]">
            Find Your Next <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Dream Career</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Discover thousands of job opportunities with top companies. Apply easily, track your progress, and land your ideal role.
          </p>

          {/* Integrated Search Bar */}
          <div className="bg-white dark:bg-white/10 backdrop-blur-xl border border-slate-200 dark:border-white/20 p-2.5 rounded-3xl md:rounded-full shadow-xl dark:shadow-2xl flex flex-col md:flex-row gap-3 max-w-4xl mx-auto">
            {/* Keyword Search */}
            <div className="flex-1 flex items-center bg-slate-50 dark:bg-transparent md:bg-transparent rounded-2xl md:rounded-l-full md:rounded-r-none px-5 py-3 border border-transparent hover:bg-slate-100 dark:hover:bg-white/10 transition-colors group">
              <Search className="w-5 h-5 text-blue-500 dark:text-blue-400 shrink-0 transition-colors" />
              <input 
                type="text"
                placeholder="Job title, keywords, or company"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent border-none text-slate-900 dark:text-white placeholder-slate-400 px-3 focus:outline-none focus:ring-0 text-base"
              />
              {search && (
                <button onClick={clearSearch} className="text-slate-400 hover:text-white transition-colors p-1">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="hidden md:block w-px bg-slate-200 dark:bg-white/10 self-stretch my-2"></div>

            {/* Location/Radius Group */}
            <div className="flex-1 flex items-center bg-slate-50 dark:bg-transparent md:bg-transparent rounded-2xl md:rounded-none px-5 py-3 border border-transparent hover:bg-slate-100 dark:hover:bg-white/10 transition-colors group">
              <MapPin className="w-5 h-5 text-indigo-500 dark:text-indigo-400 shrink-0 transition-colors" />
              <select 
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
                className="w-full bg-transparent border-none text-slate-700 dark:text-slate-200 px-3 focus:outline-none focus:ring-0 appearance-none text-base dark:[&>option]:bg-slate-900 [&>option]:bg-white cursor-pointer"
              >
                <option value={10}>Within 10 km</option>
                <option value={25}>Within 25 km</option>
                <option value={50}>Within 50 km</option>
                <option value={100}>Within 100 km</option>
                <option value={250}>Within 250 km</option>
              </select>
              <button 
                onClick={findNearbyJobs}
                disabled={nearbyLoading}
                className="text-indigo-400 hover:text-white bg-indigo-500/20 hover:bg-indigo-500/40 rounded-xl px-3 py-1.5 transition-all text-sm font-bold shrink-0 flex items-center gap-1.5"
                title="Use my location"
              >
                <Navigation className="w-3.5 h-3.5" />
                {nearbyLoading ? "..." : "Locate"}
              </button>
            </div>

            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3.5 px-8 rounded-2xl md:rounded-full transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] shrink-0 flex items-center justify-center gap-2 text-base">
              Search Jobs
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        
        {/* Main Interface */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Sidebar - Filters */}
          <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-blue-600" />
                  Filters
                </h2>
                <button 
                  onClick={() => {
                    setFilters({ category: "", location: "", jobType: "", experience: "", salary: "", sort: "newest" });
                    setSearch("");
                  }}
                  className="text-xs font-semibold text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Reset All
                </button>
              </div>

              <div className="space-y-6">
                {/* Category */}
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Category</label>
                  <div className="relative">
                    <select
                      value={filters.category}
                      onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                      className="w-full appearance-none bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all cursor-pointer"
                    >
                      <option value="">All Categories</option>
                      <option>Software Development</option>
                      <option>Web Development</option>
                      <option>Data Science</option>
                      <option>AI / ML</option>
                      <option>UI / UX</option>
                      <option>Marketing</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Job Type */}
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Job Type</label>
                  <div className="flex flex-col gap-2">
                    {['Full-Time', 'Part-Time', 'Internship', 'Contract', 'Remote'].map(type => (
                      <label key={type} className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="radio" 
                          name="jobType"
                          value={type}
                          checked={filters.jobType === type}
                          onChange={(e) => setFilters({ ...filters, jobType: e.target.value })}
                          className="hidden"
                        />
                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${filters.jobType === type ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 dark:border-slate-600 group-hover:border-blue-400 bg-transparent'}`}>
                          {filters.jobType === type && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                        <span className={`text-sm font-medium ${filters.jobType === type ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-300'}`}>
                          {type}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Experience Level</label>
                  <div className="relative">
                    <select
                      value={filters.experience}
                      onChange={(e) => setFilters({ ...filters, experience: e.target.value })}
                      className="w-full appearance-none bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all cursor-pointer"
                    >
                      <option value="">Any Experience</option>
                      <option>Fresher</option>
                      <option>Junior</option>
                      <option>Mid-Level</option>
                      <option>Senior</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Salary */}
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Salary Range</label>
                  <div className="relative">
                    <select
                      value={filters.salary}
                      onChange={(e) => setFilters({ ...filters, salary: e.target.value })}
                      className="w-full appearance-none bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all cursor-pointer"
                    >
                      <option value="">Any Salary</option>
                      <option>0-3 LPA</option>
                      <option>3-6 LPA</option>
                      <option>6-10 LPA</option>
                      <option>10+ LPA</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Right Content - Job List */}
          <div className="lg:w-3/4 flex flex-col">
            
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    {jobs.length} {jobs.length === 1 ? 'Job' : 'Jobs'} Found
                  </h2>
                  {search && <p className="text-xs text-slate-500">Results for "{search}"</p>}
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </button>

                <div className="relative flex-1 sm:flex-none">
                  <select
                    value={filters.sort}
                    onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                    className="w-full appearance-none bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl px-4 py-2 pr-10 text-sm font-semibold border-none focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="salaryHigh">Highest Salary</option>
                    <option value="salaryLow">Lowest Salary</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Loading / Empty / List */}
            {loading ? (
              <div className="flex-1 flex flex-col justify-center items-center py-32 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-slate-500 font-medium">Finding perfect roles for you...</p>
              </div>
            ) : jobs.length === 0 ? (
              <div className="flex-1 flex flex-col justify-center items-center py-32 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-center px-4">
                <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
                  <Search className="w-10 h-10 text-slate-400" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  No matching jobs found
                </h3>
                <p className="text-slate-500 dark:text-slate-400 max-w-md">
                  We couldn't find any jobs matching your current search and filter criteria. Try broadening your search or resetting filters.
                </p>
                <button 
                  onClick={() => {
                    setSearch("");
                    setFilters({ category: "", location: "", jobType: "", experience: "", salary: "", sort: "newest" });
                  }}
                  className="mt-6 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="pb-8">
                {nearbyMode && (
                  <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 p-4 rounded-2xl mb-6 flex items-center gap-3">
                    <MapPin className="w-5 h-5" />
                    <span className="font-semibold text-sm">Showing jobs within {radius} km of your location</span>
                  </div>
                )}
                <JobList jobs={jobs} onDelete={handleDelete} />
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
