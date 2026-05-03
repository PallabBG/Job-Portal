import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user= JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        {/* Logo */}
        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-blue-600 tracking-wide cursor-pointer"
        >
          Job Portal
        </h1>

        {/* Menu */}
        <div className="flex gap-6 items-center text-gray-700 font-medium">

          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/about" className="hover:text-blue-600">About</Link>
          <Link to="/contact" className="hover:text-blue-600">Contact</Link>

          {
            user?.role==="employer" &&
            <Link to="/employer-dashboard" className="hover:text-blue-600">Employer</Link>
          }
          {
            user?.role==="jobseeker" &&
            <Link to="jobseeker-dashboard" className="hover:text-blue-600">Jobseeker</Link>
          }
          {
            user?.role==="admin" &&
            <Link to="Admin-dashboard" className="hover:text-blue-600">Admin</Link>
          }

          {
          (user?.role ==="admin" ||  user?.role ==="employer")  &&(
          <Link
              to="/add-job"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Add Job
            </Link>
         )}
          
          {!token ? (
            <>
              <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Register</Link>
              <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Login</Link>
            </>
          ):(
            <button onClick={logout} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Logout</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;