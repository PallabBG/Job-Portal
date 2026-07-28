import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApplicationAPI from "../api/applicationApi";
import { Building2, IndianRupee, Clock, Briefcase, FileText, MapPin, MessageSquare, ExternalLink, CheckCircle2, XCircle, Clock4 } from "lucide-react";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await ApplicationAPI.get("/my-applications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApplications(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getSortedApplications = () => {
    return [...applications].sort((a, b) => {
      const dateA = new Date(a.updatedAt || a.createdAt);
      const dateB = new Date(b.updatedAt || b.createdAt);
      return dateB - dateA; // Descending (most recently updated first)
    });
  };

  const displayedApplications = getSortedApplications();

  const getStatusIcon = (status) => {
    if (status === "Accepted") return <CheckCircle2 className="w-4 h-4" />;
    if (status === "Rejected") return <XCircle className="w-4 h-4" />;
    return <Clock4 className="w-4 h-4" />;
  };

  const getStatusColor = (status) => {
    if (status === "Accepted") return "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20";
    if (status === "Rejected") return "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20";
    return "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20";
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 dark:bg-slate-950 transition-colors duration-300 pb-20">
      
      {/* Header Background */}
      <div className="h-64 bg-gradient-to-br from-indigo-600 to-purple-700 w-full relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl -ml-20 -mb-20"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        
        {/* Page Header */}
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 sm:p-8 shadow-xl shadow-indigo-900/5 border border-slate-100 dark:border-slate-800 mb-8">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">My Applications</h1>
          <p className="text-slate-500 font-medium">Track your job applications and stay updated on your status.</p>
        </div>

        {/* Applications List */}
        {displayedApplications.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-12 text-center shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-24 h-24 bg-indigo-50 dark:bg-indigo-900/20 rounded-full flex items-center justify-center mb-6">
              <FileText className="w-10 h-10 text-indigo-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              No Applications Yet
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-8">
              You haven't applied to any jobs yet. Start browsing opportunities to find your dream role!
            </p>
            <Link
              to="/"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-500/30 flex items-center gap-2"
            >
              <ExternalLink className="w-5 h-5" />
              Browse Jobs Now
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {displayedApplications.map((app) => (
              <div
                key={app._id}
                className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col group relative"
              >
                {/* Active Indicator line if recently updated */}
                <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                  app.status === "Accepted" ? "bg-emerald-500" : 
                  app.status === "Rejected" ? "bg-rose-500" : "bg-amber-400"
                }`}></div>

                {/* Header */}
                <div className="p-6 sm:p-8 pl-8 sm:pl-10 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 border ${getStatusColor(app.status)}`}>
                          {getStatusIcon(app.status)}
                          {app.status}
                        </span>
                        <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          Updated {new Date(app.updatedAt || app.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <h2 className="text-2xl font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mt-3">
                        {app.job?.title || "Job Unavailable"}
                      </h2>
                    </div>
                  </div>

                  {/* Company Info */}
                  <div className="flex items-center gap-3 mt-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                    <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center font-bold text-lg shrink-0">
                      {(app.employer?.companyProfile?.companyName || app.employer?.name || "C").charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-slate-200">
                        {app.employer?.companyProfile?.companyName || app.employer?.name}
                      </p>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3" />
                        {app.employer?.companyProfile?.location || "Remote"}
                      </p>
                    </div>
                  </div>

                  {/* Meta Grid */}
                  <div className="grid grid-cols-2 gap-y-4 gap-x-6 mt-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center shrink-0">
                        <IndianRupee className="w-5 h-5 text-emerald-500" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Salary</p>
                        <p className="font-semibold text-slate-900 dark:text-slate-200">{app.job?.salary || "N/A"} LPA</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center shrink-0">
                        <Briefcase className="w-5 h-5 text-purple-500" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Type</p>
                        <p className="font-semibold text-slate-900 dark:text-slate-200">{app.job?.jobType || "N/A"}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-4 sm:p-6 pl-6 sm:pl-8 bg-slate-50/50 dark:bg-slate-800/20 mt-auto flex flex-wrap gap-3">
                  <Link
                    to={`/chat/${app.employer?._id}`}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-sm shadow-indigo-500/20"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Chat with HR
                  </Link>

                  <Link
                    to={`/job/${app.job?._id}`}
                    className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-900/50 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Job
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
        
      </div>
    </div>
  );
};

export default MyApplications;
