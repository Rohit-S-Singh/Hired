import React, { useEffect, useState } from "react";
import { Calendar, Clock, User, Award, Search, Filter, TrendingUp, CheckCircle, XCircle, AlertCircle, Star } from "lucide-react";
import { useGlobalContext } from "../AUTH/GlobalContext";

// Import from actual context
// const { user } = useGlobalContext();

const FALLBACK_MENTORS = [
  {
    _id: "demo1",
    user: { name: "Amit Sharma", avatar: "AS" },
    expertise: ["React", "JavaScript", "DSA"],
    experience: 4,
    rating: 4.8,
    completedInterviews: 127,
    availability: "Available",
    pricePerHour: 50,
    bio: "Senior Frontend Engineer at tech giant with passion for teaching"
  },
  {
    _id: "demo2",
    user: { name: "Neha Verma", avatar: "NV" },
    expertise: ["System Design", "Node.js", "AWS"],
    experience: 6,
    rating: 4.9,
    completedInterviews: 203,
    availability: "Busy",
    pricePerHour: 75,
    bio: "Principal Engineer specializing in scalable architectures"
  },
  {
    _id: "demo3",
    user: { name: "Rahul Singh", avatar: "RS" },
    expertise: ["Python", "Machine Learning", "Data Science"],
    experience: 5,
    rating: 4.7,
    completedInterviews: 156,
    availability: "Available",
    pricePerHour: 60,
    bio: "ML Engineer helping aspiring data scientists succeed"
  },
  {
    _id: "demo4",
    user: { name: "Priya Patel", avatar: "PP" },
    expertise: ["Java", "Spring Boot", "Microservices"],
    experience: 7,
    rating: 4.9,
    completedInterviews: 189,
    availability: "Available",
    pricePerHour: 80,
    bio: "Backend architect with enterprise experience"
  },
  {
    _id: "demo5",
    user: { name: "Vikram Reddy", avatar: "VR" },
    expertise: ["DevOps", "Kubernetes", "CI/CD"],
    experience: 5,
    rating: 4.6,
    completedInterviews: 142,
    availability: "Available",
    pricePerHour: 65,
    bio: "DevOps specialist automating everything"
  },
  {
    _id: "demo6",
    user: { name: "Sneha Gupta", avatar: "SG" },
    expertise: ["Product Management", "Strategy", "Leadership"],
    experience: 8,
    rating: 5.0,
    completedInterviews: 234,
    availability: "Busy",
    pricePerHour: 90,
    bio: "Ex-FAANG PM guiding product careers"
  }
];

const INTERVIEW_HISTORY = [
  { id: 1, mentor: "Amit Sharma", date: "2024-12-15", time: "10:00 AM", status: "completed", rating: 5, type: "Technical", feedback: "Great session! Very helpful." },
  { id: 2, mentor: "Neha Verma", date: "2024-12-10", time: "2:00 PM", status: "completed", rating: 4, type: "System Design", feedback: "Learned a lot about scalability." },
  { id: 3, mentor: "Rahul Singh", date: "2024-12-22", time: "11:00 AM", status: "scheduled", type: "Behavioral" },
  { id: 4, mentor: "Priya Patel", date: "2024-12-25", time: "3:00 PM", status: "scheduled", type: "Technical" }
];

