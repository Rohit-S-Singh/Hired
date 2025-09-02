import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const RecruiterProfile = () => {
  const { recruiterId } = useParams();
  const navigate = useNavigate();
  const [recruiter, setRecruiter] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('');
  const [message, setMessage] = useState('');
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [messageStatus, setMessageStatus] = useState('');

  // Dummy data for recruiters (same as in RecruitersList)
  const recruitersData = {
    'r1': {
      id: 'r1',
      name: 'Sarah Johnson',
      company: 'Google',
      position: 'Senior Technical Recruiter',
      email: 'sarah.johnson@google.com',
      location: 'Mountain View, CA',
      experience: '8 years',
      specializations: ['Software Engineering', 'Product Management', 'Data Science'],
      avatar: 'SJ',
      rating: 4.8,
      placements: 127,
      bio: 'Passionate about connecting top engineering talent with innovative companies. Specialized in software engineering roles across various tech stacks and seniority levels.',
      skills: ['Technical Recruiting', 'Candidate Assessment', 'Interview Coordination', 'Salary Negotiation', 'Employer Branding'],
      education: 'Bachelor of Science in Human Resources, Stanford University',
      certifications: ['Professional in Human Resources (PHR)', 'Certified Technical Recruiter'],
      languages: ['English', 'Spanish'],
      availability: 'Available for new opportunities',
      responseTime: 'Usually responds within 24 hours'
    },
    'r2': {
      id: 'r2',
      name: 'Michael Chen',
      company: 'Microsoft',
      position: 'Lead Recruiter',
      email: 'michael.chen@microsoft.com',
      location: 'Seattle, WA',
      experience: '6 years',
      specializations: ['Cloud Computing', 'AI/ML', 'DevOps'],
      avatar: 'MC',
      rating: 4.6,
      placements: 89,
      bio: 'Experienced in building high-performing engineering teams. Focus on cloud-native technologies and emerging AI/ML roles.',
      skills: ['Technical Recruiting', 'Team Building', 'Strategic Hiring', 'Diversity & Inclusion', 'Technical Assessment'],
      education: 'Master of Business Administration, University of Washington',
      certifications: ['Senior Professional in Human Resources (SPHR)'],
      languages: ['English', 'Mandarin'],
      availability: 'Available for new opportunities',
      responseTime: 'Usually responds within 12 hours'
    },
    'r3': {
      id: 'r3',
      name: 'Emily Rodriguez',
      company: 'Apple',
      position: 'Technical Recruiter',
      email: 'emily.rodriguez@apple.com',
      location: 'Cupertino, CA',
      experience: '5 years',
      specializations: ['iOS Development', 'Hardware Engineering', 'Design'],
      avatar: 'ER',
      rating: 4.9,
      placements: 156,
      bio: 'Specialized in mobile development and hardware engineering recruitment. Passionate about finding the perfect fit for both candidates and companies.',
      skills: ['Mobile Recruiting', 'Hardware Engineering', 'Design Recruitment', 'Technical Interviewing', 'Candidate Experience'],
      education: 'Bachelor of Arts in Psychology, UC Berkeley',
      certifications: ['Certified Technical Recruiter', 'Diversity Recruiting Specialist'],
      languages: ['English', 'Spanish'],
      availability: 'Available for new opportunities',
      responseTime: 'Usually responds within 6 hours'
    },
    'r4': {
      id: 'r4',
      name: 'David Kim',
      company: 'Meta',
      position: 'Senior Recruiter',
      email: 'david.kim@meta.com',
      location: 'Menlo Park, CA',
      experience: '7 years',
      specializations: ['Frontend Development', 'UX Research', 'Growth'],
      avatar: 'DK',
      rating: 4.7,
      placements: 112,
      bio: 'Expert in frontend development and UX roles. Committed to building diverse and inclusive engineering teams.',
      skills: ['Frontend Recruiting', 'UX Recruitment', 'Growth Hiring', 'Technical Sourcing', 'Employer Branding'],
      education: 'Bachelor of Science in Computer Science, UC San Diego',
      certifications: ['Certified Technical Recruiter', 'Diversity & Inclusion Specialist'],
      languages: ['English', 'Korean'],
      availability: 'Available for new opportunities',
      responseTime: 'Usually responds within 18 hours'
    },
    'r5': {
      id: 'r5',
      name: 'Lisa Thompson',
      company: 'Netflix',
      position: 'Technical Recruiter',
      email: 'lisa.thompson@netflix.com',
      location: 'Los Gatos, CA',
      experience: '4 years',
      specializations: ['Backend Engineering', 'Data Engineering', 'Content'],
      avatar: 'LT',
      rating: 4.5,
      placements: 73,
      bio: 'Focused on backend engineering and data roles. Building teams that power the world\'s leading streaming platform.',
      skills: ['Backend Recruiting', 'Data Engineering', 'Content Technology', 'Technical Sourcing', 'Candidate Assessment'],
      education: 'Bachelor of Science in Information Technology, San Jose State University',
      certifications: ['Certified Technical Recruiter'],
      languages: ['English'],
      availability: 'Available for new opportunities',
      responseTime: 'Usually responds within 24 hours'
    }
  };

  useEffect(() => {
    const recruiterData = recruitersData[recruiterId];
    if (recruiterData) {
      setRecruiter(recruiterData);
    } else {
      navigate('/recruiters');
    }
  }, [recruiterId, navigate]);

  const handleConnect = async () => {
    setIsConnecting(true);
    // Simulate API call
    setTimeout(() => {
      setConnectionStatus('Connection request sent! Sarah will review your profile and get back to you soon.');
      setIsConnecting(false);
    }, 2000);
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    setIsSendingMessage(true);
    // Simulate API call
    setTimeout(() => {
      setMessageStatus(`Message sent to ${recruiter.name}! They will respond within ${recruiter.responseTime.toLowerCase()}.`);
      setMessage('');
      setIsSendingMessage(false);
    }, 2000);
  };

  if (!recruiter) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading recruiter profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-4xl px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate('/recruiters')}
          className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-800"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Recruiters
        </button>

        {/* Profile Header */}
        <div className="mb-8 rounded-xl bg-white p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-start md:gap-8">
            {/* Avatar */}
            <div className="mb-6 flex justify-center md:mb-0">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-3xl font-bold text-blue-700">
                {recruiter.avatar}
              </div>
            </div>

            {/* Basic Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="mb-2 text-3xl font-bold text-gray-900">{recruiter.name}</h1>
              <p className="mb-1 text-xl font-medium text-blue-600">{recruiter.position}</p>
              <p className="mb-4 text-lg text-gray-600">{recruiter.company}</p>
              
              {/* Stats */}
              <div className="mb-6 flex flex-wrap justify-center gap-6 md:justify-start">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{recruiter.rating}</div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{recruiter.placements}</div>
                  <div className="text-sm text-gray-600">Placements</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{recruiter.experience}</div>
                  <div className="text-sm text-gray-600">Experience</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
                <button
                  onClick={handleConnect}
                  disabled={isConnecting || connectionStatus}
                  className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {isConnecting ? 'Sending Request...' : connectionStatus ? 'Request Sent!' : 'Connect Now'}
                </button>
                
                <button
                  onClick={() => document.getElementById('messageSection').scrollIntoView({ behavior: 'smooth' })}
                  className="rounded-lg border border-blue-600 px-6 py-3 font-semibold text-blue-600 hover:bg-blue-50"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>

          {/* Connection Status */}
          {connectionStatus && (
            <div className="mt-6 rounded-lg bg-green-50 p-4 text-center">
              <p className="text-green-800">{connectionStatus}</p>
            </div>
          )}
        </div>

        {/* Message Section */}
        <div id="messageSection" className="mb-8 rounded-xl bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Send a Message to {recruiter.name}</h3>
          <div className="space-y-4">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Hi ${recruiter.name}, I'm interested in connecting with you regarding ${recruiter.specializations[0]} opportunities...`}
              className="w-full rounded-lg border border-gray-300 p-4 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            />
            <div className="flex justify-between items-center">
              <button
                onClick={handleSendMessage}
                disabled={isSendingMessage || !message.trim()}
                className="rounded-lg bg-green-600 px-6 py-2 font-semibold text-white hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSendingMessage ? 'Sending...' : 'Send Message'}
              </button>
              <span className="text-sm text-gray-500">
                {recruiter.responseTime}
              </span>
            </div>
            {messageStatus && (
              <div className="rounded-lg bg-blue-50 p-4 text-center">
                <p className="text-blue-800">{messageStatus}</p>
              </div>
            )}
          </div>
        </div>

        {/* Profile Details */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Bio */}
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-lg font-semibold text-gray-900">About</h3>
              <p className="text-gray-700">{recruiter.bio}</p>
            </div>

            {/* Specializations */}
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-lg font-semibold text-gray-900">Specializations</h3>
              <div className="flex flex-wrap gap-2">
                {recruiter.specializations.map((spec, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-lg font-semibold text-gray-900">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {recruiter.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Contact & Location */}
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-lg font-semibold text-gray-900">Contact Information</h3>
              <div className="space-y-2 text-gray-700">
                <p>📧 {recruiter.email}</p>
                <p>📍 {recruiter.location}</p>
                <p>⏱️ {recruiter.responseTime}</p>
                <p>✅ {recruiter.availability}</p>
              </div>
            </div>

            {/* Education */}
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-lg font-semibold text-gray-900">Education</h3>
              <p className="text-gray-700">{recruiter.education}</p>
            </div>

            {/* Certifications */}
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-lg font-semibold text-gray-900">Certifications</h3>
              <div className="space-y-2">
                {recruiter.certifications.map((cert, index) => (
                  <p key={index} className="text-gray-700">• {cert}</p>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-lg font-semibold text-gray-900">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {recruiter.languages.map((lang, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterProfile;
