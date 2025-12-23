// pages/ScheduledInterviewPage.jsx
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../AUTH/GlobalContext";
import { Calendar, Clock, User, MessageSquare, XCircle, Edit3, CheckCircle2, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";

const ScheduledInterviewPage = () => {
  const { user: loggedInUser } = useGlobalContext();
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rescheduleData, setRescheduleData] = useState({
    interviewId: null,
    date: "",
    time: "",
    duration: "",
  });
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    if (loggedInUser) {
      fetchScheduledInterviews();
    }
  }, [loggedInUser]);

  const fetchScheduledInterviews = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/interviews/scheduled?userId=${loggedInUser._id}`
      );
      const data = await res.json();
      if (data.success) {
        setInterviews(data.interviews);
      }
    } catch (err) {
      console.error("Failed to fetch scheduled interviews:", err);
    } finally {
      setLoading(false);
    }
  };

  const completeInterview = async (interviewId) => {
  const feedback = prompt("Enter feedback for this interview:");
  if (!feedback) return;

  try {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/api/interviews/complete/${interviewId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedback }),
      }
    );

    const data = await res.json();

    if (data.success) {
      setInterviews((prev) =>
        prev.filter((i) => i._id !== interviewId)
      );
      alert("Interview completed successfully");
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  }
};

  const cancelInterview = async (interviewId) => {
    if (!window.confirm("Are you sure you want to cancel this interview?")) return;

    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/interviews/cancel/${interviewId}`,
        { method: "PATCH", headers: { "Content-Type": "application/json" } }
      );
      const data = await res.json();
      if (data.success) {
        setInterviews((prev) => prev.filter((i) => i._id !== interviewId));
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to cancel interview!");
    }
  };

  const openReschedule = (interview) => {
    setRescheduleData({
      interviewId: interview._id,
      date: new Date(interview.date).toISOString().split("T")[0],
      time: interview.time,
      duration: interview.duration,
    });
  };

  const handleRescheduleChange = (e) => {
    setRescheduleData({ ...rescheduleData, [e.target.name]: e.target.value });
  };

  const submitReschedule = async () => {
    try {
      const { interviewId, date, time, duration } = rescheduleData;
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/interviews/reschedule/${interviewId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ date, time, duration }),
        }
      );
      const data = await res.json();
      if (data.success) {
        setInterviews((prev) =>
          prev.map((i) =>
            i._id === interviewId ? { ...i, date, time, duration } : i
          )
        );
        setRescheduleData({ interviewId: null, date: "", time: "", duration: "" });
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to reschedule!");
    }
  };

  // Calendar functions
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek };
  };

  const getInterviewsForDate = (date) => {
    return interviews.filter(interview => {
      const interviewDate = new Date(interview.date);
      return interviewDate.toDateString() === date.toDateString();
    });
  };

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const renderCalendar = () => {
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
    const days = [];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    // Empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="aspect-square"></div>);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const dayInterviews = getInterviewsForDate(date);
      const isToday = date.toDateString() === new Date().toDateString();
      
      days.push(
        <div
          key={day}
          className={`aspect-square p-1 border border-slate-200 relative ${
            isToday ? 'bg-indigo-50 border-indigo-300' : 'bg-white'
          }`}
        >
          <div className={`text-sm font-semibold ${isToday ? 'text-indigo-700' : 'text-slate-700'}`}>
            {day}
          </div>
          {dayInterviews.length > 0 && (
            <div className="mt-1 space-y-0.5">
              {dayInterviews.slice(0, 2).map((interview, idx) => (
                <div
                  key={idx}
                  className="text-xs bg-indigo-600 text-white rounded px-1 py-0.5 truncate"
                  title={`${interview.time} - ${interview.user.name}`}
                >
                  {interview.time}
                </div>
              ))}
              {dayInterviews.length > 2 && (
                <div className="text-xs text-indigo-600 font-semibold">
                  +{dayInterviews.length - 2} more
                </div>
              )}
            </div>
          )}
        </div>
      );
    }
    
    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-slate-900">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h3>
          <div className="flex gap-2">
            <button
              onClick={previousMonth}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-slate-600" />
            </button>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-xs font-bold text-slate-600 py-2">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {days}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-indigo-600 border-b-transparent"></div>
          <p className="mt-4 text-lg text-slate-600 font-medium">Loading your interviews...</p>
        </div>
      </div>
    );
  }

  if (interviews.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Calendar className="w-12 h-12 text-indigo-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-3">No Scheduled Interviews</h2>
          <p className="text-lg text-slate-600 max-w-md mx-auto">
            Your upcoming interviews will appear here once they're scheduled.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Scheduled Interviews</h1>
          <p className="text-slate-600 text-lg">Manage and track your upcoming sessions</p>
        </div>

        {/* Main Content: 60-40 Split */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Side: Interview Cards (60%) */}
          <div className="lg:w-[60%] space-y-4 overflow-y-auto max-h-[calc(100vh-200px)]">
            {interviews.map((interview) => (
              <div
                key={interview._id}
                className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">
                          {interview.user.name}
                        </h3>
                        <p className="text-xs text-slate-500 font-medium">Interview Session</p>
                      </div>
                    </div>
                  {interview.status === "scheduled" && (
  <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-200">
    
    {/* Reschedule */}
    <button
      onClick={() => openReschedule(interview)}
      className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-2 px-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg text-sm"
    >
      <Edit3 className="w-4 h-4" />
      Reschedule
    </button>

    {/* Cancel */}
    <button
      onClick={() => cancelInterview(interview._id)}
      className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-bold py-2 px-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg text-sm"
    >
      <XCircle className="w-4 h-4" />
      Cancel
    </button>

    {/* ✅ Mark as Completed */}
    <button
      onClick={() => completeInterview(interview._id)}
      className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-2 px-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg text-sm"
    >
      <CheckCircle2 className="w-4 h-4" />
      Complete
    </button>

  </div>
)}


                    {interview.status === "completed" && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Completed
                      </span>
                    )}
                    {interview.status === "cancelled" && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                        <XCircle className="w-3 h-3 mr-1" />
                        Cancelled
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="flex items-center space-x-2 bg-slate-50 rounded-lg p-3">
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        <Calendar className="w-4 h-4 text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-semibold">Date</p>
                        <p className="text-xs font-bold text-slate-900">{new Date(interview.date).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 bg-slate-50 rounded-lg p-3">
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        <Clock className="w-4 h-4 text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-semibold">Time</p>
                        <p className="text-xs font-bold text-slate-900">{interview.time}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 bg-slate-50 rounded-lg p-3">
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        <Clock className="w-4 h-4 text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-semibold">Duration</p>
                        <p className="text-xs font-bold text-slate-900">{interview.duration}</p>
                      </div>
                    </div>
                  </div>

                  {interview.message && (
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 mb-4 border border-indigo-100">
                      <div className="flex items-start space-x-2">
                        <div className="w-6 h-6 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <MessageSquare className="w-3 h-3 text-indigo-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-bold text-indigo-900 uppercase tracking-wide mb-1">Message</p>
                          <p className="text-sm text-slate-700 leading-relaxed">{interview.message}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {interview.status === "scheduled" && (
                    <div className="flex gap-2 pt-4 border-t border-slate-200">
                      <button
                        onClick={() => openReschedule(interview)}
                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg text-sm"
                      >
                        <Edit3 className="w-4 h-4" />
                        <span>Reschedule</span>
                      </button>

                      <button
                        onClick={() => cancelInterview(interview._id)}
                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg text-sm"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right Side: Calendar (40%) */}
          <div className="lg:w-[40%]">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sticky top-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Calendar View</h2>
              </div>
              {renderCalendar()}
              
              {/* Legend */}
              <div className="mt-6 pt-6 border-t border-slate-200">
                <p className="text-sm font-semibold text-slate-700 mb-3">Legend</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-indigo-50 border border-indigo-300 rounded"></div>
                    <span className="text-xs text-slate-600">Today</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-indigo-600 rounded"></div>
                    <span className="text-xs text-slate-600">Interview scheduled</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reschedule Modal */}
        {rescheduleData.interviewId && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-t-2xl">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <Edit3 className="w-6 h-6" />
                  Reschedule Interview
                </h2>
              </div>
              
              <div className="p-6 space-y-5">
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                    <Calendar className="w-4 h-4 text-indigo-600" />
                    New Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={rescheduleData.date}
                    onChange={handleRescheduleChange}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                    <Clock className="w-4 h-4 text-indigo-600" />
                    New Time
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={rescheduleData.time}
                    onChange={handleRescheduleChange}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                    <Clock className="w-4 h-4 text-indigo-600" />
                    Duration
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={rescheduleData.duration}
                    onChange={handleRescheduleChange}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none font-medium"
                    placeholder="e.g., 1 hour"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() =>
                      setRescheduleData({ interviewId: null, date: "", time: "", duration: "" })
                    }
                    className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold px-6 py-3 rounded-xl transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={submitReschedule}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
    
export default ScheduledInterviewPage;