import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Mail, Lock, KeyRound, ArrowRight, Loader2, Quote } from "lucide-react";

const Login = () => {
  const { loadProfile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
    otp: "",
  });

  const redirectbyrole = (role) => {
    const r = role.toLowerCase();
    if (r === "admin") navigate("/admin-dashboard");
    else if (r === "employer") navigate("/employer-dashboard");
    else navigate("/jobseeker-dashboard");
  };

  const hc = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const hs = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post(
        "https://job-portal-v3nf.onrender.com/api/auth/verify-login-otp",
        {
          email: form.email,
          otp: form.otp,
        }
      );

      localStorage.setItem("token", res.data.token);
      await loadProfile();
      alert(res.data.message);
      redirectbyrole(res.data.user.role);
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const sendOTP = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        "https://job-portal-v3nf.onrender.com/api/auth/send-login-otp",
        {
          email: form.email,
          password: form.password,
        }
      );
      alert(res.data.message);
      setShowOTP(true);
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 sm:p-8 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="w-full max-w-5xl bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 dark:shadow-black/50 border border-slate-100 dark:border-slate-800 flex overflow-hidden">
        
        {/* Left Side: Graphic Banner */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 p-12 flex-col justify-between relative overflow-hidden text-white">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl -ml-20 -mb-20"></div>
          
          <div className="relative z-10 mt-8">
            <h2 className="text-4xl xl:text-5xl font-black mb-6 leading-tight">
              Welcome back to <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">Job Portal.</span>
            </h2>
            <p className="text-blue-100 text-lg max-w-sm leading-relaxed">
              Connect with top employers and find your next dream career opportunity today.
            </p>
          </div>

          <div className="relative z-10 bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-xl">
            <Quote className="w-8 h-8 text-blue-300 mb-3 opacity-50" />
            <p className="italic text-blue-50 font-medium leading-relaxed">
              "This platform made my job search incredibly easy and fast. I found my dream role in just two weeks! The AI interview feature was a game-changer."
            </p>
            <div className="mt-5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500 border-2 border-blue-300 flex items-center justify-center font-bold text-lg shadow-inner">
                S
              </div>
              <div>
                <p className="font-bold text-sm text-white">Sarah Jenkins</p>
                <p className="text-xs text-blue-200 font-medium">Software Engineer</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 xl:p-16 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto">
            
            <div className="text-center lg:text-left mb-10">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Sign in</h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium">
                Enter your details to access your account.
              </p>
            </div>

            <form onSubmit={hs} className="space-y-5">
              
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    onChange={hc}
                    value={form.email}
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all dark:text-white font-medium shadow-sm"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between ml-1">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Password</label>
                  {!showOTP && (
                    <Link to="/reset-password" className="text-sm font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 transition-colors">
                      Forgot password?
                    </Link>
                  )}
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    onChange={hc}
                    value={form.password}
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all dark:text-white font-medium shadow-sm"
                    required
                  />
                </div>
              </div>

              {showOTP && (
                <div className="space-y-1.5 animate-in fade-in slide-in-from-top-4 duration-300">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Verification OTP</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <KeyRound className="w-5 h-5 text-emerald-500" />
                    </div>
                    <input
                      type="text"
                      name="otp"
                      placeholder="Enter 6-digit OTP"
                      value={form.otp}
                      onChange={hc}
                      className="w-full pl-11 pr-4 py-3.5 bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all dark:text-white font-medium shadow-sm"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="pt-2">
                {!showOTP ? (
                  <button
                    type="button"
                    onClick={sendOTP}
                    disabled={loading || !form.email || !form.password}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 text-white py-3.5 rounded-2xl font-bold transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 group"
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        Verify Account
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    disabled={loading || !form.otp}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:hover:bg-emerald-600 text-white py-3.5 rounded-2xl font-bold transition-all shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      "Complete Login"
                    )}
                  </button>
                )}
              </div>
            </form>

            <p className="mt-8 text-center text-sm font-medium text-slate-500 dark:text-slate-400">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
                Create one now
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
