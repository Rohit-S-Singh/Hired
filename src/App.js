import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Navbar from "./Components/navbar";
import Footer from "./Components/Footer";

import { LoaderProvider, useLoader } from "./Components/LoaderContext";
import LoaderOverlay from "./Components/LoaderOverlay";

import ProtectedLayout from "./Components/ProtectedLayout";

/* ================= PUBLIC PAGES ================= */
import HomePage from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import PlacementSearchPage from "./Components/SearchPage";
import Profilepage_search from "./Components/Profilepage-search";
import CompanyProfilePage from "./Components/Company-Search";
import JobDetails from "./pages/Jobs/JobDetails";
import EventDiscoveryPlatform from "./pages/events/Events";
import RandomJobs from "./pages/Jobs/RandomJobs";
import SavedJobs from "./pages/Jobs/SavedJobs";
import PrivacyPolicy from "./Components/PrivacyPolicy.js";

/* ================= PROTECTED PAGES ================= */
import Overview from "./pages/dashboard/dashboard";
import Upskill from "./Components/Upskill";
import JobApplication from "./Components/ApplicationStatus";
import Interview from "./pages/interviews/interviews";
import InterviewWindow from "./Components/InterviewWindow";
import InterviewHistory from "./pages/interviews/InterviewHistory";
import FindMentor from "./pages/mentor/FindMentor.js";
import MentorDetail from "./pages/mentor/MentorDetail.jsx";
import ScheduledInterviewPage from "./pages/interviews/ScheduledInterviewPage";
import InterviewHistoryPage from "./pages/interviews/InterviewHistoryPage";
import MentorDashboard from "./pages/interviews/MentorDashboard";
import ChatPage from "./pages/chat/ChatPage";
import Profile from "./pages/Profile/profile";
import EditProfile from "./pages/Profile/EditProfile";

import Blog from "./Components/blog";
import Tools from "./Components/tools";
import About from "./Components/about";

import EmailSender from "./Components/Email-Sender";
import EmailSetup from "./Components/EmailSetup";
import EmailEditorPage from "./Components/EmailEditorPage";

import ResumeDashboard from "./pages/Resume/ResumeDashboard";
import AppWithProvider from "./pages/Jobs/track-job";

import ReferralRequestPage from "./Components/ReferralRequestPage";
import RecruitersList from "./Components/RecruitersList";
import RecruiterProfile from "./Components/RecruiterProfile";
import NotificationsList from "./Components/NotificationsList";
import BecomeMentorForm from "./pages/mentor/mentor-form.jsx";
import PostJobPage from "./pages/Jobs/PostJob";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import EditProfilePage from "./pages/Profile/edit1.jsx";
import InterviewReadiness from "./pages/interviews/FinalInterview.jsx";
import ProfileSetupForm from "./pages/dashboard/ProfileSetupForm";
import AnalyticsDashboard from "./pages/Admin/analytics.jsx";
import AllUsers from "./pages/Admin/AllUsers.jsx";
import AiInterviewPage from "./Components/AiInterview";
import PricingPage from "./pages/subscription/PricingPage.jsx";
import { Toaster } from "react-hot-toast";
import RecruiterDashboard from "./pages/recruiter/recruiterDhashboard.jsx";
import UploadResume from "./pages/Resume/UploadResume.jsx";
import EditResume from "./pages/Resume/EditResume.jsx";
import LaTeXEditor from "./pages/Resume/LaTeXEditor.jsx"
import MyResume from "./pages/Resume/ATSScore.jsx"
import MentorCarousel from "./pages/mentor/MentorCarousel.jsx";
/* ================= ROUTES ================= */

const AppRoutes = () => {
  const location = useLocation();
  const { setIsLoading } = useLoader();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 0);
    return () => clearTimeout(timer);
  }, [location]);

  const hideNavbar = ["/login", "/register"].includes(location.pathname);

  return (
    <div className="App">
      <LoaderOverlay />
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        

        <Route path="/placement-search" element={<PlacementSearchPage />} />
        <Route path="/profile-search" element={<Profilepage_search />} />
        <Route path="/company-search" element={<CompanyProfilePage />} />

        <Route path="/jobs" element={<RandomJobs />} />
        <Route path="/SavedJobs" element={<SavedJobs />} />
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path="/events" element={<EventDiscoveryPlatform />} />
        <Route path="/RecruiterDashboard" element={<RecruiterDashboard />} />


        {/* ================= PROTECTED ROUTES ================= */}
        <Route element={<ProtectedLayout />}>
          {/* Dashboard */}
          <Route path="/overview" element={<Overview />} />
          <Route path="/upskill" element={<Upskill />} />
          <Route path="/application-status" element={<JobApplication />} />

        <Route path="/MentorCarousel" element={<MentorCarousel />} />
          {/* Chat */}
          <Route path="/chat" element={<ChatPage />} />
          
          {/* Interviews */}
          {/* <Route path="/interviews" element={<Interview />} /> */}
          <Route path="/interviews" element={<InterviewReadiness />} />
          <Route path="/new-interview" element={<InterviewWindow />} />
          <Route path="/history-interview" element={<InterviewHistory />} />
          <Route path="/BecomeMentorForm" element={<BecomeMentorForm />} />
          <Route path="/find-mentor" element={<FindMentor />} />
          <Route path="/mentor/:mentorId" element={<MentorDetail />} />
          <Route path="/scheduled-interviews" element={<ScheduledInterviewPage />} />
          <Route path="/InterviewHistoryPage" element={<InterviewHistoryPage />} />
          <Route path="/MentorDashboard-interview" element={<MentorDashboard />} />

          {/* Profile */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfilePage />} />

          {/* Content */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/about" element={<About />} />

          {/* Email */}
          <Route path="/email-sender" element={<EmailSender />} />
          <Route path="/email-setup" element={<EmailSetup />} />
          <Route path="/email-editor" element={<EmailEditorPage />} />

          {/* Resume & Jobs */}
          <Route path="/resume-upload" element={<UploadResume />} />
          <Route path="/resume-EditResume" element={<EditResume />} />
          <Route path="/resume-LaTeXEditor" element={<LaTeXEditor />} />
          <Route path="/resume-ATS-score" element={<MyResume />} />
          <Route path="/jobs-track" element={<AppWithProvider />} />
          <Route path="/post-job" element={<PostJobPage />} />

          {/* Recruiters */}
          <Route path="/recruiters" element={<RecruitersList />} />
          <Route path="/recruiter/:recruiterId" element={<RecruiterProfile />} />
          <Route path="/referral/:jobId" element={<ReferralRequestPage />} />

          {/* Notifications & Admin */}
          <Route path="/notifications" element={<NotificationsList />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/AllUsers" element={<AllUsers />} />
          <Route path="/AnalyticsDashboard" element={<AnalyticsDashboard />} />
          <Route path="/ai-interview" element={<AiInterviewPage />} />
          {/* <Route path="/AnalyticsDashboard" element={<AnalyticsDashboard />} /> */}


          {/*pracrtice*/}
          <Route path="/123" element={<ProfileSetupForm />} />


        </Route>

        {/* ================= FALLBACK ================= */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
    </div>
  );
};

/* ================= APP ROOT ================= */

function App() {
  return (
    <>
          <Toaster position="top-right" />

    <Router>
      <LoaderProvider>
        <AppRoutes />
      </LoaderProvider>
    </Router>
    </>
  );
}

export default App;
