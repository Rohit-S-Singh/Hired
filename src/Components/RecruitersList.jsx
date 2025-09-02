import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const RecruitersList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRecruiters, setFilteredRecruiters] = useState([]);
  
  // Dummy data for recruiters
  const [recruiters] = useState([
    {
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
      placements: 127
    },
    {
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
      placements: 89
    },
    {
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
      placements: 156
    },
    {
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
      placements: 112
    },
    {
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
      placements: 73
    }
  ]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredRecruiters(recruiters);
    } else {
      const filtered = recruiters.filter(recruiter => 
        recruiter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recruiter.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recruiter.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recruiter.position.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRecruiters(filtered);
    }
  }, [searchTerm, recruiters]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">Find Your Perfect Recruiter</h1>
          <p className="text-lg text-gray-600">
            Connect with top recruiters from leading tech companies
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative mx-auto max-w-2xl">
            <input
              type="text"
              placeholder="Search by company, mentor name, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 pl-12 text-lg shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-center">
          <p className="text-gray-600">
            Showing {filteredRecruiters.length} recruiter{filteredRecruiters.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Recruiters List */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredRecruiters.map((recruiter) => (
            <Link
              key={recruiter.id}
              to={`/recruiter/${recruiter.id}`}
              className="block cursor-pointer rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-lg hover:scale-105 hover:border-blue-300"
            >
              {/* Avatar and Basic Info */}
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-700">
                  {recruiter.avatar}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{recruiter.name}</h3>
                  <p className="text-sm font-medium text-blue-600">{recruiter.company}</p>
                  <p className="text-sm text-gray-600">{recruiter.position}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="mb-4 flex items-center justify-between text-sm">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">★</span>
                  <span className="font-medium">{recruiter.rating}</span>
                </div>
                <div className="text-gray-600">
                  {recruiter.placements} placements
                </div>
              </div>

              {/* Specializations */}
              <div className="mb-4">
                <p className="mb-2 text-sm font-medium text-gray-700">Specializations:</p>
                <div className="flex flex-wrap gap-1">
                  {recruiter.specializations.map((spec, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Location and Experience */}
              <div className="mb-4 text-sm text-gray-600">
                <p>📍 {recruiter.location}</p>
                <p>⏱️ {recruiter.experience} experience</p>
              </div>

              {/* Contact */}
              <div className="text-sm text-gray-600">
                <p>📧 {recruiter.email}</p>
              </div>

              {/* Click indicator */}
              <div className="mt-4 text-center">
                <span className="text-xs text-blue-600">Click to view profile →</span>
              </div>
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filteredRecruiters.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">No recruiters found matching your search.</p>
            <p className="text-sm text-gray-500">Try adjusting your search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecruitersList;
