import React, { useState } from 'react';
import { Search, Calendar, CheckCircle, Clock, Users, Briefcase, Award, Building2, Download, Video } from 'lucide-react';

// Mock Data
const mockStats = [
  { id: 1, label: 'Scheduled Interviews', value: 8, icon: Clock, color: 'bg-blue-500' },
  { id: 2, label: 'Completed Interviews', value: 24, icon: CheckCircle, color: 'bg-green-500' },
  { id: 3, label: 'Accepted Interviews', value: 18, icon: Calendar, color: 'bg-purple-500' },
  { id: 4, label: 'Total Interviews', value: 32, icon: Users, color: 'bg-orange-500' },
];
const mockInterviews = [
  {
    id: 1,
    title: "Technical Interview - React Components",
    description: "Deep dive into React hooks and component architecture",
    mentor: "Sarah Johnson",
    type: "Technical",
    scheduledDate: "Dec 20, 2024, 10:00 AM",
    duration: "60 min",
    status: "Accepted",
  },
  {
    id: 2,
    title: "Mock Interview - Frontend Developer",
    description: "Full technical interview simulation",
    mentor: "Sarah Johnson",
    type: "Mock",
    scheduledDate: "Dec 18, 2024, 02:30 PM",
    duration: "90 min",
    status: "Pending",
  },
  {
    id: 3,
    title: "Career Guidance Session",
    description: "Discussing career path and growth opportunities",
    mentor: "Emily Rodriguez",
    type: "Career Guidance",
    scheduledDate: "Dec 15, 2024, 09:00 AM",
    duration: "60 min",
    status: "Completed",
  },
  {
    id: 4,
    title: "Resume Review",
    description: "Reviewing resume and providing feedback",
    mentor: "Michael Chen",
    type: "Resume Review",
    scheduledDate: "Dec 22, 2024, 04:00 PM",
    duration: "30 min",
    status: "Pending",
  },
  {
    id: 5,
    title: "Behavioral Interview Prep",
    description: "Practice STAR method and behavioral questions",
    mentor: "David Park",
    type: "Behavioral",
    scheduledDate: "Dec 10, 2024, 11:00 AM",
    duration: "60 min",
    status: "Cancelled",
  },
  {
    id: 6,
    title: "System Design Interview",
    description: "Design a distributed messaging system",
    mentor: "Sarah Johnson",
    type: "Technical",
    scheduledDate: "Dec 25, 2024, 01:00 PM",
    duration: "120 min",
    status: "Accepted",
  },
];


const mockMentors = [
  {
    id: 1,
    name: 'Sarah Johnson',
    designation: 'Senior Frontend Engineer',
    company: 'Google',
    experience: '8 years',
    expertise: ['React', 'TypeScript', 'System Design'],
    avatar: 'SJ',
  },
  {
    id: 2,
    name: 'Michael Chen',
    designation: 'Engineering Manager',
    company: 'Meta',
    experience: '10 years',
    expertise: ['Leadership', 'Backend', 'Microservices'],
    avatar: 'MC',
  },
  {
    id: 3,
    name: 'Priya Sharma',
    designation: 'Senior Backend Engineer',
    company: 'Amazon',
    experience: '7 years',
    expertise: ['Node.js', 'AWS', 'Database Design'],
    avatar: 'PS',
  },
  {
    id: 4,
    name: 'David Miller',
    designation: 'Tech Lead',
    company: 'Microsoft',
    experience: '9 years',
    expertise: ['Cloud Architecture', 'DevOps', 'Scalability'],
    avatar: 'DM',
  },
  {
    id: 5,
    name: 'Emily Rodriguez',
    designation: 'Senior Full Stack Developer',
    company: 'Netflix',
    experience: '6 years',
    expertise: ['React', 'Python', 'System Design'],
    avatar: 'ER',
  },
  {
    id: 6,
    name: 'James Wilson',
    designation: 'Principal Engineer',
    company: 'Apple',
    experience: '12 years',
    expertise: ['iOS', 'Architecture', 'Performance'],
    avatar: 'JW',
  },
];
const StatsCard = ({ stat }) => {
  const Icon = stat.icon;
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium mb-1">{stat.label}</p>
          <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
        </div>
        <div className={`${stat.color} rounded-lg p-3`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
};

// Search Bar Component
const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        placeholder="Search mentors or recruiters"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
};

