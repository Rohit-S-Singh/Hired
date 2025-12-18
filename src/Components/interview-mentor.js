import React, { useState, createContext, useContext } from 'react';
import { Calendar, Clock, CheckCircle, XCircle, User, Mail, FileText, Star, TrendingUp, Video, Settings, Bell, Search, Filter, ChevronRight, Download, MessageSquare, DollarSign, BarChart3, Users, Award, AlertCircle } from 'lucide-react';

// Mock Data
const mockRequests = [
  {
    id: 1,
    candidate: {
      name: 'Sarah Chen',
      title: 'Senior PM',
      company: 'Meta',
      avatar: 'SC',
      experience: '5 years',
      linkedin: 'linkedin.com/in/sarahchen',
      rating: 4.8,
      pastInterviews: 12,
      resume: 'sarah_chen_resume.pdf'
    },
    interviewType: 'Product Strategy',
    duration: 60,
    proposedDate: '2025-12-19',
    proposedTime: '15:00',
    timezone: 'PST',
    status: 'pending',
    objective: 'Practice product strategy cases for FAANG VP interviews. Looking for feedback on structuring answers and quantitative reasoning.',
    message: 'Hi! I\'m interviewing for VP roles at Meta and Google. Would love your help preparing for product strategy questions.',
    skills: ['Product Strategy', 'Metrics', 'Prioritization'],
    requestedDate: '2025-12-18',
    chatHistory: [
      {
        id: 1,
        sender: 'candidate',
        message: 'Hi! I\'m interviewing for VP roles at Meta and Google. Would love your help preparing for product strategy questions.',
        timestamp: '2025-12-18T10:30:00',
        read: true
      }
    ]
  },
  {
    id: 2,
    candidate: {
      name: 'John Doe',
      title: 'Software Engineer',
      company: 'Google',
      avatar: 'JD',
      experience: '3 years',
      linkedin: 'linkedin.com/in/johndoe',
      rating: 4.5,
      pastInterviews: 8,
      resume: 'john_doe_resume.pdf'
    },
    interviewType: 'System Design',
    duration: 45,
    proposedDate: '2025-12-20',
    proposedTime: '10:00',
    timezone: 'PST',
    status: 'pending',
    objective: 'Prepare for L6 system design interviews at Amazon. Need help with scalability and distributed systems concepts.',
    message: 'Looking to practice system design for senior level positions.',
    skills: ['System Design', 'Scalability', 'Distributed Systems'],
    requestedDate: '2025-12-17',
    chatHistory: [
      {
        id: 1,
        sender: 'candidate',
        message: 'Looking to practice system design for senior level positions.',
        timestamp: '2025-12-17T14:20:00',
        read: true
      },
      {
        id: 2,
        sender: 'candidate',
        message: 'I have my Amazon interview in 2 weeks and really need to sharpen my system design skills.',
        timestamp: '2025-12-17T14:22:00',
        read: true
      }
    ]
  },
  {
    id: 3,
    candidate: {
      name: 'Emily Rodriguez',
      title: 'Product Designer',
      company: 'Airbnb',
      avatar: 'ER',
      experience: '4 years',
      linkedin: 'linkedin.com/in/emilyrodriguez',
      rating: 4.9,
      pastInterviews: 15,
      resume: 'emily_rodriguez_resume.pdf'
    },
    interviewType: 'Behavioral',
    duration: 45,
    proposedDate: '2025-12-21',
    proposedTime: '14:00',
    timezone: 'PST',
    status: 'accepted',
    objective: 'Practice leadership and collaboration questions for Staff Designer role.',
    message: 'Preparing for Staff Designer interviews and would appreciate feedback on my leadership stories.',
    skills: ['Leadership', 'Communication', 'Collaboration'],
    requestedDate: '2025-12-16',
    chatHistory: [
      {
        id: 1,
        sender: 'candidate',
        message: 'Preparing for Staff Designer interviews and would appreciate feedback on my leadership stories.',
        timestamp: '2025-12-16T09:15:00',
        read: true
      },
      {
        id: 2,
        sender: 'mentor',
        message: 'Hi Emily! I\'d be happy to help. I\'ve accepted your request. Looking forward to our session on Dec 21st.',
        timestamp: '2025-12-16T11:30:00',
        read: true
      },
      {
        id: 3,
        sender: 'candidate',
        message: 'Thank you so much! Should I prepare any specific examples beforehand?',
        timestamp: '2025-12-16T12:00:00',
        read: true
      },
      {
        id: 4,
        sender: 'mentor',
        message: 'Yes! Please prepare 2-3 examples of times you\'ve led cross-functional projects. We\'ll work through the STAR method together.',
        timestamp: '2025-12-16T13:45:00',
        read: true
      }
    ]
  },
  {
    id: 4,
    candidate: {
      name: 'Michael Park',
      title: 'Engineering Manager',
      company: 'Stripe',
      avatar: 'MP',
      experience: '7 years',
      linkedin: 'linkedin.com/in/michaelpark',
      rating: 4.7,
      pastInterviews: 20,
      resume: 'michael_park_resume.pdf'
    },
    interviewType: 'Technical Leadership',
    duration: 60,
    proposedDate: '2025-12-18',
    proposedTime: '11:00',
    timezone: 'PST',
    status: 'rejected',
    objective: 'Practice technical leadership scenarios for Director-level interviews.',
    message: 'Targeting Director roles at top tech companies.',
    skills: ['Technical Strategy', 'Team Building', 'Architecture'],
    requestedDate: '2025-12-15',
    chatHistory: [
      {
        id: 1,
        sender: 'candidate',
        message: 'Targeting Director roles at top tech companies.',
        timestamp: '2025-12-15T16:00:00',
        read: true
      },
      {
        id: 2,
        sender: 'mentor',
        message: 'Hi Michael, thanks for reaching out. Unfortunately, I don\'t have availability this week. I\'d recommend reaching out to other mentors who specialize in Director-level interviews.',
        timestamp: '2025-12-15T18:30:00',
        read: true
      }
    ]
  }
];

