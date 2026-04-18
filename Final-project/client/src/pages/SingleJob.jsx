import React, { useEffect, useState } from "react";
import API from "../api/jobApi";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const SingleJob = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  const getSingleJob = async () => {
    try {
      const res = await API.get(`/${id}`);
      setJob(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleJob();
  }, [id]);

  if (!job) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Back */}
        <Link
          to="/"
          className="flex items-center gap-2 text-blue-600 mb-6 hover:text-blue-800"
        >
          <FaArrowLeft /> Back
        </Link>

        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 grid md:grid-cols-2 gap-8">

          {/* LEFT: IMAGE */}
          <div>
            {job.images?.length > 0 && (
              <img
                src={`http://localhost:5500/uploads/${job.images[activeImage]}`}
                alt="job"
                className="w-full h-80 object-cover rounded-2xl shadow-md mb-4"
              />
            )}

            {job.images?.length > 1 && (
              <div className="flex gap-3 overflow-x-auto">
                {job.images.map((img, index) => (
                  <img
                    key={index}
                    src={`http://localhost:5500/uploads/${img}`}
                    onClick={() => setActiveImage(index)}
                    className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition 
                      ${
                        activeImage === index
                          ? "border-blue-600"
                          : "border-gray-300"
                      }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: DETAILS */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold text-blue-600 mb-4">
                {job.title}
              </h2>

              <p className="mb-2 text-gray-700">
                <span className="font-semibold">Company:</span>{" "}
                {job.company}
              </p>

              <p className="mb-2 text-gray-700">
                <span className="font-semibold">Location:</span>{" "}
                {job.location}
              </p>

              <p className="mb-2 text-gray-700">
                <span className="font-semibold">Category:</span>{" "}
                {job.category}
              </p>

              <p className="mb-4 text-gray-700">
                <span className="font-semibold">Description:</span>{" "}
                {job.description}
              </p>

              {/* Salary */}
              <div className="text-2xl font-bold text-green-600 mb-6">
                ₹{job.salary}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 flex-wrap">
              <Link
                to={`/edit-job/${job._id}`}
                className="bg-yellow-500 text-white px-6 py-3 rounded-xl hover:bg-yellow-600"
              >
                Edit Job
              </Link>

              <Link
                to="/"
                className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
              >
                Back to Home
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SingleJob;