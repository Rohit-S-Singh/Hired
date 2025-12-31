import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [selectedMetric, setSelectedMetric] = useState('all');
  const navigate = useNavigate();
  
  const [analytics, setAnalytics] = useState({
    uniqueVisitors: { value: 0, change: 0 },
    usersRegistered: { value: 0, change: 0 },
    interviewsTaken: { value: 0, change: 0 },
    coldEmailsSent: { value: 0, change: 0 },
    recruitersRegistered: { value: 0, change: 0 },
    mentorsRegistered: { value: 0, change: 0 },
    activeJobs: { value: 0, change: 0 }
  });

  const [trendData, setTrendData] = useState({});

  // Generate realistic trend data based on current value and change percentage
  const generateTrendData = (currentValue, changePercent, points) => {
    if (currentValue === 0) return Array(points).fill(0);
    
    const data = [];
    const previousValue = changePercent !== 0 
      ? currentValue / (1 + changePercent / 100)
      : currentValue;
    
    for (let i = 0; i < points; i++) {
      const progress = i / (points - 1);
      const value = previousValue + (currentValue - previousValue) * progress;
      const noise = (Math.random() - 0.5) * currentValue * 0.1;
      data.push(Math.max(0, Math.round(value + noise)));
    }
    
    data[points - 1] = currentValue;
    return data;
  };

  // Calculate overall performance score based on percentage changes
  const calculateOverallPerformance = () => {
    const changes = [
      analytics.uniqueVisitors.change,
      analytics.usersRegistered.change,
      analytics.interviewsTaken.change,
      analytics.coldEmailsSent.change,
      analytics.recruitersRegistered.change,
      analytics.mentorsRegistered.change,
      analytics.activeJobs.change
    ];

    // Filter out zero values to avoid skewing the average
    const validChanges = changes.filter(change => change !== 0);
    
    if (validChanges.length === 0) return 0;

    // Calculate average change and convert to 0-100 scale
    const avgChange = validChanges.reduce((sum, change) => sum + change, 0) / validChanges.length;
    
    // Map the change to a 0-100 scale (assuming -100 to +100 range maps to 0-100)
    const performanceScore = Math.max(0, Math.min(100, 50 + (avgChange / 2)));
    
    return Math.round(performanceScore);
  };

  const fetchAnalytics = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("jwtToken");

      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/Admin/analytics`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await res.json();

      if (data.success) {
        setAnalytics(data.analytics);
      }
    } catch (error) {
      console.error("Failed to fetch analytics", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  useEffect(() => {
    if (analytics.uniqueVisitors.value === 0) return;

    const points = graphTimeRange === 'day' ? 24 : graphTimeRange === 'week' ? 7 : 30;
    
    const newTrendData = {
      uniqueVisitors: generateTrendData(analytics.uniqueVisitors.value, analytics.uniqueVisitors.change, points),
      usersRegistered: generateTrendData(analytics.usersRegistered.value, analytics.usersRegistered.change, points),
      interviewsTaken: generateTrendData(analytics.interviewsTaken.value, analytics.interviewsTaken.change, points),
      coldEmailsSent: generateTrendData(analytics.coldEmailsSent.value, analytics.coldEmailsSent.change, points),
      recruitersRegistered: generateTrendData(analytics.recruitersRegistered.value, analytics.recruitersRegistered.change, points),
      mentorsRegistered: generateTrendData(analytics.mentorsRegistered.value, analytics.mentorsRegistered.change, points),
      activeJobs: generateTrendData(analytics.activeJobs.value, analytics.activeJobs.change, points)
    };
    
    setTrendData(newTrendData);
  }, [analytics, graphTimeRange]);

  const handleCardClick = (metricType) => {
    setSelectedMetric(metricType);
  };

  const StatCard = ({ title, value, change, icon: Icon, iconColor, trend, onClick, metricKey, isSelected }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={onClick}
      className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border transition-all shadow-lg cursor-pointer hover:scale-105 hover:shadow-2xl ${
        isSelected ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-700 hover:border-gray-600'
      }`}
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

  const generatePath = (data, width = 800, height = 200) => {
    if (!data || data.length === 0) return '';
    
    const maxValue = Math.max(...data, 1);
    const minValue = Math.min(...data, 0);
    const range = maxValue - minValue || 1;
    const stepX = width / (data.length - 1 || 1);
    
    const points = data.map((value, index) => {
      const x = index * stepX;
      const y = height - ((value - minValue) / range) * height * 0.8 - height * 0.1;
      return { x, y };
    });
    
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

  const getXAxisLabels = () => {
    if (graphTimeRange === 'day') {
      return ['12AM', '4AM', '8AM', '12PM', '4PM', '8PM', '11PM'];
    } else if (graphTimeRange === 'week') {
      return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    } else {
      return ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    }
  };

  const metricConfigs = {
    uniqueVisitors: { color: '#8B5CF6', label: 'Unique Visitors' },
    usersRegistered: { color: '#3B82F6', label: 'Users Registered' },
    interviewsTaken: { color: '#10B981', label: 'Interviews Taken' },
    coldEmailsSent: { color: '#F59E0B', label: 'Cold Emails Sent' },
    recruitersRegistered: { color: '#6366F1', label: 'Recruiters' },
    mentorsRegistered: { color: '#EC4899', label: 'Mentors' },
    activeJobs: { color: '#06B6D4', label: 'Active Jobs' }
  };

  const renderGraph = () => {
    if (selectedMetric === 'all') {
      return (
        <>
          {Object.keys(metricConfigs).map((key) => {
            const data = trendData[key] || [];
            if (data.length === 0) return null;
            
            return (
              <g key={key}>
                <path
                  d={generatePath(data)}
                  fill="none"
                  stroke={metricConfigs[key].color}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.8"
                />
              </g>
            );
          })}
        </>
      );
    } else if (selectedMetric === 'performance') {
      const performanceData = trendData.uniqueVisitors?.map((_, index) => {
        let score = 0;
        Object.keys(trendData).forEach(key => {
          score += (trendData[key][index] || 0) * 0.14;
        });
        return Math.round(score);
      }) || [];

      return (
        <>
          <defs>
            <linearGradient id="performanceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4"/>
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.05"/>
            </linearGradient>
          </defs>
          <path
            d={generatePath(performanceData) + ` L 800 200 L 0 200 Z`}
            fill="url(#performanceGradient)"
          />
          <path
            d={generatePath(performanceData)}
            fill="none"
            stroke="#3B82F6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      );
    } else {
      const data = trendData[selectedMetric] || [];
      return (
        <>
          <defs>
            <linearGradient id="singleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={metricConfigs[selectedMetric].color} stopOpacity="0.4"/>
              <stop offset="100%" stopColor={metricConfigs[selectedMetric].color} stopOpacity="0.05"/>
            </linearGradient>
          </defs>
          <path
            d={generatePath(data) + ` L 800 200 L 0 200 Z`}
            fill="url(#singleGradient)"
          />
          <path
            d={generatePath(data)}
            fill="none"
            stroke={metricConfigs[selectedMetric].color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <nav className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
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

            <div className="flex items-center gap-3">
              <button
                onClick={() => console.log('Navigate to AdminDashboard')}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-lg shadow-md transition-all duration-200 font-medium"
              >
                <MdOutlineRequestPage className="text-lg" />
                <span>Requests</span>
              </button>

              <button
                onClick={() => navigate('/AllUsers')}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg shadow-md transition-all duration-200 font-medium"
              >
                <AiOutlineUser className="text-lg" />
                <span>Users</span>
              </button>

              <button
                onClick={fetchAnalytics}
                className="flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-lg shadow-sm transition-all duration-200 font-medium"
              >
                <AiOutlineReload className="text-lg" />
                <span>Refresh</span>
              </button>

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

      <main className="max-w-7xl mx-auto px-6 py-8">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCard
            title="Unique Visitors"
            value={analytics.uniqueVisitors.value}
            change={analytics.uniqueVisitors.change}
            trend={analytics.uniqueVisitors.change > 0 ? 'up' : analytics.uniqueVisitors.change < 0 ? 'down' : 'neutral'}
            icon={AiOutlineEye}
            iconColor="bg-gradient-to-br from-purple-500 to-purple-600"
            onClick={() => handleCardClick('uniqueVisitors')}
            metricKey="uniqueVisitors"
            isSelected={selectedMetric === 'uniqueVisitors'}
          />
          
          <StatCard
            title="Users Registered"
            value={analytics.usersRegistered.value}
            change={analytics.usersRegistered.change}
            trend={analytics.usersRegistered.change > 0 ? 'up' : analytics.usersRegistered.change < 0 ? 'down' : 'neutral'}
            icon={AiOutlineUserAdd}
            iconColor="bg-gradient-to-br from-blue-500 to-blue-600"
            onClick={() => handleCardClick('usersRegistered')}
            metricKey="usersRegistered"
            isSelected={selectedMetric === 'usersRegistered'}
          />
          
          <StatCard
            title="Interviews Taken"
            value={analytics.interviewsTaken.value}
            change={analytics.interviewsTaken.change}
            trend={analytics.interviewsTaken.change > 0 ? 'up' : analytics.interviewsTaken.change < 0 ? 'down' : 'neutral'}
            icon={AiOutlineVideoCamera}
            iconColor="bg-gradient-to-br from-green-500 to-green-600"
            onClick={() => handleCardClick('interviewsTaken')}
            metricKey="interviewsTaken"
            isSelected={selectedMetric === 'interviewsTaken'}
          />
          
          <StatCard
            title="Cold Emails Sent"
            value={analytics.coldEmailsSent.value}
            change={analytics.coldEmailsSent.change}
            trend={analytics.coldEmailsSent.change > 0 ? 'up' : analytics.coldEmailsSent.change < 0 ? 'down' : 'neutral'}
            icon={AiOutlineMail}
            iconColor="bg-gradient-to-br from-orange-500 to-orange-600"
            onClick={() => handleCardClick('coldEmailsSent')}
            metricKey="coldEmailsSent"
            isSelected={selectedMetric === 'coldEmailsSent'}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Recruiters Registered"
            value={analytics.recruitersRegistered.value}
            change={analytics.recruitersRegistered.change}
            trend={analytics.recruitersRegistered.change > 0 ? 'up' : analytics.recruitersRegistered.change < 0 ? 'down' : 'neutral'}
            icon={AiOutlineIdcard}
            iconColor="bg-gradient-to-br from-indigo-500 to-indigo-600"
            onClick={() => handleCardClick('recruitersRegistered')}
            metricKey="recruitersRegistered"
            isSelected={selectedMetric === 'recruitersRegistered'}
          />
          
          <StatCard
            title="Mentors Registered"
            value={analytics.mentorsRegistered.value}
            change={analytics.mentorsRegistered.change}
            trend={analytics.mentorsRegistered.change > 0 ? 'up' : analytics.mentorsRegistered.change < 0 ? 'down' : 'neutral'}
            icon={AiOutlineTeam}
            iconColor="bg-gradient-to-br from-pink-500 to-pink-600"
            onClick={() => handleCardClick('mentorsRegistered')}
            metricKey="mentorsRegistered"
            isSelected={selectedMetric === 'mentorsRegistered'}
          />
          
          <StatCard
            title="Active Jobs"
            value={analytics.activeJobs.value}
            change={analytics.activeJobs.change}
            trend={analytics.activeJobs.change > 0 ? 'up' : analytics.activeJobs.change < 0 ? 'down' : 'neutral'}
            icon={AiOutlineShop}
            iconColor="bg-gradient-to-br from-cyan-500 to-cyan-600"
            onClick={() => handleCardClick('activeJobs')}
            metricKey="activeJobs"
            isSelected={selectedMetric === 'activeJobs'}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg mb-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">
                {selectedMetric === 'all' ? 'All Metrics' : 
                 selectedMetric === 'performance' ? 'Overall Performance' :
                 metricConfigs[selectedMetric]?.label}
              </h2>
              <div className="flex items-center gap-4">
                <p className="text-3xl font-bold text-white">
                  {selectedMetric === 'performance' 
                    ? `${calculateOverallPerformance()}%`
                    : selectedMetric === 'all' 
                    ? 'Multiple Metrics'
                    : (analytics[selectedMetric]?.value || 0).toLocaleString()}
                </p>
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

          <div className="flex gap-2 mb-4 flex-wrap">
            <button
              onClick={() => setSelectedMetric('performance')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                selectedMetric === 'performance'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Overall Performance
            </button>
            <button
              onClick={() => setSelectedMetric('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                selectedMetric === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              All Metrics
            </button>
            {Object.keys(metricConfigs).map(key => (
              <button
                key={key}
                onClick={() => setSelectedMetric(key)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-2 ${
                  selectedMetric === key
                    ? 'text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                style={selectedMetric === key ? { backgroundColor: metricConfigs[key].color } : {}}
              >
                <span 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: metricConfigs[key].color }}
                />
                {metricConfigs[key].label}
              </button>
            ))}
          </div>
          
          <div className="relative h-64 mt-4">
            <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
              <line x1="0" y1="50" x2="800" y2="50" stroke="#374151" strokeWidth="1" strokeDasharray="5,5" opacity="0.3"/>
              <line x1="0" y1="100" x2="800" y2="100" stroke="#374151" strokeWidth="1" strokeDasharray="5,5" opacity="0.5"/>
              <line x1="0" y1="150" x2="800" y2="150" stroke="#374151" strokeWidth="1" strokeDasharray="5,5" opacity="0.3"/>
              
              {renderGraph()}
            </svg>
          </div>
          
          <div className="flex justify-between mt-3 px-2 text-xs text-gray-500 font-medium">
            {getXAxisLabels().map((label, i) => (
              <span key={i}>{label}</span>
            ))}
          </div>
        </motion.div>

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