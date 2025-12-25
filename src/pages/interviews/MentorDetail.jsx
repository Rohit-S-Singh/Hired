// pages/MentorDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../AUTH/GlobalContext";
import { Calendar, Clock, Briefcase, MessageSquare, User, Mail } from "lucide-react";

const MentorDetail = () => {
  const { mentorId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user: loggedInUser } = useGlobalContext();

  const [mentor, setMentor] = useState(null);
  const [mentorUser, setMentorUser] = useState(null);
  const [interviewDetails, setInterviewDetails] = useState({
    date: "",
    day: "",
    time: "",
    duration: "",
    message: "",
    additionalDetails: "",
  });

  const mentorUserId = new URLSearchParams(location.search).get("user");

  useEffect(() => {
    fetchMentorDetail();
    fetchMentorUserDetail();
  }, [mentorId, mentorUserId]);

  const fetchMentorDetail = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/mentors/mentor/${mentorId}`);
      const data = await res.json();
      if (data.success) setMentor(data.mentor);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMentorUserDetail = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/users/${mentorUserId}`);
      const data = await res.json();
      if (data.success) setMentorUser(data.user);
    } catch (err) {
      console.error(err);
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
      } else {
        alert("Failed to send request: " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  if (!mentor || !mentorUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-slate-600 font-medium">Loading mentor details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Mentor Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 border border-slate-200">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-32"></div>
          <div className="px-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-end md:space-x-6 -mt-16">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center">
                  <User className="w-16 h-16 text-indigo-600" />
                </div>
              </div>
              <div className="mt-4 md:mt-0 flex-1">
                <h1 className="text-3xl font-bold text-slate-900">{mentorUser.name}</h1>
                <div className="mt-4 flex flex-wrap gap-2">
                  {mentor.expertise.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-4 md:mt-0 flex items-center space-x-2 text-slate-600">
                <Briefcase className="w-5 h-5" />
<span className="text-lg font-semibold">
  {mentor.experience ?? 0} years
</span>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900 mb-2">About</h2>
              <p className="text-slate-600 leading-relaxed">{mentor.bio}</p>
            </div>
          </div>
        </div>

        {/* Interview Request Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Request an Interview</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date Input */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                <Calendar className="w-4 h-4" />
                <span>Preferred Date</span>
              </label>
              <input
                type="date"
                name="date"
                value={interviewDetails.date}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
              />
            </div>

            {/* Day Input */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                <Calendar className="w-4 h-4" />
                <span>Day of Week</span>
              </label>
              <input
                type="text"
                name="day"
                placeholder="e.g., Monday"
                value={interviewDetails.day}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
              />
            </div>

            {/* Time Input */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                <Clock className="w-4 h-4" />
                <span>Preferred Time</span>
              </label>
              <input
                type="time"
                name="time"
                value={interviewDetails.time}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
              />
            </div>

            {/* Duration Input */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                <Clock className="w-4 h-4" />
                <span>Duration</span>
              </label>
              <input
                type="text"
                name="duration"
                placeholder="e.g., 1 hour"
                value={interviewDetails.duration}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
              />
            </div>
          </div>

          {/* Message Textarea */}
          <div className="mt-6 space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
              <MessageSquare className="w-4 h-4" />
              <span>Your Message</span>
            </label>
            <textarea
              name="message"
              placeholder="Tell your mentor why you'd like to connect..."
              value={interviewDetails.message}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none resize-none"
            />
          </div>

          {/* Additional Details Textarea */}
          <div className="mt-6 space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
              <Mail className="w-4 h-4" />
              <span>Additional Details</span>
            </label>
            <textarea
              name="additionalDetails"
              placeholder="Any other information you'd like to share..."
              value={interviewDetails.additionalDetails}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              onClick={submitInterviewRequest}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-4 rounded-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Send Interview Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorDetail;