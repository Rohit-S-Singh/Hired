import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  AiOutlineUser,
  AiOutlineLogout,
  AiOutlineReload,
  AiOutlineEye,
  AiOutlineUserAdd,
  AiOutlineVideoCamera,
  AiOutlineMail,
  AiOutlineTeam,
  AiOutlineIdcard,
  AiOutlineShop,
} from 'react-icons/ai';
import { MdOutlineRequestPage } from 'react-icons/md';

export default function AnalyticsDashboard() {
  const [loading, setLoading] = useState(false);
  const [timeRange, setTimeRange] = useState(28);
  const [graphTimeRange, setGraphTimeRange] = useState('week');
  
  // Analytics data state
  const [analytics, setAnalytics] = useState({
    uniqueVisitors: { value: 3, change: 100 },
    usersRegistered: { value: 4, change: 100 },
    interviewsTaken: { value: 7, change: 100 },
    coldEmailsSent: { value: 0, change: -100 },
    recruitersRegistered: { value: 0, change: 0 },
    mentorsRegistered: { value: 1, change: 100 },
    activeJobs: { value: 119, change: 0 }
  });

  // Graph data state - simulating time-series data
  const [graphData, setGraphData] = useState([]);

  const generateGraphData = () => {
    const points = graphTimeRange === 'day' ? 24 : graphTimeRange === 'week' ? 7 : 30;
    const baseValue = analytics.uniqueVisitors.value;
    const data = [];
    
    for (let i = 0; i < points; i++) {
      // Create realistic variation around the base value
      const variance = Math.random() * 0.4 - 0.2; // ±20% variance
      const trend = (i / points) * analytics.uniqueVisitors.change / 100;
      const value = Math.max(0, Math.floor(baseValue * (1 + variance + trend)));
      data.push(value);
    }
    
    return data;
  };

  useEffect(() => {
    setGraphData(generateGraphData());
  }, [analytics, graphTimeRange]);

  const handleCardClick = (metricType) => {
    console.log(`Navigate to: /analytics/${metricType}`);
  };

  const StatCard = ({ title, value, change, icon: Icon, iconColor, trend, onClick }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={onClick}
      className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all shadow-lg cursor-pointer hover:scale-105 hover:shadow-2xl"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${iconColor}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {change !== undefined && (
          <div className={`flex items-center text-sm font-semibold ${
            trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-gray-400'
          }`}>
            {trend === 'up' && <span className="mr-1">↑</span>}
            {trend === 'down' && <span className="mr-1">↓</span>}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <h3 className="text-gray-400 text-sm font-medium mb-2">{title}</h3>
      <p className="text-3xl font-bold text-white mb-1">
        {loading ? (
          <span className="animate-pulse">---</span>
        ) : (
          (value ?? 0).toLocaleString()
        )}
      </p>
      <p className="text-gray-500 text-xs">vs prev. {timeRange} days</p>
    </motion.div>
  );

  // Generate SVG path from data points
  const generatePath = (data, width = 800, height = 200) => {
    if (!data || data.length === 0) return '';
    
    const maxValue = Math.max(...data, 1);
    const minValue = Math.min(...data, 0);
    const range = maxValue - minValue || 1;
    const stepX = width / (data.length - 1 || 1);
    
    const points = data.map((value, index) => {
      const x = index * stepX;
      // Invert Y because SVG coordinates start from top
      const y = height - ((value - minValue) / range) * height * 0.8 - height * 0.1;
      return { x, y };
    });
    
    // Create smooth curve using quadratic bezier curves
    let path = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      const midX = (current.x + next.x) / 2;
      
      path += ` Q ${current.x} ${current.y}, ${midX} ${(current.y + next.y) / 2}`;
      if (i === points.length - 2) {
        path += ` T ${next.x} ${next.y}`;
      }
    }
    
    return path;
  };

  const generateFillPath = (data, width = 800, height = 200) => {
    const mainPath = generatePath(data, width, height);
    return `${mainPath} L ${width} ${height} L 0 ${height} Z`;
  };

  // Generate axis labels based on time range
  const getXAxisLabels = () => {
    if (graphTimeRange === 'day') {
      return ['12 AM', '4 AM', '8 AM', '12 PM', '4 PM', '8 PM'];
    } else if (graphTimeRange === 'week') {
      return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    } else {
      return ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    }
  };

  const getYAxisMax = () => {
    if (graphData.length === 0) return 0;
    return Math.max(...graphData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo & Title */}
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 w-10 h-10 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                  HireddAdmin
                </h1>
                <p className="text-xs text-gray-500">Analytics Dashboard</p>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => console.log('Navigate to AdminDashboard')}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-lg shadow-md transition-all duration-200 font-medium"
              >
                <MdOutlineRequestPage className="text-lg" />
                <span>Requests</span>
              </button>

              <button
                onClick={() => console.log('Navigate to AllUsers')}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg shadow-md transition-all duration-200 font-medium"
              >
                <AiOutlineUser className="text-lg" />
                <span>Users</span>
              </button>

              <button
                onClick={() => setGraphData(generateGraphData())}
                className="flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-lg shadow-sm transition-all duration-200 font-medium"
              >
                <AiOutlineReload className="text-lg" />
                <span>Refresh</span>
              </button>

              {/* Admin Profile */}
              <div className="flex items-center gap-3 bg-gray-100 px-4 py-2.5 rounded-lg border border-gray-200">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-md">
                  A
                </div>
                <span className="text-gray-900 font-medium">Admin</span>
              </div>

              <button className="flex items-center gap-2 px-4 py-2.5 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200">
                <AiOutlineLogout className="text-lg" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Platform Analytics
              </h2>
              <p className="text-gray-600">
                Monitor your platform's performance metrics
              </p>
            </div>

            {/* Time Range Selector */}
            <div className="flex gap-2 bg-white rounded-lg p-1 shadow-md border border-gray-200">
              <button
                onClick={() => setTimeRange(7)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  timeRange === 7
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                7 Days
              </button>
              <button
                onClick={() => setTimeRange(28)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  timeRange === 28
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                28 Days
              </button>
              <button
                onClick={() => setTimeRange(90)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  timeRange === 90
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                90 Days
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid - Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCard
            title="Unique Visitors"
            value={analytics.uniqueVisitors.value ?? 0}
            change={analytics.uniqueVisitors.change}
            trend={
              analytics.uniqueVisitors.change === 0
                ? "neutral"
                : analytics.uniqueVisitors.change > 0
                ? "up"
                : "down"
            }
            icon={AiOutlineEye}
            iconColor="bg-gradient-to-br from-purple-500 to-purple-600"
            onClick={() => handleCardClick('uniqueVisitors')}
          />
          
          <StatCard
            title="Users Registered"
            value={analytics.usersRegistered.value}
            change={analytics.usersRegistered.change}
            trend={analytics.usersRegistered.change > 0 ? 'up' : analytics.usersRegistered.change < 0 ? 'down' : 'neutral'}
            icon={AiOutlineUserAdd}
            iconColor="bg-gradient-to-br from-blue-500 to-blue-600"
            onClick={() => handleCardClick('usersRegistered')}
          />
          
          <StatCard
            title="Interviews Taken"
            value={analytics.interviewsTaken.value}
            change={analytics.interviewsTaken.change}
            trend={analytics.interviewsTaken.change > 0 ? 'up' : analytics.interviewsTaken.change < 0 ? 'down' : 'neutral'}
            icon={AiOutlineVideoCamera}
            iconColor="bg-gradient-to-br from-green-500 to-green-600"
            onClick={() => handleCardClick('interviewsTaken')}
          />
          
          <StatCard
            title="Cold Emails Sent"
            value={analytics.coldEmailsSent.value}
            change={analytics.coldEmailsSent.change}
            trend={analytics.coldEmailsSent.change > 0 ? 'up' : analytics.coldEmailsSent.change < 0 ? 'down' : 'neutral'}
            icon={AiOutlineMail}
            iconColor="bg-gradient-to-br from-orange-500 to-orange-600"
            onClick={() => handleCardClick('coldEmailsSent')}
          />
        </div>

        {/* Stats Grid - Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Recruiters Registered"
            value={analytics.recruitersRegistered.value}
            change={analytics.recruitersRegistered.change}
            trend={analytics.recruitersRegistered.change > 0 ? 'up' : analytics.recruitersRegistered.change < 0 ? 'down' : 'neutral'}
            icon={AiOutlineIdcard}
            iconColor="bg-gradient-to-br from-indigo-500 to-indigo-600"
            onClick={() => handleCardClick('recruitersRegistered')}
          />
          
          <StatCard
            title="Mentors Registered"
            value={analytics.mentorsRegistered.value}
            change={analytics.mentorsRegistered.change}
            trend={analytics.mentorsRegistered.change > 0 ? 'up' : analytics.mentorsRegistered.change < 0 ? 'down' : 'neutral'}
            icon={AiOutlineTeam}
            iconColor="bg-gradient-to-br from-pink-500 to-pink-600"
            onClick={() => handleCardClick('mentorsRegistered')}
          />
          
          <StatCard
            title="Active Jobs"
            value={analytics.activeJobs.value}
            change={analytics.activeJobs.change}
            trend={analytics.activeJobs.change > 0 ? 'up' : analytics.activeJobs.change < 0 ? 'down' : 'neutral'}
            icon={AiOutlineShop}
            iconColor="bg-gradient-to-br from-cyan-500 to-cyan-600"
            onClick={() => handleCardClick('activeJobs')}
          />
        </div>

        {/* Dynamic Graph Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg mb-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Platform Activity</h2>
              <div className="flex items-center gap-4">
                <p className="text-3xl font-bold text-white">
                  {analytics.uniqueVisitors.value.toLocaleString()}
                </p>
                <span className={`text-sm font-semibold flex items-center ${
                  analytics.uniqueVisitors.change > 0 ? 'text-green-400' : 
                  analytics.uniqueVisitors.change < 0 ? 'text-red-400' : 'text-gray-400'
                }`}>
                  {analytics.uniqueVisitors.change > 0 && <span className="mr-1">↑</span>}
                  {analytics.uniqueVisitors.change < 0 && <span className="mr-1">↓</span>}
                  {Math.abs(analytics.uniqueVisitors.change)}% vs prev. period
                </span>
              </div>
            </div>
            <div className="flex gap-2 bg-gray-800 rounded-lg p-1 border border-gray-700">
              <button 
                onClick={() => setGraphTimeRange('day')}
                className={`px-3 py-1.5 text-sm font-medium transition-colors rounded ${
                  graphTimeRange === 'day' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                Day
              </button>
              <button 
                onClick={() => setGraphTimeRange('week')}
                className={`px-3 py-1.5 text-sm font-medium transition-colors rounded ${
                  graphTimeRange === 'week' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                Week
              </button>
              <button 
                onClick={() => setGraphTimeRange('month')}
                className={`px-3 py-1.5 text-sm font-medium transition-colors rounded ${
                  graphTimeRange === 'month' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                Month
              </button>
            </div>
          </div>
          
          {/* Graph Container */}
          <div className="relative h-48 mt-4">
            <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
              {/* Grid lines */}
              <line x1="0" y1="50" x2="800" y2="50" stroke="#374151" strokeWidth="1" strokeDasharray="5,5" opacity="0.3"/>
              <line x1="0" y1="100" x2="800" y2="100" stroke="#374151" strokeWidth="1" strokeDasharray="5,5" opacity="0.5"/>
              <line x1="0" y1="150" x2="800" y2="150" stroke="#374151" strokeWidth="1" strokeDasharray="5,5" opacity="0.3"/>
              
              {/* Dynamic activity line */}
              <path
                d={generatePath(graphData)}
                fill="none"
                stroke="#3B82F6"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              {/* Fill under curve */}
              <path
                d={generateFillPath(graphData)}
                fill="url(#gradient)"
                opacity="0.3"
              />
              
              {/* Data points */}
              {graphData.map((value, index) => {
                const maxValue = Math.max(...graphData, 1);
                const minValue = Math.min(...graphData, 0);
                const range = maxValue - minValue || 1;
                const x = (index / (graphData.length - 1 || 1)) * 800;
                const y = 200 - ((value - minValue) / range) * 200 * 0.8 - 200 * 0.1;
                
                return (
                  <circle
                    key={index}
                    cx={x}
                    cy={y}
                    r="4"
                    fill="#3B82F6"
                    opacity="0.8"
                  />
                );
              })}
              
              {/* Gradient definition */}
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4"/>
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.05"/>
                </linearGradient>
              </defs>
            </svg>
            
            {/* Y-axis labels */}
            <div className="absolute top-0 -left-2 text-xs text-gray-500 font-medium">
              {Math.round(getYAxisMax())}
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 -left-8 text-xs text-gray-400 font-medium">AVG</div>
            <div className="absolute top-3/4 -left-2 text-xs text-gray-500 font-medium">
              {Math.round(getYAxisMax() * 0.5)}
            </div>
            <div className="absolute bottom-0 -left-1 text-xs text-gray-500 font-medium">0</div>
          </div>
          
          {/* X-axis labels */}
          <div className="flex justify-between mt-3 px-2 text-xs text-gray-500 font-medium">
            {getXAxisLabels().map((label, i) => (
              <span key={i}>{label}</span>
            ))}
          </div>
        </motion.div>

        {/* Summary Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-md border border-gray-200"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">Platform Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-gray-500 text-sm font-semibold mb-4 uppercase tracking-wide">
                User Engagement
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="text-gray-700 font-medium">Conversion Rate</span>
                  <span className="text-gray-900 font-bold text-lg">
                    {analytics.uniqueVisitors.value > 0
                      ? ((analytics.usersRegistered.value / analytics.uniqueVisitors.value) * 100).toFixed(1)
                      : '0.0'}%
                  </span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="text-gray-700 font-medium">Interviews per User</span>
                  <span className="text-gray-900 font-bold text-lg">
                    {analytics.usersRegistered.value > 0
                      ? (analytics.interviewsTaken.value / analytics.usersRegistered.value).toFixed(1)
                      : '0.0'}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="text-gray-700 font-medium">Emails per User</span>
                  <span className="text-gray-900 font-bold text-lg">
                    {analytics.usersRegistered.value > 0
                      ? (analytics.coldEmailsSent.value / analytics.usersRegistered.value).toFixed(1)
                      : '0.0'}
                  </span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-gray-500 text-sm font-semibold mb-4 uppercase tracking-wide">
                Platform Capacity
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="text-gray-700 font-medium">Jobs per Recruiter</span>
                  <span className="text-gray-900 font-bold text-lg">
                    {analytics.recruitersRegistered.value > 0
                      ? (analytics.activeJobs.value / analytics.recruitersRegistered.value).toFixed(1)
                      : '0.0'}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="text-gray-700 font-medium">Total Professionals</span>
                  <span className="text-gray-900 font-bold text-lg">
                    {(analytics.recruitersRegistered.value + analytics.mentorsRegistered.value).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="text-gray-700 font-medium">Recruiter:Mentor Ratio</span>
                  <span className="text-gray-900 font-bold text-lg">
                    {analytics.mentorsRegistered.value > 0
                      ? (analytics.recruitersRegistered.value / analytics.mentorsRegistered.value).toFixed(1)
                      : '0.0'}:1
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}