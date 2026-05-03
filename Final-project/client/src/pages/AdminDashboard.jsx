import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5500/api/admin/dashboard",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setData(res.data);
    };

    fetchData();
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <p>Total Users</p>
          <h3 className="text-2xl font-bold">{data.totalUsers}</h3>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p>Total Jobs</p>
          <h3 className="text-2xl font-bold">{data.totalJobs}</h3>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p>Employers</p>
          <h3 className="text-2xl font-bold">{data.employers}</h3>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;