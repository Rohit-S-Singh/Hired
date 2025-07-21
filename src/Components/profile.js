import React, { useState } from "react";
import { useGlobalContext } from "./GlobalContext";

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

  return (
    <div className="flex flex-col lg:flex-row p-6 gap-6 bg-gray-100 min-h-screen">
      {/* Left Section: Profile Picture and Basic Info */}
      <div className="lg:w-1/4 bg-white p-6 shadow-md rounded-md">
        <div className="flex flex-col items-center">
          <img
            src={user?.picture || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-32 h-32 rounded-full mb-4"
          />
          <h2 className="text-lg font-semibold">{profile.name}</h2>
          <p className="text-gray-600">{profile.title}</p>
        </div>
        <div className="mt-6">
          <h3 className="text-gray-600">Contact</h3>
          <p className="text-sm text-gray-600">Email: {profile.email}</p>
          <p className="text-sm text-gray-600">Phone: {profile.phone}</p>
        </div>
      </div>

      {/* Right Section: Education, Experience, Skills, Resume */}
      <div className="lg:w-3/4 bg-white p-6 shadow-md rounded-md">
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
