import React, { useState } from 'react';
import { Briefcase, MapPin, Mail, Phone, Github, Linkedin, Globe, Code, ExternalLink, Building2, Calendar, Edit2, User, BookMarked, DollarSign, Target, Users, MessageSquare, Settings, Menu, X, Award, CheckCircle, Clock } from 'lucide-react';
import { useGlobalContext } from "../AUTH/GlobalContext";
import { useNavigate } from "react-router-dom";

const sidebarItems = [
  { name: 'Profile', url: '/profile', icon: User },
  { name: 'Edit Profile', url: '/edit-profile', icon: Edit2 },
  { name: 'View Scheduled Interviews', url: '/scheduled-interviews', icon: Calendar },
  { name: 'Saved Jobs', url: '/SavedJobs', icon: BookMarked },
  { name: 'Subscription', url: '/subscription', icon: Briefcase },
  { name: 'Account Balance', url: '/account-balance', icon: DollarSign },
  { name: 'Vision (Plan)', url: '/vision-plan', icon: Target },
  { name: 'Referrals', url: '/referrals', icon: Users },
  { name: 'Contact Us', url: '/contact-us', icon: MessageSquare },
  { name: 'Settings', url: '/settings', icon: Settings }
];

// Mentor Status Modal Component
const MentorStatusModal = ({ isOpen, onClose, mentorStatus, onBecomeMentor }) => {
  if (!isOpen) return null;

  const renderContent = () => {
    switch (mentorStatus) {
      case "None":
        return (
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Become a Mentor</h3>
            <p className="text-sm text-gray-600 mb-6">
              Share your expertise and help guide the next generation of professionals. Start your mentoring journey today.
            </p>
            <button
              onClick={onBecomeMentor}
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Apply to Become a Mentor
            </button>
          </div>
        );

      case "pending":
        return (
          <div className="text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Application Under Review</h3>
            <p className="text-sm text-gray-600 mb-4">
              Your mentor application is currently being reviewed by our team. We'll notify you once it's approved.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <p className="text-xs text-amber-800">
                <span className="font-medium">Review Time:</span> Usually takes 2-3 business days
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-full bg-gray-100 text-gray-700 py-2.5 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Got it
            </button>
          </div>
        );

      case "approved":
        return (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">You're a Mentor!</h3>
            <p className="text-sm text-gray-600 mb-6">
              Congratulations! You're now an approved mentor. Start connecting with mentees and share your knowledge.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => {
                  onClose();
                  // Navigate to mentor dashboard
                  window.location.href = '/mentor-dashboard';
                }}
                className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Go to Mentor Dashboard
              </button>
              <button
                onClick={onClose}
                className="w-full bg-gray-100 text-gray-700 py-2.5 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
        {renderContent()}
      </div>
    </div>
  );
};

