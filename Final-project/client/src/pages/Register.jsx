import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock, Briefcase, ArrowRight, Loader2, Quote } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "jobseeker" });

  const hc = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const hs = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, form);
      alert(res.data.message);
      navigate("/verify-otp", { state: { email: form.email } });
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 sm:p-8 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="w-full max-w-5xl bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl shadow-indigo-900/5 dark:shadow-black/50 border border-slate-100 dark:border-slate-800 flex overflow-hidden">
        
        {/* Left Side: Graphic Banner */}
        <div className="hidden lg:flex lg:w-5/12 bg-gradient-to-br from-indigo-600 to-purple-700 p-12 flex-col justify-between relative overflow-hidden text-white">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl -ml-20 -mb-20"></div>
          
          <div className="relative z-10 mt-8">
            <h2 className="text-4xl xl:text-5xl font-black mb-6 leading-tight">
              Start your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-white">journey here.</span>
            </h2>
            <p className="text-indigo-100 text-lg max-w-sm leading-relaxed">
              Create an account to discover opportunities, connect with companies, and land your dream job.
            </p>
          </div>

          <div className="relative z-10 bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-xl">
            <Quote className="w-8 h-8 text-indigo-300 mb-3 opacity-50" />
            <p className="italic text-indigo-50 font-medium leading-relaxed">
              "Signing up was the best career move I made. The platform's AI tools matched me perfectly with a role I love."
            </p>
            <div className="mt-5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-500 border-2 border-purple-300 flex items-center justify-center font-bold text-lg shadow-inner">
                M
              </div>
              <div>
                <p className="font-bold text-sm text-white">Michael Chen</p>
                <p className="text-xs text-indigo-200 font-medium">Product Manager</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Register Form */}
        <div className="w-full lg:w-7/12 p-8 sm:p-12 xl:p-16 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto">
            
            <div className="text-center lg:text-left mb-10">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Create Account</h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium">
                Enter your details to register as a new user.
              </p>
            </div>

            <form onSubmit={hs} className="space-y-4">
              
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Full Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    onChange={hc}
                    value={form.name}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all dark:text-white font-medium shadow-sm"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    onChange={hc}
                    value={form.email}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all dark:text-white font-medium shadow-sm"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    placeholder="Create a password"
                    onChange={hc}
                    value={form.password}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all dark:text-white font-medium shadow-sm"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Account Type</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Briefcase className="w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                  </div>
                  <select
                    name="role"
                    value={form.role}
                    onChange={hc}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all dark:text-white font-medium shadow-sm appearance-none"
                  >
                    <option value="jobseeker">Jobseeker</option>
                    <option value="employer">Employer</option>
                    <option value="admin">Admin</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  disabled={loading || !form.name || !form.email || !form.password}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 text-white py-3.5 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2 group"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>

            <p className="mt-8 text-center text-sm font-medium text-slate-500 dark:text-slate-400">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">
                Sign in instead
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;