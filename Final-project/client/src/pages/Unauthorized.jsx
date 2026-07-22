import { Link, useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";

const Unauthorized = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full text-center">
        <div className="flex justify-center mb-5">
          <div className="bg-red-100 p-5 rounded-full">
            <FaLock className="text-5xl text-red-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-3">Access Denied</h1>

        <p className="text-gray-600 mb-8">
          Sorry, you don't have permission to access this page.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
          >
            Go Home
          </Link>

          <button onClick={() => navigate("/")}>Go Back</button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
