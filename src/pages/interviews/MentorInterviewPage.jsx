import React, { useEffect, useState } from "react";
import axios from "axios";

const MentorInterviewPage = () => {
  const [requests, setRequests] = useState([]);

  const loadRequests = async () => {
    const token = localStorage.getItem("jwtToken");
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/api/interviews/pending`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setRequests(res.data.data);
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const accept = async (id) => {
    const token = localStorage.getItem("jwtToken");
    await axios.post(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/api/interviews/accept`,
      { interviewId: id },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    loadRequests();
  };

  const reject = async (id) => {
    const token = localStorage.getItem("jwtToken");
    await axios.post(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/api/interviews/reject`,
      { interviewId: id, reason: "Not available" },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    loadRequests();
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Interview Requests</h1>

      {requests.length === 0 && <p>No pending requests</p>}

      {requests.map((r) => (
        <div key={r._id} className="border p-4 rounded mb-3">
          <p className="font-semibold">{r.title}</p>
          <p className="text-sm text-gray-600">
            Candidate: {r.candidate.name}
          </p>

          <div className="mt-3 flex gap-2">
            <button
              onClick={() => accept(r._id)}
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              Accept
            </button>
            <button
              onClick={() => reject(r._id)}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MentorInterviewPage;
