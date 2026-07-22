import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
        "http://localhost:5500/api/auth/verify-login-otp",
        {
          email: form.email,
          otp: form.otp,
        },
      );

      localStorage.setItem("token", res.data.token);

      // Get the latest profile from the backend
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
        "http://localhost:5500/api/auth/send-login-otp",
        {
          email: form.email,
          password: form.password,
        },
      );

      alert(res.data.message);

      setShowOTP(true);
    } catch (err) {
      console.log(err.response);
      console.log(err.response?.data);

      alert(err.response?.data?.message || err.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 w-full max-w-md mx-auto p-8 bg-white rounded-2xl shadow-md hover:shadow-2xl transition duration-300 border">
      {/* 🔹 Heading */}
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
        Login
      </h2>

      <form onSubmit={hs} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          onChange={hc}
          value={form.email}
          className="w-full border p-3 rounded-lg"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          onChange={hc}
          value={form.password}
          className="w-full border p-3 rounded-lg"
          required
        />
        {showOTP && (
          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            value={form.otp}
            onChange={hc}
            className="w-full border p-3 rounded-lg"
            required
          />
        )}

        {!showOTP ? (
          <button
            type="button"
            onClick={sendOTP}
            className="w-full bg-blue-600 text-white py-3 rounded-lg"
          >
            Send OTP
          </button>
        ) : (
          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg"
          >
            {loading ? "Logging..." : "Login"}
          </button>
        )}
      </form>

      <button
        onClick={() => navigate("/reset-password")}
        className="w-full mt-4 text-blue-600 hover:underline"
      >
        Forgot Password?
      </button>
    </div>
  );
};

export default Login;
