import React, { useState, useEffect } from 'react';
import { Search, Clock, MapPin, Bookmark, Share2, X, ChevronLeft, ChevronRight, ExternalLink, Users, Trophy, CheckCircle, Calendar } from 'lucide-react';

const EventDiscoveryPlatform = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [eventTypeFilter, setEventTypeFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [savedEvents, setSavedEvents] = useState(new Set());
  const [darkMode, setDarkMode] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock event data
  const events = [
    {
      id: 1,
      title: 'AI Innovation Hackathon 2024',
      company: 'TechCorp',
      logo: '🚀',
      type: 'Hackathon',
      date: '2025-01-15',
      time: '09:00 AM',
      endDate: '2025-01-17',
      location: 'Hybrid',
      status: 'Open',
      description: 'Join us for a 48-hour hackathon focused on AI and machine learning innovations. Build cutting-edge solutions and compete for amazing prizes.',
      prizes: ['$10,000 First Prize', '$5,000 Second Prize', '$2,500 Third Prize'],
      eligibility: 'Students and professionals worldwide',
      agenda: ['Day 1: Opening & Team Formation', 'Day 2: Development Sprint', 'Day 3: Presentations & Awards'],
      participants: 500,
      banner: '🎯'
    },
    {
      id: 2,
      title: 'Cloud Architecture Workshop',
      company: 'CloudNine',
      logo: '☁️',
      type: 'Workshop',
      date: '2025-01-10',
      time: '02:00 PM',
      endDate: '2025-01-10',
      location: 'Online',
      status: 'Closing Soon',
      description: 'Learn advanced cloud architecture patterns and best practices from industry experts. Hands-on sessions included.',
      prizes: ['Certificate of Completion', 'Cloud Credits Worth $100'],
      eligibility: 'Intermediate to advanced developers',
      agenda: ['Introduction to Cloud Architecture', 'Microservices Design', 'Hands-on Lab', 'Q&A Session'],
      participants: 200,
      banner: '☁️'
    },
    {
      id: 3,
      title: 'Web3 Developer Bootcamp',
      company: 'BlockChain Inc',
      logo: '⛓️',
      type: 'Webinar',
      date: '2025-01-20',
      time: '11:00 AM',
      endDate: '2025-01-20',
      location: 'Online',
      status: 'Open',
      description: 'Comprehensive introduction to Web3 development, smart contracts, and decentralized applications.',
      prizes: ['Free Course Access', 'NFT Certificate'],
      eligibility: 'All developers interested in Web3',
      agenda: ['Web3 Fundamentals', 'Smart Contract Basics', 'Building DApps', 'Live Demo'],
      participants: 1000,
      banner: '⛓️'
    },
    {
      id: 4,
      title: 'Full Stack Development Marathon',
      company: 'DevMasters',
      logo: '💻',
      type: 'Hackathon',
      date: '2025-02-05',
      time: '08:00 AM',
      endDate: '2025-02-07',
      location: 'Offline',
      status: 'Open',
      description: 'Build a complete full-stack application in 3 days. Mentorship, workshops, and networking included.',
      prizes: ['$15,000 Grand Prize', 'Internship Opportunities', 'Tech Gadgets'],
      eligibility: 'College students and recent graduates',
      agenda: ['Kickoff & Ideation', 'Development Phase', 'Final Presentations', 'Networking Event'],
      participants: 300,
      banner: '💻'
    },
    {
      id: 5,
      title: 'Cybersecurity Summit',
      company: 'SecureNet',
      logo: '🔒',
      type: 'Webinar',
      date: '2025-01-25',
      time: '03:00 PM',
      endDate: '2025-01-25',
      location: 'Online',
      status: 'Open',
      description: 'Expert talks on the latest cybersecurity threats, defense strategies, and industry trends.',
      prizes: ['Certificate of Attendance', 'Security Tools License'],
      eligibility: 'IT professionals and security enthusiasts',
      agenda: ['Threat Landscape 2025', 'Zero Trust Architecture', 'Incident Response', 'Panel Discussion'],
      participants: 800,
      banner: '🔒'
    },
    {
      id: 6,
      title: 'Mobile App Design Sprint',
      company: 'AppCrafters',
      logo: '📱',
      type: 'Workshop',
      date: '2025-02-15',
      time: '10:00 AM',
      endDate: '2025-02-16',
      location: 'Hybrid',
      status: 'Open',
      description: 'Intensive 2-day workshop on mobile app design principles, UX best practices, and prototyping.',
      prizes: ['Design Tool Subscription', 'Portfolio Review'],
      eligibility: 'Designers and developers',
      agenda: ['Design Thinking', 'UI/UX Principles', 'Prototyping Lab', 'Feedback Session'],
      participants: 150,
      banner: '📱'
    }
  ];

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = eventTypeFilter === 'all' || event.type === eventTypeFilter;
    const matchesLocation = locationFilter === 'all' || event.location === locationFilter;
    return matchesSearch && matchesType && matchesLocation;
  });

  const toggleSaveEvent = (eventId) => {
    setSavedEvents(prev => {
      const newSet = new Set(prev);
      if (newSet.has(eventId)) {
        newSet.delete(eventId);
      } else {
        newSet.add(eventId);
      }
      return newSet;
    });
  };

  const shareEvent = (event) => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: `Check out ${event.title} by ${event.company}`,
        url: window.location.href
      });
    } else {
      alert('Event link copied to clipboard!');
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Open': return 'bg-green-500';
      case 'Closing Soon': return 'bg-orange-500';
      case 'Closed': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'Hackathon': return darkMode ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800';
      case 'Workshop': return darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800';
      case 'Webinar': return darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800';
      default: return darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-800';
    }
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    return { daysInMonth, startingDayOfWeek };
  };

  const getEventsForDate = (date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === date.toDateString() && event.type === 'Hackathon';
    });
  };

  const getSimilarEvents = (currentEvent) => {
    return events.filter(e => 
      e.id !== currentEvent.id && 
      (e.type === currentEvent.type || e.company === currentEvent.company)
    ).slice(0, 3);
  };

  const renderCalendar = () => {
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
    const days = [];
    const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="h-12"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const hasEvents = getEventsForDate(date).length > 0;
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();

      days.push(
        <button
          key={day}
          onClick={() => setSelectedDate(date)}
          className={`h-12 rounded-lg flex items-center justify-center relative transition-all ${
            isSelected
              ? darkMode ? 'bg-purple-600 text-white' : 'bg-purple-500 text-white'
              : darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
          }`}
        >
          {day}
          {hasEvents && (
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-purple-500 rounded-full"></div>
          )}
        </button>
      );
    }

    return (
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {monthName}
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
              className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            >
              <ChevronLeft className={darkMode ? 'text-gray-400' : 'text-gray-600'} size={20} />
            </button>
            <button
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
              className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            >
              <ChevronRight className={darkMode ? 'text-gray-400' : 'text-gray-600'} size={20} />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-2 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className={`text-center text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {days}
        </div>
        {selectedDate && getEventsForDate(selectedDate).length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-700">
            <h4 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Hackathons on {selectedDate.toLocaleDateString()}
            </h4>
            <div className="space-y-2">
              {getEventsForDate(selectedDate).map(event => (
                <button
                  key={event.id}
                  onClick={() => { setSelectedEvent(event); setShowCalendar(false); }}
                  className={`w-full text-left p-3 rounded-lg ${
                    darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
                  } transition-colors`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{event.logo}</span>
                    <div className="flex-1">
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{event.title}</p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{event.company}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const SkeletonCard = () => (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg animate-pulse`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
          <div>
            <div className={`h-4 w-32 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded mb-2`}></div>
            <div className={`h-3 w-24 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded`}></div>
          </div>
        </div>
      </div>
      <div className={`h-6 w-3/4 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded mb-4`}></div>
      <div className="space-y-2 mb-4">
        <div className={`h-3 w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded`}></div>
        <div className={`h-3 w-2/3 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded`}></div>
      </div>
    </div>
  );

  const getCountdown = (eventDate) => {
    const now = new Date();
    const event = new Date(eventDate);
    const diff = event - now;
    
    if (diff < 0) return 'Event started';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    return `${hours}h`;
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors`}>
      {/* Hero Section */}
      <div className={`${darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'} border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className={`text-4xl lg:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Discover Upcoming Tech Events & Hackathons
              </h1>
              <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'} max-w-3xl`}>
                Join thousands of professionals and students discovering amazing opportunities. Companies organize events to connect, learn, and innovate together.
              </p>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-700'} shadow-lg`}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>

          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2 relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} size={20} />
              <input
                type="text"
                placeholder="Search events or companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg ${
                  darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'
                } border focus:outline-none focus:ring-2 focus:ring-purple-500`}
              />
            </div>
            <select
              value={eventTypeFilter}
              onChange={(e) => setEventTypeFilter(e.target.value)}
              className={`px-4 py-3 rounded-lg ${
                darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'
              } border focus:outline-none focus:ring-2 focus:ring-purple-500`}
            >
              <option value="all">All Types</option>
              <option value="Hackathon">Hackathon</option>
              <option value="Webinar">Webinar</option>
              <option value="Workshop">Workshop</option>
            </select>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className={`px-4 py-3 rounded-lg ${
                darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'
              } border focus:outline-none focus:ring-2 focus:ring-purple-500`}
            >
              <option value="all">All Locations</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div className="mt-6 flex gap-4">
            <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors">
              Explore Events
            </button>
            <button
              onClick={() => setShowCalendar(!showCalendar)}
              className={`px-6 py-3 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} rounded-lg font-medium transition-colors flex items-center gap-2 border ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}
            >
              <Calendar size={20} />
              View Hackathon Calendar
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Section */}
      {showCalendar && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderCalendar()}
        </div>
      )}

      {/* Featured Events Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Featured Events
          </h2>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {filteredEvents.length} events found
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => <SkeletonCard key={i} />)}
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className={`text-center py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl`}>
            <div className="text-6xl mb-4">🔍</div>
            <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              No events found
            </h3>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map(event => (
              <div
                key={event.id}
                className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`text-3xl p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        {event.logo}
                      </div>
                      <div>
                        <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {event.company}
                        </p>
                        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getTypeColor(event.type)}`}>
                          {event.type}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleSaveEvent(event.id); }}
                      className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
                    >
                      <Bookmark
                        size={20}
                        className={savedEvents.has(event.id) ? 'fill-purple-500 text-purple-500' : darkMode ? 'text-gray-400' : 'text-gray-600'}
                      />
                    </button>
                  </div>

                  <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {event.title}
                  </h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                      <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at {event.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                      <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {event.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={16} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                      <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {event.participants} participants
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(event.status)}`}>
                      {event.status}
                    </span>
                    <button
                      onClick={() => setSelectedEvent(event)}
                      className="text-purple-500 hover:text-purple-600 font-medium text-sm flex items-center gap-1"
                    >
                      View Details
                      <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto`}>
            <div className={`sticky top-0 ${darkMode ? 'bg-gray-800' : 'bg-white'} border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} p-6 flex items-center justify-between z-10`}>
              <div className="flex items-center gap-4">
                <div className="text-4xl">{selectedEvent.banner}</div>
                <div>
                  <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {selectedEvent.title}
                  </h2>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    by {selectedEvent.company}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                <X size={24} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex flex-wrap gap-3">
                <span className={`px-3 py-1 rounded-lg text-sm font-medium ${getTypeColor(selectedEvent.type)}`}>
                  {selectedEvent.type}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getStatusColor(selectedEvent.status)}`}>
                  {selectedEvent.status}
                </span>
                <span className={`px-3 py-1 rounded-lg text-sm ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                  {selectedEvent.location}
                </span>
                <span className={`px-3 py-1 rounded-lg text-sm ${darkMode ? 'bg-orange-900 text-orange-200' : 'bg-orange-100 text-orange-800'}`}>
                  ⏱️ Starts in {getCountdown(selectedEvent.date)}
                </span>
              </div>

              <div>
                <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  About This Event
                </h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                  {selectedEvent.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Clock size={20} className="text-purple-500" />
                    <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Date & Time</h4>
                  </div>
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                    {new Date(selectedEvent.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                    {selectedEvent.time}
                  </p>
                </div>
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Users size={20} className="text-purple-500" />
                    <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Participants</h4>
                  </div>
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                    {selectedEvent.participants} registered
                  </p>
                </div>
              </div>

              <div>
                <h3 className={`text-lg font-semibold mb-3 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  <Trophy size={20} className="text-yellow-500" />
                  Prizes & Perks
                </h3>
                <ul className="space-y-2">
                  {selectedEvent.prizes.map((prize, idx) => (
                    <li key={idx} className={`flex items-start gap-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <CheckCircle size={16} className="text-green-500 mt-1 flex-shrink-0" />
                      <span>{prize}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Agenda
                </h3>
                <div className="space-y-2">
                  {selectedEvent.agenda.map((item, idx) => (
                    <div key={idx} className={`flex items-center gap-3 p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${darkMode ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800'} font-semibold text-sm`}>
                        {idx + 1}
                      </div>
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Eligibility
                </h3>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  {selectedEvent.eligibility}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button className="flex-1 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors">
                  Register Now
                </button>
                <button
                  onClick={() => toggleSaveEvent(selectedEvent.id)}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                    savedEvents.has(selectedEvent.id)
                      ? 'bg-purple-600 text-white'
                      : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Bookmark size={20} className={savedEvents.has(selectedEvent.id) ? 'fill-current' : ''} />
                  {savedEvents.has(selectedEvent.id) ? 'Saved' : 'Save'}
                </button>
                <button
                  onClick={() => shareEvent(selectedEvent)}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  <Share2 size={20} />
                  Share
                </button>
              </div>

              {getSimilarEvents(selectedEvent).length > 0 && (
                <div>
                  <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Similar Events
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {getSimilarEvents(selectedEvent).map(event => (
                      <button
                        key={event.id}
                        onClick={() => setSelectedEvent(event)}
                        className={`text-left p-4 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'} transition-colors`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">{event.logo}</span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(event.type)}`}>
                            {event.type}
                          </span>
                        </div>
                        <p className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {event.title}
                        </p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {event.company}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDiscoveryPlatform;