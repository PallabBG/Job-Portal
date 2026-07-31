import React from "react";
import JobSeekerProfile from "./profile/JobSeekerProfile";
import EmployerProfile from "./profile/EmployerProfile";
import AdminProfile from "./profile/AdminProfile";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, loading } = useAuth();

  if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
        Loading Profile...
      </p>
    </div>
  );
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
