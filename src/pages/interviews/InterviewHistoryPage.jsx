import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../AUTH/GlobalContext";
import {
  Calendar,
  Clock,
  User,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";

const InterviewHistoryPage = () => {
  const { user: loggedInUser } = useGlobalContext();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loggedInUser) {
      fetchHistory();
    }
  }, [loggedInUser]);

  const fetchHistory = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/interviews/history?userId=${loggedInUser._id}`
      );
      const data = await res.json();

      if (data.success) {
        setHistory(data.interviews);
      }
    } catch (err) {
      console.error("Failed to load history:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Loading interview history...</p>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div>
          <CheckCircle2 className="w-16 h-16 mx-auto text-green-500 mb-4" />
          <h2 className="text-2xl font-bold">No Interview History</h2>
          <p className="text-slate-600 mt-2">
            Completed interviews will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-slate-900">
          Interview History
        </h1>

        <div className="space-y-4">
          {history.map((item) => (
            <div
              key={item._id}
              className="bg-white border border-slate-200 rounded-xl shadow-md p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">
                      {item.user?.name}
                    </h3>
                    <p className="text-xs text-slate-500">Completed Interview</p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 bg-green-100 text-green-700 rounded-full">
                  <CheckCircle2 className="w-3 h-3" />
                  Completed
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-600" />
                  <span className="text-sm">
                    {new Date(item.date).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-indigo-600" />
                  <span className="text-sm">{item.time}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-indigo-600" />
                  <span className="text-sm">{item.duration}</span>
                </div>
              </div>

              {item.message && (
                <div className="bg-slate-50 p-4 rounded-lg mb-3">
                  <p className="text-sm text-slate-700">{item.message}</p>
                </div>
              )}

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <MessageSquare className="w-4 h-4 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-green-700 mb-1">
                      Feedback
                    </p>
                    <p className="text-sm text-slate-700">{item.feedback}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InterviewHistoryPage;
