import React,{useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email,setEmail] = useState("");

  const hs = async(e)=>{
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5500/api/auth/send-reset-otp",{email});
      alert(res.data.message);
      navigate("/reset-pass-otp",{state:{email}});
    } catch(err){
      alert(err.response?.data?.message || "Failed");
    }
  }

  return (
    <div className='mt-10 max-w-md mx-auto p-8 bg-white rounded-xl'>
      <form onSubmit={hs} className="space-y-4">
        <h2>Reset Password</h2>

        <input type="email"
          placeholder='enter email'
          onChange={(e)=>setEmail(e.target.value)}
          value={email}
          className="w-full border p-3 rounded-lg"
          required />

        <button className="w-full bg-blue-600 text-white py-3 rounded-lg">
          Send OTP
        </button>
      </form>
    </div>
  )
}

export default ResetPassword