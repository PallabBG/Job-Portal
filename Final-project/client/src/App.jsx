import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Jobs from "./pages/Jobs";
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
import EmployerProfile from "./pages/EmployerProfile";
import Notifications from "./pages/Notifications";
import JobRecommendations from "./pages/JobRecommendations";
import InterviewQuestions from "./pages/InterviewQuestions";
import ConversationPage from "./pages/ConversationPage";
import Home from "./pages/Home";
import UserManagement from "./pages/UserManagement";
import ApplicationManagement from "./pages/ApplicationManagement";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 transition-colors duration-300">
        <Navbar />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Jobs />} />

            <Route
              path="/chat"
              element={
                <ProtectedRoute roles={["employer", "jobseeker"]}>
                  <ConversationPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/chat/:receiverId"
              element={
                <ProtectedRoute roles={["employer", "jobseeker"]}>
                  <ChatPage />
                </ProtectedRoute>
              }
            />
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
            <Route path="/Home" element={<Home />} />
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
              path="/user-management"
              element={
                <ProtectedRoute roles={["admin","employer"]}>
                  <UserManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/application-management"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <ApplicationManagement />
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

            <Route
              path="/employer/:id"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <EmployerProfile />
                </ProtectedRoute>
              }
            />

            <Route path="/notifications" element={<Notifications />} />
            <Route
              path="/job-recommendations"
              element={<JobRecommendations />}
            />
            <Route
              path="/interview/:jobId"
              element={
                <ProtectedRoute allowedRoles={["jobseeker"]}>
                  <InterviewQuestions />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
