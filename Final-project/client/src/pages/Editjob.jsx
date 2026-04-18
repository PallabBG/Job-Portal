import React, { useEffect, useState } from "react";
import API from "../api/jobApi";
import JobForm from "../components/Jobform";
import { useNavigate, useParams } from "react-router-dom";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    category: "",
    description: "",
  });

  const getSingleJob = async () => {
    try {
      const res = await API.get(`/${id}`);
      setFormData(res.data);
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
      await API.put(`/${id}`, formData);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Edit Job</h2>
      <JobForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        btnText="Update Job"
      />
    </div>
  );
};

export default EditJob;