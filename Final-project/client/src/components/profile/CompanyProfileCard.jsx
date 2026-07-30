import React from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const CompanyProfileCard = ({ editing, companyProfile, setCompanyProfile }) => {
  const { user, loadProfile } = useAuth();
  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("companyLogo", file);

      const token = localStorage.getItem("token");

      const res = await axios.post(
        `https://job-portal-v3nf.onrender.com/api/auth/company-logo`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      setCompanyProfile((prev) => ({
        ...prev,
        companyLogo: res.data.companyLogo,
      }));

      await loadProfile();
    } catch (err) {
      console.error(err);
      alert("Logo upload failed");
    }
  };
  console.log(companyProfile);
  return (
    <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-3xl shadow-lg p-8 transition-colors duration-300">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Company Profile
        </h2>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Manage your company details and recruiter information.
        </p>
      </div>

      {/* Logo + Basic Information */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Logo */}
        <div className="flex flex-col items-center">
          <div className="w-44 h-44 rounded-2xl border-2 border-dashed border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 overflow-hidden flex items-center justify-center shadow-sm">
            {companyProfile.companyLogo ? (
              <img
                src={companyProfile.companyLogo?.startsWith('http') ? companyProfile.companyLogo : `https://job-portal-v3nf.onrender.com${companyProfile.companyLogo}`}
                alt="Company Logo"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-6xl font-bold text-gray-400 dark:text-gray-500">
                {companyProfile.companyName
                  ? companyProfile.companyName[0].toUpperCase()
                  : "🏢"}
              </span>
            )}
          </div>

          {editing && (
            <label className="mt-5 cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-xl transition-all duration-300 shadow">
              Change Logo
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoUpload}
              />
            </label>
          )}
        </div>

        {/* Company Details */}
        <div className="lg:col-span-2">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Company Name */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Company Name
              </label>

              <input
                type="text"
                disabled={!editing}
                value={companyProfile.companyName}
                onChange={(e) =>
                  setCompanyProfile({
                    ...companyProfile,
                    companyName: e.target.value,
                  })
                }
                className={`w-full rounded-xl border px-4 py-3 transition-all duration-300 outline-none
              ${
                editing
                  ? "bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                  : "bg-gray-100 dark:bg-slate-700 border-gray-200 dark:border-slate-600 text-gray-600 dark:text-gray-300 cursor-not-allowed"
              }`}
              />
            </div>

            {/* Industry */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Industry
              </label>

              <select
                disabled={!editing}
                value={companyProfile.industry}
                onChange={(e) =>
                  setCompanyProfile({
                    ...companyProfile,
                    industry: e.target.value,
                  })
                }
                className={`w-full rounded-xl border px-4 py-3 transition-all duration-300 outline-none
              ${
                editing
                  ? "bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                  : "bg-gray-100 dark:bg-slate-700 border-gray-200 dark:border-slate-600 text-gray-600 dark:text-gray-300 cursor-not-allowed"
              }`}
              >
                <option value="">Select</option>
                <option>Information Technology</option>
                <option>Software</option>
                <option>Finance</option>
                <option>Healthcare</option>
                <option>Education</option>
                <option>E-commerce</option>
                <option>Manufacturing</option>
                <option>Consulting</option>
                <option>Marketing</option>
                <option>Other</option>
              </select>
            </div>

            {/* Company Size */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Company Size
              </label>

              <select
                disabled={!editing}
                value={companyProfile.companySize}
                onChange={(e) =>
                  setCompanyProfile({
                    ...companyProfile,
                    companySize: e.target.value,
                  })
                }
                className={`w-full rounded-xl border px-4 py-3 transition-all duration-300 outline-none
              ${
                editing
                  ? "bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                  : "bg-gray-100 dark:bg-slate-700 border-gray-200 dark:border-slate-600 text-gray-600 dark:text-gray-300 cursor-not-allowed"
              }`}
              >
                <option value="">Select</option>
                <option>1-10 Employees</option>
                <option>11-50 Employees</option>
                <option>51-200 Employees</option>
                <option>201-500 Employees</option>
                <option>501-1000 Employees</option>
                <option>1000+ Employees</option>
              </select>
            </div>

            {/* Founded */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Founded Year
              </label>

              <input
                type="number"
                disabled={!editing}
                value={companyProfile.foundedYear}
                onChange={(e) =>
                  setCompanyProfile({
                    ...companyProfile,
                    foundedYear: e.target.value,
                  })
                }
                className={`w-full rounded-xl border px-4 py-3 transition-all duration-300 outline-none
              ${
                editing
                  ? "bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                  : "bg-gray-100 dark:bg-slate-700 border-gray-200 dark:border-slate-600 text-gray-600 dark:text-gray-300 cursor-not-allowed"
              }`}
              />
            </div>

            {/* Website */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Website
              </label>

              <input
                type="url"
                disabled={!editing}
                value={companyProfile.website}
                onChange={(e) =>
                  setCompanyProfile({
                    ...companyProfile,
                    website: e.target.value,
                  })
                }
                className={`w-full rounded-xl border px-4 py-3 transition-all duration-300 outline-none
              ${
                editing
                  ? "bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                  : "bg-gray-100 dark:bg-slate-700 border-gray-200 dark:border-slate-600 text-gray-600 dark:text-gray-300 cursor-not-allowed"
              }`}
              />
            </div>

            {/* Location */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Location
              </label>

              <input
                type="text"
                disabled={!editing}
                value={companyProfile.location}
                onChange={(e) =>
                  setCompanyProfile({
                    ...companyProfile,
                    location: e.target.value,
                  })
                }
                className={`w-full rounded-xl border px-4 py-3 transition-all duration-300 outline-none
              ${
                editing
                  ? "bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                  : "bg-gray-100 dark:bg-slate-700 border-gray-200 dark:border-slate-600 text-gray-600 dark:text-gray-300 cursor-not-allowed"
              }`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="mt-10">
        <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
          About Company
        </label>

        <textarea
          rows={6}
          disabled={!editing}
          value={companyProfile.about}
          onChange={(e) =>
            setCompanyProfile({
              ...companyProfile,
              about: e.target.value,
            })
          }
          className={`w-full rounded-xl border px-4 py-3 resize-none transition-all duration-300 outline-none
        ${
          editing
            ? "bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
            : "bg-gray-100 dark:bg-slate-700 border-gray-200 dark:border-slate-600 text-gray-600 dark:text-gray-300 cursor-not-allowed"
        }`}
        />
      </div>

      {/* HR Contact */}
      <div className="mt-10 pt-8 border-t border-gray-200 dark:border-slate-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          HR Contact
        </h3>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-6">
          Contact details visible to applicants.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="HR Name"
            disabled={!editing}
            value={companyProfile.hrName}
            onChange={(e) =>
              setCompanyProfile({
                ...companyProfile,
                hrName: e.target.value,
              })
            }
            className={`w-full rounded-xl border px-4 py-3 transition-all duration-300 outline-none
          ${
            editing
              ? "bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              : "bg-gray-100 dark:bg-slate-700 border-gray-200 dark:border-slate-600 text-gray-600 dark:text-gray-300 cursor-not-allowed"
          }`}
          />

          <input
            type="email"
            placeholder="HR Email"
            disabled={!editing}
            value={companyProfile.hrEmail}
            onChange={(e) =>
              setCompanyProfile({
                ...companyProfile,
                hrEmail: e.target.value,
              })
            }
            className={`w-full rounded-xl border px-4 py-3 transition-all duration-300 outline-none
          ${
            editing
              ? "bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              : "bg-gray-100 dark:bg-slate-700 border-gray-200 dark:border-slate-600 text-gray-600 dark:text-gray-300 cursor-not-allowed"
          }`}
          />

          <input
            type="text"
            placeholder="HR Phone"
            disabled={!editing}
            value={companyProfile.hrPhone}
            onChange={(e) =>
              setCompanyProfile({
                ...companyProfile,
                hrPhone: e.target.value,
              })
            }
            className={`w-full rounded-xl border px-4 py-3 transition-all duration-300 outline-none md:col-span-2
          ${
            editing
              ? "bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              : "bg-gray-100 dark:bg-slate-700 border-gray-200 dark:border-slate-600 text-gray-600 dark:text-gray-300 cursor-not-allowed"
          }`}
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyProfileCard;
