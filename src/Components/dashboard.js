import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FaEnvelope, FaBriefcase, FaUserCheck, FaChartLine } from "react-icons/fa";

// Utility function to format the date
const formatDate = () => {
  const today = new Date();
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const day = dayNames[today.getDay()];
  const date = today.getDate();
  const month = monthNames[today.getMonth()];
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
  
  return `${day}, ${date}${ordinal(date)} ${month} ${year}`;
};

const Dashboard = ({ userName }) => {
  const data = [
    { day: "Mon", applications: 10 },
    { day: "Tue", applications: 15 },
    { day: "Wed", applications: 20 },
    { day: "Thu", applications: 25 },
    { day: "Fri", applications: 18 },
    { day: "Sat", applications: 22 },
    { day: "Sun", applications: 12 },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-1">Welcome, {userName || "User"}</h1>
      <p className="text-gray-600 mb-6">{formatDate()}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-green-100 p-6 rounded-lg shadow-md flex items-center space-x-4">
          <FaBriefcase className="text-green-500 text-4xl" />
          <div>
            <h2 className="text-xl font-xl mb-2">New Applications (Past Week)</h2>
            <p className="text-4xl font-bold">45</p>
          </div>
        </div>
        <div className="bg-blue-100 p-6 rounded-lg shadow-md flex items-center space-x-4">
          <FaUserCheck className="text-blue-500 text-4xl" />
          <div>
            <h2 className="text-xl font-xl mb-2">Mock Interviews Given</h2>
            <p className="text-4xl font-bold">5</p>
            <p className="text-gray-700 mt-2">Average Rating: 8.5/10</p>
          </div>
        </div>
        <div className="bg-yellow-100 p-6 rounded-lg shadow-md flex items-center space-x-4">
          <FaEnvelope className="text-yellow-500 text-4xl" />
          <div>
            <h2 className="text-xl font-xl mb-2">Cold Emails Sent</h2>
            <p className="text-4xl font-bold">30</p>
          </div>
        </div>
        <div className="bg-purple-100 p-6 rounded-lg shadow-md flex items-center space-x-4">
          <FaChartLine className="text-purple-500 text-4xl" />
          <div>
            <h2 className="text-xl font-xl mb-2">Upskilling Tracker</h2>
            <ul className="text-gray-700">
              <li>- Completed React Course</li>
              <li>- Started Data Structures</li>
              <li>- 5 LeetCode Problems Solved</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Applications Over the Past Week</h2>
        <ResponsiveContainer width="100%" height={300}>
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
  );
};

export default Dashboard;
