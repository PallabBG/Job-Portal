import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Lock, KeyRound, ArrowRight, Loader2, ShieldCheck } from "lucide-react";

const ResetPassOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const hs = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      return alert("Passwords do not match");
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "https://job-portal-v3nf.onrender.com/api/auth/reset-password",
        { email, otp, password }
      );

      alert(res.data.message);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 sm:p-8 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="w-full max-w-5xl bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl shadow-amber-900/5 dark:shadow-black/50 border border-slate-100 dark:border-slate-800 flex overflow-hidden">
        
        {/* Left Side: Graphic Banner */}
        <div className="hidden lg:flex lg:w-5/12 bg-gradient-to-br from-amber-500 to-orange-600 p-12 flex-col justify-between relative overflow-hidden text-white">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-400/20 rounded-full blur-3xl -ml-20 -mb-20"></div>
          
          <div className="relative z-10 mt-8">
            <h2 className="text-4xl xl:text-5xl font-black mb-6 leading-tight">
              Create new <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-100 to-white">password.</span>
            </h2>
            <p className="text-amber-100 text-lg max-w-sm leading-relaxed">
              We've sent a one-time password to your email. Enter it below along with your new password to regain access.
            </p>
          </div>

          <div className="relative z-10 bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-xl flex items-start gap-4">
            <ShieldCheck className="w-10 h-10 text-amber-200 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-white mb-1">Strong Password</h3>
              <p className="text-amber-100 text-sm leading-relaxed">
                Make sure your new password is at least 8 characters long and includes a mix of numbers, letters, and symbols.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-7/12 p-8 sm:p-12 xl:p-16 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto">
            
            <div className="text-center lg:text-left mb-10">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Verify & Reset</h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium">
                Enter the OTP sent to <span className="font-bold text-slate-700 dark:text-slate-300">{email || "your email"}</span>.
              </p>
            </div>

            <form onSubmit={hs} className="space-y-5">
              
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Verification OTP</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <KeyRound className="w-5 h-5 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    onChange={(e) => setOtp(e.target.value)}
                    value={otp}
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all dark:text-white font-medium shadow-sm tracking-widest text-lg"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">New Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
                  </div>
                  <input
                    type="password"
                    placeholder="Create new password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all dark:text-white font-medium shadow-sm"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Confirm Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
                  </div>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    onChange={(e) => setConfirm(e.target.value)}
                    value={confirm}
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all dark:text-white font-medium shadow-sm"
                    required
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  disabled={loading || !otp || !password || !confirm}
                  className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50 disabled:hover:bg-amber-500 text-white py-3.5 rounded-2xl font-bold transition-all shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 group"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Reset Password
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>

            <p className="mt-8 text-center text-sm font-medium text-slate-500 dark:text-slate-400">
              Remembered your password?{" "}
              <Link to="/login" className="text-amber-600 dark:text-amber-500 font-bold hover:underline">
                Back to Login
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassOtp;
