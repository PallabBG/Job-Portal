import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNotification } from "../context/NotificationContext";
import { 
  Users, 
  Briefcase, 
  Building, 
  UserCheck, 
  FileText, 
  DollarSign, 
  TrendingUp,
  Settings,
  FileBarChart,
  UserCog,
  BriefcaseBusiness,
  Activity,
  MoreVertical,
  Menu,
  Search,
  Bell,
  X,
  LayoutDashboard
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const { unreadCount, fetchUnreadCount } = useNotification();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:5500/api/admin/dashboard",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setData(res.data);
      } catch (err) {
        console.error("Error fetching admin data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Real data mapping
  const jobSeekers = (data.totalUsers || 0) - (data.employers || 0);

  const kpiCards = [
    { label: "Total Users", value: data.totalUsers || 0, icon: Users, color: "from-blue-500 to-cyan-500", light: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400" },
    { label: "Employers", value: data.employers || 0, icon: Building, color: "from-purple-500 to-pink-500", light: "bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400" },
    { label: "Job Seekers", value: jobSeekers > 0 ? jobSeekers : 0, icon: UserCheck, color: "from-indigo-500 to-purple-500", light: "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400" },
    { label: "Total Jobs", value: data.totalJobs || 0, icon: Briefcase, color: "from-emerald-500 to-teal-500", light: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400" },
    { label: "Applications", value: data.totalApplications || 0, icon: FileText, color: "from-orange-500 to-red-500", light: "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400" },
  ];

  const monthlyGrowth = data.monthlyGrowth || Array(12).fill({ month: 0, users: 0, jobs: 0 });
  const maxGrowthValue = Math.max(...monthlyGrowth.map(m => m.users), 1);

  const recentUsers = data.recentUsers || [];
  const recentJobs = data.recentJobs || [];

  return (
    <div className="min-h-[calc(100vh-73px)] bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row transition-colors">
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Modern Sidebar */}
      <aside className={`fixed md:sticky top-[73px] left-0 z-50 w-64 h-[calc(100vh-73px)] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center justify-between md:hidden mb-6">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">Admin Panel</h2>
            <button onClick={() => setSidebarOpen(false)} className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-1">
            <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Platform Control</p>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl font-medium transition-colors">
              <LayoutDashboard className="w-5 h-5" /> Dashboard
            </button>
            <button onClick={()=>navigate('/user-management')} className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white rounded-xl font-medium transition-colors">
              <UserCog className="w-5 h-5" /> Manage Users
            </button>
            <button onClick={()=> navigate('/')} className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white rounded-xl font-medium transition-colors">
              <BriefcaseBusiness className="w-5 h-5" /> Manage Jobs
            </button>
          </div>

          <div className="mt-auto space-y-1 pt-6 border-t border-slate-200 dark:border-slate-800">
            <button onClick={()=>navigate('/profile')} className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white rounded-xl font-medium transition-colors">
              <Settings className="w-5 h-5" /> System Settings
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8 overflow-y-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800 rounded-lg">
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Admin Overview</h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm md:text-base">Monitor platform metrics, users, and overall health.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Global search..." 
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    navigate(`/?search=${encodeURIComponent(e.target.value.trim())}`);
                  }
                }}
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none text-slate-700 dark:text-slate-200 transition-shadow"
              />
            </div>
            <button onClick={() => navigate('/notifications')} className="relative p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors hidden sm:block">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-900 shadow-sm"></span>
            )}
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button onClick={()=>navigate('/user-management')} className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-6 py-2.5 rounded-xl shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5">
            <UserCog className="w-4 h-4" /> Manage Users
          </button>
          <button onClick={()=> navigate('/')} className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 font-semibold px-6 py-2.5 rounded-xl hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all hover:-translate-y-0.5">
            <BriefcaseBusiness className="w-4 h-4" /> Manage Jobs
          </button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5 mb-8">
          {kpiCards.map((card, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className={`absolute -right-4 -bottom-4 w-20 h-20 bg-gradient-to-br ${card.color} opacity-10 rounded-full group-hover:scale-150 transition-transform duration-500`} />
              
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.light} relative z-10`}>
                  <card.icon className="w-5 h-5" />
                </div>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-1">
                  {loading ? <div className="h-6 w-12 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" /> : card.value}
                </h3>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{card.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-1 gap-8">
          
          {/* Growth Chart */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Platform Growth (New Users)</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Monthly overview for the current year</p>
              </div>
            </div>
            
            <div className="h-64 flex items-end justify-between gap-1 sm:gap-2 mt-auto relative">
              {/* Chart Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between border-b border-slate-100 dark:border-slate-800/50 pb-6 pointer-events-none">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-full border-t border-slate-100 dark:border-slate-800/50 border-dashed" />
                ))}
              </div>
              
              {/* Bars */}
              {monthlyGrowth.map((val, i) => (
                <div key={i} className="relative flex flex-col items-center flex-1 group z-10">
                  <div className="w-full max-w-[32px] sm:max-w-[48px] bg-indigo-50 dark:bg-indigo-900/20 rounded-t-lg relative flex justify-center pb-6 h-full items-end">
                    <div 
                      className="w-full max-w-[32px] sm:max-w-[48px] bg-gradient-to-t from-indigo-600 to-purple-500 rounded-t-lg transition-all duration-500 relative group-hover:opacity-80"
                      style={{ height: `${(val.users / maxGrowthValue) * 100}%` }}
                    >
                      {/* Tooltip */}
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20">
                        {val.users} Users
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 mt-3 font-medium">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Data Tables Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          
          {/* Recent Users */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Recent Users</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Newly registered accounts</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
                    <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase">User</th>
                    <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase">Role</th>
                    <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                  {recentUsers.map((user, i) => (
                    <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="py-3 px-6">
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-900 dark:text-white text-sm">{user.name}</span>
                          <span className="text-xs text-slate-500">{new Date(user.createdAt).toLocaleDateString()}</span>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-sm text-slate-600 dark:text-slate-300 font-medium capitalize">
                        {user.role}
                      </td>
                      <td className="py-3 px-6">
                        <span className="px-2 py-1 text-[10px] font-bold uppercase rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Jobs */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Recent Jobs</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Latest active postings</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
                    <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase">Job Title</th>
                    <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase">Company</th>
                    <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase">Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                  {recentJobs.map((job, i) => (
                    <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="py-3 px-6">
                        <span className="font-semibold text-slate-900 dark:text-white text-sm">{job.title}</span>
                      </td>
                      <td className="py-3 px-6 text-sm text-slate-600 dark:text-slate-300 font-medium">
                        {job.company || job.employer?.name || "Unknown"}
                      </td>
                      <td className="py-3 px-6">
                        <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded-full ${
                          job.status === "Open" 
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                            : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                        }`}>
                          {job.status || "Unknown"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
};

export default AdminDashboard;