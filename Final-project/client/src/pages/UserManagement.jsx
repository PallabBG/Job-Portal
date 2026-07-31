import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  MoreVertical,
  ShieldAlert,
  CheckCircle,
  Trash2,
  Eye,
  Filter,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  Building,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState('jobseeker');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`https://job-portal-v3nf.onrender.com/api/admin/users`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUsersData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://job-portal-v3nf.onrender.com/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsersData(usersData.filter(u => u._id !== id));
      setActiveDropdown(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSuspendUser = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(`https://job-portal-v3nf.onrender.com/api/admin/users/${id}/suspend`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsersData(usersData.map(u => u._id === id ? res.data.user : u));
      setActiveDropdown(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleVerifyUser = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(`https://job-portal-v3nf.onrender.com/api/admin/users/${id}/verify`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsersData(usersData.map(u => u._id === id ? res.data.user : u));
      setActiveDropdown(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleViewProfile = (id, role) => {
    if (role === "employer") {
      navigate(`/employer/${id}`);
    } else {
      navigate(`/candidate/${id}`);
    }
  };

  const handleChatUser = (id) => {
    navigate(`/chat/${id}`);
  };

  // Filter Users
  const filteredUsers = useMemo(() => {
    return usersData.filter(u => {
      const matchesTab = u.role === activeTab;
      const matchesSearch =
        u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery, usersData]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Change Tab Handler
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
    setActiveDropdown(null);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return <span className="px-3 py-1 text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full border border-emerald-200 dark:border-emerald-800/50">Active</span>;
      case 'Suspended':
        return <span className="px-3 py-1 text-xs font-bold bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-full border border-red-200 dark:border-red-800/50">Suspended</span>;
      case 'Pending':
        return <span className="px-3 py-1 text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 rounded-full border border-amber-200 dark:border-amber-800/50">Pending</span>;
      default:
        return <span className="px-3 py-1 text-xs font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 rounded-full">Unknown</span>;
    }
  };

  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  return (
    <div className="min-h-[calc(100vh-73px)] bg-slate-50 dark:bg-slate-950 p-4 md:p-8 transition-colors">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">User Management</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm md:text-base">Manage platform users, and their account statuses.</p>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden flex flex-col">

          {/* Tabs & Search Bar */}
          <div className="p-4 md:p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">

            {/* Tabs */}

            <div className="flex bg-slate-100 dark:bg-slate-800/50 p-1 rounded-xl w-full lg:w-auto">
              <button
                onClick={() => handleTabChange('jobseeker')}
                className={`flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 ${activeTab === 'jobseeker' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}
              >
                <UserCheck className="w-4 h-4" /> Job Seekers
              </button>
              {user?.role === "admin" && (
                <button
                  onClick={() => handleTabChange('employer')}
                  className={`flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 ${activeTab === 'employer' ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}
                >
                  <Building className="w-4 h-4" /> Employers
                </button>
              )}
            </div>
            {/* Search Input */}
            <div className="relative w-full lg:w-96">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none text-slate-700 dark:text-slate-200 transition-shadow"
              />
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto min-h-[400px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
                  <th className="py-4 px-6 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">User</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Contact Info</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Joined Date</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                {currentUsers.length > 0 ? (
                  currentUsers.map((u) => {
                    const userStatus = u.isSuspended ? 'Suspended' : (u.isVerified ? 'Active' : 'Pending');
                    return (
                    <tr key={u._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">

                      {/* Avatar & Name */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg shadow-sm border border-slate-200 dark:border-slate-700 ${activeTab === 'employer'
                              ? 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400'
                              : 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                            }`}>
                            {u.name.charAt(0)}
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 dark:text-white block group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{u.name}</span>
                            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">ID: #{u._id.slice(-6).toUpperCase()}</span>
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="py-4 px-6">
                        <span className="text-slate-600 dark:text-slate-300 font-medium">{u.email}</span>
                      </td>

                      {/* Joined Date */}
                      <td className="py-4 px-6">
                        <span className="text-slate-600 dark:text-slate-400 text-sm font-medium">{new Date(u.createdAt).toLocaleDateString()}</span>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6">
                        {getStatusBadge(userStatus)}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right relative">
                        <button
                          onClick={() => toggleDropdown(u._id)}
                          className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors ml-auto"
                        >
                          <MoreVertical className="w-5 h-5" />
                        </button>

                        {/* Dropdown Menu */}
                        {activeDropdown === u._id && (
                          <>
                            <div className="fixed inset-0 z-10" onClick={() => setActiveDropdown(null)}></div>
                            <div className="absolute right-8 top-12 w-48 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 z-20 py-2 overflow-hidden animate-fade-in-up">
                              
                              <button onClick={() => handleViewProfile(u._id, u.role)} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                <Eye className="w-4 h-4 text-blue-500" /> View Profile
                              </button>

                              {user?.role === 'admin' && (
                                <>
                                  {userStatus === 'Pending' && (
                                    <button onClick={() => handleVerifyUser(u._id)} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                      <CheckCircle className="w-4 h-4 text-emerald-500" /> Verify User
                                    </button>
                                  )}
    
                                  <button onClick={() => handleSuspendUser(u._id)} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-amber-600 dark:text-amber-500 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                    <ShieldAlert className="w-4 h-4" /> {u.isSuspended ? 'Unsuspend Account' : 'Suspend Account'}
                                  </button>
    
                                  <div className="h-px bg-slate-100 dark:bg-slate-700 my-1"></div>
    
                                  <button onClick={() => handleDeleteUser(u._id)} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                                    <Trash2 className="w-4 h-4" /> Delete User
                                  </button>
                                </>
                              )}

                              {user?.role === 'employer' && (
                                <button onClick={() => handleChatUser(u._id)} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-blue-600 dark:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                                  <UserCheck className="w-4 h-4" /> Chat with user
                                </button>
                              )}
                            </div>
                          </>
                        )}
                      </td>
                    </tr>
                  )})
                ) : (
                  <tr>
                    <td colSpan="5" className="py-12 text-center text-slate-500 dark:text-slate-400">
                      <div className="flex flex-col items-center justify-center">
                        <Search className="w-12 h-12 mb-4 opacity-20" />
                        <p className="text-lg font-semibold text-slate-900 dark:text-white">No users found</p>
                        <p className="text-sm mt-1">Try adjusting your search criteria.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 md:p-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 dark:bg-slate-900/50">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Showing <span className="font-bold text-slate-900 dark:text-white">{filteredUsers.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-bold text-slate-900 dark:text-white">{Math.min(currentPage * itemsPerPage, filteredUsers.length)}</span> of <span className="font-bold text-slate-900 dark:text-white">{filteredUsers.length}</span> entries
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-1">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-xl font-bold text-sm transition-all shadow-sm ${currentPage === i + 1
                        ? 'bg-blue-600 text-white border border-blue-600'
                        : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                      }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserManagement;
