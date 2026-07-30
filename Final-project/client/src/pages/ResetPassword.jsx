import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Mail, ArrowRight, Loader2, KeyRound, ShieldCheck } from "lucide-react";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const hs = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`https://job-portal-v3nf.onrender.com/api/auth/send-reset-otp`, { email });
      alert(res.data.message);
      navigate("/reset-pass-otp", { state: { email } });
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
              Forgot your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-100 to-white">password?</span>
            </h2>
            <p className="text-amber-100 text-lg max-w-sm leading-relaxed">
              No worries! It happens to the best of us. Let's get you back into your account securely.
            </p>
          </div>

          <div className="relative z-10 bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-xl flex items-start gap-4">
            <ShieldCheck className="w-10 h-10 text-amber-200 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-white mb-1">Secure Recovery</h3>
              <p className="text-amber-100 text-sm leading-relaxed">
                We'll send a secure One-Time Password (OTP) to your registered email address to verify your identity.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-7/12 p-8 sm:p-12 xl:p-16 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto">
            
            <div className="text-center lg:text-left mb-10">
              <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-500 rounded-2xl flex items-center justify-center mx-auto lg:mx-0 mb-6 shadow-sm border border-amber-200 dark:border-amber-800/50">
                <KeyRound className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Reset Password</h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium">
                Enter your registered email address below, and we'll send you an OTP to reset your password.
              </p>
            </div>

            <form onSubmit={hs} className="space-y-6">
              
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
                  </div>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all dark:text-white font-medium shadow-sm"
                    required
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  disabled={loading || !email}
                  className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50 disabled:hover:bg-amber-500 text-white py-3.5 rounded-2xl font-bold transition-all shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 group"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Send OTP
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

export default ResetPassword;