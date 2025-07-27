// JobBoard.jsx or Dashboard.jsx
import React, { useEffect, useState } from 'react';
import JobList from './JobList';
import axios from 'axios';

const JobBoard = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/jobs`)
      .then((res) => setJobs(res.data))
      .catch((err) => console.error('Error fetching jobs', err));
  }, []);

  const handleRequestReferral = (jobId) => {
    const userId = '123'; // replace with actual logged-in user ID
    axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/jobs/${jobId}/referrals`, { userId })
      .then(() => alert('Referral requested!'))
      .catch((err) => console.error('Referral request failed', err));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <JobList jobs={jobs} onRequestReferral={handleRequestReferral} />
    </div>
  );
};

export default JobBoard;
