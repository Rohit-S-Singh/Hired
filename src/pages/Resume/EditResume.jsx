import React, { useState } from "react";
import { Save, User, Mail, Phone, MapPin, Briefcase, GraduationCap, Award, Plus, Trash2, ArrowLeft, X, Code } from "lucide-react";
import { useNavigate } from "react-router-dom";
const EditResume = ({ darkMode = false }) => {
  const navigate = useNavigate();
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "John Anderson",
    email: "john.anderson@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    title: "Software Engineer",
    summary: "Experienced software engineer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Passionate about building scalable applications and leading development teams."
  });

  const [experience, setExperience] = useState([
    {
      id: 1,
      position: "Senior Software Engineer",
      company: "Tech Corp",
      location: "San Francisco, CA",
      startDate: "2021-01",
      endDate: "",
      current: true,
      description: "Led development of microservices architecture serving 1M+ users. Mentored junior developers and implemented CI/CD pipelines."
    },
    {
      id: 2,
      position: "Software Engineer",
      company: "StartupXYZ",
      location: "San Francisco, CA",
      startDate: "2019-06",
      endDate: "2021-01",
      current: false,
      description: "Developed full-stack web applications using React and Node.js. Improved application performance by 40%."
    }
  ]);

  const [education, setEducation] = useState([
    {
      id: 1,
      degree: "Bachelor of Science in Computer Science",
      institution: "University of California",
      location: "Berkeley, CA",
      graduationDate: "2019-05"
    }
  ]);

  const [skills, setSkills] = useState([
    "JavaScript", "React", "Node.js", "Python", "AWS", "Docker", "MongoDB", "PostgreSQL"
  ]);

  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "E-Commerce Platform",
      description: "Built a full-stack e-commerce platform with React, Node.js, and MongoDB. Implemented payment integration, user authentication, and admin dashboard.",
      technologies: "React, Node.js, MongoDB, Stripe",
      link: "https://github.com/username/ecommerce"
    },
    {
      id: 2,
      name: "Task Management App",
      description: "Developed a real-time task management application with drag-and-drop functionality and team collaboration features.",
      technologies: "React, Firebase, Material-UI",
      link: "https://github.com/username/taskapp"
    }
  ]);

  const [newSkill, setNewSkill] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handlePersonalInfoChange = (field, value) => {
    setPersonalInfo({ ...personalInfo, [field]: value });
  };

  const handleExperienceChange = (id, field, value) => {
    setExperience(experience.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const addExperience = () => {
    setExperience([...experience, {
      id: Date.now(),
      position: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: ""
    }]);
  };

  const removeExperience = (id) => {
    setExperience(experience.filter(exp => exp.id !== id));
  };

  const handleEducationChange = (id, field, value) => {
    setEducation(education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const addEducation = () => {
    setEducation([...education, {
      id: Date.now(),
      degree: "",
      institution: "",
      location: "",
      graduationDate: ""
    }]);
  };

  const removeEducation = (id) => {
    setEducation(education.filter(edu => edu.id !== id));
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleProjectChange = (id, field, value) => {
    setProjects(projects.map(proj => 
      proj.id === id ? { ...proj, [field]: value } : proj
    ));
  };

  const addProject = () => {
    setProjects([...projects, {
      id: Date.now(),
      name: "",
      description: "",
      technologies: "",
      link: ""
    }]);
  };

  const removeProject = (id) => {
    setProjects(projects.filter(proj => proj.id !== id));
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1500);
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"} p-6`}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className={`text-3xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
              Edit Resume
            </h1>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Update your resume information
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={()=>navigate("/resume-LaTeXEditor")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                darkMode
                  ? "bg-gray-700 hover:bg-gray-600 text-white border border-gray-600"
                  : "bg-white hover:bg-gray-50 text-gray-900 border border-gray-300"
              }`}
            >
              <Code size={18} />
              Edit in LaTeX
            </button>
            <button
              onClick={handleSave}
              disabled={saving || saved}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                saved
                  ? "bg-green-600 text-white"
                  : saving
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {saving ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : saved ? (
                <>
                  <Save size={20} />
                  Saved!
                </>
              ) : (
                <>
                  <Save size={20} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>

        {/* Personal Information */}
        <div className={`${darkMode ? "bg-gray-800" : "bg-white"} p-6 rounded-xl shadow-sm mb-6`}>
          <h2 className={`text-xl font-bold mb-4 flex items-center gap-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
            <User size={24} />
            Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Full Name
              </label>
              <input
                type="text"
                value={personalInfo.fullName}
                onChange={(e) => handlePersonalInfoChange("fullName", e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                    : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Professional Title
              </label>
              <input
                type="text"
                value={personalInfo.title}
                onChange={(e) => handlePersonalInfoChange("title", e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                    : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Email
              </label>
              <input
                type="email"
                value={personalInfo.email}
                onChange={(e) => handlePersonalInfoChange("email", e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                    : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Phone
              </label>
              <input
                type="tel"
                value={personalInfo.phone}
                onChange={(e) => handlePersonalInfoChange("phone", e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                    : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
              />
            </div>
            <div className="md:col-span-2">
              <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Location
              </label>
              <input
                type="text"
                value={personalInfo.location}
                onChange={(e) => handlePersonalInfoChange("location", e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                    : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
              />
            </div>
            <div className="md:col-span-2">
              <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Professional Summary
              </label>
              <textarea
                value={personalInfo.summary}
                onChange={(e) => handlePersonalInfoChange("summary", e.target.value)}
                rows={4}
                className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                    : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
              />
            </div>
          </div>
        </div>

        {/* Work Experience */}
        <div className={`${darkMode ? "bg-gray-800" : "bg-white"} p-6 rounded-xl shadow-sm mb-6`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-xl font-bold flex items-center gap-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
              <Briefcase size={24} />
              Work Experience
            </h2>
            <button
              onClick={addExperience}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={18} />
              Add Experience
            </button>
          </div>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id} className={`p-4 rounded-lg border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"}`}>
                <div className="flex items-start justify-between mb-4">
                  <h3 className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                    Experience #{experience.indexOf(exp) + 1}
                  </h3>
                  <button
                    onClick={() => removeExperience(exp.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      darkMode ? "hover:bg-red-900 hover:bg-opacity-20 text-gray-400 hover:text-red-400" : "hover:bg-red-50 text-gray-600 hover:text-red-600"
                    }`}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Position
                    </label>
                    <input
                      type="text"
                      value={exp.position}
                      onChange={(e) => handleExperienceChange(exp.id, "position", e.target.value)}
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                        darkMode ? "bg-gray-600 border-gray-500 text-white" : "bg-white border-gray-300 text-gray-900"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Company
                    </label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => handleExperienceChange(exp.id, "company", e.target.value)}
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                        darkMode ? "bg-gray-600 border-gray-500 text-white" : "bg-white border-gray-300 text-gray-900"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Location
                    </label>
                    <input
                      type="text"
                      value={exp.location}
                      onChange={(e) => handleExperienceChange(exp.id, "location", e.target.value)}
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                        darkMode ? "bg-gray-600 border-gray-500 text-white" : "bg-white border-gray-300 text-gray-900"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Start Date
                    </label>
                    <input
                      type="month"
                      value={exp.startDate}
                      onChange={(e) => handleExperienceChange(exp.id, "startDate", e.target.value)}
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                        darkMode ? "bg-gray-600 border-gray-500 text-white" : "bg-white border-gray-300 text-gray-900"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                          End Date
                        </label>
                        <input
                          type="month"
                          value={exp.endDate}
                          onChange={(e) => handleExperienceChange(exp.id, "endDate", e.target.value)}
                          disabled={exp.current}
                          className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                            exp.current ? "opacity-50 cursor-not-allowed" : ""
                          } ${
                            darkMode ? "bg-gray-600 border-gray-500 text-white" : "bg-white border-gray-300 text-gray-900"
                          } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                        />
                      </div>
                      <div className="flex items-center pt-7">
                        <input
                          type="checkbox"
                          id={`current-${exp.id}`}
                          checked={exp.current}
                          onChange={(e) => handleExperienceChange(exp.id, "current", e.target.checked)}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <label htmlFor={`current-${exp.id}`} className={`ml-2 text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                          Current Position
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Description
                    </label>
                    <textarea
                      value={exp.description}
                      onChange={(e) => handleExperienceChange(exp.id, "description", e.target.value)}
                      rows={3}
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                        darkMode ? "bg-gray-600 border-gray-500 text-white" : "bg-white border-gray-300 text-gray-900"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className={`${darkMode ? "bg-gray-800" : "bg-white"} p-6 rounded-xl shadow-sm mb-6`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-xl font-bold flex items-center gap-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
              <GraduationCap size={24} />
              Education
            </h2>
            <button
              onClick={addEducation}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={18} />
              Add Education
            </button>
          </div>
          <div className="space-y-6">
            {education.map((edu) => (
              <div key={edu.id} className={`p-4 rounded-lg border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"}`}>
                <div className="flex items-start justify-between mb-4">
                  <h3 className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                    Education #{education.indexOf(edu) + 1}
                  </h3>
                  <button
                    onClick={() => removeEducation(edu.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      darkMode ? "hover:bg-red-900 hover:bg-opacity-20 text-gray-400 hover:text-red-400" : "hover:bg-red-50 text-gray-600 hover:text-red-600"
                    }`}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Degree
                    </label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => handleEducationChange(edu.id, "degree", e.target.value)}
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                        darkMode ? "bg-gray-600 border-gray-500 text-white" : "bg-white border-gray-300 text-gray-900"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Institution
                    </label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => handleEducationChange(edu.id, "institution", e.target.value)}
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                        darkMode ? "bg-gray-600 border-gray-500 text-white" : "bg-white border-gray-300 text-gray-900"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Location
                    </label>
                    <input
                      type="text"
                      value={edu.location}
                      onChange={(e) => handleEducationChange(edu.id, "location", e.target.value)}
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                        darkMode ? "bg-gray-600 border-gray-500 text-white" : "bg-white border-gray-300 text-gray-900"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Graduation Date
                    </label>
                    <input
                      type="month"
                      value={edu.graduationDate}
                      onChange={(e) => handleEducationChange(edu.id, "graduationDate", e.target.value)}
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                        darkMode ? "bg-gray-600 border-gray-500 text-white" : "bg-white border-gray-300 text-gray-900"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className={`${darkMode ? "bg-gray-800" : "bg-white"} p-6 rounded-xl shadow-sm mb-6`}>
          <h2 className={`text-xl font-bold mb-4 flex items-center gap-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
            <Award size={24} />
            Skills
          </h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {skills.map((skill, index) => (
              <span
                key={index}
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                  darkMode ? "bg-blue-500 bg-opacity-20 text-blue-400" : "bg-blue-100 text-blue-700"
                }`}
              >
                {skill}
                <button
                  onClick={() => removeSkill(index)}
                  className="hover:text-red-500 transition-colors"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addSkill()}
              placeholder="Add a skill..."
              className={`flex-1 px-4 py-2 rounded-lg border transition-colors ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                  : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
            />
            <button
              onClick={addSkill}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add
            </button>
          </div>
        </div>

        {/* Projects */}
        <div className={`${darkMode ? "bg-gray-800" : "bg-white"} p-6 rounded-xl shadow-sm mb-6`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-xl font-bold flex items-center gap-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
              <Code size={24} />
              Projects
            </h2>
            <button
              onClick={addProject}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={18} />
              Add Project
            </button>
          </div>
          <div className="space-y-6">
            {projects.map((project) => (
              <div key={project.id} className={`p-4 rounded-lg border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"}`}>
                <div className="flex items-start justify-between mb-4">
                  <h3 className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                    Project #{projects.indexOf(project) + 1}
                  </h3>
                  <button
                    onClick={() => removeProject(project.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      darkMode ? "hover:bg-red-900 hover:bg-opacity-20 text-gray-400 hover:text-red-400" : "hover:bg-red-50 text-gray-600 hover:text-red-600"
                    }`}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Project Name
                    </label>
                    <input
                      type="text"
                      value={project.name}
                      onChange={(e) => handleProjectChange(project.id, "name", e.target.value)}
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                        darkMode ? "bg-gray-600 border-gray-500 text-white" : "bg-white border-gray-300 text-gray-900"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Description
                    </label>
                    <textarea
                      value={project.description}
                      onChange={(e) => handleProjectChange(project.id, "description", e.target.value)}
                      rows={3}
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                        darkMode ? "bg-gray-600 border-gray-500 text-white" : "bg-white border-gray-300 text-gray-900"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Technologies Used
                    </label>
                    <input
                      type="text"
                      value={project.technologies}
                      onChange={(e) => handleProjectChange(project.id, "technologies", e.target.value)}
                      placeholder="e.g., React, Node.js, MongoDB"
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                        darkMode ? "bg-gray-600 border-gray-500 text-white" : "bg-white border-gray-300 text-gray-900"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Project Link (GitHub, Demo, etc.)
                    </label>
                    <input
                      type="url"
                      value={project.link}
                      onChange={(e) => handleProjectChange(project.id, "link", e.target.value)}
                      placeholder="https://github.com/username/project"
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                        darkMode ? "bg-gray-600 border-gray-500 text-white" : "bg-white border-gray-300 text-gray-900"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Save Button (Bottom) */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving || saved}
            className={`flex items-center gap-2 px-8 py-3 rounded-lg font-medium transition-colors ${
              saved
                ? "bg-green-600 text-white"
                : saving
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {saving ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving...
              </>
            ) : saved ? (
              <>
                <Save size={20} />
                Saved!
              </>
            ) : (
              <>
                <Save size={20} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditResume;