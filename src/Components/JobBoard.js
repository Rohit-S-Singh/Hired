// JobBoard.jsx or Dashboard.jsx
import React, { useEffect, useState } from 'react';
import JobList from './JobList';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const JobBoard = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/jobs`)
      .then((res) => setJobs(res.data))
      .catch((err) => console.error('Error fetching jobs', err));
  }, []);

  const handleRequestReferral = (jobId) => {
    navigate(`/referral/${jobId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <JobList jobs={jobs} onRequestReferral={handleRequestReferral} />
    </div>
  );
};

export default JobBoard;
