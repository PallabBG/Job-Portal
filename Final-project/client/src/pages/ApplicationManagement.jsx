import React, { useState, useEffect } from 'react';
import {
  Search,
  MoreVertical,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  CheckCircle,
  XCircle,
  Clock,
  User
} from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ApplicationManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();
  
  const [applicationsData, setApplicationsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/applications`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setApplicationsData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const handleDeleteApplication = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/applications/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setApplicationsData(applicationsData.filter(app => app._id !== id));
      setActiveDropdown(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(`${import.meta.env.VITE_API_URL}/api/applications/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setApplicationsData(applicationsData.map(app => app._id === id ? { ...app, status: res.data.application.status, statusUpdatedAt: res.data.application.statusUpdatedAt } : app));
      setActiveDropdown(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleViewCandidate = (id) => {
    navigate(`/candidate/${id}`);
  };

  const handleViewJob = (id) => {
    navigate(`/job/${id}`);
  };

  // Filter Applications
  const filteredApplications = applicationsData.filter(app => {
    const applicantName = app.applicant?.name?.toLowerCase() || '';
    const jobTitle = app.job?.title?.toLowerCase() || '';
    const employerName = app.employer?.name?.toLowerCase() || '';
    
    return applicantName.includes(searchQuery.toLowerCase()) || 
           jobTitle.includes(searchQuery.toLowerCase()) ||
           employerName.includes(searchQuery.toLowerCase());
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const currentApplications = filteredApplications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Selected':
        return <span className="px-3 py-1 text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full border border-emerald-200 dark:border-emerald-800/50">Selected</span>;
      case 'Rejected':
        return <span className="px-3 py-1 text-xs font-bold bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-full border border-red-200 dark:border-red-800/50">Rejected</span>;
      case 'Applied':
      case 'Under Review':
      case 'Shortlisted':
      case 'Interview':
        return <span className="px-3 py-1 text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 rounded-full border border-amber-200 dark:border-amber-800/50">{status}</span>;
      default:
        return <span className="px-3 py-1 text-xs font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 rounded-full border border-slate-200 dark:border-slate-700">{status || 'Unknown'}</span>;
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
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Application Management</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm md:text-base">Manage and review all job applications on the platform.</p>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden flex flex-col">

          {/* Search Bar */}
          <div className="p-4 md:p-6 border-b border-slate-100 dark:border-slate-800 flex justify-end">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by candidate, job title, or employer..."
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
                  <th className="py-4 px-6 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Applicant</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Job Details</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Applied Date</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                {loading ? (
                   <tr>
                     <td colSpan="5" className="py-12 text-center text-slate-500">Loading...</td>
                   </tr>
                ) : currentApplications.length > 0 ? (
                  currentApplications.map((app) => (
                    <tr key={app._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">

                      {/* Applicant */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg shadow-sm border border-slate-200 dark:border-slate-700 bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                            {app.applicant?.name?.charAt(0) || <User className="w-5 h-5"/>}
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 dark:text-white block group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{app.applicant?.name || "Deleted User"}</span>
                            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 tracking-wider">{app.applicant?.email}</span>
                          </div>
                        </div>
                      </td>

                      {/* Job Details */}
                      <td className="py-4 px-6">
                         <div className="flex flex-col">
                            <span className="text-slate-900 dark:text-white font-semibold">{app.job?.title || "Deleted Job"}</span>
                            <span className="text-slate-500 dark:text-slate-400 text-sm">at {app.employer?.name || "Unknown Company"}</span>
                         </div>
                      </td>

                      {/* Applied Date */}
                      <td className="py-4 px-6">
                        <span className="text-slate-600 dark:text-slate-400 text-sm font-medium">{new Date(app.createdAt).toLocaleDateString()}</span>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6">
                        {getStatusBadge(app.status)}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right relative">
                        <button
                          onClick={() => toggleDropdown(app._id)}
                          className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors ml-auto"
                        >
                          <MoreVertical className="w-5 h-5" />
                        </button>

                        {/* Dropdown Menu */}
                        {activeDropdown === app._id && (
                          <>
                            <div className="fixed inset-0 z-10" onClick={() => setActiveDropdown(null)}></div>
                            <div className="absolute right-8 top-12 w-56 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 z-20 py-2 overflow-hidden animate-fade-in-up">
                              
                              {app.applicant && (
                                <button onClick={() => handleViewCandidate(app.applicant._id)} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                  <User className="w-4 h-4 text-blue-500" /> View Candidate
                                </button>
                              )}

                              {app.job && (
                                <button onClick={() => handleViewJob(app.job._id)} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                  <Briefcase className="w-4 h-4 text-purple-500" /> View Job
                                </button>
                              )}

                              <div className="h-px bg-slate-100 dark:bg-slate-700 my-1"></div>
                              <div className="px-4 py-1.5 text-xs font-semibold text-slate-400 uppercase">Change Status</div>

                              {app.status !== 'Selected' && (
                                <button onClick={() => handleUpdateStatus(app._id, 'Selected')} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-emerald-600 dark:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors">
                                  <CheckCircle className="w-4 h-4" /> Mark Selected
                                </button>
                              )}

                              {app.status !== 'Rejected' && (
                                <button onClick={() => handleUpdateStatus(app._id, 'Rejected')} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                                  <XCircle className="w-4 h-4" /> Mark Rejected
                                </button>
                              )}
                              
                              {app.status !== 'Shortlisted' && (
                                <button onClick={() => handleUpdateStatus(app._id, 'Shortlisted')} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-amber-600 dark:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors">
                                  <Clock className="w-4 h-4" /> Mark Shortlisted
                                </button>
                              )}

                              <div className="h-px bg-slate-100 dark:bg-slate-700 my-1"></div>

                              <button onClick={() => handleDeleteApplication(app._id)} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                                <Trash2 className="w-4 h-4" /> Delete Application
                              </button>

                            </div>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-12 text-center text-slate-500 dark:text-slate-400">
                      <div className="flex flex-col items-center justify-center">
                        <Search className="w-12 h-12 mb-4 opacity-20" />
                        <p className="text-lg font-semibold text-slate-900 dark:text-white">No applications found</p>
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
              Showing <span className="font-bold text-slate-900 dark:text-white">{filteredApplications.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-bold text-slate-900 dark:text-white">{Math.min(currentPage * itemsPerPage, filteredApplications.length)}</span> of <span className="font-bold text-slate-900 dark:text-white">{filteredApplications.length}</span> entries
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

export default ApplicationManagement;