const mockUpcomingInterviews = [
  {
    id: 101,
    candidate: 'Emily Rodriguez',
    type: 'Behavioral',
    date: '2025-12-21',
    time: '14:00',
    duration: 45,
    meetingLink: 'https://zoom.us/j/123456789',
    status: 'confirmed'
  },
  {
    id: 102,
    candidate: 'Alex Thompson',
    type: 'Coding Interview',
    date: '2025-12-22',
    time: '10:00',
    duration: 60,
    meetingLink: 'https://zoom.us/j/987654321',
    status: 'confirmed'
  }
];

const mockAnalytics = {
  totalInterviews: 142,
  thisMonth: 18,
  monthOverMonth: 12,
  avgRating: 4.8,
  totalReviews: 89,
  earnings: 4200,
  earningsGrowth: 8,
  acceptanceRate: 78,
  avgResponseTime: 4.2,
  topSkills: [
    { name: 'System Design', count: 45 },
    { name: 'Behavioral', count: 32 },
    { name: 'Coding', count: 28 },
    { name: 'Product Strategy', count: 22 },
    { name: 'Leadership', count: 15 }
  ],
  monthlyData: [
    { month: 'Jul', count: 8 },
    { month: 'Aug', count: 12 },
    { month: 'Sep', count: 15 },
    { month: 'Oct', count: 18 },
    { month: 'Nov', count: 16 },
    { month: 'Dec', count: 18 }
  ]
};

// Context for state management
const DashboardContext = createContext();

