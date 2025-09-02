import React, { useState } from "react";
import { useGlobalContext } from "./GlobalContext";
import toast, { Toaster } from 'react-hot-toast';

const Profile = () => {
  const { user } = useGlobalContext();
  // States for handling user data
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

  // Handlers for adding/updating sections (implement your own logic)
  const handleAddEducation = () => {
    // Logic to add education
  };

  const handleEditEducation = () => {
    // Logic to edit education
  };

  const handleAddExperience = () => {
    // Logic to add experience
  };

  const handleEditExperience = () => {
    // Logic to edit experience
  };

  const handleResumeUpload = (event) => {
    setResume(event.target.files[0]);
  };

  const handleBecomeRecruiter = async () => {
    try {
      setIsBecomingRecruiter(true);
      
      const token = localStorage.getItem('token') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NzNiZDdhM2NlZDM1YWQxMmViMzIxNSIsImVtYWlsIjoicm9oaXRzaGVrcnNpbmdoQGdtYWlsLmNvbSIsImlhdCI6MTc1NjY2OTI5MSwiZXhwIjoxNzU2NzU1NjkxfQ.CTKv8JZig2-hGCOZxRAhoi79mKC4VmZHsw83CVuS7cU';
      
      const response = await fetch('http://localhost:8080/api/recruiters/mark-as-recruiter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setIsRecruiter(true);
          toast.success('Successfully became a recruiter!');
        } else {
          toast.error(result.message || 'Failed to become a recruiter');
        }
      } else {
        toast.error('Failed to become a recruiter. Please try again.');
      }
    } catch (error) {
      console.error('Error becoming recruiter:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsBecomingRecruiter(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row p-6 gap-6 bg-gray-100 min-h-screen">
      <Toaster />
      
      {/* Left Section: Profile Picture and Basic Info */}
      <div className="lg:w-1/4 bg-white p-6 shadow-md rounded-md">
        <div className="flex flex-col items-center">
          <img
            src={user?.picture && typeof user.picture === 'string' && user.picture.trim() !== '' ? user.picture : 'https://ui-avatars.com/api/?name=User&background=random'}
            alt="Profile"
            className="w-32 h-32 rounded-full mb-4"
          />
          <h2 className="text-lg font-semibold">{profile.name}</h2>
          <p className="text-gray-600">{profile.title}</p>
          
          {/* Recruiter Status */}
          {isRecruiter && (
            <div className="mt-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Recruiter
              </span>
            </div>
          )}
        </div>
        <div className="mt-6">
          <h3 className="text-gray-600">Contact</h3>
          <p className="text-sm text-gray-600">Email: {profile.email}</p>
          <p className="text-sm text-gray-600">Phone: {profile.phone}</p>
        </div>
      </div>

      {/* Right Section: Education, Experience, Skills, Resume */}
      <div className="lg:w-3/4 bg-white p-6 shadow-md rounded-md">
        {/* Become Recruiter Section */}
        {!isRecruiter && (
          <div className="mb-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Become a Recruiter</h3>
                <p className="text-gray-600 text-sm">
                  Join our network of recruiters and help connect talented professionals with great opportunities.
                </p>
                <ul className="mt-3 text-sm text-gray-600 space-y-1">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Access to candidate profiles
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Post job opportunities
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Manage interview requests
                  </li>
                </ul>
              </div>
              <button
                onClick={handleBecomeRecruiter}
                disabled={isBecomingRecruiter}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isBecomingRecruiter ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Becoming Recruiter...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Become a Recruiter
                  </div>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Education Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Education</h3>
            <button
              className="text-blue-500 text-sm"
              onClick={handleAddEducation}
            >
              + Add Education
            </button>
          </div>
          {education.map((edu, index) => (
            <div key={index} className="mt-2 flex justify-between">
              <div>
                <p className="font-semibold">{edu.degree}</p>
                <p className="text-sm text-gray-600">{edu.institute}</p>
                <p className="text-sm text-gray-600">
                  {edu.year} | {edu.grade}
                </p>
              </div>
              <button
                className="text-blue-500 text-sm"
                onClick={handleEditEducation}
              >
                Edit
              </button>
            </div>
          ))}
        </div>

        <hr className="my-4" />

        {/* Work Experience Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Work Experience</h3>
            <button
              className="text-blue-500 text-sm"
              onClick={handleAddExperience}
            >
              + Add Work Experience
            </button>
          </div>
          {experience.map((exp, index) => (
            <div key={index} className="mt-2 flex justify-between">
              <div>
                <p className="font-semibold">{exp.title}</p>
                <p className="text-sm text-gray-600">
                  {exp.company} | {exp.type}
                </p>
                <p className="text-sm text-gray-600">
                  {exp.startDate} - {exp.endDate}
                </p>
              </div>
              <button
                className="text-blue-500 text-sm"
                onClick={handleEditExperience}
              >
                Edit
              </button>
            </div>
          ))}
        </div>

        <hr className="my-4" />

        {/* Skills Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Skills</h3>
            <button className="text-blue-500 text-sm">+ Add Skill</button>
          </div>
          <div className="mt-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="inline-block bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm mr-2 mb-2"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <hr className="my-4" />

        {/* Resume Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Resume</h3>
          <div className="mt-2 flex items-center">
            <input
              type="file"
              onChange={handleResumeUpload}
              className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md cursor-pointer bg-gray-50 focus:outline-none"
            />
            {resume && (
              <p className="ml-4 text-sm text-gray-600">
                Uploaded: {resume.name}
              </p>
            )}
          </div>
          <button className="mt-2 text-blue-500 text-sm">
            View Uploaded Resume
          </button>
        </div>

        <hr className="my-4" />
      </div>
    </div>
  );
};

export default Profile;
