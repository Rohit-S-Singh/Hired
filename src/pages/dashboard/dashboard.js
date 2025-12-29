import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { FaEnvelope, FaBriefcase, FaUserCheck, FaChartLine } from "react-icons/fa";
import axios from 'axios';

import { useGlobalContext } from '../AUTH/GlobalContext.js';
import FeatureHighlights from '../../Components/FeatureHighlights.js';
import ProfileSetupForm from './ProfileSetupForm.jsx';

const formatDate = () => {
  const today = new Date();
  return today.toDateString();
};

const Dashboard = () => {
  const { user, setUser } = useGlobalContext();

  const [applications, setApplications] = useState([]);
  const [coldEmailsSent, setColdEmailsSent] = useState(0);
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);

  const header = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
    }
  };

  // Check if user needs to complete profile setup
  useEffect(() => {
    if (user && user.userType === "None") {
      setShowProfileSetup(true);
    } else {
      setShowProfileSetup(false);
    }
  }, [user]);

  useEffect(() => {
    if (!user?.email) return;

    axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/getAllLogs`, {
      params: { userEmail: user.email },
      headers: header.headers
    })
    .then(res => setApplications(res.data.logs))
    .catch(err => console.log(err));

    axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/logs/getAllLogsByUser`, {
      params: { userEmail: user.email },
      headers: header.headers
    })
    .then(res => {
      if (res.data.success) setColdEmailsSent(res.data.logs.length);
    })
    .catch(err => console.log(err));

  }, [user]);

  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoadingJobs(true);
        const token = localStorage.getItem('jwtToken');
        
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/api/jobs/random`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setJobs(response.data.jobs || []);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoadingJobs(false);
      }
    };

    fetchJobs();
  }, []);

  // Handle profile setup completion
  const handleProfileSetupComplete = async (data) => {
    if (data.skipped) {
      setShowProfileSetup(false);
      return;
    }

    // Update user in context if needed
    if (user) {
      setUser({
        ...user,
        userType: data.userType || user.userType
      });
    }
    
    setShowProfileSetup(false);
  };

  // Show ProfileSetupForm if userType is "None"
if (showProfileSetup && user?._id) {
    return (
      <ProfileSetupForm
        userId={user._id}
        onComplete={handleProfileSetupComplete}
      />
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-2xl font-bold mb-1">
        Welcome, {user?.username || user?.name || "User"}
      </h1>

      <p className="text-gray-600 mb-6">{formatDate()}</p>

      {/* METRICS + GRAPH */}
      <div className="flex justify-between space-x-6 px-4">
        <div className="w-full lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Applications */}
          <div className="bg-green-100 p-4 rounded-lg shadow-md flex items-center space-x-4">
            <FaBriefcase className="text-green-500 text-3xl" />
            <div>
              <h2 className="text-lg font-medium mb-2">New Applications</h2>
              <p className="text-3xl font-bold">{applications.length}</p>
            </div>
          </div>

          {/* Mock Interviews */}
          <div className="bg-blue-100 p-4 rounded-lg shadow-md flex items-center space-x-4">
            <FaUserCheck className="text-blue-500 text-3xl" />
            <div>
              <h2 className="text-lg font-medium mb-2">Mock Interviews</h2>
              <p className="text-3xl font-bold">0</p>
            </div>
          </div>

          {/* Cold Emails */}
          <div className="bg-yellow-100 p-4 rounded-lg shadow-md flex items-center space-x-4">
            <FaEnvelope className="text-yellow-500 text-3xl" />
            <div>
              <h2 className="text-lg font-medium mb-2">Cold Emails Sent</h2>
              <p className="text-3xl font-bold">{coldEmailsSent}</p>
            </div>
          </div>

          {/* Upskilling */}
          <div className="bg-purple-100 p-4 rounded-lg shadow-md flex items-center space-x-4">
            <FaChartLine className="text-purple-500 text-3xl" />
            <div>
              <h2 className="text-lg font-medium mb-2">Upskilling</h2>
              <ul className="text-gray-700 text-sm">
                <li>- React course completed</li>
                <li>- Started DSA</li>
                <li>- LeetCode 5 problems</li>
              </ul>
            </div>
          </div>

        </div>

        {/* GRAPH */}
        <div className="w-full lg:w-1/2 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-4">Applications (Past Week)</h2>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart
              data={[
                { day: "Mon", applications: 10 },
                { day: "Tue", applications: 15 },
                { day: "Wed", applications: 20 },
                { day: "Thu", applications: 25 },
                { day: "Fri", applications: 18 },
                { day: "Sat", applications: 22 },
                { day: "Sun", applications: 12 },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="applications" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <FeatureHighlights />

      {/* Jobs Section */}
      <div className="mt-8 px-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Explore Jobs</h2>
        
        {loadingJobs ? (
          <div className="text-center py-8">
            <p className="text-gray-600">Loading jobs...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No jobs available at the moment</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.slice(0, 6).map((job) => (
              <div
                key={job._id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-200"
              >
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {job.title}
                  </h3>
                  
                  {job.company && (
                    <p className="text-gray-600 font-medium mb-1">{job.company}</p>
                  )}
                  
                  {job.location && (
                    <p className="text-sm text-gray-500">📍 {job.location}</p>
                  )}
                </div>
                
                {job.description && (
                  <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                    {job.description}
                  </p>
                )}
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  {job.salary && (
                    <span className="text-sm font-semibold text-green-600">
                      {job.salary}
                    </span>
                  )}
                  
                  <button
                    onClick={() => {
                      console.log('Apply to job:', job._id);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Dashboard;