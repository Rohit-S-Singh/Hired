// Profile.jsx
import React, { useEffect, useState, useRef } from "react";
import { useGlobalContext } from "./GlobalContext";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaGraduationCap,
  FaBriefcase,
  FaMapMarkerAlt,
  FaCode,
  FaGithub,
  FaLinkedin,
  FaGlobe,
  FaEdit,
  FaCheckCircle,
  FaClock,
  FaAward,
  FaChartLine,
  FaBuilding,
  FaDollarSign,
  FaCalendar,
  FaLaptop,
} from "react-icons/fa";

const REACT_APP_BACKEND_BASE_URL =
  process.env.REACT_APP_BACKEND_BASE_URL || "http://localhost:8080";

const Profile = () => {
  const { user } = useGlobalContext();
  const navigate = useNavigate();

  const inputResumeRef = useRef(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeUrl, setResumeUrl] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  const [recruiterState, setRecruiterState] = useState("not");
  const [isBecomingRecruiter, setIsBecomingRecruiter] = useState(false);
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

  const getToken = () => localStorage.getItem("jwtToken");

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

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!user?.email) return;

      try {
        const res = await axios.get(
          `${REACT_APP_BACKEND_BASE_URL}/api/get-user-details/${encodeURIComponent(
            user.email
          )}`
        );

        if (res.data.success) {
          const u = res.data.user;

          if (u.mentorStatus === "Pending") {
            setMentorState("pending");
          } else if (u.mentorStatus === "You Are A Mentor") {
            setMentorState("approved");
          } else {
            setMentorState("not");
          }

          if (u.recruiterStatus === "Pending") {
            setRecruiterState("pending");
          } else if (u.recruiterStatus === "You Are A Recruiter") {
            setRecruiterState("approved");
          } else {
            setRecruiterState("not");
          }
        }
      } catch (err) {
        console.error("Error fetching user details:", err);
      }
    };

    fetchUserDetails();
  }, [user?.email]);

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

  const handleMentorRequest = async () => {
    const token = getToken();
    if (!token) {
      toast.error("Please login first!");
      return;
    }

    try {
      setMentorLoading(true);
      const res = await axios.post(
        `${REACT_APP_BACKEND_BASE_URL}/api/mentors/request-mentor/${encodeURIComponent(
          user?.email
        )}`,
        mentorData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        toast.success("Mentor request submitted!");
        setMentorState("pending");
      } else {
        toast.error(res.data.message || "Request failed.");
      }
    } catch (err) {
      console.error("Mentor request error:", err);
      toast.error("Something went wrong.");
    } finally {
      setMentorLoading(false);
    }
  };

  const handleRecruiterRequest = async () => {
    const token = getToken();
    if (!token) {
      toast.error("Please login first!");
      return;
    }

    try {
      setIsBecomingRecruiter(true);
      const res = await axios.post(
        `${REACT_APP_BACKEND_BASE_URL}/api/recruiters/request-recruiter/${encodeURIComponent(
          user?.email
        )}`,
        recruiterForm,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        toast.success("Recruiter request submitted!");
        setRecruiterState("pending");
      } else {
        toast.error(res.data.message || "Request failed.");
      }
    } catch (err) {
      console.error("Recruiter request error:", err);
      toast.error("Something went wrong.");
    } finally {
      setIsBecomingRecruiter(false);
    }
  };

  // Render helpers
  const InfoCard = ({ icon: Icon, label, value, link }) => {
    if (!value || value === "") return null;
    
    return (
      <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
        <Icon className="text-indigo-600 mt-1 flex-shrink-0" size={18} />
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-500 mb-1">{label}</p>
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-indigo-600 hover:underline break-all"
            >
              {value}
            </a>
          ) : (
            <p className="text-sm font-medium text-gray-900 break-words">{value}</p>
          )}
        </div>
      </div>
    );
  };

  const SkillBadge = ({ skill }) => (
    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full">
      {skill}
    </span>
  );

  const SectionHeader = ({ icon: Icon, title }) => (
    <div className="flex items-center space-x-2 mb-4 pb-2 border-b-2 border-indigo-600">
      <Icon className="text-indigo-600" size={20} />
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    </div>
  );

  const StatusBadge = ({ type, state }) => {
    const config = {
      mentor: {
        approved: { bg: "bg-purple-100", text: "text-purple-700", label: "Mentor" },
        pending: { bg: "bg-yellow-100", text: "text-yellow-700", label: "Mentor (Pending)" },
      },
      recruiter: {
        approved: { bg: "bg-blue-100", text: "text-blue-700", label: "Recruiter" },
        pending: { bg: "bg-yellow-100", text: "text-yellow-700", label: "Recruiter (Pending)" },
      },
    };

    const badge = config[type]?.[state];
    if (!badge) return null;

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>
        {badge.label}
      </span>
    );
  };

  // Student Details Section
  const StudentDetailsSection = () => {
    const details = user?.studentDetails;
    if (!details) return null;

    return (
      <div className="space-y-6">
        {/* Academic Information */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <SectionHeader icon={FaGraduationCap} title="Academic Information" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <InfoCard icon={FaBuilding} label="College" value={details.college} />
            <InfoCard icon={FaGlobe} label="College Website" value={details.collegeWebsite} link={details.collegeWebsite} />
            <InfoCard icon={FaGraduationCap} label="University" value={details.university} />
            <InfoCard icon={FaAward} label="Degree" value={details.degree} />
            <InfoCard icon={FaCode} label="Branch" value={details.branch} />
            <InfoCard icon={FaCalendar} label="Current Year" value={details.year} />
            <InfoCard icon={FaCalendar} label="Graduation Year" value={details.graduationYear} />
          </div>
        </div>

        {/* Academic Performance */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <SectionHeader icon={FaChartLine} title="Academic Performance" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <InfoCard icon={FaAward} label="Current CGPA" value={details.currentCGPA} />
            <InfoCard icon={FaAward} label="10th Percentage" value={details.tenthPercentage} />
            <InfoCard icon={FaAward} label="12th Percentage" value={details.twelfthPercentage} />
          </div>
        </div>

        {/* Skills */}
        {details.skills && details.skills.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <SectionHeader icon={FaCode} title="Skills" />
            <div className="flex flex-wrap gap-2">
              {details.skills.map((skill, i) => (
                <SkillBadge key={i} skill={skill} />
              ))}
            </div>
          </div>
        )}

        {/* Links & Portfolio */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <SectionHeader icon={FaGlobe} title="Links & Portfolio" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <InfoCard icon={FaGlobe} label="Resume" value={details.resumeLink} link={details.resumeLink} />
            <InfoCard icon={FaGlobe} label="Portfolio" value={details.portfolioLink} link={details.portfolioLink} />
            <InfoCard icon={FaGithub} label="GitHub" value={details.github} link={details.github} />
            <InfoCard icon={FaCode} label="LeetCode" value={details.leetcode} link={details.leetcode} />
            <InfoCard icon={FaCode} label="Codeforces" value={details.codeforces} link={details.codeforces} />
          </div>
        </div>

        {/* Career Preferences */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <SectionHeader icon={FaBriefcase} title="Career Preferences" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <InfoCard icon={FaBriefcase} label="Career Interest" value={details.careerInterest} />
            <InfoCard icon={FaBriefcase} label="Preferred Job Role" value={details.preferredJobRole} />
          </div>
          {details.preferredLocations && details.preferredLocations.length > 0 && (
            <div className="mt-4">
              <p className="text-xs text-gray-500 mb-2">Preferred Locations</p>
              <div className="flex flex-wrap gap-2">
                {details.preferredLocations.map((loc, i) => (
                  <span key={i} className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full flex items-center">
                    <FaMapMarkerAlt className="mr-1" size={12} />
                    {loc}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Professional Details Section
  const ProfessionalDetailsSection = () => {
    const details = user?.professionalDetails;
    if (!details) return null;

    return (
      <div className="space-y-6">
        {/* Current Employment */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <SectionHeader icon={FaBuilding} title="Current Employment" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <InfoCard icon={FaBuilding} label="Company" value={details.company} />
            <InfoCard icon={FaGlobe} label="Company Website" value={details.companyWebsite} link={details.companyWebsite} />
            <InfoCard icon={FaBriefcase} label="Job Title" value={details.jobTitle} />
            <InfoCard icon={FaBuilding} label="Department" value={details.department} />
            <InfoCard icon={FaCalendar} label="Experience" value={details.experience} />
            <InfoCard icon={FaLaptop} label="Work Mode" value={details.workMode} />
            <InfoCard icon={FaChartLine} label="Career Level" value={details.careerLevel} />
          </div>
        </div>

        {/* Compensation */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <SectionHeader icon={FaDollarSign} title="Compensation & Notice Period" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <InfoCard icon={FaDollarSign} label="Current CTC" value={details.currentCTC} />
            <InfoCard icon={FaDollarSign} label="Expected CTC" value={details.expectedCTC} />
            <InfoCard icon={FaClock} label="Notice Period" value={details.noticePeriod} />
          </div>
        </div>

        {/* Skills */}
        {details.skills && details.skills.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <SectionHeader icon={FaCode} title="Skills" />
            <div className="flex flex-wrap gap-2">
              {details.skills.map((skill, i) => (
                <SkillBadge key={i} skill={skill} />
              ))}
            </div>
          </div>
        )}

        {/* Links & Portfolio */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <SectionHeader icon={FaGlobe} title="Links & Portfolio" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <InfoCard icon={FaGlobe} label="Resume" value={details.resumeLink} link={details.resumeLink} />
            <InfoCard icon={FaGlobe} label="Portfolio" value={details.portfolioLink} link={details.portfolioLink} />
            <InfoCard icon={FaGithub} label="GitHub" value={details.github} link={details.github} />
            <InfoCard icon={FaLinkedin} label="LinkedIn" value={details.linkedin} link={details.linkedin} />
          </div>
        </div>

        {/* Career Preferences */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <SectionHeader icon={FaBriefcase} title="Career Preferences" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <InfoCard icon={FaBriefcase} label="Preferred Job Role" value={details.preferredJobRole} />
          </div>
          {details.preferredLocations && details.preferredLocations.length > 0 && (
            <div className="mt-4">
              <p className="text-xs text-gray-500 mb-2">Preferred Locations</p>
              <div className="flex flex-wrap gap-2">
                {details.preferredLocations.map((loc, i) => (
                  <span key={i} className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full flex items-center">
                    <FaMapMarkerAlt className="mr-1" size={12} />
                    {loc}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Status Cards
  const StatusCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {/* Mentor Card */}
      <div className={`p-6 rounded-lg border-2 ${
        mentorState === "approved" ? "bg-purple-50 border-purple-200" :
        mentorState === "pending" ? "bg-yellow-50 border-yellow-200" :
        "bg-gray-50 border-gray-200"
      }`}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900">Mentor Status</h3>
          {mentorState === "approved" && <FaCheckCircle className="text-purple-600" size={20} />}
          {mentorState === "pending" && <FaClock className="text-yellow-600" size={20} />}
        </div>
        <p className="text-sm text-gray-600 mb-4">
          {mentorState === "approved" && "You're an active mentor. Guide students to success!"}
          {mentorState === "pending" && "Your mentor request is under review by admin."}
          {mentorState === "not" && "Share your knowledge and become a mentor."}
        </p>
        {mentorState === "not" && (
          <button
            onClick={handleMentorRequest}
            disabled={mentorLoading}
            className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition disabled:opacity-50"
          >
            {mentorLoading ? "Processing..." : "Become a Mentor"}
          </button>
        )}
      </div>

      {/* Recruiter Card */}
      <div className={`p-6 rounded-lg border-2 ${
        recruiterState === "approved" ? "bg-blue-50 border-blue-200" :
        recruiterState === "pending" ? "bg-yellow-50 border-yellow-200" :
        "bg-gray-50 border-gray-200"
      }`}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900">Recruiter Status</h3>
          {recruiterState === "approved" && <FaCheckCircle className="text-blue-600" size={20} />}
          {recruiterState === "pending" && <FaClock className="text-yellow-600" size={20} />}
        </div>
        <p className="text-sm text-gray-600 mb-4">
          {recruiterState === "approved" && "You can post jobs and manage candidates."}
          {recruiterState === "pending" && "Your recruiter request is under review by admin."}
          {recruiterState === "not" && "Post jobs and connect with top talent."}
        </p>
        {recruiterState === "not" && (
          <button
            onClick={handleRecruiterRequest}
            disabled={isBecomingRecruiter}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isBecomingRecruiter ? "Processing..." : "Become a Recruiter"}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />

      {/* Header Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <img
              src={
                user?.picture && user.picture.trim() !== ""
                  ? user.picture
                  : "https://ui-avatars.com/api/?name=User&background=random&size=200"
              }
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
            />
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center md:space-x-3 mb-2">
                <h1 className="text-3xl font-bold">{user?.name || "User"}</h1>
                <div className="flex justify-center md:justify-start space-x-2 mt-2 md:mt-0">
                  <StatusBadge type="mentor" state={mentorState} />
                  <StatusBadge type="recruiter" state={recruiterState} />
                </div>
              </div>
              <p className="text-indigo-100 mb-2">{user?.email}</p>
              {user?.userType && (
                <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm">
                  {user.userType === "student" ? "Student" : "Professional"}
                </span>
              )}
              <div className="mt-4">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  ref={inputResumeRef}
                  onChange={handleResumeChange}
                  className="hidden"
                />
                <button
                  onClick={triggerResumeInput}
                  className="bg-white text-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-50 transition font-medium"
                >
                  Upload Resume
                </button>
                {resumeFile && (
                  <p className="text-sm mt-2 text-indigo-100">{resumeFile.name}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatusCards />

        {/* Profile Details Based on User Type */}
        {user?.userType === "student" && <StudentDetailsSection />}
        {user?.userType === "professional" && <ProfessionalDetailsSection />}
        
        {!user?.userType && (
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
            <p className="text-gray-600">Please complete your profile to see detailed information.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;