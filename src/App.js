import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/navbar';
import Overview from './Components/dashboard';
import Upskill from './Components/Upskill';
import JobApplication from './Components/ApplicationStatus';
import './index.css';
import Interview from './Components/interviews';
import Blog from './Components/blog';
import Tools from './Components/tools';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<JobApplication />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/upskill" element={<Upskill />} />
          <Route path="/application-status" element={<JobApplication />} />
          <Route path="/interviews" element={<Interview />} />
          <Route path="/blog" element={<Blog></Blog>} />
          <Route path="/tools" element={<Tools></Tools>} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
