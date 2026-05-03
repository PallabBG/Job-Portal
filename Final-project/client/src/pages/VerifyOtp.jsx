import React,{useState} from 'react'
import axios from 'axios'
import { useNavigate,useLocation } from 'react-router-dom'

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const [otp,setOtp] = useState("");

  const hv = async(e)=>{
    e.preventDefault();
    if(!email) {
      alert("email missing please register fast...");
      navigate("/register");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5500/api/auth/verify-otp",{email,otp});
      alert(res.data.message);
      navigate("/login");
    } catch(err){
      console.error(err);
    }
  }
  return <>
  <div className='mt-10 w-full max-w-md mx-auto p-8 bg-white rounded-2xl shadow-md hover:shadow-2xl transition duration-300 overflow-hidden border group'>
    <form
        onSubmit={hv}
        className="bg-white p-8 rounded-2xl shadow-card space-y-4"
        >
        <h2>Verify otp</h2>
      <p>otp sent to:{email} </p>
       <input
        type="text"
        placeholder='enter otp'
        onChange={(e)=>setOtp(e.target.value)}
        value={otp}
        className="w-full border p-3 rounded-lg"
        required
      />

        <button 
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
            Verify Otp
        </button>
        </form>
    </div>
  </>
}

export default VerifyOtp