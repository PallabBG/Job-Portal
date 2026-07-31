import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UserAPI from "../api/userApi";

const EmployerProfile = () => {
  const { id } = useParams();
  const [employer, setEmployer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployer();
  }, [id]);

  const fetchEmployer = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await UserAPI.get(`/profile/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEmployer(res.data.user);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-semibold dark:bg-slate-900 dark:text-white">
        Loading Employer...
      </div>
    );
  }

  if (!employer) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-2xl dark:bg-slate-900">
        Employer not found.
      </div>
    );
  }

  const { companyProfile } = employer;

  return (
    <div className="bg-gray-100 dark:bg-slate-900 min-h-screen py-10 px-4 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <Link to={-1} className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
          ← Back
        </Link>

        {/* Header Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg mt-5 p-8 border border-transparent dark:border-slate-700 transition-colors duration-300">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <img
              src={
                companyProfile?.companyLogo
                  ? companyProfile.companyLogo?.startsWith('http') 
                    ? companyProfile.companyLogo 
                    : `https://job-portal-v3nf.onrender.com${companyProfile.companyLogo}`
                  : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      companyProfile?.companyName || employer.name
                    )}&background=2563eb&color=fff&size=256`
              }
              alt={companyProfile?.companyName || employer.name}
              className="w-40 h-40 rounded-2xl object-cover border-4 border-gray-100 dark:border-slate-700 shadow-md"
            />

            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl font-bold dark:text-white">
                {companyProfile?.companyName || employer.name}
              </h1>
              
              <p className="text-blue-600 dark:text-blue-400 font-medium mt-1 text-lg">
                Employer Account
              </p>

              <div className="flex flex-col md:flex-row gap-4 mt-5 text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <span>📧</span> {employer.email}
                </div>
                {employer.phone && (
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <span>📱</span> {employer.phone}
                  </div>
                )}
                {companyProfile?.location && (
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <span>📍</span> {companyProfile.location}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Company Details */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg mt-6 p-8 border border-transparent dark:border-slate-700 transition-colors duration-300">
          <h2 className="text-2xl font-bold mb-6 dark:text-white border-b dark:border-slate-700 pb-4">
            Company Overview
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Industry</p>
              <p className="font-semibold text-lg dark:text-gray-200 mt-1">
                {companyProfile?.industry || "-"}
              </p>
            </div>

            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Company Size</p>
              <p className="font-semibold text-lg dark:text-gray-200 mt-1">
                {companyProfile?.companySize || "-"}
              </p>
            </div>

            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Founded Year</p>
              <p className="font-semibold text-lg dark:text-gray-200 mt-1">
                {companyProfile?.foundedYear || "-"}
              </p>
            </div>

            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Website</p>
              {companyProfile?.website ? (
                <a 
                  href={companyProfile.website.startsWith('http') ? companyProfile.website : `https://${companyProfile.website}`}
                  target="_blank" 
                  rel="noreferrer"
                  className="font-semibold text-lg text-blue-600 dark:text-blue-400 hover:underline mt-1 block truncate"
                >
                  {companyProfile.website}
                </a>
              ) : (
                <p className="font-semibold text-lg dark:text-gray-200 mt-1">-</p>
              )}
            </div>
          </div>
        </div>

        {/* About Us */}
        {(companyProfile?.aboutUs || employer.bio) && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg mt-6 p-8 border border-transparent dark:border-slate-700 transition-colors duration-300">
            <h2 className="text-2xl font-bold mb-6 dark:text-white border-b dark:border-slate-700 pb-4">
              About the Company
            </h2>
            
            <div className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-6 leading-relaxed dark:text-gray-300 text-gray-700">
              {companyProfile?.aboutUs || employer.bio}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default EmployerProfile;
