import React from "react";
import JobSeekerProfile from "./profile/JobSeekerProfile";
import EmployerProfile from "./profile/EmployerProfile";
import AdminProfile from "./profile/AdminProfile";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  switch (user?.role) {
    case "admin":
      return <AdminProfile />;

    case "employer":
      return <EmployerProfile />;

    default:
      return <JobSeekerProfile />;
  }
};

export default Profile;