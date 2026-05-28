import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaVideo,
  FaCalendarAlt,
  FaClock,
  FaTrash,
  FaPlus,
} from "react-icons/fa";

import axios from "axios";
const LiveClasses = () => {
  const [classes, setClasses] = useState([]);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const getClasses = async () => {
    try {
      const res = await axios.get("http://localhost:5500/api/liveclasses",);
      setClasses(res.data);
    } catch (error) {
      alert(error.response?.data?.message || "Fetch failed");
    }
  };


  useEffect(() => {
    getClasses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Live Classes
            </h1>

            <p className="text-gray-500 mt-2">
              Join real-time video classroom
            </p>
          </div>

          {(user?.role === "admin" ||
            user?.role === "employer") && (
            <Link
              to="/create-live-class"
              className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg"
            >
              <FaPlus />
              Create Class
            </Link>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-3xl mb-5">
                <FaVideo />
              </div>

              <h2 className="text-xl font-bold mb-3">
                {item.title}
              </h2>

              <p className="mb-2">
                <b>Subject:</b> {item.subject}
              </p>

              <p className="mb-2">
                <b>Teacher:</b> {item.employerName}
              </p>

              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <FaCalendarAlt />
                {item.date}
              </div>

              <div className="flex items-center gap-2 text-gray-600 mb-5">
                <FaClock />
                {item.time}
              </div>

              <div className="flex gap-3">
                <Link
                  to={`/join-live-class/${item._id}`}
                  className="flex-1 text-center bg-green-600 text-white py-2 rounded-lg"
                >
                  Join
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveClasses;