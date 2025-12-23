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

// -------- PUBLIC PAGES --------
import HomePage from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import PlacementSearchPage from "./Components/SearchPage";
import Profilepage_search from "./Components/Profilepage-search";
import CompanyProfilePage from "./Components/Company-Search";
import JobsListingPage from "./Components/jobs";
import JobDetails from "./pages/Jobs/JobDetails";
import EventDiscoveryPlatform from "./pages/events/Events";

// -------- PROTECTED PAGES --------
import Overview from "./Components/dashboard";
import Upskill from "./Components/Upskill";
import JobApplication from "./Components/ApplicationStatus";
import Interview from "./pages/interviews/interviews";
import InterviewWindow from "./Components/InterviewWindow";
import Blog from "./Components/blog";
import Tools from "./Components/tools";
import Profile from "./pages/Profile/profile";
import EmailSender from "./Components/Email-Sender";
import EmailSetup from "./Components/EmailSetup";
import EmailEditorPage from "./Components/EmailEditorPage";
import About from "./Components/about";
import ResumeDashboard from "./pages/Resume/ResumeDashboard";
import AppWithProvider from "./pages/Jobs/track-job";
import ReferralRequestPage from "./Components/ReferralRequestPage";
import RecruitersList from "./Components/RecruitersList";
import RecruiterProfile from "./Components/RecruiterProfile";
import NotificationsList from "./Components/NotificationsList";
import AdminDashboard from "./pages/Admin/AdminDashboard";
// import MentorDashboard from "./Components/interview-mentor";
import PostJobPage from "./pages/Jobs/PostJob";
import InterviewHistory from "./pages/interviews/InterviewHistory";
import FindMentor from "./pages/interviews/FindMentor";
import MentorDetail from "./pages/interviews/MentorDetail";
import MentorDashboard from "./pages/interviews/MentorDashboard";
import ScheduledInterviewPage from "./pages/interviews/ScheduledInterviewPage";
import InterviewHistoryPage from "./pages/interviews/InterviewHistoryPage";
import EditProfile from "./pages/Profile/EditProfile";
import RandomJobs from "./pages/Jobs/RandomJobs";
import SavedJobs from "./pages/Jobs/SavedJobs";
// ================= ROUTES =================

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

        <Route path="/placement-search" element={<PlacementSearchPage />} />
        <Route path="/profile-search" element={<Profilepage_search />} />
        <Route path="/company-search" element={<CompanyProfilePage />} />

         <Route path="/jobs" element={<RandomJobs />} />
         <Route path="/SavedJobs" element={<SavedJobs />} />
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path="/events" element={<EventDiscoveryPlatform />} />

        {/* ================= PROTECTED ROUTES ================= */}
        <Route element={<ProtectedLayout />}>
          <Route path="/overview" element={<Overview />} />
          <Route path="/upskill" element={<Upskill />} />
          <Route path="/application-status" element={<JobApplication />} />
          
          <Route path="/interviews" element={<Interview />} />
          <Route path="/new-interview" element={<InterviewWindow />} />
          <Route path="/history-interview" element={<InterviewHistory />} />
          <Route path="/find-mentor" element={<FindMentor />} />
     <Route path="/mentor/:mentorId" element={<MentorDetail />} />
     <Route path="/scheduled-interviews" element={<ScheduledInterviewPage />} />
     <Route path="/InterviewHistoryPage" element={<InterviewHistoryPage />} />
 
          <Route
            path="/MentorDashboard-interview"
            element={<MentorDashboard />}
          />
        </Route>
{/*profile--------------------------------------------------------------*/}
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />


          
          {/*profile--------------------------------------------------------------*/}

          <Route path="/blog" element={<Blog />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/about" element={<About />} />

          <Route path="/email-sender" element={<EmailSender />} />
          <Route path="/email-setup" element={<EmailSetup />} />
          <Route path="/email-editor" element={<EmailEditorPage />} />

          <Route path="/resume" element={<ResumeDashboard />} />
          <Route path="/jobs-track" element={<AppWithProvider />} />

          <Route path="/referral/:jobId" element={<ReferralRequestPage />} />
          <Route path="/recruiters" element={<RecruitersList />} />
          <Route
            path="/recruiter/:recruiterId"
            element={<RecruiterProfile />}
          />
          <Route path="/notifications" element={<NotificationsList />} />

          <Route path="/post-job" element={<PostJobPage />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />

        {/* ================= FALLBACK ================= */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
    </div>
  );
};

// ================= APP ROOT =================

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
