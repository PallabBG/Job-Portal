import React,{useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate();
  const [form,setForm] = useState({name:"",email:"",password:"",role:"jobseeker"});

  const hc = (e)=> setForm({...form,[e.target.name]:e.target.value});

  const hs = async(e)=>{
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5500/api/auth/register",form);
      alert(res.data.message);
      navigate("/verify-otp",{state:{email:form.email}});
    } catch(err){
      alert(err.response?.data?.message || "Registration failed");
    }
  }

  return (
    <div className='mt-10 w-full max-w-md mx-auto p-8 bg-white rounded-2xl shadow-md hover:shadow-2xl transition duration-300 border'>
      
      {/* 🔹 Heading */}
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
        Register
      </h2>

      <form onSubmit={hs} className="space-y-4">
        
        <input
          type="text"
          name='name'
          placeholder='Enter name'
          onChange={hc}
          value={form.name}
          className="w-full border p-3 rounded-lg"
          required
        />

        <input
          type="email"
          name='email'
          placeholder='Enter email'
          onChange={hc}
          value={form.email}
          className="w-full border p-3 rounded-lg"
          required
        />

        <input
          type="password"
          name='password'
          placeholder='Enter password'
          onChange={hc}
          value={form.password}
          className="w-full border p-3 rounded-lg"
          required
        />

        <select 
          name='role' 
          value={form.role}
          onChange={hc}
          className="w-full border p-3 rounded-lg"
        > <option value="admin">Admin</option>
          <option value="jobseeker">Jobseeker</option>
          <option value="employer">Employer</option>
        </select>

        <button 
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  )
}

export default Register