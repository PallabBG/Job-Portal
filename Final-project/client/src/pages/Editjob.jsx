import React, { useEffect, useState } from "react";
import API from "../api/jobApi";
import JobForm from "../components/Jobform";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaEdit } from "react-icons/fa";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    salary: "",
    category: "",
    description: "",
    jobType: "Full-time",
    experienceLevel: "Fresher",
    skills: "",
    vacancies: 1,
    deadline: "",
  });

  const getSingleJob = async () => {
    try {
      const res = await API.get(`/${id}`);
      setFormData({
        ...res.data,
        deadline: res.data.deadline ? res.data.deadline.split("T")[0] : "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleJob();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.put(`/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-950 dark:to-slate-900 min-h-screen py-10 px-4 transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
        {/* Back */}
        <Link
          to="/my-jobs"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-4 font-medium transition-colors"
        >
          <FaArrowLeft />
          Back to My Jobs
        </Link>

        {/* Hero */}
        <div className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-2xl p-8 mb-6 shadow-lg text-center">
          <FaEdit className="text-4xl mx-auto mb-3" />
          <h2 className="text-3xl font-bold">Edit Job</h2>
          <p className="text-sm opacity-90 mt-2">Update your job posting</p>
        </div>
        <JobForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          btnText="Update Job"
        />
      </div>
    </div>
  );
};

export default EditJob;
