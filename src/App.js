import React,{useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/navbar';
import Overview from './Components/dashboard';
import Upskill from './Components/Upskill';
import JobApplication from './Components/ApplicationStatus';
import './index.css';
import Interview from './Components/interviews';
import Blog from './Components/blog';
import Tools from './Components/tools';
import Login from './Components/Login';
import { Navigate } from 'react-router-dom';
import Profile from './Components/profile';
import InterviewWindow from './Components/InterviewWindow';


function App() {
  const [loggedIn,setLoggedIn] = useState(false);
  return (
    <Router>
      <div className="App">
      {!true ? (
          // Show login page if not logged in
          <Routes>
            <Route path="*" element={<Login setLoggedIn={setLoggedIn} />} />
          </Routes>
        ) : (
          // Show the actual app if logged in
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<JobApplication />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/upskill" element={<Upskill />} />
              <Route path="/application-status" element={<JobApplication />} />
              <Route path="/interviews" element={<Interview />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/new-interview" element={<InterviewWindow />} />
              <Route path="/login" element={<Login></Login>} /> {/* Redirect to home if already logged in */}
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
