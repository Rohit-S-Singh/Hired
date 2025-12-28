// pages/MentorDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../AUTH/GlobalContext";
import { 
  Calendar, 
  Clock, 
  Briefcase, 
  MessageSquare, 
  User, 
  Mail,
  Phone,
  DollarSign,
  Star,
  CheckCircle,
  MapPin,
  Award,
  Users,
  Shield
} from "lucide-react";

const MentorDetail = () => {
  const { mentorId } = useParams();
  const navigate = useNavigate();
  const { user: loggedInUser } = useGlobalContext();

  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [interviewDetails, setInterviewDetails] = useState({
    date: "",
    day: "",
    time: "",
    duration: "",
    message: "",
    additionalDetails: "",
  });

  useEffect(() => {
    fetchMentorDetail();
  }, [mentorId]);

  const fetchMentorDetail = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/mentors/mentor/${mentorId}`);
      const data = await res.json();
      
      if (data.success) {
        setMentor(data.mentor);
      } else {
        alert("Failed to load mentor details");
      }
    } catch (err) {
      console.error("Error fetching mentor:", err);
      alert("Something went wrong while loading mentor details");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setInterviewDetails({ ...interviewDetails, [e.target.name]: e.target.value });
  };

  const submitInterviewRequest = async () => {
    if (!loggedInUser) {
      alert("You must be logged in to request an interview.");
      return;
    }

    if (!interviewDetails.date || !interviewDetails.time || !interviewDetails.message) {
      alert("Please fill in date, time, and message fields");
      return;
    }

    const payload = {
      mentor: mentorId,
      user: loggedInUser._id,
      ...interviewDetails
    };

    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/interviews/request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        alert("Interview request sent successfully!");
        setInterviewDetails({
          date: "",
          day: "",
          time: "",
          duration: "",
          message: "",
          additionalDetails: "",
        });
      } else {
        alert("Failed to send request: " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!mentor || !mentor.userId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Mentor not found</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const mentorUser = mentor.userId;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow mb-4">
          <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-lg"></div>
          
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end -mt-16 sm:-mt-12">
              <div className="flex-shrink-0 mb-4 sm:mb-0">
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-white border-4 border-white shadow-lg overflow-hidden">
                  {mentor.avatar ? (
                    <img 
                      src={mentor.avatar} 
                      alt={mentor.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <User className="w-16 h-16 sm:w-20 sm:h-20 text-gray-400" />
                    </div>
                  )}
                </div>
              </div>

              <div className="sm:ml-6 flex-1">
                <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">{mentor.name}</h1>
                <p className="text-gray-600 mt-1">{mentor.bio || "Mentor"}</p>
                
                <div className="flex flex-wrap gap-2 mt-3">
                  {mentor.isVerified && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full border border-blue-200">
                      <Shield className="w-3 h-3" />
                      Verified
                    </span>
                  )}
                  {mentor.status === 'active' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 text-sm rounded-full border border-green-200">
                      <CheckCircle className="w-3 h-3" />
                      Active
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-4 sm:mt-0">
                <button
                  onClick={() => document.getElementById('interview-form').scrollIntoView({ behavior: 'smooth' })}
                  className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-colors"
                >
                  Request Interview
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* About Section */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {mentor.bio || "No bio available"}
              </p>
            </div>

            {/* Experience Section */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Experience</h2>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{mentor.experience || 0} years of experience</p>
                  <p className="text-sm text-gray-600 mt-1">Industry expertise and mentoring</p>
                </div>
              </div>
            </div>

            {/* Skills & Expertise */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills & Expertise</h2>
              <div className="flex flex-wrap gap-2">
                {mentor.expertise && mentor.expertise.length > 0 ? (
                  mentor.expertise.map((skill, idx) => (
                    <span key={idx} className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500">No expertise listed</p>
                )}
              </div>
            </div>

            {/* Interview Types */}
            {mentor.interviewTypes && mentor.interviewTypes.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Interview Types Offered</h2>
                <div className="space-y-2">
                  {mentor.interviewTypes.map((type, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <MessageSquare className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-800 font-medium capitalize">
                        {type.replace('_', ' ')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Availability */}
            {mentor.availabilitySlots && mentor.availabilitySlots.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Time Slots</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {mentor.availabilitySlots.map((slot, idx) => (
                    <div key={idx} className="p-3 bg-gray-50 rounded text-center text-sm text-gray-700 border border-gray-200">
                      {slot}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-4">
            
            {/* Contact Info */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-3">
                {mentor.email && (
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-700 break-all">{mentor.email}</span>
                  </div>
                )}
                {mentor.phone && (
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-700">{mentor.phone}</span>
                  </div>
                )}
                {mentor.timezone && (
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-700">{mentor.timezone}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Session Rate</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">${mentor.pricePerHour || 0}</span>
                <span className="text-gray-600">/hour</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">Professional mentoring session</p>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm text-gray-600">Rating</span>
                  </div>
                  <span className="font-semibold text-gray-900">{mentor.rating || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-600">Completed</span>
                  </div>
                  <span className="font-semibold text-gray-900">{mentor.completedInterviews || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-600">Scheduled</span>
                  </div>
                  <span className="font-semibold text-gray-900">{mentor.scheduledInterviews?.length || 0}</span>
                </div>
              </div>
            </div>

            {/* User Account Info */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Details</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-500">User Type</p>
                  <p className="text-gray-900 font-medium capitalize">{mentorUser.userType}</p>
                </div>
                <div>
                  <p className="text-gray-500">Member Since</p>
                  <p className="text-gray-900 font-medium">
                    {new Date(mentor.createdAt).toLocaleDateString('en-US', { 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Connections</p>
                  <p className="text-gray-900 font-medium">{mentorUser.connectionCount || 0}</p>
                </div>
              </div>
            </div>

            {/* Network Stats */}
            {(mentorUser.connections?.length > 0 || 
              mentorUser.pendingConnections?.length > 0 || 
              mentorUser.sentConnectionRequests?.length > 0) && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Network</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Active Connections</span>
                    <span className="font-semibold text-gray-900">{mentorUser.connections?.length || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Pending</span>
                    <span className="font-semibold text-gray-900">{mentorUser.pendingConnections?.length || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Sent Requests</span>
                    <span className="font-semibold text-gray-900">{mentorUser.sentConnectionRequests?.length || 0}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Interview Request Form */}
        <div id="interview-form" className="bg-white rounded-lg shadow p-6 mt-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Request an Interview</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Date *
              </label>
              <input
                type="date"
                name="date"
                value={interviewDetails.date}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Day of Week
              </label>
              <input
                type="text"
                name="day"
                placeholder="e.g., Monday"
                value={interviewDetails.day}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Time *
              </label>
              <input
                type="time"
                name="time"
                value={interviewDetails.time}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration
              </label>
              <select
                name="duration"
                value={interviewDetails.duration}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="">Select duration</option>
                <option value="30 minutes">30 minutes</option>
                <option value="1 hour">1 hour</option>
                <option value="1.5 hours">1.5 hours</option>
                <option value="2 hours">2 hours</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Message *
            </label>
            <textarea
              name="message"
              placeholder="Introduce yourself and explain what you'd like to discuss..."
              value={interviewDetails.message}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Details
            </label>
            <textarea
              name="additionalDetails"
              placeholder="Any other information you'd like to share..."
              value={interviewDetails.additionalDetails}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
            />
          </div>

          <button
            onClick={submitInterviewRequest}
            className="w-full bg-blue-600 text-white font-medium py-3 rounded hover:bg-blue-700 transition-colors"
          >
            Send Interview Request
          </button>
          
          <p className="mt-3 text-sm text-gray-500 text-center">
            * Required fields
          </p>
        </div>
      </div>
    </div>
  );
};

export default MentorDetail;