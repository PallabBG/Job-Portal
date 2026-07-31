import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/jobApi";
import { useNotification } from "../context/NotificationContext";
import { useMessage } from "../context/MessageContext";
import socket from "../socket";
import { 
  Briefcase, 
  FileText, 
  Users, 
  Eye, 
  TrendingUp,
  Plus,
  List,
  Bell,
  ChevronRight,
  MoreVertical,
  CheckCircle2,
  Clock,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Menu,
  X,
  UserCheck,
  XCircle
} from "lucide-react";

const EmployerDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    postedJobs: 0,
    applicationsReceived: 0,
    shortlistedCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { unreadCount, fetchUnreadCount } = useNotification();
  const { unreadMessageCount } = useMessage();

  useEffect(() => {
    fetchDashboard();

    socket.on("receiveNotification", fetchDashboard);
    
    return () => {
      socket.off("receiveNotification", fetchDashboard);
    };
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/employer-dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStats(res.data);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const chartData = stats.weeklyActivity || [0, 0, 0, 0, 0, 0, 0];
  const maxChartValue = Math.max(...chartData, 5); // fallback to 5 to avoid tiny numbers filling the bar entirely

  const dayLabels = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toLocaleDateString('en-US', { weekday: 'short' });
  });

  const recentApplications = stats.recentApplications || [];

  const kpiCards = [
    { label: "Active Jobs", value: stats.postedJobs || 0, icon: Briefcase, color: "from-indigo-500 to-indigo-600", light: "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400", shadow: "shadow-indigo-500/30" },
    { label: "Applications", value: stats.applicationsReceived || 0, icon: FileText, color: "from-violet-500 to-violet-600", light: "bg-violet-50 text-violet-600 dark:bg-violet-500/20 dark:text-violet-400", shadow: "shadow-violet-500/30" },
    { label: "Shortlisted", value: stats.shortlistedCount || 0, icon: UserCheck, color: "from-teal-500 to-teal-600", light: "bg-teal-50 text-teal-600 dark:bg-teal-500/20 dark:text-teal-400", shadow: "shadow-teal-500/30" },
  ];

  const getStatusBadge = (status) => {
    switch(status) {
      case 'New': return <span className="px-3 py-1 text-xs font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400 rounded-full flex items-center gap-1.5 border border-indigo-200 dark:border-indigo-800/50"><Clock className="w-3.5 h-3.5"/> New</span>;
      case 'Reviewed': return <span className="px-3 py-1 text-xs font-semibold bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 rounded-full flex items-center gap-1.5 border border-amber-200 dark:border-amber-800/50"><Eye className="w-3.5 h-3.5"/> Reviewed</span>;
      case 'Shortlisted': return <span className="px-3 py-1 text-xs font-semibold bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-400 rounded-full flex items-center gap-1.5 border border-teal-200 dark:border-teal-800/50"><CheckCircle2 className="w-3.5 h-3.5"/> Shortlisted</span>;
      default: return <span className="px-3 py-1 text-xs font-semibold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 rounded-full border border-slate-200 dark:border-slate-700">Archived</span>;
    }
  };

  return (
    <div className="min-h-[calc(100vh-73px)] bg-[#f8fafc] dark:bg-[#0f172a] flex flex-col md:flex-row transition-colors font-sans">
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Modern Premium Sidebar */}
      <aside className={`fixed md:sticky top-[73px] left-0 z-50 w-64 h-[calc(100vh-73px)] bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-slate-200/50 dark:border-slate-800/50 transform transition-transform duration-300 ease-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} shadow-2xl md:shadow-none`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center justify-between md:hidden mb-6">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white tracking-tight">Menu</h2>
            <button onClick={() => setSidebarOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-800 rounded-xl transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-1.5">
            <p className="px-3 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">Main Menu</p>
            <button className="w-full flex items-center gap-3 px-3 py-3 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-2xl font-bold transition-all duration-200 border border-indigo-100/50 dark:border-indigo-500/20 shadow-sm">
              <LayoutDashboard className="w-5 h-5" /> Dashboard
            </button>
            <button onClick={() => navigate('/my-jobs')} className="w-full flex items-center gap-3 px-3 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white rounded-2xl font-semibold transition-all duration-200">
              <Briefcase className="w-5 h-5" /> My Jobs
            </button>
            <button onClick={() => navigate('/chat')} className="w-full flex items-center gap-3 px-3 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white rounded-2xl font-semibold transition-all duration-200">
              <MessageSquare className="w-5 h-5" /> Messages
              {unreadMessageCount > 0 && (
                <span className="ml-auto bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 py-0.5 px-2.5 rounded-full text-xs font-bold shadow-sm">{unreadMessageCount}</span>
              )}
            </button>
            <button onClick={()=> navigate('/user-management')} className="w-full flex items-center gap-3 px-3 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white rounded-2xl font-semibold transition-all duration-200">
              <Users className="w-5 h-5" /> Candidates
            </button>
          </div>

          <div className="mt-auto space-y-1.5 pt-6 border-t border-slate-200/50 dark:border-slate-800/50">
            <button onClick={()=> navigate('/profile')} className="w-full flex items-center gap-3 px-3 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white rounded-2xl font-semibold transition-all duration-200">
              <Settings className="w-5 h-5" /> Settings
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8 overflow-y-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2.5 -ml-2 text-slate-600 hover:bg-white dark:text-slate-300 dark:hover:bg-slate-800 rounded-xl shadow-sm border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all">
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">Overview</h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1.5 font-medium text-sm md:text-base">Welcome back! Here's what's happening with your job postings.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <button onClick={() => navigate('/notifications')} className="relative p-3 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:shadow-md transition-all duration-200 hidden sm:block">
             <Bell className="w-5 h-5" />
              
            {unreadCount > 0 && (
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-900 shadow-sm"></span>
            )}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-8 rounded-2xl border border-red-200/60 dark:border-red-900/40 bg-red-50/50 dark:bg-red-500/10 px-6 py-4 text-sm font-medium text-red-700 dark:text-red-400 flex items-center gap-3 shadow-sm backdrop-blur-sm">
            <XCircle className="w-5 h-5 flex-shrink-0" />
            Couldn't load real dashboard data. Showing mock values for design purposes.
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4 mb-10">
          <button onClick={() => navigate("/add-job")} className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold px-7 py-3 rounded-2xl shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-indigo-500/40">
            <Plus className="w-5 h-5" /> Post New Job
          </button>
          <button onClick={() => navigate("/my-jobs")} className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 text-slate-700 dark:text-slate-200 font-bold px-7 py-3 rounded-2xl hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 hover:-translate-y-0.5">
            <List className="w-5 h-5" /> Manage Jobs
          </button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {kpiCards.map((card, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200/60 dark:border-slate-800/60 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group cursor-default">
              {/* Premium glowing background effect */}
              <div className={`absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br ${card.color} opacity-[0.08] dark:opacity-[0.15] blur-2xl rounded-full group-hover:scale-150 transition-transform duration-500 ease-out`} />
              
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${card.light} shadow-inner transition-colors duration-300`}>
                  <card.icon className="w-7 h-7" />
                </div>
                <div className="flex items-center gap-1.5 text-teal-600 dark:text-teal-400 text-xs font-bold bg-teal-50 dark:bg-teal-500/10 px-2.5 py-1.5 rounded-lg border border-teal-100 dark:border-teal-800/30 shadow-sm">
                  <TrendingUp className="w-3.5 h-3.5" /> 
                  <span>+12%</span>
                </div>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
                  {loading ? <div className="h-10 w-20 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" /> : card.value}
                </h3>
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{card.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-10">
          
          {/* Applications Chart */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200/60 dark:border-slate-800/60 rounded-3xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Applications Overview</h2>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">Activity over the last 7 days</p>
              </div>
              
            </div>
            
            <div className="h-72 flex items-end justify-between gap-3 mt-4 relative">
              {/* Chart Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between border-b border-slate-200 dark:border-slate-700/50 pointer-events-none">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-full border-t border-slate-200 dark:border-slate-700/50 border-dashed" />
                ))}
              </div>
              
              {/* Bars */}
              {chartData.map((val, i) => (
                <div key={i} className="relative flex flex-col items-center flex-1 group z-10 h-full justify-end">
                  <div className="w-full max-w-[56px] bg-slate-100 dark:bg-slate-800/50 rounded-t-xl relative flex justify-center h-full items-end group-hover:bg-slate-200 dark:group-hover:bg-slate-800 transition-colors duration-300">
                    <div 
                      className="w-full max-w-[56px] bg-gradient-to-t from-indigo-500 to-violet-500 rounded-t-xl transition-all duration-500 relative group-hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]"
                      style={{ height: `${(val / maxChartValue) * 100}%` }}
                    >
                      {/* Tooltip */}
                      <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-bold py-2 px-3 rounded-xl opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300 whitespace-nowrap pointer-events-none shadow-xl border border-slate-700">
                        {val} Apps
                        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 border-b border-r border-slate-700 rotate-45"></div>
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-slate-500 dark:text-slate-400 mt-4 font-semibold">
                    {dayLabels[i]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Applications Table */}
        <div className="bg-white dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200/60 dark:border-slate-800/60 rounded-3xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col mb-8">
          <div className="p-8 border-b border-slate-100 dark:border-slate-800/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recent Applications</h2>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">Latest candidates who applied to your jobs</p>
            </div>
            <button className="flex items-center gap-1.5 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 px-5 py-2.5 rounded-xl transition-all duration-200">
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-800/20 border-b border-slate-200/60 dark:border-slate-800/60">
                  <th className="py-5 px-8 text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">Candidate</th>
                  <th className="py-5 px-8 text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">Applied Role</th>
                  <th className="py-5 px-8 text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">Match Score</th>
                  <th className="py-5 px-8 text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="py-5 px-8 text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">Applied On</th>
                  <th className="py-5 px-8 text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                {recentApplications.map((app) => (
                  <tr key={app.id} onClick={() => navigate(`/job/${app.jobId}/applicants`)} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group cursor-pointer">
                    <td className="py-5 px-8">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-indigo-900/40 dark:to-violet-900/40 flex items-center justify-center font-bold text-indigo-700 dark:text-indigo-300 shadow-inner overflow-hidden">
                          {app.profileImage ? (
                            <img src={app.profileImage?.startsWith('http') ? app.profileImage : `https://job-portal-v3nf.onrender.com${app.profileImage}`} alt={app.name} className="w-full h-full object-cover" />
                          ) : (
                            app.name.charAt(0)
                          )}
                        </div>
                        <span className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{app.name}</span>
                      </div>
                    </td>
                    <td className="py-5 px-8">
                      <span className="text-slate-700 dark:text-slate-300 font-semibold">{app.role}</span>
                    </td>
                    <td className="py-5 px-8">
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                          <div 
                            className="h-full bg-gradient-to-r from-teal-400 to-emerald-500 rounded-full"
                            style={{ width: app.match || "0%" }}
                          />
                        </div>
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{app.match || "N/A"}</span>
                      </div>
                    </td>
                    <td className="py-5 px-8">
                      {getStatusBadge(app.status)}
                    </td>
                    <td className="py-5 px-8 text-slate-500 dark:text-slate-400 text-sm font-medium">
                      {new Date(app.date).toLocaleDateString()}
                    </td>
                    <td className="py-5 px-8 text-right">
                      <button className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-xl transition-all">
                        <MoreVertical className="w-5 h-5 ml-auto" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployerDashboard;
