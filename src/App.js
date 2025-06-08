import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import RecruiterList from './Components/RecruitersList';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  console.log(loggedIn);
  return (
    <Router>
      <div className="App">
        {!loggedIn ? (
          // Show login or register page if not logged in
          <Routes>
            <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/email-sender" element={<EmailSender />} />
            <Route path="/email-setup" element={<EmailSetup/>}/>
            <Route path="/recruitersList" element={<RecruiterList/>}/>
            


            <Route path="*" element={
              <>
              <Navbar />
              <HomePage />
              </>
            } />
          </Routes>
        ) : (
          // Show the actual app if logged in
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
              <Route path="/email-setup" element={<EmailSetup/>}/>

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            
          </>
        )}
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