const InterviewDashboard = () => {
  // This will use the actual global context when integrated
  // For demo purposes, we'll use a mock user
const { user: contextUser } = useGlobalContext();
const user = contextUser || { 
  name: "John Doe",
  email: "john@example.com",
  picture: null,
  userType: "student",
  studentDetails: {
    college: "IIT Delhi",
    degree: "B.Tech",
    branch: "Computer Science",
    year: "3rd Year"
  }
};

  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterExpertise, setFilterExpertise] = useState("all");
  const [filterAvailability, setFilterAvailability] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [activeTab, setActiveTab] = useState("mentors");
  const [bookingForm, setBookingForm] = useState({
    interviewType: "technical",
    scheduledDate: "",
    scheduledTime: "",
    title: "",
    description: "",
    duration: "60"
  });
  const [feedbackForm, setFeedbackForm] = useState({
    rating: 5,
    comment: ""
  });

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        
        if (token) {
          const response = await fetch(
            `${process.env.REACT_APP_BACKEND_BASE_URL}/api/interviews/mentors`,
            {
              headers: { Authorization: `Bearer ${token}` }
            }
          );

          if (response.ok) {
            const data = await response.json();
            if (data?.mentors?.length > 0) {
              setMentors(data.mentors);
            } else {
              setMentors(FALLBACK_MENTORS);
            }
          } else {
            setMentors(FALLBACK_MENTORS);
          }
        } else {
          setMentors(FALLBACK_MENTORS);
        }
      } catch (error) {
        console.error("Failed to fetch mentors:", error);
        setMentors(FALLBACK_MENTORS);
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  const sendRequest = async (mentorId) => {
    if (mentorId.startsWith("demo")) {
      alert("✅ Demo: Interview request sent successfully!\n\nIn production, this would create a real booking.");
      setShowBookingModal(false);
      setBookingForm({
        interviewType: "technical",
        scheduledDate: "",
        scheduledTime: "",
        title: "",
        description: "",
        duration: "60"
      });
      return;
    }

    try {
      const token = localStorage.getItem("jwtToken");
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/interviews/request`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            mentorId,
            ...bookingForm,
            scheduledDate: new Date(`${bookingForm.scheduledDate}T${bookingForm.scheduledTime}`)
          })
        }
      );

      if (response.ok) {
        alert("Interview request sent successfully!");
        setShowBookingModal(false);
        setBookingForm({
          interviewType: "technical",
          scheduledDate: "",
          scheduledTime: "",
          title: "",
          description: "",
          duration: "60"
        });
      } else {
        const error = await response.json();
        alert(error.message || "Failed to send request");
      }
    } catch (err) {
      alert("Failed to send request");
    }
  };

  const submitFeedback = () => {
    alert(`Feedback submitted: ${feedbackForm.rating} stars\n${feedbackForm.comment}`);
    setShowFeedbackModal(false);
    setFeedbackForm({ rating: 5, comment: "" });
  };

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.expertise?.some(e => e.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesExpertise = filterExpertise === "all" || 
      mentor.expertise?.includes(filterExpertise);
    
    const matchesAvailability = filterAvailability === "all" || 
      mentor.availability === filterAvailability;

    return matchesSearch && matchesExpertise && matchesAvailability;
  });

  const sortedMentors = [...filteredMentors].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "experience":
        return b.experience - a.experience;
      case "price-low":
        return a.pricePerHour - b.pricePerHour;
      case "price-high":
        return b.pricePerHour - a.pricePerHour;
      case "interviews":
        return b.completedInterviews - a.completedInterviews;
      default:
        return 0;
    }
  });

  const allExpertise = [...new Set(mentors.flatMap(m => m.expertise || []))];

  const stats = {
    total: INTERVIEW_HISTORY.length,
    completed: INTERVIEW_HISTORY.filter(i => i.status === "completed").length,
    upcoming: INTERVIEW_HISTORY.filter(i => i.status === "scheduled").length,
    avgRating: (INTERVIEW_HISTORY.filter(i => i.rating).reduce((sum, i) => sum + i.rating, 0) / 
                INTERVIEW_HISTORY.filter(i => i.rating).length).toFixed(1)
  };

  // Get user display info
  const getUserDisplayName = () => {
    if (user?.name) return user.name;
    if (user?.givenName && user?.familyName) return `${user.givenName} ${user.familyName}`;
    if (user?.givenName) return user.givenName;
    return "User";
  };

  const getUserType = () => {
    if (user?.userType === "student") return "Student";
    if (user?.userType === "professional") return "Professional";
    return "User";
  };

  const getUserDetails = () => {
    if (user?.userType === "student" && user?.studentDetails) {
      const details = [];
      if (user.studentDetails.college) details.push(user.studentDetails.college);
      if (user.studentDetails.degree && user.studentDetails.branch) {
        details.push(`${user.studentDetails.degree} - ${user.studentDetails.branch}`);
      }
      if (user.studentDetails.year) details.push(user.studentDetails.year);
      return details.join(" • ");
    }
    
    if (user?.userType === "professional" && user?.professionalDetails) {
      const details = [];
      if (user.professionalDetails.jobTitle) details.push(user.professionalDetails.jobTitle);
      if (user.professionalDetails.company) details.push(user.professionalDetails.company);
      if (user.professionalDetails.experience) details.push(`${user.professionalDetails.experience} exp`);
      return details.join(" • ");
    }
    
    return user?.email || "";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-700 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Interview Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Welcome back, <span className="font-semibold">{getUserDisplayName()}</span>
              </p>
              {getUserDetails() && (
                <p className="text-sm text-gray-500 mt-0.5">{getUserDetails()}</p>
              )}
            </div>
            <div className="flex items-center gap-3">
              {user?.picture ? (
                <img 
                  src={user.picture} 
                  alt={getUserDisplayName()}
                  className="w-12 h-12 rounded-full border-2 border-blue-500"
                />
              ) : (
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg border-2 border-blue-500">
                  {getUserDisplayName().charAt(0).toUpperCase()}
                </div>
              )}
              <div className="hidden md:block">
                <div className="text-sm font-semibold text-gray-900">{getUserDisplayName()}</div>
                <div className="text-xs text-gray-600">{getUserType()}</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Profile Card */}
        {user && (
          <div className="bg-white rounded-xl shadow-lg border mb-6 p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                {user.picture ? (
                  <img 
                    src={user.picture} 
                    alt={getUserDisplayName()}
                    className="w-20 h-20 rounded-full border-4 border-blue-500"
                  />
                ) : (
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-3xl border-4 border-blue-500">
                    {getUserDisplayName().charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{getUserDisplayName()}</h2>
                  <p className="text-gray-600">{user.email}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                      {getUserType()}
                    </span>
                    {user.isMentor && (
                      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                        Mentor
                      </span>
                    )}
                    {user.isRecruiter && (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                        Recruiter
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              {/* User Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                {user.userType === "student" && user.studentDetails && (
                  <>
                    {user.studentDetails.currentCGPA && (
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{user.studentDetails.currentCGPA}</div>
                        <div className="text-xs text-gray-600">CGPA</div>
                      </div>
                    )}
                    {user.studentDetails.skills && user.studentDetails.skills.length > 0 && (
                      <div className="text-center">
                        <div className="text-2xl font-bold text-indigo-600">{user.studentDetails.skills.length}</div>
                        <div className="text-xs text-gray-600">Skills</div>
                      </div>
                    )}
                  </>
                )}
                {user.userType === "professional" && user.professionalDetails && (
                  <>
                    {user.professionalDetails.experience && (
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{user.professionalDetails.experience}</div>
                        <div className="text-xs text-gray-600">Experience</div>
                      </div>
                    )}
                    {user.professionalDetails.skills && user.professionalDetails.skills.length > 0 && (
                      <div className="text-center">
                        <div className="text-2xl font-bold text-indigo-600">{user.professionalDetails.skills.length}</div>
                        <div className="text-xs text-gray-600">Skills</div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
            
            {/* Additional Info */}
            {user.userType === "student" && user.studentDetails && (
              <div className="mt-6 pt-6 border-t">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  {user.studentDetails.college && (
                    <div>
                      <span className="text-gray-600">College: </span>
                      <span className="font-semibold text-gray-900">{user.studentDetails.college}</span>
                    </div>
                  )}
                  {user.studentDetails.graduationYear && (
                    <div>
                      <span className="text-gray-600">Graduation: </span>
                      <span className="font-semibold text-gray-900">{user.studentDetails.graduationYear}</span>
                    </div>
                  )}
                  {user.studentDetails.careerInterest && (
                    <div>
                      <span className="text-gray-600">Interest: </span>
                      <span className="font-semibold text-gray-900">{user.studentDetails.careerInterest}</span>
                    </div>
                  )}
                </div>
                {user.studentDetails.skills && user.studentDetails.skills.length > 0 && (
                  <div className="mt-4">
                    <span className="text-gray-600 text-sm">Skills: </span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {user.studentDetails.skills.map((skill, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {user.userType === "professional" && user.professionalDetails && (
              <div className="mt-6 pt-6 border-t">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  {user.professionalDetails.company && (
                    <div>
                      <span className="text-gray-600">Company: </span>
                      <span className="font-semibold text-gray-900">{user.professionalDetails.company}</span>
                    </div>
                  )}
                  {user.professionalDetails.jobTitle && (
                    <div>
                      <span className="text-gray-600">Role: </span>
                      <span className="font-semibold text-gray-900">{user.professionalDetails.jobTitle}</span>
                    </div>
                  )}
                  {user.professionalDetails.careerLevel && (
                    <div>
                      <span className="text-gray-600">Level: </span>
                      <span className="font-semibold text-gray-900 capitalize">{user.professionalDetails.careerLevel}</span>
                    </div>
                  )}
                </div>
                {user.professionalDetails.skills && user.professionalDetails.skills.length > 0 && (
                  <div className="mt-4">
                    <span className="text-gray-600 text-sm">Skills: </span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {user.professionalDetails.skills.map((skill, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md border border-blue-100 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Interviews</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
                <p className="text-xs text-green-600 mt-1">↑ 2 this month</p>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl shadow-lg">
                <Calendar className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-green-100 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Completed</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{stats.completed}</p>
                <p className="text-xs text-gray-500 mt-1">{((stats.completed/stats.total)*100).toFixed(0)}% success rate</p>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-xl shadow-lg">
                <CheckCircle className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-orange-100 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Upcoming</p>
                <p className="text-3xl font-bold text-orange-600 mt-2">{stats.upcoming}</p>
                <p className="text-xs text-gray-500 mt-1">Next: Dec 22</p>
              </div>
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-4 rounded-xl shadow-lg">
                <Clock className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-purple-100 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Avg Rating</p>
                <p className="text-3xl font-bold text-purple-600 mt-2">{stats.avgRating}</p>
                <p className="text-xs text-gray-500 mt-1">Out of 5.0</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-xl shadow-lg">
                <Award className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg border mb-6">
          <div className="flex border-b overflow-x-auto">
            {["mentors", "history", "upcoming"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-4 font-semibold transition whitespace-nowrap ${
                  activeTab === tab
                    ? "border-b-3 border-blue-600 text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {tab === "mentors" && "🔍 Find Mentors"}
                {tab === "history" && "📚 Interview History"}
                {tab === "upcoming" && "📅 Upcoming Sessions"}
              </button>
            ))}
          </div>

          {/* Mentors Tab */}
          {activeTab === "mentors" && (
            <div className="p-6">
              {/* Search and Filters */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="md:col-span-2 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by name or expertise..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <select
                  value={filterExpertise}
                  onChange={(e) => setFilterExpertise(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Expertise</option>
                  {allExpertise.map(exp => (
                    <option key={exp} value={exp}>{exp}</option>
                  ))}
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="rating">Sort by Rating</option>
                  <option value="experience">Sort by Experience</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="interviews">Most Interviews</option>
                </select>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                Showing {sortedMentors.length} of {mentors.length} mentors
              </p>

              {/* Mentors Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedMentors.map((mentor) => (
                  <div
                    key={mentor._id}
                    className="bg-gradient-to-br from-white to-gray-50 rounded-xl border-2 border-gray-200 hover:border-blue-400 hover:shadow-xl transition p-6 relative overflow-hidden"
                  >
                    {mentor.availability === "Available" && (
                      <div className="absolute top-4 right-4">
                        <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          Available
                        </div>
                      </div>
                    )}

                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                        {mentor.user?.avatar || mentor.user?.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900">
                          {mentor.user?.name}
                        </h3>
                        {mentor._id.startsWith("demo") && (
                          <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded">
                            Demo Profile
                          </span>
                        )}
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-bold text-gray-900">{mentor.rating}</span>
                          <span className="text-xs text-gray-500">({mentor.completedInterviews})</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{mentor.bio}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {mentor.expertise?.slice(0, 3).map((skill, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                      {mentor.expertise?.length > 3 && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                          +{mentor.expertise.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="space-y-2 mb-4 bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Experience</span>
                        <span className="font-semibold text-gray-900">{mentor.experience} years</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Rate</span>
                        <span className="font-semibold text-blue-600">${mentor.pricePerHour}/hr</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedMentor(mentor);
                        setShowBookingModal(true);
                      }}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-3 rounded-lg transition font-semibold shadow-lg"
                    >
                      Book Interview
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* History Tab */}
          {activeTab === "history" && (
            <div className="p-6">
              <div className="space-y-4">
                {INTERVIEW_HISTORY.filter(i => i.status === "completed").map((interview) => (
                  <div key={interview.id} className="bg-gradient-to-r from-green-50 to-white p-6 rounded-xl border-2 border-green-200 hover:shadow-lg transition">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                          <CheckCircle className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <h4 className="font-bold text-gray-900 text-lg">{interview.mentor}</h4>
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{interview.type}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{interview.date} at {interview.time}</p>
                          {interview.feedback && (
                            <p className="text-sm text-gray-700 mt-2 italic">"{interview.feedback}"</p>
                          )}
                          <div className="flex items-center gap-1 mt-2">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < interview.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedInterview(interview);
                          setShowFeedbackModal(true);
                        }}
                        className="text-sm text-blue-600 hover:underline font-medium"
                      >
                        Edit Feedback
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upcoming Tab */}
          {activeTab === "upcoming" && (
            <div className="p-6">
              <div className="space-y-4">
                {INTERVIEW_HISTORY.filter(i => i.status === "scheduled").map((interview) => (
                  <div key={interview.id} className="bg-gradient-to-r from-orange-50 to-white p-6 rounded-xl border-2 border-orange-200 hover:shadow-lg transition">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                          <Clock className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <h4 className="font-bold text-gray-900 text-lg">{interview.mentor}</h4>
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{interview.type}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            <span className="font-semibold">{interview.date}</span> at {interview.time}
                          </p>
                          <div className="flex gap-3 mt-3">
                            <button className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium">
                              Join Meeting
                            </button>
                            <button className="text-sm bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition font-medium">
                              Reschedule
                            </button>
                            <button className="text-sm text-red-600 hover:underline font-medium">
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-semibold">
                          In {Math.ceil((new Date(interview.date) - new Date()) / (1000 * 60 * 60 * 24))} days
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedMentor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-8 shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                {selectedMentor.user?.avatar || selectedMentor.user?.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Book Interview</h2>
                <p className="text-gray-600">with {selectedMentor?.user?.name}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Interview Type *
                  </label>
                  <select
                    value={bookingForm.interviewType}
                    onChange={(e) => setBookingForm({...bookingForm, interviewType: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="technical">Technical Interview</option>
                    <option value="behavioral">Behavioral Interview</option>
                    <option value="system-design">System Design</option>
                    <option value="coding">Coding Round</option>
                    <option value="mock">Mock Interview</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Duration *
                  </label>
                  <select
                    value={bookingForm.duration}
                    onChange={(e) => setBookingForm({...bookingForm, duration: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="30">30 minutes</option>
                    <option value="60">60 minutes</option>
                    <option value="90">90 minutes</option>
                    <option value="120">120 minutes</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    value={bookingForm.scheduledDate}
                    onChange={(e) => setBookingForm({...bookingForm, scheduledDate: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Time *
                  </label>
                  <input
                    type="time"
                    value={bookingForm.scheduledTime}
                    onChange={(e) => setBookingForm({...bookingForm, scheduledTime: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Session Title *
                </label>
                <input
                  type="text"
                  value={bookingForm.title}
                  onChange={(e) => setBookingForm({...bookingForm, title: e.target.value})}
                  placeholder="e.g., React Interview Preparation"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={bookingForm.description}
                  onChange={(e) => setBookingForm({...bookingForm, description: e.target.value})}
                  placeholder="What would you like to focus on? Any specific topics or areas you want to cover?"
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Total Cost</span>
                  <span className="text-2xl font-bold text-blue-600">
                    ${((selectedMentor.pricePerHour / 60) * parseInt(bookingForm.duration)).toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  ${selectedMentor.pricePerHour}/hr × {bookingForm.duration} mins
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowBookingModal(false);
                  setBookingForm({
                    interviewType: "technical",
                    scheduledDate: "",
                    scheduledTime: "",
                    title: "",
                    description: "",
                    duration: "60"
                  });
                }}
                className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => sendRequest(selectedMentor._id)}
                disabled={!bookingForm.scheduledDate || !bookingForm.scheduledTime || !bookingForm.title}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {showFeedbackModal && selectedInterview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Update Feedback</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Rating
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setFeedbackForm({...feedbackForm, rating: star})}
                      className="transition-transform hover:scale-110"
                    >
                      <Star 
                        className={`w-10 h-10 ${
                          star <= feedbackForm.rating 
                            ? 'text-yellow-500 fill-yellow-500' 
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Comment
                </label>
                <textarea
                  value={feedbackForm.comment}
                  onChange={(e) => setFeedbackForm({...feedbackForm, comment: e.target.value})}
                  placeholder="Share your experience..."
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowFeedbackModal(false);
                  setFeedbackForm({ rating: 5, comment: "" });
                }}
                className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={submitFeedback}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition font-semibold shadow-lg"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewDashboard;