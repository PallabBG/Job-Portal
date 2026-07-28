import React, { useState } from "react";
import axios from "axios";
import JobForm from "../components/Jobform";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FaArrowLeft, FaBriefcase } from "react-icons/fa";

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // adjust to your project

const AddJob = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "employer") {
    return <Navigate to="/" replace />;
  }

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    salary: "",
    category: "",
    description: "",

    jobType: "Full-Time",
    experienceLevel: "Fresher",
    skills: "",
    vacancies: 1,
    deadline: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle text input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.salary || !formData.category) {
      toast.error("Please fill required fields!");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const data = {
        title: formData.title,
        salary: formData.salary,
        category: formData.category,
        description: formData.description,

        jobType: formData.jobType,
        experienceLevel: formData.experienceLevel,
        skills: formData.skills,
        vacancies: formData.vacancies,
        deadline: formData.deadline,
      };

      await axios.post("http://localhost:5500/api/jobs", data, {
        headers: {
          Authorization: token,
        },
      });
      toast.success("Job added successfully!");

      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add job!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-950 dark:to-slate-900 min-h-screen py-10 px-4 transition-colors duration-300">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="max-w-4xl mx-auto">
        {/* Back */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-4 font-medium transition-colors"
        >
          <FaArrowLeft /> Back to Home
        </Link>

        {/* Hero */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-8 mb-6 shadow-lg text-center">
          <FaBriefcase className="text-4xl mx-auto mb-3" />
          <h2 className="text-3xl font-bold">Add New Job</h2>
          <p className="text-sm opacity-90 mt-2">Post a new job opportunity</p>
        </div>

        {/* Form */}
        <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl shadow-xl p-8 transition-colors duration-300">
          <JobForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            btnText={loading ? "Adding..." : "Add Job"}
          />

          {/* Loader */}
          {loading && (
            <div className="flex justify-center mt-6">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddJob;
