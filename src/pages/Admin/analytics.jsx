import React, { useState, useEffect } from 'react';
import { Users, UserCheck, Calendar, TrendingUp, Coins, Briefcase, UserPlus, Filter, Download, RefreshCw, Clock, Award, Target, Zap } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('7days');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState('all');
  
  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    totalMentors: 0,
    interviewsAcceptedToday: 0,
    acceptanceRate: 0,
    newJobsToday: 0,
    jobApplicationsToday: 0,
    avgResponseTime: 0,
    topPerformer: '',
    totalRevenue: 0,
    activeInterviews: 0,
    mentorCoins: [],
    userGrowthData: [],
    mentorGrowthData: [],
    interviewTrendData: [],
    acceptanceRateData: [],
    jobPostingData: [],
    applicationData: [],
    categoryDistribution: [],
    hourlyActivity: [],
    mentorPerformance: [],
    revenueData: []
  });

  useEffect(() => {
    loadAnalytics();
  }, [timeRange]);

  const loadAnalytics = () => {
    setIsRefreshing(true);
    
    setTimeout(() => {
      setAnalytics({
        totalUsers: 1247,
        totalMentors: 89,
        interviewsAcceptedToday: 34,
        acceptanceRate: 78.5,
        newJobsToday: 12,
        jobApplicationsToday: 156,
        avgResponseTime: 2.4,
        topPerformer: 'Sarah Johnson',
        totalRevenue: 45820,
        activeInterviews: 23,
        mentorCoins: [
          { id: 1, name: 'Sarah Johnson', coins: 2450, avatar: 'SJ', interviews: 48, rating: 4.9 },
          { id: 2, name: 'Mike Chen', coins: 2180, avatar: 'MC', interviews: 42, rating: 4.8 },
          { id: 3, name: 'Emily Davis', coins: 1920, avatar: 'ED', interviews: 38, rating: 4.7 },
          { id: 4, name: 'James Wilson', coins: 1750, avatar: 'JW', interviews: 35, rating: 4.8 },
          { id: 5, name: 'Lisa Anderson', coins: 1640, avatar: 'LA', interviews: 32, rating: 4.6 },
          { id: 6, name: 'David Brown', coins: 1520, avatar: 'DB', interviews: 30, rating: 4.7 },
          { id: 7, name: 'Rachel Kim', coins: 1380, avatar: 'RK', interviews: 28, rating: 4.9 },
          { id: 8, name: 'Tom Martinez', coins: 1250, avatar: 'TM', interviews: 25, rating: 4.5 }
        ],
        userGrowthData: [
          { day: 'Mon', users: 980, newUsers: 45 },
          { day: 'Tue', users: 1050, newUsers: 70 },
          { day: 'Wed', users: 1120, newUsers: 70 },
          { day: 'Thu', users: 1180, newUsers: 60 },
          { day: 'Fri', users: 1210, newUsers: 30 },
          { day: 'Sat', users: 1235, newUsers: 25 },
          { day: 'Sun', users: 1247, newUsers: 12 }
        ],
        mentorGrowthData: [
          { day: 'Mon', mentors: 82 },
          { day: 'Tue', mentors: 84 },
          { day: 'Wed', mentors: 85 },
          { day: 'Thu', mentors: 86 },
          { day: 'Fri', mentors: 87 },
          { day: 'Sat', mentors: 88 },
          { day: 'Sun', mentors: 89 }
        ],
        interviewTrendData: [
          { day: 'Mon', accepted: 28, total: 35, pending: 7 },
          { day: 'Tue', accepted: 32, total: 40, pending: 8 },
          { day: 'Wed', accepted: 30, total: 38, pending: 8 },
          { day: 'Thu', accepted: 35, total: 42, pending: 7 },
          { day: 'Fri', accepted: 31, total: 39, pending: 8 },
          { day: 'Sat', accepted: 29, total: 36, pending: 7 },
          { day: 'Sun', accepted: 34, total: 43, pending: 9 }
        ],
        acceptanceRateData: [
          { day: 'Mon', rate: 80 },
          { day: 'Tue', rate: 80 },
          { day: 'Wed', rate: 79 },
          { day: 'Thu', rate: 83 },
          { day: 'Fri', rate: 79 },
          { day: 'Sat', rate: 81 },
          { day: 'Sun', rate: 79 }
        ],
        jobPostingData: [
          { day: 'Mon', jobs: 8, featured: 3 },
          { day: 'Tue', jobs: 10, featured: 4 },
          { day: 'Wed', jobs: 15, featured: 6 },
          { day: 'Thu', jobs: 9, featured: 3 },
          { day: 'Fri', jobs: 14, featured: 5 },
          { day: 'Sat', jobs: 7, featured: 2 },
          { day: 'Sun', jobs: 12, featured: 4 }
        ],
        applicationData: [
          { day: 'Mon', applications: 120 },
          { day: 'Tue', applications: 135 },
          { day: 'Wed', applications: 168 },
          { day: 'Thu', applications: 142 },
          { day: 'Fri', applications: 178 },
          { day: 'Sat', applications: 98 },
          { day: 'Sun', applications: 156 }
        ],
        categoryDistribution: [
          { name: 'Tech', value: 420, color: '#3b82f6' },
          { name: 'Business', value: 280, color: '#8b5cf6' },
          { name: 'Design', value: 180, color: '#ec4899' },
          { name: 'Marketing', value: 220, color: '#f59e0b' },
          { name: 'Other', value: 147, color: '#10b981' }
        ],
        hourlyActivity: [
          { hour: '6AM', activity: 12 },
          { hour: '9AM', activity: 45 },
          { hour: '12PM', activity: 78 },
          { hour: '3PM', activity: 92 },
          { hour: '6PM', activity: 65 },
          { hour: '9PM', activity: 34 }
        ],
        mentorPerformance: [
          { category: 'Tech', avgRating: 4.8, sessions: 156 },
          { category: 'Business', avgRating: 4.6, sessions: 98 },
          { category: 'Design', avgRating: 4.7, sessions: 72 },
          { category: 'Marketing', avgRating: 4.5, sessions: 84 }
        ],
        revenueData: [
          { day: 'Mon', revenue: 6200 },
          { day: 'Tue', revenue: 7100 },
          { day: 'Wed', revenue: 6800 },
          { day: 'Thu', revenue: 7500 },
          { day: 'Fri', revenue: 8200 },
          { day: 'Sat', revenue: 4800 },
          { day: 'Sun', revenue: 5220 }
        ]
      });
      setIsRefreshing(false);
    }, 500);
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, color, trend, chartData, chartType = 'bar' }) => {
    const getDataKey = () => {
      if (!chartData || chartData.length === 0) return '';
      const keys = Object.keys(chartData[0]);
      return keys[1] || keys[0];
    };

    const getBarColor = () => {
      if (color.includes('blue')) return '#3b82f6';
      if (color.includes('purple')) return '#a855f7';
      if (color.includes('green')) return '#22c55e';
      if (color.includes('orange')) return '#f97316';
      if (color.includes('indigo')) return '#6366f1';
      if (color.includes('pink')) return '#ec4899';
      return '#3b82f6';
    };

    return (
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-lg ${color}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          {trend && (
            <span className={`text-sm font-semibold ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
            </span>
          )}
        </div>
        <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
        <p className="text-3xl font-bold text-gray-800 mb-1">{value}</p>
        {subtitle && <p className="text-sm text-gray-500 mb-4">{subtitle}</p>}
        
        {chartData && chartData.length > 0 && (
          <div className="mt-4" style={{ height: '120px' }}>
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'line' ? (
                <LineChart data={chartData}>
                  <Line type="monotone" dataKey={getDataKey()} stroke={getBarColor()} strokeWidth={2} dot={false} />
                  <Tooltip />
                </LineChart>
              ) : chartType === 'area' ? (
                <AreaChart data={chartData}>
                  <Area type="monotone" dataKey={getDataKey()} fill={getBarColor()} stroke={getBarColor()} />
                  <Tooltip />
                </AreaChart>
              ) : (
                <BarChart data={chartData}>
                  <Bar dataKey={getDataKey()} fill={getBarColor()} radius={[4, 4, 0, 0]} />
                  <Tooltip />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        )}
      </div>
    );
  };

  const exportData = () => {
    const dataStr = JSON.stringify(analytics, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `analytics-${new Date().toISOString()}.json`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
            <p className="text-gray-600">Real-time platform metrics and insights</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={loadAnalytics}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button
              onClick={exportData}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex gap-3 items-center bg-white p-4 rounded-lg shadow-sm">
          <Filter className="w-5 h-5 text-gray-500" />
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="24hours">Last 24 Hours</option>
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
          </select>
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Metrics</option>
            <option value="users">Users Only</option>
            <option value="mentors">Mentors Only</option>
            <option value="jobs">Jobs Only</option>
          </select>
        </div>

        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Users}
            title="Total Users"
            value={analytics.totalUsers.toLocaleString()}
            subtitle="Active platform users"
            color="bg-blue-500"
            trend={8.5}
            chartData={analytics.userGrowthData}
            chartType="area"
          />
          <StatCard
            icon={UserCheck}
            title="Total Mentors"
            value={analytics.totalMentors}
            subtitle="Available mentors"
            color="bg-purple-500"
            trend={5.2}
            chartData={analytics.mentorGrowthData}
            chartType="line"
          />
          <StatCard
            icon={Calendar}
            title="Interviews Today"
            value={analytics.interviewsAcceptedToday}
            subtitle="Accepted interviews"
            color="bg-green-500"
            trend={12.3}
            chartData={analytics.interviewTrendData.map(d => ({ day: d.day, accepted: d.accepted }))}
            chartType="bar"
          />
          <StatCard
            icon={TrendingUp}
            title="Acceptance Rate"
            value={`${analytics.acceptanceRate}%`}
            subtitle="Interview acceptance"
            color="bg-orange-500"
            trend={-2.1}
            chartData={analytics.acceptanceRateData}
            chartType="line"
          />
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 text-blue-500" />
              <span className="text-sm text-green-600 font-semibold">Fast</span>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">Avg Response Time</h3>
            <p className="text-3xl font-bold text-gray-800">{analytics.avgResponseTime}h</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <Award className="w-8 h-8 text-yellow-500" />
            </div>
            <h3 className="text-gray-600 text-sm mb-1">Top Performer</h3>
            <p className="text-xl font-bold text-gray-800">{analytics.topPerformer}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <Target className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-gray-600 text-sm mb-1">Active Interviews</h3>
            <p className="text-3xl font-bold text-gray-800">{analytics.activeInterviews}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <Zap className="w-8 h-8 text-purple-500" />
              <span className="text-sm text-green-600 font-semibold">↑ 15%</span>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">Total Revenue</h3>
            <p className="text-3xl font-bold text-gray-800">${(analytics.totalRevenue / 1000).toFixed(1)}k</p>
          </div>
        </div>

        {/* Job Postings Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <StatCard
            icon={Briefcase}
            title="New Jobs Today"
            value={analytics.newJobsToday}
            subtitle="Posted in last 24 hours"
            color="bg-indigo-500"
            trend={18.7}
            chartData={analytics.jobPostingData}
            chartType="bar"
          />
          <StatCard
            icon={UserPlus}
            title="Applications Today"
            value={analytics.jobApplicationsToday}
            subtitle="Total job applications"
            color="bg-pink-500"
            trend={-5.3}
            chartData={analytics.applicationData}
            chartType="area"
          />
        </div>

        {/* Advanced Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Category Distribution Pie Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Interview Categories</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={analytics.categoryDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={(entry) => entry.name}
                >
                  {analytics.categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Hourly Activity */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Peak Activity Hours</h2>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={analytics.hourlyActivity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="activity" fill="#8b5cf6" stroke="#8b5cf6" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue Trend */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Revenue Trend</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={analytics.revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Interview Trends */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Interview Status Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.interviewTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="accepted" fill="#22c55e" name="Accepted" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pending" fill="#f59e0b" name="Pending" radius={[4, 4, 0, 0]} />
                <Bar dataKey="total" fill="#94a3b8" name="Total" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* User Growth with New Users */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">User Growth Analysis</h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={analytics.userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="users" fill="#3b82f6" stroke="#3b82f6" name="Total Users" />
                <Area type="monotone" dataKey="newUsers" fill="#ec4899" stroke="#ec4899" name="New Users" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Mentor Performance Dashboard */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Mentor Performance by Category</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={analytics.mentorPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="sessions" fill="#8884d8" name="Sessions" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="right" dataKey="avgRating" fill="#82ca9d" name="Avg Rating" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Mentor Coins Leaderboard */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Coins className="w-6 h-6 text-yellow-500 mr-3" />
              <h2 className="text-xl font-bold text-gray-800">Mentor Leaderboard</h2>
            </div>
            <span className="text-sm text-gray-500">Updated in real-time</span>
          </div>
          
          {/* Coins Bar Chart */}
          <div className="mb-6">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={analytics.mentorCoins} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={120} />
                <Tooltip />
                <Bar dataKey="coins" fill="#eab308" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Enhanced Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Rank</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Mentor</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">Interviews</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">Rating</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">Coins</th>
                </tr>
              </thead>
              <tbody>
                {analytics.mentorCoins.map((mentor, index) => (
                  <tr key={mentor.id} className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        {index < 3 ? (
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                            index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-600'
                          }`}>
                            {index + 1}
                          </span>
                        ) : (
                          <span className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-200 text-gray-600 font-bold text-sm">
                            {index + 1}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold mr-3">
                          {mentor.avatar}
                        </div>
                        <span className="font-medium text-gray-800">{mentor.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {mentor.interviews}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span className="font-semibold text-gray-800">{mentor.rating}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end">
                        <Coins className="w-5 h-5 text-yellow-500 mr-2" />
                        <span className="font-bold text-gray-800">{mentor.coins.toLocaleString()}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Insights */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-lg shadow-lg p-6 text-white">
          <h3 className="text-xl font-bold mb-4">Today's Highlights</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
              <p className="text-sm opacity-90 mb-1">Interview Success</p>
              <p className="text-2xl font-bold">{analytics.interviewsAcceptedToday} accepted</p>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
              <p className="text-sm opacity-90 mb-1">Job Market Activity</p>
              <p className="text-2xl font-bold">{analytics.newJobsToday} new opportunities</p>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
              <p className="text-sm opacity-90 mb-1">Platform Engagement</p>
              <p className="text-2xl font-bold">{analytics.jobApplicationsToday} applications</p>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
              <p className="text-sm opacity-90 mb-1">Revenue Generated</p>
              <p className="text-2xl font-bold">${(analytics.totalRevenue / 1000).toFixed(1)}k</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;