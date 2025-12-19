import React, { useState } from 'react';
import { User, MapPin, Mail, Phone, Linkedin, Github, Briefcase, GraduationCap, Award, Calendar, UserPlus, Clock, Check } from 'lucide-react';

const Profilepage_search = () => {
  const [connectionStatus, setConnectionStatus] = useState('not_connected'); // 'not_connected', 'pending', 'connected'

  const handleConnectionClick = () => {
    if (connectionStatus === 'not_connected') {
      setConnectionStatus('pending');
    }
  };

  const profile = {
    name: "Rahul Sharma",
    avatar: "RS",
    title: "Full Stack Developer",
    location: "Delhi, India",
    experience: "3 years",
    joinedDate: "January 2021",
    education: "B.Tech in Computer Science",
    university: "Indian Institute of Technology, Delhi",
    graduationYear: "2020",
    skills: ["React", "Node.js", "MongoDB", "AWS", "Docker", "JavaScript", "TypeScript", "Express.js", "PostgreSQL", "Git"],
    bio: "Passionate full stack developer with experience in building scalable web applications. Specialized in MERN stack and cloud technologies. Love solving complex problems and creating elegant solutions.",
    email: "rahul.sharma@email.com",
    phone: "+91 98765 43210",
    linkedin: "linkedin.com/in/rahulsharma",
    github: "github.com/rahulsharma",
    experience_details: [
      {
        role: "Senior Software Engineer",
        company: "TechCorp Solutions",
        duration: "Jan 2023 - Present",
        description: "Leading development of cloud-based applications using React and Node.js. Mentoring junior developers and implementing best practices."
      },
      {
        role: "Software Developer",
        company: "StartupXYZ",
        duration: "Jan 2021 - Dec 2022",
        description: "Developed and maintained multiple web applications. Worked on microservices architecture and RESTful APIs."
      }
    ],
    projects: [
      {
        name: "E-commerce Platform",
        description: "Built a full-stack e-commerce platform with payment integration, real-time inventory management, and order tracking.",
        technologies: ["React", "Node.js", "MongoDB", "Stripe"]
      },
      {
        name: "Task Management System",
        description: "Developed a collaborative task management application with real-time updates using Socket.io.",
        technologies: ["React", "Express", "PostgreSQL", "Socket.io"]
      },
      {
        name: "Weather Dashboard",
        description: "Created a weather forecasting dashboard with interactive charts and location-based predictions.",
        technologies: ["React", "Chart.js", "Weather API"]
      }
    ],
    certifications: [
      "AWS Certified Developer - Associate",
      "MongoDB Certified Developer",
      "Google Cloud Professional"
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-4xl font-bold flex-shrink-0">
              {profile.avatar}
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-800">{profile.name}</h1>
              <p className="text-xl text-gray-600 mt-2">{profile.title}</p>
              <div className="flex flex-wrap gap-4 mt-4 text-gray-600">
                <span className="flex items-center gap-2">
                  <MapPin size={18} />
                  {profile.location}
                </span>
                <span className="flex items-center gap-2">
                  <Briefcase size={18} />
                  {profile.experience} experience
                </span>
                <span className="flex items-center gap-2">
                  <Calendar size={18} />
                  Joined {profile.joinedDate}
                </span>
              </div>
            </div>
            <div className="flex-shrink-0">
              {connectionStatus === 'not_connected' && (
                <button 
                  onClick={handleConnectionClick}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md flex items-center gap-2"
                >
                  <UserPlus size={20} />
                  Send Connection Request
                </button>
              )}
              {connectionStatus === 'pending' && (
                <button 
                  disabled
                  className="bg-yellow-100 text-yellow-700 px-6 py-3 rounded-lg font-semibold cursor-not-allowed shadow-md flex items-center gap-2"
                >
                  <Clock size={20} />
                  Request Pending
                </button>
              )}
              {connectionStatus === 'connected' && (
                <button 
                  disabled
                  className="bg-green-100 text-green-700 px-6 py-3 rounded-lg font-semibold cursor-not-allowed shadow-md flex items-center gap-2"
                >
                  <Check size={20} />
                  Connected
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <User size={24} />
                About
              </h2>
              <p className="text-gray-600 leading-relaxed">{profile.bio}</p>
            </div>

            {/* Experience Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Briefcase size={24} />
                Work Experience
              </h2>
              <div className="space-y-6">
                {profile.experience_details.map((exp, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <h3 className="text-lg font-semibold text-gray-800">{exp.role}</h3>
                    <p className="text-blue-600 font-medium">{exp.company}</p>
                    <p className="text-sm text-gray-500 mt-1">{exp.duration}</p>
                    <p className="text-gray-600 mt-2">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Award size={24} />
                Projects
              </h2>
              <div className="space-y-4">
                {profile.projects.map((project, index) => (
                  <div key={index} className="border-b border-gray-200 last:border-b-0 pb-4 last:pb-0">
                    <h3 className="text-lg font-semibold text-gray-800">{project.name}</h3>
                    <p className="text-gray-600 mt-2">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Mail size={18} className="text-blue-600 mt-1 flex-shrink-0" />
                  <a href={`mailto:${profile.email}`} className="text-gray-600 hover:text-blue-600 break-all">
                    {profile.email}
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={18} className="text-blue-600 mt-1 flex-shrink-0" />
                  <a href={`tel:${profile.phone}`} className="text-gray-600 hover:text-blue-600">
                    {profile.phone}
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <Linkedin size={18} className="text-blue-600 mt-1 flex-shrink-0" />
                  <a href={`https://${profile.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 break-all">
                    {profile.linkedin}
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <Github size={18} className="text-blue-600 mt-1 flex-shrink-0" />
                  <a href={`https://${profile.github}`} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 break-all">
                    {profile.github}
                  </a>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <GraduationCap size={24} />
                Education
              </h2>
              <div>
                <h3 className="font-semibold text-gray-800">{profile.education}</h3>
                <p className="text-gray-600 mt-1">{profile.university}</p>
                <p className="text-sm text-gray-500 mt-1">Graduated: {profile.graduationYear}</p>
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, i) => (
                  <span key={i} className="bg-indigo-100 text-indigo-700 px-3 py-2 rounded-lg text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Certifications</h2>
              <ul className="space-y-2">
                {profile.certifications.map((cert, i) => (
                  <li key={i} className="text-gray-600 flex items-start gap-2">
                    <span className="text-blue-600 mt-1">✓</span>
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {connectionStatus === 'not_connected' && (
                <button 
                  onClick={handleConnectionClick}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <UserPlus size={20} />
                  Send Connection Request
                </button>
              )}
              {connectionStatus === 'pending' && (
                <button 
                  disabled
                  className="w-full bg-yellow-100 text-yellow-700 py-3 rounded-lg font-semibold cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Clock size={20} />
                  Request Pending
                </button>
              )}
              {connectionStatus === 'connected' && (
                <button 
                  disabled
                  className="w-full bg-green-100 text-green-700 py-3 rounded-lg font-semibold cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Check size={20} />
                  Connected
                </button>
              )}
              <button className="w-full bg-white text-blue-600 border-2 border-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Download Resume
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profilepage_search;