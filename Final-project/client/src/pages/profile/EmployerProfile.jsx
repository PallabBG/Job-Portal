import React, { useEffect, useState } from "react";
import axios from "axios";
import CompanyProfileCard from "../../components/profile/CompanyProfileCard";

const EmployerProfile = () => {
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);

  const [editing, setEditing] = useState(false);

  const [companyProfile, setCompanyProfile] = useState({
    companyName: "",
    companyLogo: "",
    industry: "",
    companySize: "",
    foundedYear: "",
    website: "",
    location: "",
    about: "",
    hrName: "",
    hrEmail: "",
    hrPhone: "",
  });

  const totalFields = 11;

  let completed = 0;

  if (companyProfile.companyName.trim()) completed++;
  if (companyProfile.companyLogo.trim()) completed++;
  if (companyProfile.industry.trim()) completed++;
  if (companyProfile.companySize.trim()) completed++;
  if (companyProfile.foundedYear.trim()) completed++;
  if (companyProfile.website.trim()) completed++;
  if (companyProfile.location.trim()) completed++;
  if (companyProfile.about.trim()) completed++;
  if (companyProfile.hrName.trim()) completed++;
  if (companyProfile.hrEmail.trim()) completed++;
  if (companyProfile.hrPhone.trim()) completed++;
  console.log(companyProfile);
  const completion = Math.round((completed / totalFields) * 100);

  const loadProfile = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCompanyProfile(
        res.data.companyProfile || {
          companyName: "",
          companyLogo: "",
          industry: "",
          companySize: "",
          foundedYear: "",
          website: "",
          location: "",
          about: "",
          hrName: "",
          hrEmail: "",
          hrPhone: "",
        },
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleSubmit = async () => {
    console.log("Save button clicked");
    console.log(companyProfile);

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/auth/profile`,
        {
          companyProfile,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(res.data);

      setEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-medium">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-transparent">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Employer Profile</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your company information.</p>
        </div>

        <div className="flex gap-3">
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={() => setEditing(false)}
                className="bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-slate-600 px-5 py-2 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
              >
                Save Profile
              </button>
            </>
          )}
        </div>
      </div>

      {/* Profile Completion */}
      <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl shadow transition-colors duration-300 p-5 mb-6">
        <div className="flex justify-between mb-2">
          <span className="font-semibold text-gray-900 dark:text-white">Profile Completion</span>

          <span className="dark:text-white">{completion}%</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-green-500 h-3 rounded-full transition-all"
            style={{ width: `${completion}%` }}
          />
        </div>
      </div>

      {/* Company Profile Form */}
      <CompanyProfileCard
        editing={editing}
        companyProfile={companyProfile}
        setCompanyProfile={setCompanyProfile}
      />
    </div>
  );
};

export default EmployerProfile;
