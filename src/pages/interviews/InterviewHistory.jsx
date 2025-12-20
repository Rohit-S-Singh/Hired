import React, { useEffect, useState } from "react";
import { Calendar, Clock, FileText, X, Edit3, Save, Download, User, Briefcase, CheckCircle } from "lucide-react";

/* 🔹 Dummy data (ONLY for fallback) */
const DUMMY_HISTORY = [
  {
    _id: "demo1",
    mentor: { name: "Amit Sharma" },
    scheduledDate: "2024-12-15T10:00:00Z",
    interviewType: "technical",
    candidateNotes: "Very helpful React interview session"
  },
  {
    _id: "demo2",
    mentor: { name: "Neha Verma" },
    scheduledDate: "2024-12-10T14:00:00Z",
    interviewType: "system-design",
    candidateNotes: "Learned scalability concepts"
  }
];

const InterviewHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/interviews/history`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
          }
        }
      );

      const data = await res.json();

      if (data?.history && data.history.length > 0) {
        setHistory(data.history);
      } else {
        setHistory(DUMMY_HISTORY);
      }
    } catch (err) {
      console.error(err);
      setHistory(DUMMY_HISTORY);
    } finally {
      setLoading(false);
    }
  };

  const saveFeedback = async () => {
    await fetch(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/api/interviews/${selected._id}/feedback`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
        },
        body: JSON.stringify({ candidateNotes: notes })
      }
    );

    setSelected(null);
    fetchHistory();
  };

  const downloadReport = (interview) => {
    const reportContent = `
INTERVIEW REPORT
${'='.repeat(60)}

Mentor: ${interview.mentor?.name || 'Unknown Mentor'}
Interview Type: ${interview.interviewType?.replace('-', ' ').toUpperCase() || 'GENERAL'}
Date: ${new Date(interview.scheduledDate).toLocaleDateString('en-US', { 
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
})}
Time: ${new Date(interview.scheduledDate).toLocaleTimeString('en-US', { 
  hour: '2-digit', minute: '2-digit' 
})}

${'='.repeat(60)}

CANDIDATE FEEDBACK:
${interview.candidateNotes || 'No feedback provided'}

${'='.repeat(60)}

Generated on: ${new Date().toLocaleString()}
    `.trim();

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Interview_Report_${interview._id}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getTypeConfig = (type) => {
    const configs = {
      technical: {
        color: "bg-blue-50 text-blue-700 border-blue-200",
        icon: "💻",
        gradient: "from-blue-500 to-blue-600"
      },
      "system-design": {
        color: "bg-purple-50 text-purple-700 border-purple-200",
        icon: "🏗️",
        gradient: "from-purple-500 to-purple-600"
      },
      behavioral: {
        color: "bg-green-50 text-green-700 border-green-200",
        icon: "🤝",
        gradient: "from-green-500 to-green-600"
      },
      coding: {
        color: "bg-orange-50 text-orange-700 border-orange-200",
        icon: "⚡",
        gradient: "from-orange-500 to-orange-600"
      }
    };
    return configs[type] || {
      color: "bg-gray-50 text-gray-700 border-gray-200",
      icon: "📋",
      gradient: "from-gray-500 to-gray-600"
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-700 text-lg font-medium">Loading your interview history...</p>
          <p className="text-gray-500 text-sm mt-2">Please wait a moment</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">Interview History</h1>
              <p className="text-gray-600 text-lg">Track and review your interview performance</p>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Sessions</p>
                <p className="text-3xl font-bold text-gray-900">{history.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {history.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-16 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Briefcase className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No Interviews Yet</h3>
            <p className="text-gray-600 text-lg max-w-md mx-auto">
              Your interview history will appear here once you complete your first session. Get started today!
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {history.map((i) => {
              const typeConfig = getTypeConfig(i.interviewType);
              return (
                <div
                  key={i._id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-gray-300 group"
                >
                  {/* Card Header with Gradient */}
                  <div className={`bg-gradient-to-r ${typeConfig.gradient} p-6 text-white relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 opacity-10 text-8xl font-bold">
                      {typeConfig.icon}
                    </div>
                    <div className="relative">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <User className="w-6 h-6" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold">{i.mentor?.name || "Unknown Mentor"}</h2>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <span className="px-3 py-1 bg-white/30 backdrop-blur-sm rounded-full text-xs font-semibold uppercase tracking-wide">
                          {i.interviewType?.replace("-", " ") || "General"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    {/* Date & Time */}
                    <div className="space-y-3 mb-5">
                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {new Date(i.scheduledDate).toLocaleDateString("en-US", {
                              weekday: "long",
                              month: "short",
                              day: "numeric",
                              year: "numeric"
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {new Date(i.scheduledDate).toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit"
                            })}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Notes Preview */}
                    {i.candidateNotes ? (
                      <div className="bg-gray-50 rounded-xl p-4 mb-5 border border-gray-100">
                        <div className="flex items-start gap-2 mb-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Your Feedback</p>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
                          {i.candidateNotes}
                        </p>
                      </div>
                    ) : (
                      <div className="bg-amber-50 rounded-xl p-4 mb-5 border border-amber-100">
                        <p className="text-xs text-amber-800 font-medium">
                          💡 No feedback added yet
                        </p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelected(i);
                          setNotes(i.candidateNotes || "");
                        }}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all duration-200 font-semibold group-hover:shadow-lg"
                      >
                        <Edit3 className="w-4 h-4" />
                        {i.candidateNotes ? "Edit" : "Add"} Feedback
                      </button>
                      <button
                        onClick={() => downloadReport(i)}
                        className="px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-semibold group-hover:shadow-lg"
                        title="Download Report"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Stats Footer */}
        {history.length > 0 && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-center">
              <p className="text-gray-600 text-sm font-medium mb-1">Total Interviews</p>
              <p className="text-4xl font-bold text-gray-900">{history.length}</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-center">
              <p className="text-gray-600 text-sm font-medium mb-1">With Feedback</p>
              <p className="text-4xl font-bold text-green-600">
                {history.filter(i => i.candidateNotes).length}
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-center">
              <p className="text-gray-600 text-sm font-medium mb-1">Completion Rate</p>
              <p className="text-4xl font-bold text-blue-600">
                {Math.round((history.filter(i => i.candidateNotes).length / history.length) * 100)}%
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl w-full max-w-3xl shadow-2xl animate-in zoom-in duration-300 overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 opacity-5 text-9xl">📝</div>
              <div className="relative">
                <h2 className="text-3xl font-bold mb-2">Update Feedback</h2>
                <p className="text-gray-300">Share your thoughts about this interview</p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-xl transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8">
              <div className="bg-gray-50 rounded-2xl p-6 mb-6 border border-gray-200">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">{selected.mentor?.name}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(selected.scheduledDate).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric"
                      })}
                    </p>
                  </div>
                </div>
              </div>

              <label className="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
                Your Notes & Feedback
              </label>
              <textarea
                className="w-full border-2 border-gray-200 rounded-2xl p-5 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none resize-none text-gray-900 placeholder-gray-400 font-medium"
                rows={8}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="What went well? What could be improved? Share your insights..."
              />
              <p className="text-xs text-gray-500 mt-2">{notes.length} characters</p>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-4 p-8 border-t-2 border-gray-100 bg-gray-50">
              <button
                onClick={() => setSelected(null)}
                className="flex-1 px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-white transition-all font-bold text-lg"
              >
                Cancel
              </button>
              <button
                onClick={saveFeedback}
                className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-bold text-lg flex items-center justify-center gap-3 shadow-lg shadow-blue-200"
              >
                <Save className="w-5 h-5" />
                Save Feedback
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewHistory;