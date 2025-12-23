// pages/RequestInterview.jsx
import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";

const RequestInterview = () => {
  const { mentorId } = useParams();
  const userId = new URLSearchParams(useLocation().search).get("user");

  const [formData, setFormData] = useState({
    date: "",
    day: "",
    time: "",
    duration: "",
    message: "",
    additionalDetails: "",
  });

  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/request-interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, mentorId, userId }),
      });
      const data = await res.json();
      if (data.success) setSuccessMsg("✅ Interview request sent successfully!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Request Interview</h2>
      {successMsg ? <p>{successMsg}</p> : (
        <form onSubmit={handleSubmit}>
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />
          <input type="text" name="day" value={formData.day} onChange={handleChange} placeholder="Day (e.g. Monday)" required />
          <input type="time" name="time" value={formData.time} onChange={handleChange} required />
          <input type="text" name="duration" value={formData.duration} onChange={handleChange} placeholder="Duration (e.g. 45 mins)" required />
          <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Write a convincing message..." required></textarea>
          <textarea name="additionalDetails" value={formData.additionalDetails} onChange={handleChange} placeholder="Additional details (optional)"></textarea>
          <button type="submit">Send Request</button>
        </form>
      )}
    </div>
  );
};

export default RequestInterview;
