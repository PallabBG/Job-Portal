import React from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const CompanyProfileCard = ({ editing, companyProfile, setCompanyProfile }) => {
  const { loadProfile } = useAuth();
  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("companyLogo", file);

      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5500/api/auth/company-logo",
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
      localStorage.setItem("user", JSON.stringify(user));
    } catch (err) {
      console.error(err);
      alert("Logo upload failed");
    }
  };
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">🏢 Company Profile</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-8 flex flex-col items-center">
          <div className="w-36 h-36 rounded-xl border-2 border-dashed border-gray-300 overflow-hidden flex items-center justify-center bg-gray-100">
            {companyProfile.companyLogo ? (
              <img
                src={`http://localhost:5500${companyProfile.companyLogo}`}
                alt="Company Logo"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-5xl font-bold text-gray-500">
                {companyProfile.companyName
                  ? companyProfile.companyName[0].toUpperCase()
                  : "🏢"}
              </span>
            )}
          </div>

          {editing && (
            <label className="mt-4 cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Upload Logo
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoUpload}
              />
            </label>
          )}
        </div>
        {/* Company Name */}
        <div>
          <label className="block font-medium mb-1">Company Name</label>

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
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* Industry */}
        <div>
          <label className="block font-medium mb-1">Industry</label>

          <select
            disabled={!editing}
            value={companyProfile.industry}
            onChange={(e) =>
              setCompanyProfile({
                ...companyProfile,
                industry: e.target.value,
              })
            }
            className="w-full border rounded-lg px-3 py-2"
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
          <label className="block font-medium mb-1">Company Size</label>

          <select
            disabled={!editing}
            value={companyProfile.companySize}
            onChange={(e) =>
              setCompanyProfile({
                ...companyProfile,
                companySize: e.target.value,
              })
            }
            className="w-full border rounded-lg px-3 py-2"
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

        {/* Founded Year */}
        <div>
          <label className="block font-medium mb-1">Founded Year</label>

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
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* Website */}
        <div>
          <label className="block font-medium mb-1">Website</label>

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
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block font-medium mb-1">Location</label>

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
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
      </div>

      {/* About */}
      <div className="mt-6">
        <label className="block font-medium mb-1">About Company</label>

        <textarea
          rows={5}
          disabled={!editing}
          value={companyProfile.about}
          onChange={(e) =>
            setCompanyProfile({
              ...companyProfile,
              about: e.target.value,
            })
          }
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      {/* HR Contact */}
      <h3 className="text-lg font-semibold mt-8 mb-4">HR Contact</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          className="border rounded-lg px-3 py-2"
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
          className="border rounded-lg px-3 py-2"
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
          className="border rounded-lg px-3 py-2"
        />
      </div>
    </div>
  );
};

export default CompanyProfileCard;
