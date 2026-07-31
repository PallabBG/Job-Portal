import React, { useEffect, useState } from "react";
import axios from "axios";

import ProfileHeader from "../../components/profile/ProfileHeader";
import PersonalInfoCard from "../../components/profile/PersonalInfoCard";

const AdminProfile = () => {
  const token = localStorage.getItem("token");

  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
  });

  // ====================
  // Profile Completion
  // ====================

  const calculateProfileCompletion = () => {
    let completed = 0;
    const totalFields = 5;

    if (form.name.trim()) completed++;
    if (form.email.trim()) completed++;
    if (form.phone.trim()) completed++;
    if (form.location.trim()) completed++;
    if (form.bio.trim()) completed++;

    return Math.round((completed / totalFields) * 100);
  };

  const profileCompletion = calculateProfileCompletion();

  // ====================
  // Form Change
  // ====================

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ====================
  // Load Profile
  // ====================

  const loadProfile = async () => {
    try {
      const res = await axios.get(
        `https://job-portal-v3nf.onrender.com/api/auth/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setForm({
        name: res.data.name || "",
        email: res.data.email || "",
        phone: res.data.phone || "",
        location: res.data.location || "",
        bio: res.data.bio || "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  // ====================
  // Save Profile
  // ====================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `https://job-portal-v3nf.onrender.com/api/auth/profile`,
        {
          name: form.name,
          phone: form.phone,
          location: form.location,
          bio: form.bio,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await loadProfile();

      setEditing(false);

      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Update Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-950 transition-colors duration-300 py-10">
      <div className="max-w-5xl mx-auto px-5">

        <ProfileHeader
          editing={editing}
          setEditing={setEditing}
          form={form}
          profileCompletion={profileCompletion}
          loadProfile={loadProfile}
        />

        <PersonalInfoCard
          editing={editing}
          form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />

      </div>
    </div>
  );
};

export default AdminProfile;
