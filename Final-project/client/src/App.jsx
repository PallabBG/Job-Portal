import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Feature from "./pages/Feature";

import AddJob from "./pages/AddJob";
import EditJob from "./pages/Editjob";
import SingleJob from "./pages/SingleJob";
import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminDashboard from "./pages/AdminDashboard";
import EmployerDashboard from "./pages/EmployerDashboard";
import JobseekerDashboard from "./pages/JobseekerDashboard";
import VerifyOtp from "./pages/VerifyOtp";
import ResetPassword from "./pages/ResetPassword"
import ResetPassOtp from "./pages/ResetPassOtp"

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />

         

          <Route path="/add-job" element={<AddJob />} />
          <Route path="/edit-job/:id" element={<EditJob />} />
          <Route path="/job/:id" element={<SingleJob />} />

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/f" element={<Feature />} />

          <Route path="/admin-dashboard" element={<AdminDashboard/>} />
          <Route path="/employer-dashboard" element={<EmployerDashboard/>} />
          <Route path="/jobseeker-dashboard" element={<JobseekerDashboard/>} />

          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/verify-otp" element={<VerifyOtp/>}/>
          <Route path="/reset-password" element={<ResetPassword/>}/>
          <Route path="/reset-pass-otp" element={<ResetPassOtp/>}/>
        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  );
};

export default App;