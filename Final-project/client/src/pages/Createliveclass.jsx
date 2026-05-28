import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Createliveclass = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const [form,setForm] = useState({
        title:"",
        subject:"",
        employerName:user?.name || "",
        date:"",
        time:"",
   });

 const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("please login first");
      return;
    }
    if(user?.role !== "admin" && user?.role !=="employer"){
        alert("only admin or instructor can  create live class");
        return;
    }

    try {
      await axios.post(
        "http://localhost:5500/api/liveclasses",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`, // 🔐 send token
          },
        }
      );

      alert("real live class added successfully!");

      setTimeout(() => navigate("/live-classes"), 1500);
    } catch (error) {
      console.error(error);
      
    } 
  };

  return <>
  
  <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-2xl shadow-card space-y-4"
    >
       <input
        type="text"
        name='title'
        placeholder='enter title'
        onChange={handleChange}
        value={form.title}
        className="w-full border p-3 rounded-lg"
        required
      />
      <input
        type="text"
        name='subject'
        placeholder='enter subject'
        onChange={handleChange}
        value={form.subject}
        className="w-full border p-3 rounded-lg"
        required
      />
      <input
        type="text"
        name='instructorName'
        placeholder='instructor name'
        onChange={handleChange}
        value={form.instructorName}
        className="w-full border p-3 rounded-lg"
        required
      />
      <div className='grid md:grid-cols-2 gap-5'>
        <input
        type="date"
        name='date'
        onChange={handleChange}
        value={form.date}
        className="w-full border p-3 rounded-lg"
        required
      />
     <input
        type="time"
        name='time'
        onChange={handleChange}
        value={form.time}
        className="w-full border p-3 rounded-lg"
        required
      />

      </div>
      
      
      <button 
      className="w-full bg-white text-black py-3 rounded-lg hover:bg-blue-700 transition"
      >
        create real metting
      </button>
    </form>
  
  
  </>
}

export default Createliveclass