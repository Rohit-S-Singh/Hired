import React from 'react';
import { Calendar, ChevronRight, TrendingUp, MessageSquare, Star, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import  { useState, useEffect } from "react";
import { useGlobalContext } from "../AUTH/GlobalContext";

const InterviewReadiness = () => {
  const { user: loggedInUser } = useGlobalContext();
  const [upcomingInterviews, setUpcomingInterviews] = useState([]);
const [loadingInterviews, setLoadingInterviews] = useState(true);
const [history, setHistory] = useState([]);
const [loadingHistory, setLoadingHistory] = useState(true);

  const navigate = useNavigate();
const [mentors, setMentors] = useState([]);

const fetchUpcomingInterviews = async () => {
  if (!loggedInUser) return;

  try {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/api/interviews/scheduled?userId=${loggedInUser._id}`
    );
    const data = await res.json();

    if (data.success) {
      // only scheduled interviews
      setUpcomingInterviews(
        data.interviews.filter(i => i.status === "scheduled")
      );
    }
  } catch (err) {
    console.error("Failed to fetch upcoming interviews:", err);
  } finally {
    setLoadingInterviews(false);
  }
};

const fetchInterviewHistory = async () => {
  if (!loggedInUser) return;

  try {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/api/interviews/history?userId=${loggedInUser._id}`
    );
    const data = await res.json();

    if (data.success) {
      setHistory(data.interviews);
    }
  } catch (err) {
    console.error("Failed to load interview history:", err);
  } finally {
    setLoadingHistory(false);
  }
};




const fetchMentors = async () => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/api/mentors/show-all-mentor`
    );
    const data = await res.json();

    if (data.success) {
      setMentors(data.mentors);
    }
  } catch (err) {
    console.error(err);
  }
};


useEffect(() => {
  fetchMentors();
   fetchUpcomingInterviews();
   fetchInterviewHistory();
}, [loggedInUser]);

  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Title Section */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Interview Readiness</h1>
          <p className="text-gray-600">Track progress. Practice smarter. Improve faster.</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            <MessageSquare className="w-5 h-5" />
            Start AI Interview
            <ChevronRight className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-2 bg-white text-gray-700 px-5 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors border border-gray-300"  onClick={() => navigate('/find-mentor')}>
            <Calendar className="w-5 h-5" />
            Schedule Mentor Interview
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Card */}
        <div className="bg-white rounded-lg p-6 mb-8 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Interview Readiness: 72%</h2>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '72%' }}></div>
          </div>
          <p className="text-gray-600 text-sm mb-4">Improving steadily · Focus on System Design & Communication.</p>
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <span>Interviews taken: <span className="font-semibold text-gray-900">14</span></span>
            <span>Mentor: <span className="font-semibold text-gray-900">5</span></span>
            <span>AI: <span className="font-semibold text-gray-900">9</span></span>
            <span className="ml-auto">Avg score last 5 interviews: <span className="font-semibold text-gray-900">7.6</span> → <span className="font-semibold text-green-600 inline-flex items-center gap-1">8.1 <TrendingUp className="w-4 h-4" /></span></span>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Upcoming Interviews */}
       {/* Upcoming Interviews */}
<div className="bg-white rounded-lg p-6 border border-gray-200">
  <h3 className="text-lg font-semibold text-gray-900 mb-4">
    Upcoming Interviews
  </h3>

  {loadingInterviews ? (
    <p className="text-sm text-gray-500">Loading interviews...</p>
  ) : upcomingInterviews.length === 0 ? (
    <p className="text-sm text-gray-500">No upcoming interviews</p>
  ) : (
    upcomingInterviews.slice(0, 2).map((interview) => {
      const dateObj = new Date(interview.date);

      return (
        <div
          key={interview._id}
          className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
        >
          <div className="flex gap-3 mb-3">
            {/* Date */}
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {dateObj.getDate()}
              </div>
              <div className="text-xs text-gray-600">
                {dateObj.toLocaleString("default", { month: "short" })}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-gray-900">
                  Interview with {interview.user.name}
                </h4>
                <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded">
                  Scheduled
                </span>
              </div>
              <p className="text-gray-600 text-sm">
                {interview.time} • {interview.duration}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => navigate("/scheduled-interviews")}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-gray-700 text-sm font-medium hover:bg-gray-50"
            >
              View Details
            </button>

            <button
              onClick={() => navigate("/scheduled-interviews")}
              className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
            >
              Manage
            </button>
          </div>
        </div>
      );
    })
  )}
</div>

{/* Top Mentors */}
<div className="bg-white rounded-lg p-6 border border-gray-200 flex flex-col">
  <h3 className="text-lg font-semibold text-gray-900 mb-4">
    Top Mentors Available
  </h3>

  {/* Loading / Empty State */}
  {mentors.length === 0 ? (
    <p className="text-sm text-gray-500">No mentors available right now</p>
  ) : (
    mentors.slice(0, 3).map((mentor) => (
      <div
        key={mentor._id}
        onClick={() =>
          navigate(`/mentor/${mentor._id}?user=${mentor.user}`)
        }
        className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg mb-3 hover:bg-gray-100 cursor-pointer transition-colors border border-gray-200"
      >
        {/* Avatar */}
        <div className="flex-shrink-0">
          {mentor.avatar ? (
            <img 
              src={mentor.avatar} 
              alt={mentor.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-blue-500"
            />
          ) : (
            <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
              {mentor.name?.charAt(0)}
            </div>
          )}
        </div>

        {/* Mentor Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-gray-900 truncate">{mentor.name}</h4>
            <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
          </div>
          
          {/* Expertise Tags */}
          {mentor.expertise && mentor.expertise.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {mentor.expertise.slice(0, 3).map((skill, idx) => (
                <span 
                  key={idx}
                  className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full"
                >
                  {skill}
                </span>
              ))}
              {mentor.expertise.length > 3 && (
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                  +{mentor.expertise.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Experience and Price */}
          <div className="flex items-center gap-3 text-xs text-gray-600">
            {mentor.experience && (
              <span className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                {mentor.experience} yrs
              </span>
            )}
            {mentor.pricePerHour && (
              <span className="flex items-center gap-1 font-semibold text-green-600">
                <DollarSign className="w-3 h-3" />
                {mentor.pricePerHour}/hr
              </span>
            )}
          </div>
        </div>

        {/* Arrow indicator */}
        <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-2" />
      </div>
    ))
  )}

  {/* Bottom Left Button */}
  <div className="mt-auto pt-4">
    <button
      onClick={() => navigate("/find-mentor")}
      className="text-blue-600 text-sm font-medium hover:text-blue-700"
    >
      See all →
    </button>
  </div>
</div>
</div>


        {/* Previous Interview Records */}
       {/* Previous Interview Records */}
<div className="bg-white rounded-lg p-6 border border-gray-200">
  <div className="flex items-center justify-between mb-6">
    <h3 className="text-lg font-semibold text-gray-900">
      Previous Interview Records
    </h3>
    <button
      onClick={() => navigate("/InterviewHistoryPage")}
      className="flex items-center gap-1 text-blue-600 font-medium hover:text-blue-700 text-sm"
    >
      See All <ChevronRight className="w-4 h-4" />
    </button>
  </div>

  {loadingHistory ? (
    <p className="text-sm text-gray-500">Loading interview records...</p>
  ) : history.length === 0 ? (
    <p className="text-sm text-gray-500">No completed interviews yet</p>
  ) : (
    history.slice(0, 2).map((item) => (
      <div
        key={item._id}
        className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
      >
        <div className="flex justify-between items-start mb-3">
          <div>
            <h4 className="font-semibold text-gray-900">
              Interview with {item.user?.name}
            </h4>
            <p className="text-xs text-gray-500">Completed</p>
          </div>

          <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-700 rounded-full">
            Completed
          </span>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <span>{new Date(item.date).toLocaleDateString()}</span>
          <span>{item.time}</span>
          <span>{item.duration}</span>
        </div>

        {item.feedback && (
          <div className="bg-green-50 border border-green-200 rounded-md p-3 text-sm text-gray-700">
            <strong>Feedback:</strong> {item.feedback}
          </div>
        )}
      </div>
    ))
  )}
</div>

      </main>
    </div>
  );
};

export default InterviewReadiness;