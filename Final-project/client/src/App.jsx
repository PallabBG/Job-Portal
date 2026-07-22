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
import ResetPassword from "./pages/ResetPassword";
import ResetPassOtp from "./pages/ResetPassOtp";

import ChatPage from "./pages/Chatpage";
import JobChatbot from "./pages/JobChatbot";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";
import MyApplications from "./pages/MyApplications";
import MyJobs from "./pages/MyJobs";
import JobApplicants from "./pages/JobApplicants";
import CandidateProfile from "./pages/CandidateProfile";
import Notifications from "./pages/Notifications";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/chat" element={<ChatPage />} />
          <Route path="/job-chatbot" element={<JobChatbot />} />

          <Route
            path="/add-job"
            element={
              <ProtectedRoute roles={["employer"]}>
                <AddJob />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-job/:id"
            element={
              <ProtectedRoute roles={["employer"]}>
                <EditJob />
              </ProtectedRoute>
            }
          />
          <Route path="/job/:id" element={<SingleJob />} />

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/f" element={<Feature />} />

          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employer-dashboard"
            element={
              <ProtectedRoute roles={["employer"]}>
                <EmployerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/jobseeker-dashboard"
            element={
              <ProtectedRoute roles={["jobseeker"]}>
                <JobseekerDashboard />
              </ProtectedRoute>
            }
          />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/reset-pass-otp" element={<ResetPassOtp />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute roles={["admin", "employer", "jobseeker"]}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route
            path="/my-applications"
            element={
              <ProtectedRoute roles={["jobseeker"]}>
                <MyApplications />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-jobs"
            element={
              <ProtectedRoute roles={["employer"]}>
                <MyJobs />
              </ProtectedRoute>
            }
          />

          <Route
            path="/job/:jobId/applicants"
            element={
              <ProtectedRoute roles={["employer", "admin"]}>
                <JobApplicants />
              </ProtectedRoute>
            }
          />
          <Route
            path="/candidate/:id"
            element={
              <ProtectedRoute roles={["employer", "admin"]}>
                <CandidateProfile />
              </ProtectedRoute>
            }
          />

          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
