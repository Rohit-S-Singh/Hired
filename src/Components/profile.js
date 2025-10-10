import React, { useState } from "react";
import { useGlobalContext } from "./GlobalContext";
import toast, { Toaster } from "react-hot-toast";

const Profile = () => {
  const { user } = useGlobalContext();

  const [profile, setProfile] = useState({
    name: "Rohit Shekhar Singh",
    email: "rohitsheksingh@gmail.com",
    phone: "919334545804",
    title: "Working Professional",
  });

  const [education, setEducation] = useState([
    {
      degree: "Bachelors of Technology, Information Technology",
      institute: "Jaypee Institute Of Information Technology",
      year: 2023,
      grade: "7/10",
    },
  ]);

  const [experience, setExperience] = useState([
    {
      title: "Software Engineer",
      company: "Oriserve",
      type: "Full-time",
      startDate: "FEB 2023",
      endDate: "MAY 2024",
    },
  ]);

  const [skills, setSkills] = useState(["React", "Node.js", "Tailwind CSS"]);
  const [resume, setResume] = useState(null);
  const [isRecruiter, setIsRecruiter] = useState(false);
  const [isBecomingRecruiter, setIsBecomingRecruiter] = useState(false);

  // Mentor-related states
  const [isMentor, setIsMentor] = useState(false);
  const [isBecomingMentor, setIsBecomingMentor] = useState(false);
  const [showMentorModal, setShowMentorModal] = useState(false);
  const [mentorData, setMentorData] = useState({
    expertise: "",
    experienceYears: "",
    description: "",
    linkedIn: "",
    availability: "",
  });

  // Resume Upload
  const handleResumeUpload = (event) => {
    setResume(event.target.files[0]);
  };

  // Recruiter API Call
  const handleBecomeRecruiter = async () => {
    try {
      setIsBecomingRecruiter(true);
      const token =
        localStorage.getItem("token") ||
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NzNiZDdhM2NlZDM1YWQxMmViMzIxNSIsImVtYWlsIjoicm9oaXRzaGVrcnNpbmdoQGdtYWlsLmNvbSIsImlhdCI6MTc1NjY2OTI5MSwiZXhwIjoxNzU2NzU1NjkxfQ.CTKv8JZig2-hGCOZxRAhoi79mKC4VmZHsw83CVuS7cU";

      const response = await fetch(
        "http://localhost:8080/api/recruiters/mark-as-recruiter",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({}),
        }
      );

      const result = await response.json();
      if (response.ok && result.success) {
        setIsRecruiter(true);
        toast.success("Successfully became a recruiter!");
      } else {
        toast.error(result.message || "Failed to become a recruiter");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsBecomingRecruiter(false);
    }
  };

  // Mentor API Call
  const handleBecomeMentor = async () => {
    const token = localStorage.getItem("token");
    if (!token) return toast.error("You must be logged in");

    if (!mentorData.expertise || !mentorData.experienceYears) {
      return toast.error("Please fill all required fields");
    }

    try {
      setIsBecomingMentor(true);
      const userId = user?._id || "6873bd7a3ced35ad12eb3215"; // fallback ID

      const response = await fetch(
        `http://localhost:8080/api/mentors/become-mentor/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(mentorData),
        }
      );

      const result = await response.json();

      if (response.ok && result.success) {
        setIsMentor(true);
        setShowMentorModal(false);
        toast.success("You are now a mentor!");
      } else {
        toast.error(result.message || "Failed to become mentor");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsBecomingMentor(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row p-6 gap-6 bg-gray-100 min-h-screen">
      <Toaster />

      {/* Left Section */}
      <div className="lg:w-1/4 bg-white p-6 shadow-md rounded-md">
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
          <h2 className="text-lg font-semibold">{profile.name}</h2>
          <p className="text-gray-600">{profile.title}</p>

          {/* Badges */}
          {isRecruiter && (
            <span className="mt-2 px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
              Recruiter
            </span>
          )}
          {isMentor && (
            <span className="mt-2 px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
              Mentor
            </span>
          )}
        </div>

        <div className="mt-6">
          <h3 className="text-gray-600">Contact</h3>
          <p className="text-sm text-gray-600">Email: {profile.email}</p>
          <p className="text-sm text-gray-600">Phone: {profile.phone}</p>
        </div>
      </div>

      {/* Right Section */}
      <div className="lg:w-3/4 bg-white p-6 shadow-md rounded-md">
        {/* Recruiter Section */}
        {!isRecruiter && (
          <div className="mb-6 p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Become a Recruiter</h3>
            <p className="text-gray-600 mb-3 text-sm">
              Post jobs and manage candidates easily.
            </p>
            <button
              onClick={handleBecomeRecruiter}
              disabled={isBecomingRecruiter}
              className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
            >
              {isBecomingRecruiter ? "Processing..." : "Become Recruiter"}
            </button>
          </div>
        )}

        {/* Mentor Section */}
        {!isMentor && (
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
        )}

        {/* Education & Skills */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Education</h3>
          {education.map((edu, i) => (
            <div key={i} className="mt-2">
              <p className="font-semibold">{edu.degree}</p>
              <p className="text-sm text-gray-600">{edu.institute}</p>
              <p className="text-sm text-gray-600">
                {edu.year} | {edu.grade}
              </p>
            </div>
          ))}
        </div>

        <hr className="my-4" />

        <div className="mb-6">
          <h3 className="text-lg font-semibold">Skills</h3>
          <div className="mt-2">
            {skills.map((skill, i) => (
              <span
                key={i}
                className="inline-block bg-gray-200 px-3 py-1 text-sm rounded-full mr-2 mb-2"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Mentor Modal */}
      {showMentorModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-sm transition-all">
          <div className="bg-white p-6 rounded-xl w-96 shadow-xl transform transition-all">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
              Become a Mentor
            </h2>

            <label className="block text-sm mb-1 text-gray-600">
              Area of Expertise *
            </label>
            <input
              type="text"
              value={mentorData.expertise}
              onChange={(e) =>
                setMentorData({ ...mentorData, expertise: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md p-2 mb-3"
              placeholder="e.g., Web Development"
            />

            <label className="block text-sm mb-1 text-gray-600">
              Years of Experience *
            </label>
            <input
              type="number"
              value={mentorData.experienceYears}
              onChange={(e) =>
                setMentorData({ ...mentorData, experienceYears: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md p-2 mb-3"
              placeholder="e.g., 3"
            />

            <label className="block text-sm mb-1 text-gray-600">
              LinkedIn Profile
            </label>
            <input
              type="url"
              value={mentorData.linkedIn}
              onChange={(e) =>
                setMentorData({ ...mentorData, linkedIn: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md p-2 mb-3"
              placeholder="https://linkedin.com/in/yourprofile"
            />

            <label className="block text-sm mb-1 text-gray-600">
              Availability
            </label>
            <input
              type="text"
              value={mentorData.availability}
              onChange={(e) =>
                setMentorData({ ...mentorData, availability: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md p-2 mb-3"
              placeholder="e.g., Weekends, Evenings"
            />

            <label className="block text-sm mb-1 text-gray-600">
              Short Description
            </label>
            <textarea
              value={mentorData.description}
              onChange={(e) =>
                setMentorData({ ...mentorData, description: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md p-2 mb-4"
              placeholder="Tell us about your mentoring experience..."
            ></textarea>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowMentorModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleBecomeMentor}
                disabled={isBecomingMentor}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 flex items-center justify-center min-w-[100px]"
              >
                {isBecomingMentor ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
