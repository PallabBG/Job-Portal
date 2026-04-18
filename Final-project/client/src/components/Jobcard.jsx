import { Link } from "react-router-dom";
import { useState } from "react";

const JobCard = ({ job, onDelete }) => {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition duration-300 overflow-hidden border group">

      {/* Image */}
      <div className="relative">
        <img
          src={`http://localhost:5500/uploads/${job.images?.[activeImage]}`}
          className="w-full h-52 object-cover group-hover:scale-105 transition"
        />

        {/* Salary */}
        <span className="absolute top-3 left-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full">
          ₹{job.salary}
        </span>
      </div>

      {/* Thumbnails */}
      {job.images?.length > 1 && (
        <div className="flex gap-2 p-3 overflow-x-auto">
          {job.images.map((img, i) => (
            <img
              key={i}
              src={`http://localhost:5500/uploads/${img}`}
              onMouseEnter={() => setActiveImage(i)}
              className={`w-14 h-14 rounded-md object-cover cursor-pointer border 
              ${activeImage === i ? "border-blue-600" : "border-gray-300"}`}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        <h2 className="font-bold text-lg text-gray-800 line-clamp-1">
          {job.title}
        </h2>

        <p className="text-sm text-gray-500">🏢 {job.company}</p>
        <p className="text-sm text-gray-500 mb-2">📍 {job.location}</p>

        <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full">
          {job.category}
        </span>

        <div className="flex gap-2 mt-4">
          <Link
            to={`/job/${job._id}`}
            className="flex-1 text-center bg-blue-600 text-white py-2 rounded-lg"
          >
            View
          </Link>

          <button
            onClick={() => onDelete(job._id)}
            className="flex-1 bg-red-600 text-white py-2 rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;