import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './Components/navbar';
import Overview from './Components/dashboard';
import Upskill from './Components/Upskill';
import JobApplication from './Components/ApplicationStatus';
import './index.css';
import Interview from './Components/interviews';
import Blog from './Components/blog';
import Tools from './Components/tools';
import Login from './Components/Login';
import Register from './Components/Register';
import Profile from './Components/profile';
import InterviewWindow from './Components/InterviewWindow';
import HomePage from './Components/Home';
import Footer from './Components/Footer';
import EmailSender from './Components/Email-Sender';
import EmailSetup from './Components/EmailSetup';
import EmailEditorPage from './Components/EmailEditorPage';
import { useGlobalContext } from './Components/GlobalContext';

import { LoaderProvider, useLoader } from './Components/LoaderContext';
import LoaderOverlay from './Components/LoaderOverlay';
import About from './Components/about';
// import PostJobForm from './Components/PostJobForm.jsx';
import JobBoard from './Components/JobBoard';
import ReferralRequestPage from './Components/ReferralRequestPage';
import RecruitersList from './Components/RecruitersList';
import RecruiterProfile from './Components/RecruiterProfile';
import NotificationsList from './Components/NotificationsList';

const AppRoutes = () => {
  const { isLoggedIn, setIsLoggedIn } = useGlobalContext();
  const location = useLocation();
  const { setIsLoading } = useLoader();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 0); // show loader for 3 sec on every route
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div className="App">
      <LoaderOverlay />
      {!isLoggedIn ? (
        <Routes>
          <Route path="/login" element={<Login setLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/interviews" element={<Interview />} />
          <Route path="/recruiters" element={<><Navbar /><RecruitersList /></>} />
          <Route path="/recruiter/:recruiterId" element={<><Navbar /><RecruiterProfile /></>} />
          <Route path="/notifications" element={<><Navbar /><NotificationsList /></>} />
          <Route path="*" element={<><Navbar /><HomePage /></>} />
        </Routes>
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/upskill" element={<Upskill />} />
            <Route path="/application-status" element={<JobApplication />} />
            <Route path="/interviews" element={<Interview />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/new-interview" element={<InterviewWindow />} />
            <Route path="/email-sender" element={<EmailSender />} />
            <Route path="/email-setup" element={<EmailSetup />} />
            <Route path="/email-editor" element={<EmailEditorPage />} />
            <Route path="/about" element={<About />} />
            {/* <Route path="/postjob" element={<PostJobForm onJobSubmit={() => {}} />} /> */}
            <Route path="/jobs" element={<JobBoard />} />
            <Route path="/referral/:jobId" element={<ReferralRequestPage />} />
            <Route path="/recruiters" element={<RecruitersList />} />
            <Route path="/recruiter/:recruiterId" element={<RecruiterProfile />} />
            <Route path="/notifications" element={<NotificationsList />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </>
      )}
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