// Mentor Card Component
const MentorCard = ({ mentor, onRequestInterview }) => {
  const avatarColors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-orange-500',
    'bg-pink-500',
    'bg-indigo-500',
  ];
  const colorIndex = mentor.id % avatarColors.length;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1">
      <div className="flex items-start gap-4">
        <div className={`${avatarColors[colorIndex]} w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0`}>
          {mentor.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{mentor.name}</h3>
          <p className="text-gray-600 text-sm mb-3">{mentor.designation}</p>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Building2 className="w-4 h-4" />
              <span>{mentor.company}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Briefcase className="w-4 h-4" />
              <span>{mentor.experience} experience</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Award className="w-4 h-4" />
              <div className="flex flex-wrap gap-1">
                {mentor.expertise.map((skill, idx) => (
                  <span key={idx} className="bg-gray-100 px-2 py-1 rounded text-xs font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <button
            onClick={() => onRequestInterview(mentor)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
          >
            Request Interview
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component
const InterviewDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showInterviewHistory, setShowInterviewHistory] = useState(false);

  const handleRequestInterview = (mentor) => {
    alert(`Interview request sent to ${mentor.name}!`);
  };

  const handleDownloadReport = (interview) => {
    alert(`Downloading report for: ${interview.title}`);
  };

  const handleJoinInterview = (interview) => {
    alert(`Joining interview: ${interview.title}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Accepted':
        return 'bg-blue-100 text-blue-700';
      case 'Completed':
        return 'bg-green-100 text-green-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Accepted':
      case 'Completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'Pending':
        return <Clock className="w-4 h-4" />;
      case 'Cancelled':
        return <span className="text-lg">×</span>;
      default:
        return null;
    }
  };

  const filteredMentors = mockMentors.filter(mentor => {
    const searchLower = searchTerm.toLowerCase();
    return (
      mentor.name.toLowerCase().includes(searchLower) ||
      mentor.designation.toLowerCase().includes(searchLower) ||
      mentor.company.toLowerCase().includes(searchLower) ||
      mentor.expertise.some(skill => skill.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Interviews</h1>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
              TS
            </div>
            <div>
              <p className="text-xl font-semibold text-gray-900">Tejas Sangvi</p>
              <p className="text-gray-600">Backend Engineer</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {mockStats.map(stat => (
            <StatsCard key={stat.id} stat={stat} />
          ))}
        </div>

        {/* Search Section */}
        <div className="mb-8">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        </div>

        {/* Interview Sessions Toggle Button */}
        <div className="mb-8">
          <button
            onClick={() => setShowInterviewHistory(!showInterviewHistory)}
            className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-6 rounded-xl transition-colors flex items-center gap-2"
          >
            <Calendar className="w-5 h-5" />
            {showInterviewHistory ? 'Hide Interview Sessions' : 'View Interview Sessions'}
          </button>
        </div>

        {/* Interview Sessions Table */}
        {showInterviewHistory && (
          <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900">Interview Sessions</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Interview
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Mentor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Scheduled Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {mockInterviews.map((interview) => (
                    <tr key={interview.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-gray-900">{interview.title}</p>
                          <p className="text-sm text-gray-500 mt-1">{interview.description}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <Users className="w-4 h-4 text-blue-600" />
                          </div>
                          <span className="text-gray-900">{interview.mentor}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-900">{interview.type}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-900">{interview.scheduledDate}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-900">{interview.duration}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(interview.status)}`}>
                          {getStatusIcon(interview.status)}
                          {interview.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {interview.status === 'Accepted' ? (
                            <button
                              onClick={() => handleJoinInterview(interview)}
                              className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                            >
                              <Video className="w-4 h-4" />
                              Join
                            </button>
                          ) : interview.status === 'Completed' ? (
                            <button
                              onClick={() => handleJoinInterview(interview)}
                              className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                            >
                              <Video className="w-4 h-4" />
                              Join
                            </button>
                          ) : (
                            <span className="text-gray-400 text-sm">No link</span>
                          )}
                          
                          {interview.status === 'Completed' && (
                            <button
                              onClick={() => handleDownloadReport(interview)}
                              className="ml-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg flex items-center gap-1 text-sm font-medium transition-colors"
                            >
                              <Download className="w-4 h-4" />
                              Download Report
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Mentor Cards */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Available Mentors & Recruiters
          </h2>
          {filteredMentors.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
              <p className="text-gray-500 text-lg">No mentors found matching your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMentors.map(mentor => (
                <MentorCard
                  key={mentor.id}
                  mentor={mentor}
                  onRequestInterview={handleRequestInterview}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewDashboard;