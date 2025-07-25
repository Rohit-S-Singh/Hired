import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { FaEnvelope, FaBriefcase, FaUserCheck, FaChartLine } from "react-icons/fa";
import axios from 'axios';

import JobCategories from './exploreJobs';
import { useGlobalContext } from './GlobalContext'; // ⬅️ import context

const formatDate = () => {
  const today = new Date();
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const day = dayNames[today.getDay()];
  const date = today.getDate();
  const month = today.getMonth();
  const year = today.getFullYear();

  const ordinal = (n) => {
    if (n > 3 && n < 21) return 'th';
    switch (n % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  return `${day}, ${date}${ordinal(date)} ${monthNames[month]} ${year}`;
};

const Dashboard = () => {
  const { user } = useGlobalContext(); // ⬅️ get user from global context

  const data = [
    { day: "Mon", applications: 10 },
    { day: "Tue", applications: 15 },
    { day: "Wed", applications: 20 },
    { day: "Thu", applications: 25 },
    { day: "Fri", applications: 18 },
    { day: "Sat", applications: 22 },
    { day: "Sun", applications: 12 },
  ];

  const [applications, setApplications] = useState([]);
  const [coldEmailsSent, setColdEmailsSent] = useState(0); // ⬅️ state for cold emails sent

  useEffect(() => {
    const header = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
      }
    };

    // Fetch applications
    axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/getAllLogs`, {
      params: { userEmail: user?.email },
      headers: header.headers
    })
      .then(response => {
        setApplications(response.data.logs);
      
      })
      .catch(error => {
      console.error('Error fetching the applications:', error);
      });

    // Fetch cold emails sent
    if (user?.email) {
      axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/logs/getAllLogsByUser`, {
        params: { userEmail: user.email },
        headers: header.headers
      })
        .then(response => {
          if (response.data.success) {
            setColdEmailsSent(response.data.logs.length);
          }
        })
        .catch(error => {
          console.error('Error fetching cold emails sent:', error);
        });
    }
  }, [user]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-1">
        Welcome, {user?.username || user?.name || "User"} {/* ⬅️ use username from context */}
      </h1>
      <p className="text-gray-600 mb-6">{formatDate()}</p>

      <div className="flex justify-between space-x-6 px-4">
        <div className="w-full lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-100 p-4 rounded-lg shadow-md flex items-center space-x-4">
            <FaBriefcase className="text-green-500 text-3xl" />
            <div>
              <h2 className="text-lg font-medium mb-2">New Applications (Past Week)</h2>
              <p className="text-3xl font-bold">{Array.isArray(applications) ? applications.length : 0}</p>
            </div>
          </div>
          <div className="bg-blue-100 p-4 rounded-lg shadow-md flex items-center space-x-4">
            <FaUserCheck className="text-blue-500 text-3xl" />
            <div>
              <h2 className="text-lg font-medium mb-2">Mock Interviews Given</h2>
              <p className="text-3xl font-bold">0</p>
              <p className="text-gray-700 mt-2">Average Rating: 0/10</p>
            </div>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg shadow-md flex items-center space-x-4">
            <FaEnvelope className="text-yellow-500 text-3xl" />
            <div>
              <h2 className="text-lg font-medium mb-2">Cold Emails Sent</h2>
              <p className="text-3xl font-bold">{coldEmailsSent}</p> {/* ⬅️ display cold emails sent */}
            </div>
          </div>
          <div className="bg-purple-100 p-4 rounded-lg shadow-md flex items-center space-x-4">
            <FaChartLine className="text-purple-500 text-3xl" />
            <div>
              <h2 className="text-lg font-medium mb-2">Upskilling Tracker</h2>
              <ul className="text-gray-700 text-sm">
                <li>- Completed React Course</li>
                <li>- Started Data Structures</li>
                <li>- 5 LeetCode Problems Solved</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-4">Applications Over the Past Week</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
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

      <JobCategories />
    </div>
  );
};

export default Dashboard;