export default function ProfileSection() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('/profile');
  const [showMentorModal, setShowMentorModal] = useState(false);
  const navigate = useNavigate();

  const { user, userProfile } = useGlobalContext();
  const mentorStatus = userProfile?.mentorStatus || user?.mentorStatus || "None";

  console.log("mentorStatusRaw:", `"${mentorStatus}"`);

  const handleBecomeMentor = () => {
    setShowMentorModal(false);
    navigate('/BecomeMentorForm');
  };

  const displayValue = (value, fallback = "------") => {
    if (value === null || value === undefined || value === "" || 
        (Array.isArray(value) && value.length === 0)) {
      return fallback;
    }
    return value;
  };

  const profileData = userProfile || user;

  const profile = {
    name: displayValue(profileData?.name, "N/A"),
    email: displayValue(profileData?.email, "N/A"),
    phone: displayValue(profileData?.phone, "N/A"),
    picture: displayValue(profileData?.picture, "https://api.dicebear.com/7.x/avataaars/svg?seed=default"),
    bio: displayValue(profileData?.bio, "N/A"),
    userType: displayValue(profileData?.userType, "None"),
    
    professionalDetails: profileData?.professionalDetails ? {
      company: displayValue(profileData.professionalDetails.company, "N/A"),
      jobTitle: displayValue(profileData.professionalDetails.jobTitle, "N/A"),
      experience: displayValue(profileData.professionalDetails.experience, "N/A"),
      currentCTC: displayValue(profileData.professionalDetails.currentCTC, "N/A"),
      expectedCTC: displayValue(profileData.professionalDetails.expectedCTC, "N/A"),
      noticePeriod: displayValue(profileData.professionalDetails.noticePeriod, "N/A"),
      workMode: displayValue(profileData.professionalDetails.workMode, "N/A"),
      preferredJobRole: displayValue(profileData.professionalDetails.preferredJobRole, "N/A"),
      preferredLocations: displayValue(profileData.professionalDetails.preferredLocations, [])
    } : {
      company: "N/A",
      jobTitle: "N/A",
      experience: "N/A",
      currentCTC: "N/A",
      expectedCTC: "N/A",
      noticePeriod: "N/A",
      workMode: "N/A",
      preferredJobRole: "N/A",
      preferredLocations: []
    },

    studentDetails: profileData?.studentDetails ? {
      college: displayValue(profileData.studentDetails.college, "N/A"),
      degree: displayValue(profileData.studentDetails.degree, "N/A"),
      branch: displayValue(profileData.studentDetails.branch, "N/A"),
      year: displayValue(profileData.studentDetails.year, "N/A"),
      graduationYear: displayValue(profileData.studentDetails.graduationYear, "N/A"),
      currentCGPA: displayValue(profileData.studentDetails.currentCGPA, "N/A"),
      preferredJobRole: displayValue(profileData.studentDetails.preferredJobRole, "N/A"),
      preferredLocations: displayValue(profileData.studentDetails.preferredLocations, [])
    } : {
      college: "N/A",
      degree: "N/A",
      branch: "N/A",
      year: "N/A",
      graduationYear: "N/A",
      currentCGPA: "N/A",
      preferredJobRole: "N/A",
      preferredLocations: []
    },
    
    details: {
      location: displayValue(profileData?.details?.location, "N/A"),
      skills: displayValue(profileData?.details?.skills, []),
      github: displayValue(profileData?.details?.github, "N/A"),
      linkedin: displayValue(profileData?.details?.linkedin, "N/A"),
      portfolio: displayValue(profileData?.details?.portfolio, "N/A")
    },
    
    experience: displayValue(profileData?.experience, []),
    projects: displayValue(profileData?.projects, []),
    certs: displayValue(profileData?.certs, []),
    achievements: displayValue(profileData?.achievements, [])
  };

  const getJobTitle = () => {
    if (profile.userType === "working_professional") {
      return profile.professionalDetails.jobTitle;
    } else if (profile.userType === "student") {
      const degree = profile.studentDetails.degree;
      const branch = profile.studentDetails.branch;
      if (degree === "N/A" && branch === "N/A") return "N/A";
      if (degree === "N/A") return branch;
      if (branch === "N/A") return degree;
      return `${degree} - ${branch}`;
    }
    return "N/A";
  };

  const getCompanyOrCollege = () => {
    if (profile.userType === "working_professional") {
      return profile.professionalDetails.company;
    } else if (profile.userType === "student") {
      return profile.studentDetails.college;
    }
    return "N/A";
  };

  const getMentorButtonText = () => {
    switch (mentorStatus) {
      case "None":
        return "Become a Mentor";
      case "Pending":
        return "Pending Review";
      case "Approved":
        return "Mentor";
      default:
        return "Become a Mentor";
    }
  };

  const getMentorButtonStyle = () => {
    switch (mentorStatus) {
      case "None":
        return "px-4 py-1.5 border border-blue-600 text-blue-600 rounded-full font-medium hover:bg-blue-50 transition-colors";
      case "Pending":
        return "px-4 py-1.5 border border-amber-600 text-amber-600 rounded-full font-medium hover:bg-amber-50 transition-colors";
      case "Approved":
        return "px-4 py-1.5 bg-green-600 text-white rounded-full font-medium hover:bg-green-700 transition-colors flex items-center gap-1.5";
      default:
        return "px-4 py-1.5 border border-blue-600 text-blue-600 rounded-full font-medium hover:bg-blue-50 transition-colors";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:block w-64 bg-white border-r border-gray-200 sticky top-0 h-screen overflow-y-auto">
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Menu</h2>
            <nav className="space-y-1">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeItem === item.url;
                return (
                  <a
                    key={item.url}
                    href={item.url}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(item.url);
                    }}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </a>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border border-gray-200"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-gray-700" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700" />
          )}
        </button>

        {/* Sidebar - Mobile */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)}>
            <aside className="w-64 bg-white h-full overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="p-4 pt-16">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Menu</h2>
                <nav className="space-y-1">
                  {sidebarItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeItem === item.url;
                    return (
                      <a
                        key={item.url}
                        href={item.url}
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(item.url);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{item.name}</span>
                      </a>
                    );
                  })}
                </nav>
              </div>
            </aside>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1">
          <div className="max-w-5xl mx-auto">
            {/* Header Section */}
            <div className="bg-white border-b">
              <div className="relative">
                {/* Background Banner */}
                <div className="h-36 bg-gradient-to-r from-blue-700 to-blue-900"></div>
                
                {/* Profile Picture */}
                <div className="px-6">
                  <div className="relative -mt-16 mb-4">
                    <img 
                      src={profile.picture} 
                      alt={profile.name}
                      className="w-32 h-32 rounded-full border-4 border-white bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="px-6 pb-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
                    <p className="text-base text-gray-900 mt-1">
                      {getJobTitle()} {getCompanyOrCollege() !== "N/A" && getJobTitle() !== "N/A" && `at ${getCompanyOrCollege()}`}
                    </p>
                    <p className="text-sm text-gray-600 mt-1 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {profile.details.location}
                    </p>
                    <div className="flex flex-col gap-1 mt-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {profile.email}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        {profile.phone}
                      </div>
                    </div>
                  </div>
                  <button className="px-4 py-1.5 border border-blue-600 text-blue-600 rounded-full font-medium hover:bg-blue-50 transition-colors">
                    Open to work
                  </button>
                </div>

                <p className="text-sm text-gray-900 mb-4 max-w-3xl">{profile.bio}</p>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  <button className="px-4 py-1.5 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700">
                    Message
                  </button>
                  <button className="px-4 py-1.5 border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50">
                    Connect
                  </button>
                  <button 
                    onClick={() => setShowMentorModal(true)}
                    className={getMentorButtonStyle()}
                  >
                    {mentorStatus === "Approved" && <Award className="w-4 h-4" />}
                    {getMentorButtonText()}
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 space-y-4">
              {/* About Section */}
              <div className="bg-white rounded-lg border p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">About</h2>
                
                {profile.userType === "working_professional" && (
                  <div className="space-y-3 text-sm">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-gray-600">Experience:</span>
                        <span className="ml-2 text-gray-900">{profile.professionalDetails.experience}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Work Mode:</span>
                        <span className="ml-2 text-gray-900 capitalize">{profile.professionalDetails.workMode}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Current CTC:</span>
                        <span className="ml-2 text-gray-900">{profile.professionalDetails.currentCTC}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Expected CTC:</span>
                        <span className="ml-2 text-gray-900">{profile.professionalDetails.expectedCTC}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Notice Period:</span>
                        <span className="ml-2 text-gray-900">{profile.professionalDetails.noticePeriod}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Preferred Role:</span>
                        <span className="ml-2 text-gray-900">{profile.professionalDetails.preferredJobRole}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">Preferred Locations:</span>
                      <span className="ml-2 text-gray-900">
                        {profile.professionalDetails.preferredLocations.length > 0 
                          ? profile.professionalDetails.preferredLocations.join(', ')
                          : 'N/A'}
                      </span>
                    </div>
                  </div>
                )}

                {profile.userType === "student" && (
                  <div className="space-y-3 text-sm">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-gray-600">College:</span>
                        <span className="ml-2 text-gray-900">{profile.studentDetails.college}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Degree:</span>
                        <span className="ml-2 text-gray-900">{profile.studentDetails.degree}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Branch:</span>
                        <span className="ml-2 text-gray-900">{profile.studentDetails.branch}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Year:</span>
                        <span className="ml-2 text-gray-900">{profile.studentDetails.year}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Graduation Year:</span>
                        <span className="ml-2 text-gray-900">{profile.studentDetails.graduationYear}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">CGPA:</span>
                        <span className="ml-2 text-gray-900">{profile.studentDetails.currentCGPA}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Preferred Role:</span>
                        <span className="ml-2 text-gray-900">{profile.studentDetails.preferredJobRole}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">Preferred Locations:</span>
                      <span className="ml-2 text-gray-900">
                        {profile.studentDetails.preferredLocations.length > 0 
                          ? profile.studentDetails.preferredLocations.join(', ')
                          : 'N/A'}
                      </span>
                    </div>
                  </div>
                )}

                {profile.userType === "None" && (
                  <div className="text-sm text-gray-500">
                    <p>Complete your profile to showcase your details.</p>
                  </div>
                )}
              </div>

              {/* Experience Section */}
              <div className="bg-white rounded-lg border p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Experience</h2>
                {profile.experience.length > 0 ? (
                  <div className="space-y-6">
                    {profile.experience.map((exp, i) => (
                      <div key={i} className="flex gap-3">
                        <div className="w-12 h-12 bg-gray-200 rounded flex-shrink-0 flex items-center justify-center">
                          {exp.logo ? (
                            <img src={exp.logo} alt={exp.company} className="w-10 h-10 object-contain" />
                          ) : (
                            <Building2 className="w-6 h-6 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{displayValue(exp.role, "N/A")}</h3>
                          <p className="text-sm text-gray-900">{displayValue(exp.company, "N/A")}</p>
                          <p className="text-xs text-gray-600 mt-1">
                            {displayValue(exp.duration, "N/A")} · {displayValue(exp.location, "N/A")}
                          </p>
                          {exp.description && (
                            <p className="text-sm text-gray-900 mt-2">{exp.description}</p>
                          )}
                          {exp.points && exp.points.length > 0 && (
                            <ul className="mt-2 space-y-1">
                              {exp.points.map((point, j) => (
                                <li key={j} className="text-sm text-gray-900 flex gap-2">
                                  <span>•</span>
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                          {exp.technologies && exp.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {exp.technologies.map((tech, j) => (
                                <span key={j} className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">N/A</p>
                )}
              </div>

              {/* Skills Section */}
              <div className="bg-white rounded-lg border p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills</h2>
                {profile.details.skills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {profile.details.skills.map((skill, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1.5 bg-gray-100 text-gray-900 rounded-full text-sm font-medium hover:bg-gray-200 cursor-pointer"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">N/A</p>
                )}
              </div>

              {/* Projects Section */}
              <div className="bg-white rounded-lg border p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Projects</h2>
                {profile.projects.length > 0 ? (
                  <div className="space-y-6">
                    {profile.projects.map((project, i) => (
                      <div key={i}>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-gray-900">{displayValue(project.name, "N/A")}</h3>
                          <div className="flex gap-2">
                            {project.githubLink && project.githubLink !== "N/A" && (
                              <a 
                                href={project.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 hover:text-gray-900"
                              >
                                <Github className="w-5 h-5" />
                              </a>
                            )}
                            {project.deployedLink && project.deployedLink !== "N/A" && (
                              <a 
                                href={project.deployedLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 hover:text-gray-900"
                              >
                                <ExternalLink className="w-5 h-5" />
                              </a>
                            )}
                          </div>
                        </div>
                        {project.desc && (
                          <p className="text-sm text-gray-900 mb-2">{displayValue(project.desc, "N/A")}</p>
                        )}
                        {project.tech && project.tech.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {project.tech.map((tech, j) => (
                              <span 
                                key={j}
                                className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                        {i < profile.projects.length - 1 && (
                          <div className="border-b border-gray-200 mt-6"></div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">N/A</p>
                )}
              </div>

              {/* Certifications Section */}
              <div className="bg-white rounded-lg border p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Licenses & certifications</h2>
                {profile.certs.length > 0 ? (
                  <div className="space-y-4">
                    {profile.certs.map((cert, i) => (
                      <div key={i} className="flex gap-3">
                        <div className="w-12 h-12 bg-gray-200 rounded flex-shrink-0 flex items-center justify-center">
                          {cert.icon ? (
                            <span className="text-2xl">{cert.icon}</span>
                          ) : (
                            <span className="text-gray-400 text-xs">CERT</span>
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{displayValue(cert.name, "N/A")}</h3>
                          <p className="text-sm text-gray-900">{displayValue(cert.issuer, "N/A")}</p>
                          <p className="text-xs text-gray-600 mt-1">Issued {displayValue(cert.year, "N/A")}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">N/A</p>
                )}
              </div>

              {/* Achievements Section */}
              <div className="bg-white rounded-lg border p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Achievements</h2>
                {profile.achievements.length > 0 ? (
                  <div className="space-y-4">
                    {profile.achievements.map((achievement, i) => (
                      <div key={i}>
                        <div className="flex items-start gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{displayValue(achievement.title, "N/A")}</h3>
                          {achievement.year && achievement.year !== "N/A" && (
                            <span className="text-xs text-gray-600">· {achievement.year}</span>
                          )}
                        </div>
                        {achievement.desc && (
                          <p className="text-sm text-gray-900">{displayValue(achievement.desc, "N/A")}</p>
                        )}
                        {i < profile.achievements.length - 1 && (
                          <div className="border-b border-gray-200 mt-4"></div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">N/A</p>
                )}
              </div>

              {/* Social Links Section */}
              <div className="bg-white rounded-lg border p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Social Links</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Github className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-600">GitHub:</span>
                    {profile.details.github !== "N/A" ? (
                      <a 
                        href={profile.details.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {profile.details.github}
                      </a>
                    ) : (
                      <span className="text-gray-900">N/A</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Linkedin className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-600">LinkedIn:</span>
                    {profile.details.linkedin !== "N/A" ? (
                      <a 
                        href={profile.details.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {profile.details.linkedin}
                      </a>
                    ) : (
                      <span className="text-gray-900">N/A</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-600">Portfolio:</span>
                    {profile.details.portfolio !== "N/A" ? (
                      <a 
                        href={profile.details.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {profile.details.portfolio}
                      </a>
                    ) : (
                      <span className="text-gray-900">N/A</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Mentor Status Modal */}
      <MentorStatusModal 
        isOpen={showMentorModal}
        onClose={() => setShowMentorModal(false)}
        mentorStatus={mentorStatus}
        onBecomeMentor={handleBecomeMentor}
      />
    </div>
  );
}