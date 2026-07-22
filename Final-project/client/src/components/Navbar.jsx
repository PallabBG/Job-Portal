import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ProfileMenu from "./ProfileMenu";

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const { user } = useAuth();

  return (
    <div className="bg-white/90 backdrop-blur-md shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        {/* Logo */}
        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-blue-600 cursor-pointer"
        >
          Job Portal
        </h1>

        {/* Navigation */}
        <div className="flex items-center gap-6 text-gray-700 font-medium">

          {/* Public */}
          <Link to="/" className="hover:text-blue-600 transition">
            Home
          </Link>

          <Link to="/about" className="hover:text-blue-600 transition">
            About
          </Link>

          <Link to="/contact" className="hover:text-blue-600 transition">
            Contact
          </Link>

          <Link
            to="/chat"
            className="hover:text-purple-600 transition"
          >
            Chat
          </Link>

          {/* Employer */}
          {user?.role === "employer" && (
            <>
              <Link
                to="/employer-dashboard"
                className="hover:text-blue-600 transition"
              >
                Dashboard
              </Link>

              <Link
                to="/my-jobs"
                className="hover:text-blue-600 transition"
              >
                My Jobs
              </Link>

              <Link
                to="/add-job"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
              >
                + Add Job
              </Link>
            </>
          )}

          {/* Job Seeker */}
          {user?.role === "jobseeker" && (
            <>
              <Link
                to="/jobseeker-dashboard"
                className="hover:text-blue-600 transition"
              >
                Dashboard
              </Link>

              <Link
                to="/my-applications"
                className="hover:text-blue-600 transition"
              >
                My Applications
              </Link>
            </>
          )}

          {/* Admin */}
          {user?.role === "admin" && (
            <Link
              to="/admin-dashboard"
              className="hover:text-blue-600 transition"
            >
              Dashboard
            </Link>
          )}

          {/* Login/Register */}
          {!token ? (
            <>
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
              >
                Register
              </Link>

              <Link
                to="/login"
                className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-lg transition"
              >
                Login
              </Link>
            </>
          ) : (
            <ProfileMenu />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;