// Profile.jsx
import React, { useEffect, useState, useRef } from "react";
import { useGlobalContext } from "./GlobalContext";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const REACT_APP_BACKEND_BASE_URL =
  process.env.REACT_APP_BACKEND_BASE_URL || "http://localhost:8080";

const Profile = () => {
  const { user } = useGlobalContext(); // ⬅️ get user from global context
  const navigate = useNavigate();

  // Resume
  const inputResumeRef = useRef(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeUrl, setResumeUrl] = useState(null);

  // Recruiter / Mentor state
  const [recruiterState, setRecruiterState] = useState("not");
  const [isBecomingRecruiter, setIsBecomingRecruiter] = useState(false);
  const [showRecruiterModal, setShowRecruiterModal] = useState(false);
  const [recruiterForm, setRecruiterForm] = useState({
    companyName: "",
    position: "",
    experienceYears: "",
    website: "",
  });

  const [mentorState, setMentorState] = useState("not");
  const [mentorData, setMentorData] = useState({
    expertise: "",
    experienceYears: "",
    linkedIn: "",
    availability: "",
    description: "",
  });
  const [mentorLoading, setMentorLoading] = useState(false);
  const [showMentorModal, setShowMentorModal] = useState(false);

  const getToken = () => localStorage.getItem("jwtToken");

  // Verify token on mount
  useEffect(() => {
    const verifyToken = async () => {
      const token = getToken();
      if (!token) {
        toast.error("Please login first!");
        navigate("/login");
        return;
      }
      try {
        const res = await axios.post(
          `${REACT_APP_BACKEND_BASE_URL}/api/verifyToken`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res?.data?.success) {
          toast.error("Session expired. Please login again.");
          localStorage.removeItem("jwtToken");
          navigate("/login");
        }
      } catch (err) {
        console.error("verifyToken error:", err);
        localStorage.removeItem("jwtToken");
        navigate("/login");
      }
    };
    verifyToken();
  }, [navigate]);

  // Resume upload
  const triggerResumeInput = () => inputResumeRef.current?.click();
  const handleResumeChange = async (e) => {
    const token = getToken();
    const file = e.target.files[0];
    if (!file) return;
    setResumeFile(file);
    try {
      const form = new FormData();
      form.append("resume", file);
      const res = await axios.post(
        `${REACT_APP_BACKEND_BASE_URL}/user/upload-resume`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200 && res.data?.url) {
        setResumeUrl(res.data.url);
        toast.success("Resume uploaded successfully.");
      } else toast.error("Resume upload failed.");
    } catch (err) {
      console.error("resume upload error:", err);
      toast.error("Resume upload failed.");
    }
  };

  // Helper for displaying detail
  const getDetail = (label, value) => (
    <p className="text-sm text-gray-700">
      <span className="font-medium">{label}: </span>
      {value && value.toString().trim() !== "" ? value : "Not available"}
    </p>
  );

  // -------------------- UI Boxes --------------------
  const BecomeMentorBox = () => (
    <div className="mb-6 p-6 bg-purple-50 border border-purple-200 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Become a Mentor</h3>
      <p className="text-gray-600 mb-3 text-sm">
        Share your knowledge with others and guide their careers.
      </p>
      <button
        onClick={() => setShowMentorModal(true)}
        className="bg-purple-600 text-white px-5 py-2 rounded-md hover:bg-purple-700 transition"
      >
        Become a Mentor
      </button>
    </div>
  );

  const MentorPendingBox = () => (
    <div className="mb-6 p-6 bg-yellow-50 border border-yellow-300 rounded-lg">
      <h3 className="text-lg font-semibold mb-2 text-yellow-700">
        Mentor Request Pending
      </h3>
      <p className="text-gray-600 text-sm">
        Your request to become a mentor is under review by admin.
      </p>
    </div>
  );

  const MentorApprovedBox = () => (
    <div className="mb-6 p-6 bg-green-50 border border-green-300 rounded-lg">
      <h3 className="text-lg font-semibold mb-2 text-green-700">
        You Are a Mentor 🎉
      </h3>
      <p className="text-gray-600 text-sm">
        Thank you for joining as a mentor! Start guiding students now.
      </p>
    </div>
  );

  const RecruiterNotBox = () => (
    <div className="mb-6 p-6 bg-blue-50 border border-blue-200 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Become a Recruiter</h3>
      <p className="text-gray-600 mb-3 text-sm">
        Post jobs and manage candidates easily.
      </p>
      <button
        onClick={() => setShowRecruiterModal(true)}
        disabled={isBecomingRecruiter}
        className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
      >
        {isBecomingRecruiter ? "Processing..." : "Become Recruiter"}
      </button>
    </div>
  );

  const RecruiterPendingBox = () => (
    <div className="mb-6 p-6 bg-yellow-50 border border-yellow-300 rounded-lg">
      <h3 className="text-lg font-semibold mb-2 text-yellow-700">
        Recruiter Request Pending
      </h3>
      <p className="text-gray-600 text-sm">
        Your request to become a recruiter is under review by admin.
      </p>
    </div>
  );

  const RecruiterApprovedBox = () => (
    <div className="mb-6 p-6 bg-green-50 border border-green-300 rounded-lg">
      <h3 className="text-lg font-semibold mb-2 text-green-700">
        You Are a Recruiter 🎉
      </h3>
      <p className="text-gray-600 text-sm">
        You can now post jobs and access recruiter tools.
      </p>
    </div>
  );

  // Skills container (like Mentor/Recruiter)
  const SkillsBox = () => (
    <div className="mb-6 p-6 bg-gray-50 border border-gray-200 rounded-lg">
      <h3 className="text-lg font-semibold mb-2 text-gray-700">Skills</h3>
      {Array.isArray(user?.skills) && user.skills.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {user.skills.map((skill, i) => (
            <span
              key={i}
              className="bg-gray-200 px-3 py-1 text-sm rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-sm">Skills are not available</p>
      )}
    </div>
  );

  // -------------------- Render --------------------
  return (
    <div className="flex flex-col lg:flex-row p-6 gap-6 bg-gray-100 min-h-screen">
      <Toaster />

      {/* Left Section */}
      <div className="lg:w-1/4 bg-white p-6 shadow-md rounded-md relative">
        <div className="flex flex-col items-center">
          <img
            src={
              user?.picture && user.picture.trim() !== ""
                ? user.picture
                : "https://ui-avatars.com/api/?name=User&background=random"
            }
            alt="Profile"
            className="w-32 h-32 rounded-full mb-4"
          />
          <h2 className="text-lg font-semibold">
            {user?.name || "Not available"}
          </h2>
          <p className="text-gray-600">{user?.title || "Not available"}</p>

          {recruiterState === "approved" && (
            <span className="mt-2 px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
              Recruiter
            </span>
          )}
          {mentorState === "approved" && (
            <span className="mt-2 px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
              Mentor
            </span>
          )}
        </div>

        <div className="mt-6 space-y-1">
          <h3 className="text-gray-700 font-semibold mb-2">Contact Details</h3>
          {getDetail("Email", user?.email)}
          {getDetail("Phone Number", user?.phone)}
          {getDetail("Address", user?.address)}
        </div>

        <div className="mt-6 space-y-1">
          <h3 className="text-gray-700 font-semibold mb-2">Other Details</h3>
          {getDetail("Username", user?.username)}
          {getDetail("Gender", user?.gender)}
          {getDetail("Date of Birth", user?.dob)}
        </div>

        {/* Resume upload */}
        <div className="absolute left-6 bottom-10">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            ref={inputResumeRef}
            onChange={handleResumeChange}
            className="hidden"
          />
          <button
            onClick={triggerResumeInput}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Upload Resume
          </button>

          <div className="mt-3">
            {resumeFile && (
              <p className="text-sm text-gray-600">{resumeFile.name}</p>
            )}
            {!resumeFile && resumeUrl && (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-blue-600 underline"
              >
                View Resume
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="lg:w-3/4 bg-white p-6 shadow-md rounded-md">
        {/* Recruiter */}
        {recruiterState === "not" && <RecruiterNotBox />}
        {recruiterState === "pending" && <RecruiterPendingBox />}
        {recruiterState === "approved" && <RecruiterApprovedBox />}

        {/* Mentor */}
        {mentorState === "not" && <BecomeMentorBox />}
        {mentorState === "pending" && <MentorPendingBox />}
        {mentorState === "approved" && <MentorApprovedBox />}

        {/* Skills Container */}
        <SkillsBox />
      </div>
    </div>
  );
};

export default Profile;