const DashboardProvider = ({ children }) => {
  const [requests, setRequests] = useState(mockRequests);
  const [selectedRequest, setSelectedRequest] = useState(mockRequests[0]);
  const [activeTab, setActiveTab] = useState('requests');
  const [filter, setFilter] = useState('pending');

  const acceptRequest = (requestId) => {
    setRequests(requests.map(r => 
      r.id === requestId ? { ...r, status: 'accepted' } : r
    ));
  };

  const rejectRequest = (requestId) => {
    setRequests(requests.map(r => 
      r.id === requestId ? { ...r, status: 'rejected' } : r
    ));
  };

  const sendMessage = (requestId, message) => {
    setRequests(requests.map(r => {
      if (r.id === requestId) {
        return {
          ...r,
          chatHistory: [
            ...r.chatHistory,
            {
              id: r.chatHistory.length + 1,
              sender: 'mentor',
              message: message,
              timestamp: new Date().toISOString(),
              read: false
            }
          ]
        };
      }
      return r;
    }));
    
    // Update selected request if it's the current one
    if (selectedRequest?.id === requestId) {
      setSelectedRequest({
        ...selectedRequest,
        chatHistory: [
          ...selectedRequest.chatHistory,
          {
            id: selectedRequest.chatHistory.length + 1,
            sender: 'mentor',
            message: message,
            timestamp: new Date().toISOString(),
            read: false
          }
        ]
      });
    }
  };

  return (
    <DashboardContext.Provider value={{
      requests,
      selectedRequest,
      setSelectedRequest,
      activeTab,
      setActiveTab,
      filter,
      setFilter,
      acceptRequest,
      rejectRequest,
      sendMessage
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

const useDashboard = () => useContext(DashboardContext);

// Components
const Sidebar = () => {
  const { activeTab, setActiveTab, requests } = useDashboard();
  const pendingCount = requests.filter(r => r.status === 'pending').length;

  const navItems = [
    { id: 'requests', icon: Mail, label: 'Requests', badge: pendingCount },
    { id: 'calendar', icon: Calendar, label: 'Calendar' },
    { id: 'interviews', icon: Video, label: 'Interviews', badge: mockUpcomingInterviews.length },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'earnings', icon: DollarSign, label: 'Earnings' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <div className="w-64 bg-gray-900 text-gray-100 h-screen fixed left-0 top-0 flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-xl font-bold">Interview Pro</h1>
        <p className="text-sm text-gray-400 mt-1">Mentor Dashboard</p>
      </div>
      
      <nav className="flex-1 p-4">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg mb-2 transition-colors ${
              activeTab === item.id 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </div>
            {item.badge > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
            JD
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm">Jane Doe</p>
            <p className="text-xs text-gray-400">Senior Interviewer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const RequestCard = ({ request, isSelected }) => {
  const { setSelectedRequest } = useDashboard();
  
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    accepted: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800'
  };

  const timeAgo = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffHours = Math.floor((now - date) / (1000 * 60 * 60));
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  return (
    <div
      onClick={() => setSelectedRequest(request)}
      className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
            {request.candidate.avatar}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{request.candidate.name}</h3>
            <p className="text-sm text-gray-600">{request.candidate.title} @ {request.candidate.company}</p>
          </div>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full capitalize ${statusColors[request.status]}`}>
          {request.status}
        </span>
      </div>

      <div className="space-y-2 mb-3">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span>{request.proposedDate} at {request.proposedTime} {request.timezone}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Clock className="w-4 h-4 text-gray-400" />
          <span>{request.interviewType} • {request.duration} min</span>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-gray-500">
        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
        <span>{request.candidate.rating} • {request.candidate.pastInterviews} interviews</span>
        <span className="ml-auto">{timeAgo(request.requestedDate)}</span>
      </div>
    </div>
  );
};

const RequestDetailPanel = () => {
  const { selectedRequest, acceptRequest, rejectRequest, sendMessage } = useDashboard();
  const [newMessage, setNewMessage] = useState('');
  const [showChat, setShowChat] = useState(false);
  
  if (!selectedRequest) return null;

  const { candidate } = selectedRequest;

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      sendMessage(selectedRequest.id, newMessage.trim());
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const unreadCount = selectedRequest.chatHistory?.filter(msg => !msg.read && msg.sender === 'candidate').length || 0;

  return (
    <div className="bg-white rounded-lg border border-gray-200 h-full overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-xl">
              {candidate.avatar}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{candidate.name}</h2>
              <p className="text-gray-600">{candidate.title} @ {candidate.company}</p>
              <p className="text-sm text-gray-500">{candidate.experience} experience</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <a href={`https://${candidate.linkedin}`} target="_blank" rel="noopener noreferrer" 
             className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
            <User className="w-4 h-4" />
            LinkedIn
          </a>
          <button className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" />
            Resume
          </button>
        </div>
      </div>

      {/* Candidate Stats */}
      <div className="p-6 border-b border-gray-200 bg-gray-50">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Rating</p>
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <span className="font-semibold text-gray-900">{candidate.rating}</span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Past Interviews</p>
            <p className="font-semibold text-gray-900">{candidate.pastInterviews}</p>
          </div>
        </div>
      </div>

      {/* Interview Details */}
      <div className="p-6 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          Interview Details
        </h3>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-600">Type</p>
            <p className="font-medium text-gray-900">{selectedRequest.interviewType}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Duration</p>
            <p className="font-medium text-gray-900">{selectedRequest.duration} minutes</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Proposed Time</p>
            <p className="font-medium text-gray-900">
              {selectedRequest.proposedDate} at {selectedRequest.proposedTime} {selectedRequest.timezone}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Skills Focus</p>
            <div className="flex flex-wrap gap-2">
              {selectedRequest.skills.map(skill => (
                <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Objective */}
      <div className="p-6 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          Interview Objective
        </h3>
        <p className="text-gray-700 leading-relaxed">{selectedRequest.objective}</p>
      </div>

      {/* Message */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            Conversation
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {unreadCount} new
              </span>
            )}
          </h3>
          <button 
            onClick={() => setShowChat(!showChat)}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            {showChat ? 'Hide Chat' : 'Show Chat'}
          </button>
        </div>

        {showChat ? (
          <div className="space-y-4">
            {/* Chat Messages */}
            <div className="max-h-80 overflow-y-auto space-y-3 bg-gray-50 rounded-lg p-4">
              {selectedRequest.chatHistory?.map((chat) => (
                <div 
                  key={chat.id}
                  className={`flex ${chat.sender === 'mentor' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[75%] ${chat.sender === 'mentor' ? 'order-2' : 'order-1'}`}>
                    <div className={`rounded-lg p-3 ${
                      chat.sender === 'mentor' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white border border-gray-200 text-gray-900'
                    }`}>
                      <p className="text-sm">{chat.message}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 px-1">
                      {formatTime(chat.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="flex gap-2">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message... (Press Enter to send)"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows="3"
              />
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2 self-end"
              >
                <MessageSquare className="w-4 h-4" />
                Send
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-700 leading-relaxed italic">
              "{selectedRequest.chatHistory?.[selectedRequest.chatHistory.length - 1]?.message || selectedRequest.message}"
            </p>
            <p className="text-xs text-gray-500 mt-2">
              {selectedRequest.chatHistory?.length || 1} message(s) • Click "Show Chat" to view conversation
            </p>
          </div>
        )}
      </div>

      {/* Actions */}
      {selectedRequest.status === 'pending' && (
        <div className="p-6 bg-gray-50">
          <h3 className="font-semibold text-gray-900 mb-4">Actions</h3>
          <div className="space-y-2">
            <button 
              onClick={() => acceptRequest(selectedRequest.id)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              <CheckCircle className="w-5 h-5" />
              Accept Interview
            </button>
            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              <Calendar className="w-5 h-5" />
              Propose New Time
            </button>
            <button 
              onClick={() => rejectRequest(selectedRequest.id)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white text-red-600 border-2 border-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium"
            >
              <XCircle className="w-5 h-5" />
              Decline Request
            </button>
          </div>
        </div>
      )}

      {selectedRequest.status === 'accepted' && (
        <div className="p-6 bg-green-50 border-t-4 border-green-600">
          <div className="flex items-center gap-2 text-green-800 mb-2">
            <CheckCircle className="w-5 h-5" />
            <span className="font-semibold">Interview Accepted</span>
          </div>
          <p className="text-sm text-green-700 mb-4">The candidate has been notified. Meeting link will be sent 24 hours before the interview.</p>
          <button className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
            View in Calendar
          </button>
        </div>
      )}

      {selectedRequest.status === 'rejected' && (
        <div className="p-6 bg-red-50 border-t-4 border-red-600">
          <div className="flex items-center gap-2 text-red-800 mb-2">
            <XCircle className="w-5 h-5" />
            <span className="font-semibold">Request Declined</span>
          </div>
          <p className="text-sm text-red-700">The candidate has been notified of your decision.</p>
        </div>
      )}
    </div>
  );
};

const RequestsTab = () => {
  const { requests, selectedRequest, filter, setFilter } = useDashboard();

  const filteredRequests = filter === 'all' 
    ? requests 
    : requests.filter(r => r.status === filter);

  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const acceptedCount = requests.filter(r => r.status === 'accepted').length;
  const rejectedCount = requests.filter(r => r.status === 'rejected').length;

  return (
    <div className="h-full">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Interview Requests</h1>
          <p className="text-gray-600 mt-1">{filteredRequests.length} requests</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search requests..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        {[
          { id: 'pending', label: 'Pending', count: pendingCount, color: 'yellow' },
          { id: 'accepted', label: 'Accepted', count: acceptedCount, color: 'green' },
          { id: 'rejected', label: 'Rejected', count: rejectedCount, color: 'red' },
          { id: 'all', label: 'All', count: requests.length, color: 'gray' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-4 py-2 font-medium transition-colors border-b-2 ${
              filter === tab.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Split View */}
      <div className="grid grid-cols-[1fr_1.2fr] gap-6 h-[calc(100vh-280px)]">
        {/* Request List */}
        <div className="overflow-y-auto space-y-3 pr-2">
          {filteredRequests.map(request => (
            <RequestCard 
              key={request.id} 
              request={request} 
              isSelected={selectedRequest?.id === request.id}
            />
          ))}
          {filteredRequests.length === 0 && (
            <div className="text-center py-12">
              <Mail className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600">No {filter} requests</p>
            </div>
          )}
        </div>

        {/* Detail Panel */}
        <RequestDetailPanel />
      </div>
    </div>
  );
};

const CalendarTab = () => {
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const hours = Array.from({ length: 12 }, (_, i) => i + 9);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
          <p className="text-gray-600 mt-1">Week of December 16-22, 2025</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium">
            Week
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
            Today
          </button>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-8 border-b border-gray-200">
          <div className="p-4 bg-gray-50"></div>
          {days.map(day => (
            <div key={day} className="p-4 bg-gray-50 text-center font-semibold text-gray-900">
              {day}
            </div>
          ))}
        </div>
        
        {hours.map(hour => (
          <div key={hour} className="grid grid-cols-8 border-b border-gray-200 hover:bg-gray-50">
            <div className="p-4 text-sm text-gray-600 font-medium border-r border-gray-200">
              {hour}:00
            </div>
            {days.map((day, idx) => (
              <div key={`${hour}-${day}`} className="p-2 border-r border-gray-200 min-h-16">
                {hour === 14 && idx === 2 && (
                  <div className="bg-blue-100 border-l-4 border-blue-600 p-2 rounded text-xs">
                    <p className="font-semibold text-blue-900">Emily Rodriguez</p>
                    <p className="text-blue-700">Behavioral (45m)</p>
                  </div>
                )}
                {hour === 10 && idx === 3 && (
                  <div className="bg-green-100 border-l-4 border-green-600 p-2 rounded text-xs">
                    <p className="font-semibold text-green-900">Alex Thompson</p>
                    <p className="text-green-700">Coding (60m)</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Upcoming Interviews */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming (Next 7 days)</h2>
        <div className="space-y-3">
          {mockUpcomingInterviews.map(interview => (
            <div key={interview.id} className="bg-white p-4 rounded-lg border border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                  <Video className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{interview.candidate}</p>
                  <p className="text-sm text-gray-600">{interview.type} • {interview.duration} min</p>
                  <p className="text-sm text-gray-500">{interview.date} at {interview.time}</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                Join Meeting
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AnalyticsTab = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-1">Your performance overview</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Total Interviews</p>
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{mockAnalytics.totalInterviews}</p>
          <p className="text-sm text-gray-500 mt-1">All time</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">This Month</p>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{mockAnalytics.thisMonth}</p>
          <p className="text-sm text-green-600 mt-1">+{mockAnalytics.monthOverMonth}% vs last month</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Avg Rating</p>
            <Star className="w-5 h-5 text-yellow-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{mockAnalytics.avgRating}</p>
          <p className="text-sm text-gray-500 mt-1">From {mockAnalytics.totalReviews} reviews</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Earnings</p>
            <DollarSign className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">${mockAnalytics.earnings.toLocaleString()}</p>
          <p className="text-sm text-green-600 mt-1">+{mockAnalytics.earningsGrowth}% MoM</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Interviews Over Time</h3>
          <div className="h-64 flex items-end justify-between gap-2">
            {mockAnalytics.monthlyData.map((data, idx) => (
              <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  className="w-full bg-blue-500 rounded-t hover:bg-blue-600 transition-colors cursor-pointer"
                  style={{ height: `${(data.count / 20) * 100}%` }}
                  title={`${data.month}: ${data.count} interviews`}
                ></div>
                <span className="text-xs text-gray-600">{data.month}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Skills Requested</h3>
          <div className="space-y-3">
            {mockAnalytics.topSkills.map((skill, idx) => (
              <div key={skill.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                  <span className="text-sm text-gray-500">{skill.count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(skill.count / 45) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Acceptance Rate</h3>
          <div className="flex items-center gap-4">
            <div className="relative w-32 h-32">
              <svg className="transform -rotate-90 w-32 h-32">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#e5e7eb"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#3b82f6"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  strokeDashoffset={`${2 * Math.PI * 56 * (1 - mockAnalytics.acceptanceRate / 100)}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-900">{mockAnalytics.acceptanceRate}%</span>
              </div>
            </div>
            <div>
              <p className="text-gray-600 mb-2">You accept most requests</p>
              <p className="text-sm text-gray-500">Avg response time: {mockAnalytics.avgResponseTime} hours</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-500" />
            Your Achievements
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
              <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 text-white fill-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Top Rated</p>
                <p className="text-sm text-gray-600">4.8+ rating for 3 months</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Fast Responder</p>
                <p className="text-sm text-gray-600">Under 5h avg response</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900">100+ Interviews</p>
                <p className="text-sm text-gray-600">Milestone achieved</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InterviewsTab = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Interviews</h1>
        <p className="text-gray-600 mt-1">Manage your interview schedule</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="text-center py-12">
          <Video className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Coming Soon</h3>
          <p className="text-gray-600">Interview management features are being developed</p>
        </div>
      </div>
    </div>
  );
};

const EarningsTab = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Earnings</h1>
        <p className="text-gray-600 mt-1">Track your interview income</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="text-center py-12">
          <DollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Coming Soon</h3>
          <p className="text-gray-600">Earnings tracking and payout features are being developed</p>
        </div>
      </div>
    </div>
  );
};

const SettingsTab = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your availability and preferences</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="text-center py-12">
          <Settings className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Coming Soon</h3>
          <p className="text-gray-600">Settings and configuration options are being developed</p>
        </div>
      </div>
    </div>
  );
};

const MainContent = () => {
  const { activeTab } = useDashboard();

  return (
    <div className="ml-64 p-8 bg-gray-50 min-h-screen">
      {activeTab === 'requests' && <RequestsTab />}
      {activeTab === 'calendar' && <CalendarTab />}
      {activeTab === 'interviews' && <InterviewsTab />}
      {activeTab === 'analytics' && <AnalyticsTab />}
      {activeTab === 'earnings' && <EarningsTab />}
      {activeTab === 'settings' && <SettingsTab />}
    </div>
  );
};

export default function MentorDashboard() {
  return (
    <DashboardProvider>
      <div className="bg-gray-50">
        <Sidebar />
        <MainContent />
      </div>
    </DashboardProvider>
  );
}