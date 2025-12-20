// Profile.jsx
import React, { useEffect, useState, useRef } from "react";
import { useGlobalContext } from "../pages/AUTH/GlobalContext";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import {
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

const BASE_URL =
  process.env.REACT_APP_BACKEND_BASE_URL || "http://localhost:8080";

const Profile = () => {
  const { user, loading } = useGlobalContext();

  // ---------------- STATES ----------------
  const inputResumeRef = useRef(null);
  const [resumeFile, setResumeFile] = useState(null);

  const [mentorState, setMentorState] = useState("not");
  const [mentorLoading, setMentorLoading] = useState(false);

  const [recruiterState, setRecruiterState] = useState("not");
  const [isBecomingRecruiter, setIsBecomingRecruiter] = useState(false);

  const [mentorData, setMentorData] = useState({
    expertise: "",
    experienceYears: "",
    linkedIn: "",
    availability: "",
    description: "",
  });

  const [recruiterForm, setRecruiterForm] = useState({
    companyName: "",
    position: "",
    experienceYears: "",
    website: "",
  });

  // ---------------- EFFECTS (ALWAYS RUN) ----------------
  useEffect(() => {
    if (!user?.email) return;

    const fetchUserDetails = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/get-user-details/${encodeURIComponent(user.email)}`
        );

        if (res.data.success) {
          const u = res.data.user;

          setMentorState(
            u.mentorStatus === "You Are A Mentor"
              ? "approved"
              : u.mentorStatus === "Pending"
              ? "pending"
              : "not"
          );

          setRecruiterState(
            u.recruiterStatus === "You Are A Recruiter"
              ? "approved"
              : u.recruiterStatus === "Pending"
              ? "pending"
              : "not"
          );
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
      }
    };

    fetchUserDetails();
  }, [user?.email]);

  // ---------------- ACTIONS ----------------
  const triggerResumeInput = () => inputResumeRef.current?.click();

  const handleResumeChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setResumeFile(file);

    try {
      const form = new FormData();
      form.append("resume", file);

      await axios.post(`${BASE_URL}/api/resume/upload`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Resume uploaded successfully");
    } catch {
      toast.error("Resume upload failed");
    }
  };

  const handleMentorRequest = async () => {
    try {
      setMentorLoading(true);
      const res = await axios.post(
        `${BASE_URL}/api/mentors/request-mentor/${encodeURIComponent(
          user.email
        )}`,
        mentorData
      );

      if (res.data.success) {
        toast.success("Mentor request submitted");
        setMentorState("pending");
      }
    } catch {
      toast.error("Mentor request failed");
    } finally {
      setMentorLoading(false);
    }
  };

  const handleRecruiterRequest = async () => {
    try {
      setIsBecomingRecruiter(true);
      const res = await axios.post(
        `${BASE_URL}/api/recruiters/request-recruiter/${encodeURIComponent(
          user.email
        )}`,
        recruiterForm
      );

      if (res.data.success) {
        toast.success("Recruiter request submitted");
        setRecruiterState("pending");
      }
    } catch {
      toast.error("Recruiter request failed");
    } finally {
      setIsBecomingRecruiter(false);
    }
  };

  // ---------------- UI HELPERS ----------------
  const Badge = ({ text, color }) => (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${color}`}>
      {text}
    </span>
  );

  // ---------------- RENDER ----------------
  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />

      {/* ✅ LOADING HANDLED INSIDE JSX (NO HOOK VIOLATION) */}
      {loading && (
        <div className="h-screen flex items-center justify-center">
          <p className="text-gray-600">Loading profile...</p>
        </div>
      )}

      {!loading && user && (
        <>
          {/* HEADER */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <div className="max-w-7xl mx-auto px-6 py-8 flex gap-6 items-center">
              <img
                src={
                  user.picture ||
                  "https://ui-avatars.com/api/?name=User&background=random"
                }
                className="w-28 h-28 rounded-full border-4 border-white"
                alt="profile"
              />

              <div>
                <h1 className="text-3xl font-bold">
                  {user.name || "User"}
                </h1>
                <p className="text-indigo-100">{user.email}</p>

                <div className="flex gap-2 mt-2">
                  {mentorState === "approved" && (
                    <Badge
                      text="Mentor"
                      color="bg-purple-100 text-purple-700"
                    />
                  )}
                  {mentorState === "pending" && (
                    <Badge
                      text="Mentor (Pending)"
                      color="bg-yellow-100 text-yellow-700"
                    />
                  )}
                  {recruiterState === "approved" && (
                    <Badge
                      text="Recruiter"
                      color="bg-blue-100 text-blue-700"
                    />
                  )}
                  {recruiterState === "pending" && (
                    <Badge
                      text="Recruiter (Pending)"
                      color="bg-yellow-100 text-yellow-700"
                    />
                  )}
                </div>

                <div className="mt-4">
                  <input
                    type="file"
                    ref={inputResumeRef}
                    hidden
                    onChange={handleResumeChange}
                  />
                  <button
                    onClick={triggerResumeInput}
                    className="bg-white text-indigo-600 px-4 py-2 rounded-md font-medium"
                  >
                    Upload Resume
                  </button>
                  {resumeFile && (
                    <p className="text-sm text-indigo-100 mt-2">
                      {resumeFile.name}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ACTION CARDS */}
          <div className="max-w-7xl mx-auto px-6 py-8 grid md:grid-cols-2 gap-6">
            {/* Mentor */}
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                Mentor Status
                {mentorState === "approved" && (
                  <FaCheckCircle className="text-purple-600" />
                )}
                {mentorState === "pending" && (
                  <FaClock className="text-yellow-600" />
                )}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {mentorState === "not"
                  ? "Share your experience and guide students."
                  : mentorState === "pending"
                  ? "Mentor request is under review."
                  : "You are an active mentor."}
              </p>
              {mentorState === "not" && (
                <button
                  onClick={handleMentorRequest}
                  disabled={mentorLoading}
                  className="bg-purple-600 text-white px-4 py-2 rounded-md"
                >
                  {mentorLoading ? "Processing..." : "Become a Mentor"}
                </button>
              )}
            </div>

            {/* Recruiter */}
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                Recruiter Status
                {recruiterState === "approved" && (
                  <FaCheckCircle className="text-blue-600" />
                )}
                {recruiterState === "pending" && (
                  <FaClock className="text-yellow-600" />
                )}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {recruiterState === "not"
                  ? "Post jobs and hire candidates."
                  : recruiterState === "pending"
                  ? "Recruiter request is under review."
                  : "You are a recruiter."}
              </p>
              {recruiterState === "not" && (
                <button
                  onClick={handleRecruiterRequest}
                  disabled={isBecomingRecruiter}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  {isBecomingRecruiter
                    ? "Processing..."
                    : "Become a Recruiter"}
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
