import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/jobApi";
import { Plus, Users, Briefcase, MapPin, IndianRupee, Clock, Trash2, Edit2, Search, Filter } from "lucide-react";

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/my-jobs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job posting?")) return;
    try {
      const token = localStorage.getItem("token");
      await API.delete(`/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs((prev) => prev.filter((job) => job._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete job");
    }
  };

  const getSortedJobs = () => {
    const j = [...jobs];
    if (sortBy === "newest") return j.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (sortBy === "oldest") return j.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    if (sortBy === "most_applicants") return j.sort((a, b) => (b.applicantCount || 0) - (a.applicantCount || 0));
    if (sortBy === "least_applicants") return j.sort((a, b) => (a.applicantCount || 0) - (b.applicantCount || 0));
    return j;
  };

  const displayedJobs = getSortedJobs();

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 dark:bg-slate-950 transition-colors duration-300 pb-20">
      
      {/* Header Background */}
      <div className="h-64 bg-gradient-to-br from-blue-600 to-indigo-700 w-full relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl -ml-20 -mb-20"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        
        {/* Page Header & Controls */}
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 sm:p-8 shadow-xl shadow-blue-900/5 border border-slate-100 dark:border-slate-800 mb-8 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">My Posted Jobs</h1>
            <p className="text-slate-500 font-medium">Manage your job listings and track applicants.</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
            <div className="relative group flex-1 sm:flex-none">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Filter className="w-4 h-4 text-slate-400" />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-48 pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-all dark:text-white font-medium appearance-none shadow-sm text-sm"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="most_applicants">Most Applicants</option>
                <option value="least_applicants">Least Applicants</option>
              </select>
            </div>
            
            <Link
              to="/add-job"
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/30 whitespace-nowrap"
            >
              <Plus className="w-5 h-5" />
              Post Job
            </Link>
          </div>
        </div>

        {/* Jobs Grid */}
        {displayedJobs.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-12 text-center shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-24 h-24 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-6">
              <Briefcase className="w-10 h-10 text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              No Jobs Posted Yet
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-8">
              Create your first job posting to start receiving applications from talented candidates.
            </p>
            <Link
              to="/add-job"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-2xl font-bold transition-all shadow-lg shadow-blue-500/30 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Post a Job Now
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {displayedJobs.map((job) => (
              <div
                key={job._id}
                className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col group"
              >
                {/* Job Header */}
                <div className="p-6 sm:p-8 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${job.status === 'Open' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}>
                          {job.status || "Open"}
                        </span>
                        <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {new Date(job.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <h2 className="text-2xl font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {job.title}
                      </h2>
                      <p className="text-sm font-medium text-slate-500 mt-1 flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4 text-purple-500" />
                        {job.category || job.jobType}
                      </p>
                    </div>
                    
                    {/* Applicant Badge */}
                    <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 px-4 py-3 rounded-2xl flex flex-col items-center justify-center shrink-0 min-w-[80px]">
                      <span className="text-2xl font-black text-blue-600 dark:text-blue-400 leading-none mb-1">
                        {job.applicantCount || 0}
                      </span>
                      <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">
                        Applicants
                      </span>
                    </div>
                  </div>

                  {/* Job Meta Grid */}
                  <div className="grid grid-cols-2 gap-y-4 gap-x-6 mt-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center shrink-0">
                        <IndianRupee className="w-5 h-5 text-emerald-500" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Salary</p>
                        <p className="font-semibold text-slate-900 dark:text-slate-200">{job.salary} LPA</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center shrink-0">
                        <Briefcase className="w-5 h-5 text-purple-500" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Type</p>
                        <p className="font-semibold text-slate-900 dark:text-slate-200">{job.jobType}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-4 sm:p-6 bg-slate-50/50 dark:bg-slate-800/20 mt-auto flex flex-wrap gap-3">
                  <Link
                    to={`/job/${job._id}/applicants`}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-sm shadow-blue-500/20"
                  >
                    <Users className="w-4 h-4" />
                    View Applicants
                  </Link>

                  <Link
                    to={`/edit-job/${job._id}`}
                    className="w-12 h-12 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 hover:border-amber-200 dark:hover:border-amber-900/50 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-xl flex items-center justify-center transition-all shadow-sm"
                    title="Edit Job"
                  >
                    <Edit2 className="w-5 h-5" />
                  </Link>

                  <button
                    onClick={() => handleDelete(job._id)}
                    className="w-12 h-12 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 hover:border-rose-200 dark:hover:border-rose-900/50 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl flex items-center justify-center transition-all shadow-sm"
                    title="Delete Job"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyJobs;
