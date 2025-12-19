import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from './Components/navbar';
import Footer from './Components/Footer';
import { useGlobalContext } from './Components/GlobalContext';
import { LoaderProvider, useLoader } from './Components/LoaderContext';
import LoaderOverlay from './Components/LoaderOverlay';

import Overview from './Components/dashboard';
import Upskill from './Components/Upskill';
import JobApplication from './Components/ApplicationStatus';
import Interview from './Components/interviews';
import Blog from './Components/blog';
import Tools from './Components/tools';
import Login from './Components/Login';
import Register from './Components/Register';
import Profile from './Components/profile';
import InterviewWindow from './Components/InterviewWindow';
import HomePage from './Components/Home';
import EmailSender from './Components/Email-Sender';
import EmailSetup from './Components/EmailSetup';
import EmailEditorPage from './Components/EmailEditorPage';
import About from './Components/about';
import JobBoard from './Components/JobBoard';
import ReferralRequestPage from './Components/ReferralRequestPage';
import RecruitersList from './Components/RecruitersList';
import RecruiterProfile from './Components/RecruiterProfile';
import NotificationsList from './Components/NotificationsList';
import AdminDashboard from "./Components/AdminDashboard.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.js";
import PlacementSearchPage from "./Components/SearchPage.js";
import Profilepage_search from "./Components/Profilepage-search.js";
import CompanyProfilePage from "./Components/Company-Search.js";
import JobDetailsPage from "./Components/Job-Search.js";
import InterviewPage from "./Components/interviews.js";
import MentorDashboard from "./Components/interview-mentor.js";
import JobsListingPage from "./Components/jobs.js";
import AppWithProvider from "./Components/track-job.js";
import EventDiscoveryPlatform from "./Components/Events.js";
import ResumeDashboard from "./pages/Resume/ResumeDashboard.jsx";


const AppRoutes = () => {
  const { isLoggedIn } = useGlobalContext();
  const location = useLocation();
  const { setIsLoading } = useLoader();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 0);
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div className="App">
      <LoaderOverlay />

      {/* Navbar rendered for all pages except login/register */}
      {!["/login", "/register"].includes(location.pathname) && <Navbar />}

      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/email-editor"
          element={
              <EmailEditorPage />
          }
        />
        <Route path="*" element={<HomePage />} />
        <Route path="/placement-search" element={<PlacementSearchPage />} />
        <Route path="/profile-search" element={<Profilepage_search />} />
        <Route path="/company-search" element={<CompanyProfilePage />} />
        <Route path="/job-details" element={<JobDetailsPage />} />
        
        <Route path="/interview-page" element={<InterviewPage />} />
        <Route path="/MentorDashboard-interview" element={<MentorDashboard />} />
        <Route path="/jobs" element={<JobsListingPage />} />
        <Route path="/jobs-track" element={<AppWithProvider />} />
        <Route path="/events" element={<EventDiscoveryPlatform />} />
        <Route path="/resume" element={<ResumeDashboard />} />
        
      


        {/* Protected routes */}
        <Route
          path="/AdminDashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/overview"
          element={
            <ProtectedRoute>
              <Overview />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upskill"
          element={
            <ProtectedRoute>
              <Upskill />
            </ProtectedRoute>
          }
        />
        <Route
          path="/application-status"
          element={
            <ProtectedRoute>
              <JobApplication />
            </ProtectedRoute>
          }
        />
        <Route
          path="/interviews"
          element={
            <ProtectedRoute>
              <Interview />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blog"
          element={
            <ProtectedRoute>
              <Blog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tools"
          element={
            <ProtectedRoute>
              <Tools />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/new-interview"
          element={
            <ProtectedRoute>
              <InterviewWindow />
            </ProtectedRoute>
          }
        />
        <Route
          path="/email-sender"
          element={
            <ProtectedRoute>
              <EmailSender />
            </ProtectedRoute>
          }
        />
        <Route
          path="/email-setup"
          element={
            <ProtectedRoute>
              <EmailSetup />
            </ProtectedRoute>
          }
        />
        <Route
          path="/email-editor"
          element={
            <ProtectedRoute>
              <EmailEditorPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <JobBoard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/referral/:jobId"
          element={
            <ProtectedRoute>
              <ReferralRequestPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiters"
          element={
            <ProtectedRoute>
              <RecruitersList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiter/:recruiterId"
          element={
            <ProtectedRoute>
              <RecruiterProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <NotificationsList />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <LoaderProvider>
        <AppRoutes />
      </LoaderProvider>
    </Router>
  );
}

export default App;
