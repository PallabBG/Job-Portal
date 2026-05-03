import React,{useState} from 'react'
import axios from 'axios'
import { useNavigate,useLocation } from 'react-router-dom'

const ResetPassOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const [otp,setOtp] = useState("");
  const [password,setPassword] = useState("");
  const [confirm,setConfirm] = useState("");

  const hs = async(e)=>{
    e.preventDefault();

    if(password !== confirm){
      return alert("Passwords do not match");
    }

    try {
      const res = await axios.post(
        "http://localhost:5500/api/auth/reset-password",
        {email, otp, password}
      );

      alert(res.data.message);
      navigate("/login");

    } catch(err){
      alert(err.response?.data?.message || "Failed");
    }
  }

  return (
    <div className='mt-10 max-w-md mx-auto p-8 bg-white rounded-xl'>
      <form onSubmit={hs} className="space-y-4">
        <h2>Enter OTP & New Password</h2>

        <input type="password"
          placeholder='New Password'
          onChange={(e)=>setPassword(e.target.value)}
          value={password}
          className="w-full border p-3 rounded-lg"
          required />

        <input type="password"
          placeholder='Confirm Password'
          onChange={(e)=>setConfirm(e.target.value)}
          value={confirm}
          className="w-full border p-3 rounded-lg"
          required />

        <input type="text"
          placeholder='OTP'
          onChange={(e)=>setOtp(e.target.value)}
          value={otp}
          className="w-full border p-3 rounded-lg"
          required />

        <button className="w-full bg-blue-600 text-white py-3 rounded-lg">
          Reset Password
        </button>
      </form>
    </div>
  )
}

export default ResetPassOtp