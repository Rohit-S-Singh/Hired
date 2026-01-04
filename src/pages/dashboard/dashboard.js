import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { FaEnvelope, FaBriefcase, FaUserCheck, FaChartLine } from "react-icons/fa";
import { ArrowRight, Briefcase as BriefcaseIcon } from "lucide-react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { useGlobalContext } from '../AUTH/GlobalContext.js';
import FeatureHighlights from '../../Components/FeatureHighlights.js';
import ProfileSetupForm from './ProfileSetupForm.jsx';
import JobCard from '../Jobs/JobCard.jsx'; // Import the JobCard component

const formatDate = () => {
  const today = new Date();
  return today.toDateString();
};

// SaveButton component for job cards
const SaveButton = ({ jobId, onSaveSuccess }) => {
  const { user } = useGlobalContext();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const saveJob = async () => {
    if (!user) {
      alert("Please login to save jobs");
      return;
    }

    try {
      setSaving(true);

      const token = localStorage.getItem("jwtToken");

      await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/jobs/save`,
        {
          userId: user._id,
          jobId: jobId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSaved(true);
      onSaveSuccess?.();

      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error("Error saving job:", error);

      if (error.response?.status === 409) {
        alert("Job already saved!");
      } else {
        alert("Failed to save job");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <button
      onClick={(e) => {
        e.stopPropagation(); // Prevent card click when saving
        saveJob();
      }}
      disabled={saving || saved}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
        saved
          ? "bg-green-50 text-green-600 border border-green-200"
          : "bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100"
      } ${saving ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {saving ? "Saving..." : saved ? "Saved!" : "Save Job"}
    </button>
  );
};

const Dashboard = () => {
  const { user, setUser } = useGlobalContext();
  const navigate = useNavigate();

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
          `${process.env.REACT_APP_BACKEND_BASE_URL}/api/jobs/random?limit=6`,
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

      {/* Jobs Section - Updated with JobCard */}
      <div className="mt-8 px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Explore Jobs</h2>
          <button
            onClick={() => navigate('/random-jobs')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            View All Jobs
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        
        {loadingJobs ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg font-medium">Loading opportunities...</p>
            </div>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
            <BriefcaseIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Jobs Available</h3>
            <p className="text-gray-600">Check back soon for new opportunities</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job, index) => (
              <div
                key={job._id}
                className="group animate-fade-in bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg hover:border-blue-300 transition-all cursor-pointer"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <JobCard job={job} viewMode="grid" />
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <SaveButton 
                    jobId={job._id} 
                    onSaveSuccess={() => console.log(`Job ${job._id} saved!`)} 
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;