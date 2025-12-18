import React, { useState, useEffect } from 'react';
import { Search, Briefcase, Users, Building2, MapPin, Calendar, DollarSign, Filter, X, ChevronDown } from 'lucide-react';

const PlacementSearchPage = () => {
  const [activeTab, setActiveTab] = useState('jobs');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    jobType: '',
    workMode: '',
    experience: '',
    skills: [],
    minSalary: '',
    batch: '',
    branch: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [results, setResults] = useState({ jobs: [], users: [], companies: [] });
  const [loading, setLoading] = useState(false);

  // Fetch results based on active tab
  const fetchResults = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        search: searchQuery,
        ...Object.fromEntries(Object.entries(filters).filter(([_, v]) => v && v.length > 0))
      });

      const response = await fetch(`/api/search/${activeTab}?${queryParams}`);
      const data = await response.json();
      
      setResults(prev => ({ ...prev, [activeTab]: data.results || [] }));
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (searchQuery || Object.values(filters).some(v => v && v.length > 0)) {
        fetchResults();
      }
    }, 500);

    return () => clearTimeout(debounce);
  }, [searchQuery, filters, activeTab]);

  const clearFilters = () => {
    setFilters({
      location: '',
      jobType: '',
      workMode: '',
      experience: '',
      skills: [],
      minSalary: '',
      batch: '',
      branch: ''
    });
  };

  const JobCard = ({ job }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex gap-4 flex-1">
          {job.companyLogo && (
            <img src={job.companyLogo} alt={job.companyName} className="w-16 h-16 rounded-lg object-cover" />
          )}
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-1">{job.title}</h3>
            <p className="text-gray-700 font-medium mb-2">{job.companyName}</p>
            
            <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-3">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {job.location}
              </span>
              <span className="flex items-center gap-1">
                <Briefcase className="w-4 h-4" />
                {job.jobType}
              </span>
              <span className="flex items-center gap-1">
                {job.workMode}
              </span>
            </div>

            {job.salary && (
              <div className="flex items-center gap-1 text-green-600 font-medium mb-3">
                <DollarSign className="w-4 h-4" />
                ₹{job.salary.min?.toLocaleString()} - ₹{job.salary.max?.toLocaleString()} {job.salary.period}
              </div>
            )}

            <div className="flex flex-wrap gap-2 mb-3">
              {job.skillsRequired?.slice(0, 5).map((skill, idx) => (
                <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                  {skill}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}
              </span>
              <span>{job.applicantsCount} applicants</span>
            </div>
          </div>
        </div>
        
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Apply Now
        </button>
      </div>
    </div>
  );

  const UserCard = ({ user }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <img 
          src={user.picture || '/api/placeholder/80/80'} 
          alt={user.name} 
          className="w-20 h-20 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
          
          {user.userType === 'student' && user.studentDetails && (
            <>
              <p className="text-gray-600 mb-2">
                {user.studentDetails.degree} in {user.studentDetails.branch}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                {user.studentDetails.college} • {user.studentDetails.year} Year
              </p>
              <div className="flex flex-wrap gap-2 mb-2">
                {user.studentDetails.skills?.slice(0, 4).map((skill, idx) => (
                  <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                    {skill}
                  </span>
                ))}
              </div>
              {user.studentDetails.careerInterest && (
                <p className="text-sm text-gray-600">
                  Interested in: {user.studentDetails.careerInterest}
                </p>
              )}
            </>
          )}

          {user.userType === 'professional' && user.professionalDetails && (
            <>
              <p className="text-gray-600 mb-2">{user.professionalDetails.jobTitle}</p>
              <p className="text-sm text-gray-500 mb-2">
                {user.professionalDetails.company} • {user.professionalDetails.experience}
              </p>
              <div className="flex flex-wrap gap-2 mb-2">
                {user.professionalDetails.skills?.slice(0, 4).map((skill, idx) => (
                  <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                    {skill}
                  </span>
                ))}
              </div>
            </>
          )}

          <div className="flex gap-2 mt-3">
            <button className="px-4 py-1.5 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium">
              View Profile
            </button>
            <button className="px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
              Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const CompanyCard = ({ company }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
          <Building2 className="w-8 h-8 text-gray-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{company.name}</h3>
          <p className="text-gray-600 text-sm mb-2">{company.industry}</p>
          <p className="text-gray-500 text-sm mb-3">{company.location}</p>
          <p className="text-sm text-gray-700 mb-3">{company.activeJobs} active job postings</p>
          <button className="px-4 py-1.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
            View Jobs
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs, people, companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 mt-4 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('jobs')}
              className={`pb-3 px-2 font-medium transition-colors relative ${
                activeTab === 'jobs'
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Jobs
              </span>
              {activeTab === 'jobs' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('people')}
              className={`pb-3 px-2 font-medium transition-colors relative ${
                activeTab === 'people'
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                People
              </span>
              {activeTab === 'people' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('companies')}
              className={`pb-3 px-2 font-medium transition-colors relative ${
                activeTab === 'companies'
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Companies
              </span>
              {activeTab === 'companies' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-80 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">Filters</h3>
                  <button
                    onClick={clearFilters}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    Clear all
                  </button>
                </div>

                <div className="space-y-4">
                  {activeTab === 'jobs' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Location
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., Bangalore"
                          value={filters.location}
                          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Job Type
                        </label>
                        <select
                          value={filters.jobType}
                          onChange={(e) => setFilters({ ...filters, jobType: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">All Types</option>
                          <option value="Full-Time">Full-Time</option>
                          <option value="Part-Time">Part-Time</option>
                          <option value="Internship">Internship</option>
                          <option value="Contract">Contract</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Work Mode
                        </label>
                        <select
                          value={filters.workMode}
                          onChange={(e) => setFilters({ ...filters, workMode: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">All Modes</option>
                          <option value="Remote">Remote</option>
                          <option value="Onsite">Onsite</option>
                          <option value="Hybrid">Hybrid</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Graduation Year
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., 2024"
                          value={filters.batch}
                          onChange={(e) => setFilters({ ...filters, batch: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Branch
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., CSE"
                          value={filters.branch}
                          onChange={(e) => setFilters({ ...filters, branch: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </>
                  )}

                  {activeTab === 'people' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Location
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., Bangalore"
                          value={filters.location}
                          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Skills
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., React, Python"
                          value={filters.skills.join(', ')}
                          onChange={(e) => setFilters({ ...filters, skills: e.target.value.split(',').map(s => s.trim()) })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          <div className="flex-1">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {activeTab === 'jobs' && results.jobs.map((job) => (
                  <JobCard key={job._id} job={job} />
                ))}
                {activeTab === 'people' && results.users.map((user) => (
                  <UserCard key={user._id} user={user} />
                ))}
                {activeTab === 'companies' && results.companies.map((company) => (
                  <CompanyCard key={company._id} company={company} />
                ))}
                
                {results[activeTab]?.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No results found</p>
                    <p className="text-gray-400 mt-2">Try adjusting your search or filters</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacementSearchPage;