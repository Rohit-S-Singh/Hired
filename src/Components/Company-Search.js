import React, { useState } from 'react';
import { Building2, MapPin, Users, Globe, Briefcase, Award, Target, TrendingUp, Calendar, Star, Check, Bell, BellOff } from 'lucide-react';

const CompanyProfilePage = () => {
  const [followStatus, setFollowStatus] = useState('not_following'); // 'not_following', 'following'

  const handleFollowClick = () => {
    setFollowStatus(followStatus === 'not_following' ? 'following' : 'not_following');
  };

  const company = {
    name: "TechCorp Solutions",
    logo: "TC",
    tagline: "Innovating the Future of Technology",
    industry: "Software Development & AI",
    location: "Bangalore, Karnataka, India",
    headquarters: "San Francisco, USA",
    founded: "2015",
    employees: "500-1000",
    website: "www.techcorp.com",
    rating: 4.5,
    description: "TechCorp Solutions is a leading software development company specializing in artificial intelligence, cloud computing, and enterprise solutions. We help businesses transform digitally by building scalable, innovative, and cutting-edge technology products. Our mission is to empower organizations with intelligent software that drives growth and efficiency.",
    openPositions: 12,
    culture: [
      "Innovation-driven workplace",
      "Work-life balance",
      "Remote-first company",
      "Continuous learning opportunities",
      "Diverse and inclusive environment"
    ],
    benefits: [
      "Competitive salary packages",
      "Health insurance for family",
      "Flexible working hours",
      "Annual performance bonuses",
      "Professional development budget",
      "Stock options",
      "Gym membership",
      "Free meals and snacks"
    ],
    technologies: ["React", "Node.js", "Python", "AWS", "Docker", "Kubernetes", "TensorFlow", "MongoDB", "PostgreSQL", "GraphQL"],
    offices: [
      {
        location: "Bangalore, India",
        type: "Headquarters (India)",
        address: "Tech Park, Whitefield, Bangalore - 560066"
      },
      {
        location: "San Francisco, USA",
        type: "Global HQ",
        address: "Market Street, San Francisco, CA 94103"
      },
      {
        location: "London, UK",
        type: "Europe Office",
        address: "Tech Hub, London EC2A 4BX"
      }
    ],
    achievements: [
      "Best Tech Workplace 2024",
      "Top 50 Startups in India",
      "Innovation Award 2023",
      "Great Place to Work Certified"
    ],
    recentJobs: [
      {
        title: "Senior Software Engineer",
        type: "Full-time",
        location: "Bangalore",
        postedDate: "2 days ago"
      },
      {
        title: "Data Scientist",
        type: "Full-time",
        location: "Remote",
        postedDate: "5 days ago"
      },
      {
        title: "Product Manager",
        type: "Full-time",
        location: "Bangalore",
        postedDate: "1 week ago"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center text-white text-4xl font-bold flex-shrink-0 shadow-lg">
              {company.logo}
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-800">{company.name}</h1>
              <p className="text-xl text-gray-600 mt-2">{company.tagline}</p>
              <div className="flex flex-wrap gap-4 mt-4 text-gray-600">
                <span className="flex items-center gap-2">
                  <Building2 size={18} />
                  {company.industry}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin size={18} />
                  {company.location}
                </span>
                <span className="flex items-center gap-2">
                  <Users size={18} />
                  {company.employees} employees
                </span>
                <span className="flex items-center gap-2">
                  <Star size={18} className="fill-yellow-400 text-yellow-400" />
                  {company.rating} Rating
                </span>
              </div>
            </div>
            <div className="flex-shrink-0">
              <button 
                onClick={handleFollowClick}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors shadow-md flex items-center gap-2 ${
                  followStatus === 'following' 
                    ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {followStatus === 'following' ? <BellOff size={20} /> : <Bell size={20} />}
                {followStatus === 'following' ? 'Following' : 'Follow Company'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Building2 size={24} />
                About Company
              </h2>
              <p className="text-gray-600 leading-relaxed">{company.description}</p>
            </div>

            {/* Culture & Values */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Target size={24} />
                Culture & Values
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {company.culture.map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Check size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits & Perks */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Award size={24} />
                Benefits & Perks
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {company.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">✓</span>
                    <span className="text-gray-600">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies Used */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Technologies We Use</h2>
              <div className="flex flex-wrap gap-2">
                {company.technologies.map((tech, i) => (
                  <span key={i} className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Office Locations */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <MapPin size={24} />
                Office Locations
              </h2>
              <div className="space-y-4">
                {company.offices.map((office, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <h3 className="text-lg font-semibold text-gray-800">{office.location}</h3>
                    <p className="text-blue-600 font-medium text-sm">{office.type}</p>
                    <p className="text-gray-600 mt-1">{office.address}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Job Openings */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Briefcase size={24} />
                Recent Job Openings
              </h2>
              <div className="space-y-4">
                {company.recentJobs.map((job, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
                        <div className="flex gap-3 mt-2 text-sm text-gray-600">
                          <span>{job.location}</span>
                          <span>•</span>
                          <span>{job.type}</span>
                          <span>•</span>
                          <span>{job.postedDate}</span>
                        </div>
                      </div>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
                        Apply
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 bg-white text-blue-600 border-2 border-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                View All {company.openPositions} Open Positions
              </button>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Company Info</h2>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
                    <Globe size={16} />
                    Website
                  </h4>
                  <a href={`https://${company.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
                    {company.website}
                  </a>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
                    <Building2 size={16} />
                    Industry
                  </h4>
                  <p className="text-gray-600">{company.industry}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
                    <Users size={16} />
                    Company Size
                  </h4>
                  <p className="text-gray-600">{company.employees} employees</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
                    <MapPin size={16} />
                    Headquarters
                  </h4>
                  <p className="text-gray-600">{company.headquarters}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
                    <Calendar size={16} />
                    Founded
                  </h4>
                  <p className="text-gray-600">{company.founded}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
                    <Briefcase size={16} />
                    Open Positions
                  </h4>
                  <p className="text-gray-600">{company.openPositions} jobs available</p>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <TrendingUp size={20} />
                Achievements
              </h2>
              <ul className="space-y-3">
                {company.achievements.map((achievement, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Award size={18} className="text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button 
                onClick={handleFollowClick}
                className={`w-full py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                  followStatus === 'following' 
                    ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {followStatus === 'following' ? <BellOff size={20} /> : <Bell size={20} />}
                {followStatus === 'following' ? 'Following' : 'Follow Company'}
              </button>
              <button className="w-full bg-white text-blue-600 border-2 border-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Share Company
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfilePage;