import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { 
  MapPin, Briefcase, Star, Users, Calendar, 
  ChevronRight, Building2, Trash2 
} from "lucide-react";

const JobCard = ({ job, onDelete }) => {
  const { user } = useAuth();
  
  return (
    <div className="group relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-900/20 transition-all duration-300 flex flex-col h-full overflow-hidden">
      
      {/* Decorative gradient blob on hover */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

      {/* Top Section: Logo & Status/Salary */}
      <div className="flex justify-between items-start gap-4 mb-5 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center overflow-hidden shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-300">
            {job.employer?.companyProfile?.companyLogo ? (
              <img
                src={job.employer.companyProfile.companyLogo?.startsWith('http') ? job.employer.companyProfile.companyLogo : `${import.meta.env.VITE_API_URL}${job.employer.companyProfile.companyLogo}`}
                alt={`${job.employer.companyProfile.companyName} Logo`}
                className="w-full h-full object-contain p-2"
              />
            ) : (
              <Building2 className="w-8 h-8 text-slate-400" />
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
              {job.title}
            </h2>
            <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-300 mt-1 line-clamp-1">
              {job.employer?.companyProfile?.companyName || "Unknown Company"}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-500 line-clamp-1">
              {job.employer?.companyProfile?.industry || "Various Industries"}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end shrink-0">
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 ${job.status === 'Open' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}>
            {job.status}
          </span>
          <div className="text-right">
            <h4 className="text-lg font-black text-slate-800 dark:text-white">
              ₹{job.salary} <span className="text-sm font-medium text-slate-500">LPA</span>
            </h4>
          </div>
        </div>
      </div>

      {/* Middle Section: Meta Info Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 relative z-10">
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 px-3 py-2 rounded-xl">
          <MapPin className="w-4 h-4 text-blue-500 shrink-0" />
          <span className="truncate">{job.employer?.companyProfile?.location || "Remote"}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 px-3 py-2 rounded-xl">
          <Briefcase className="w-4 h-4 text-purple-500 shrink-0" />
          <span className="truncate">{job.jobType}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 px-3 py-2 rounded-xl">
          <Star className="w-4 h-4 text-amber-500 shrink-0" />
          <span className="truncate">{job.experienceLevel}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 px-3 py-2 rounded-xl">
          <Users className="w-4 h-4 text-emerald-500 shrink-0" />
          <span className="truncate">{job.vacancies} Openings</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 px-3 py-2 rounded-xl sm:col-span-2">
          <Calendar className="w-4 h-4 text-rose-500 shrink-0" />
          <span className="truncate">
            Deadline: {job.deadline ? new Date(job.deadline).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' }) : "Not specified"}
          </span>
        </div>
      </div>

      {/* Bottom Section: Skills & Actions */}
      <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
        <div className="flex flex-wrap gap-2 flex-1">
          {job.skills?.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-medium"
            >
              {skill}
            </span>
          ))}
          {job.skills?.length > 3 && (
            <span className="px-3 py-1 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-lg text-xs font-medium">
              +{job.skills.length - 3} more
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {(user?.role === "admin" || (user?.role === "employer" && job.employer?._id === user?._id)) && (
            <button
              onClick={() => onDelete(job._id)}
              className="p-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors"
              title="Delete Job"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
          <Link
            to={`/job/${job._id}`}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 px-5 py-2.5 rounded-xl font-semibold transition-all group/btn"
          >
            Details
            <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
