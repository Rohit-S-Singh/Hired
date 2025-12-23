import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Briefcase, DollarSign, Calendar, CheckCircle, Star, ArrowRight, Search, Video, Clock, History, Users, CalendarCheck, BarChart3, Menu, X } from "lucide-react";
import { useGlobalContext } from "../AUTH/GlobalContext";

const FindMentor = () => {
  const [mentors, setMentors] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useGlobalContext();

  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/interviews/mentors`);
      const data = await res.json();
      if (data.success) setMentors(data.mentors);
    } catch (err) {
      console.error(err);
    }
  };

  const goToMentorDetail = (mentorId, userId) => {
    navigate(`/mentor/${mentorId}?user=${userId}`);
  };

  const allMenuItems = [
    { path: "/interviews", label: "Interviews", icon: Video },
    { path: "/new-interview", label: "New Interview", icon: Calendar },
    { path: "/history-interview", label: "Interview History", icon: History },
    { path: "/find-mentor", label: "Find Mentor", icon: Users },
    { path: "/scheduled-interviews", label: "Scheduled Interviews", icon: CalendarCheck },
    { path: "/InterviewHistoryPage", label: "History Page", icon: Clock },
    { path: "/MentorDashboard-interview", label: "Mentor Dashboard", icon: BarChart3, requiresMentor: true },
  ];

  // Filter menu items based on user's mentor status
  const menuItems = allMenuItems.filter(item => {
    if (item.requiresMentor) {
      return user?.isMentor === true;
    }
    return true;
  });

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-slate-100 flex">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-72 bg-white border-r border-slate-200 shadow-xl transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Interview Portal
            </h2>
            <p className="text-sm text-slate-600 mt-1">Manage your sessions</p>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = window.location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <button
                      onClick={() => {
                        navigate(item.path);
                        setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-slate-200">
            {user?.isMentor && (
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 mb-3 border border-emerald-200">
                <p className="text-sm font-semibold text-emerald-900 mb-1">✨ Mentor Status</p>
                <p className="text-xs text-emerald-700">You have mentor access</p>
              </div>
            )}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4">
              <p className="text-sm font-semibold text-slate-900 mb-1">Need Help?</p>
              <p className="text-xs text-slate-600">Contact support for assistance</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white shadow-lg border-b sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Find Your Perfect Mentor
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
                    {(getUserDisplayName() || "?").charAt(0).toUpperCase()}
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

        <div className="max-w-7xl mx-auto px-4 py-12 lg:px-8">
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
                      {(getUserDisplayName() || "?").charAt(0).toUpperCase()}
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

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by expertise, experience, or availability..."
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-slate-700 font-medium shadow-sm"
              />
            </div>
          </div>

          {/* Mentors Grid */}
          {mentors.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-slate-400" />
              </div>
              <p className="text-xl text-slate-600">No mentors available at the moment</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mentors.map((mentor) => (
                <div
                  key={mentor._id}
                  onClick={() => goToMentorDetail(mentor._id, mentor.user)}
                  className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer group"
                >
                  {/* Card Header with Gradient */}
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-24 relative">
                    <div className="absolute -bottom-12 left-6">
                      <div className="w-24 h-24 bg-white rounded-2xl shadow-xl flex items-center justify-center border-4 border-white group-hover:scale-110 transition-transform duration-300">
                        <User className="w-12 h-12 text-indigo-600" />
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="pt-16 px-6 pb-6">
                    {/* Expertise Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {mentor.expertise.slice(0, 3).map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold"
                        >
                          {skill}
                        </span>
                      ))}
                      {mentor.expertise.length > 3 && (
                        <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-semibold">
                          +{mentor.expertise.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Stats Grid */}
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                            <Briefcase className="w-4 h-4 text-indigo-600" />
                          </div>
                          <span className="text-sm font-medium text-slate-600">Experience</span>
                        </div>
                        <span className="text-sm font-bold text-slate-900">{mentor.experience} years</span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                            <DollarSign className="w-4 h-4 text-green-600" />
                          </div>
                          <span className="text-sm font-medium text-slate-600">Price/Hour</span>
                        </div>
                        <span className="text-sm font-bold text-green-600">${mentor.pricePerHour}</span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                            <Calendar className="w-4 h-4 text-blue-600" />
                          </div>
                          <span className="text-sm font-medium text-slate-600">Availability</span>
                        </div>
                        <span className="text-sm font-bold text-slate-900">{mentor.availability}</span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          </div>
                          <span className="text-sm font-medium text-green-800">Completed</span>
                        </div>
                        <span className="text-sm font-bold text-green-900">{mentor.completedInterviews} sessions</span>
                      </div>
                    </div>

                    {/* View Profile Button */}
                    <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group-hover:gap-3">
                      <span>View Profile</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              ))}
            </div>
          )}

          {/* Stats Banner */}
          {mentors.length > 0 && (
            <div className="mt-16 bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <User className="w-8 h-8 text-indigo-600" />
                  </div>
                  <p className="text-3xl font-bold text-slate-900 mb-1">{mentors.length}</p>
                  <p className="text-slate-600 font-medium">Expert Mentors</p>
                </div>
                <div>
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-3xl font-bold text-slate-900 mb-1">
                    {mentors.reduce((sum, m) => sum + m.completedInterviews, 0)}
                  </p>
                  <p className="text-slate-600 font-medium">Total Sessions</p>
                </div>
                <div>
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Star className="w-8 h-8 text-yellow-600" />
                  </div>
                  <p className="text-3xl font-bold text-slate-900 mb-1">
                    {Math.round(mentors.reduce((sum, m) => sum + m.experience, 0) / mentors.length)}
                  </p>
                  <p className="text-slate-600 font-medium">Avg. Experience (Years)</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default FindMentor;