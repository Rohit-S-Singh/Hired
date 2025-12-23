import React, { useState, useEffect, createContext, useContext } from 'react';
import { Search, MapPin, Briefcase, ExternalLink, Building2, Calendar, Filter, X, ChevronDown, TrendingUp, Clock, Bookmark, AlertCircle, Loader2, ArrowUpRight } from 'lucide-react';



// Context for Jobs State Management
const JobsContext = createContext();

const JobsProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    jobType: [],
    location: [],
    source: [],
    locationType: []
  });
  const [sortBy, setSortBy] = useState('recent');

  // Simulate API call
useEffect(() => {
  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/jobs/random`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch jobs");
      }

      const data = await res.json();

      // backend should return { jobs: [...] }
      setJobs(data.jobs || []);
      setFilteredJobs(data.jobs || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchJobs();
}, []);


  // Apply filters and search
  useEffect(() => {
    let result = [...jobs];

    // Search filter
  if (searchQuery) {
  const query = searchQuery.toLowerCase();
  result = result.filter(job =>
    job.title.toLowerCase().includes(query) ||
    job.companyName.toLowerCase().includes(query) ||
    (job.skills || []).some(skill =>
      skill.toLowerCase().includes(query)
    )
  );
}

    // Job type filter
    if (filters.jobType.length > 0) {
      result = result.filter(job => filters.jobType.includes(job.jobType));
    }

    // Location type filter
    if (filters.locationType.length > 0) {
      result = result.filter(job => filters.locationType.includes(job.workMode?.toLowerCase())
);
    }

    // Source filter
    if (filters.source.length > 0) {
      result = result.filter(job => filters.source.includes(job.source));
    }

    // Sorting
    if (sortBy === 'recent') {
      result.sort((a, b) =>new Date(b.postedAt || b.createdAt) -
new Date(a.postedAt || a.createdAt)
);
    }

    setFilteredJobs(result);
  }, [searchQuery, filters, sortBy, jobs]);

  const toggleFilter = (category, value) => {
    setFilters(prev => {
      const current = prev[category];
      const updated = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];
      return { ...prev, [category]: updated };
    });
  };

  const clearAllFilters = () => {
    setFilters({
      jobType: [],
      location: [],
      source: [],
      locationType: []
    });
    setSearchQuery('');
  };

  const activeFilterCount = Object.values(filters).flat().length;

  return (
    <JobsContext.Provider value={{
      jobs,
      filteredJobs,
      loading,
      error,
      searchQuery,
      setSearchQuery,
      filters,
      toggleFilter,
      clearAllFilters,
      activeFilterCount,
      sortBy,
      setSortBy
    }}>
      {children}
    </JobsContext.Provider>
  );
};

const useJobs = () => useContext(JobsContext);

// Components
const Header = ({ showTracker, setShowTracker }) => {
  return (
    <>
      {/* Application Tracker Modal */}
      {showTracker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[85vh] overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Application Tracker</h2>
                <p className="text-gray-600 mt-1">Track all your job applications in one place</p>
              </div>
              <button 
                onClick={() => setShowTracker(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-8 overflow-y-auto max-h-[calc(85vh-100px)]">
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Applications Yet</h3>
                <p className="text-gray-600 mb-6">Start applying to jobs to track your progress here</p>
                <button 
                  onClick={() => setShowTracker(false)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Browse Jobs
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useJobs();

  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by job title, company, or skills..."
        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      {searchQuery && (
        <button
          onClick={() => setSearchQuery('')}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

const FilterSection = () => {
  const { filters, toggleFilter, clearAllFilters, activeFilterCount } = useJobs();
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiJobDescription, setAiJobDescription] = useState('');
  const [aiPreferences, setAiPreferences] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  const filterOptions = {
    jobType: ['Full-Time', 'Internship', 'Contract'],
    locationType: [
      { value: 'remote', label: 'Remote' },
      { value: 'onsite', label: 'Onsite' },
      { value: 'hybrid', label: 'Hybrid' }
    ],
    source: ['Internal', 'LinkedIn', 'Naukri', 'Company Career Page']
  };

  const handleAIRecommendation = async () => {
    setAiLoading(true);
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setAiLoading(false);
    setShowAIModal(false);
    // In production, this would send data to AI model and filter jobs accordingly
    alert('AI recommendations applied! Jobs are now filtered based on your preferences.');
    setAiJobDescription('');
    setAiPreferences('');
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        {/* AI Recommendation Button */}
        <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">AI Job Matcher</h3>
              <p className="text-xs text-gray-600">Describe your ideal job and get personalized recommendations</p>
            </div>
          </div>
          <button
            onClick={() => setShowAIModal(true)}
            className="w-full px-4 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all font-medium text-sm shadow-md hover:shadow-lg"
          >
            Find Jobs with AI ✨
          </button>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-gray-900 flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
            {activeFilterCount > 0 && (
              <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                {activeFilterCount}
              </span>
            )}
          </h2>
          {activeFilterCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear All
            </button>
          )}
        </div>

      {/* Job Type Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Job Type</h3>
        <div className="space-y-2">
          {filterOptions.jobType.map(type => (
            <label key={type} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.jobType.includes(type)}
                onChange={() => toggleFilter('jobType', type)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Location Type Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Work Location</h3>
        <div className="space-y-2">
          {filterOptions.locationType.map(({ value, label }) => (
            <label key={value} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.locationType.includes(value)}
                onChange={() => toggleFilter('locationType', value)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Source Filter */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Job Source</h3>
        <div className="space-y-2">
          {filterOptions.source.map(source => (
            <label key={source} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.source.includes(source)}
                onChange={() => toggleFilter('source', source)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{source}</span>
            </label>
          ))}
        </div>
      </div>
    </div>

    {/* AI Recommendation Modal */}
    {showAIModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">AI Job Matcher</h2>
                  <p className="text-sm text-gray-600 mt-1">Tell us what you're looking for</p>
                </div>
              </div>
              <button 
                onClick={() => setShowAIModal(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
            <div className="space-y-6">
              {/* Job Description Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Describe Your Ideal Job
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={aiJobDescription}
                  onChange={(e) => setAiJobDescription(e.target.value)}
                  placeholder="E.g., I'm looking for a frontend developer role where I can work with React and modern JavaScript. I want to join a startup with good work-life balance..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  rows="6"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Be specific about role, technologies, company culture, etc.
                </p>
              </div>

              {/* Your Preferences */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Your Skills & Preferences
                </label>
                <textarea
                  value={aiPreferences}
                  onChange={(e) => setAiPreferences(e.target.value)}
                  placeholder="E.g., Skills: React, Node.js, MongoDB. Preferences: Remote work, 0-2 years experience, Competitive salary, Learning opportunities..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  rows="5"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Include your skills, experience level, salary expectations, location preferences, etc.
                </p>
              </div>

              {/* Example Tags */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-sm font-semibold text-gray-700 mb-3">💡 Quick Tips:</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Mention specific technologies',
                    'Include experience level',
                    'State location preference',
                    'Add salary expectations',
                    'Describe company culture',
                    'List must-have benefits'
                  ].map(tip => (
                    <span key={tip} className="px-3 py-1 bg-white text-gray-700 text-xs rounded-full border border-gray-300">
                      {tip}
                    </span>
                  ))}
                </div>
              </div>

              {/* AI Features Info */}
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">How AI Matching Works</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Analyzes your description and preferences</li>
                      <li>• Matches with relevant job postings</li>
                      <li>• Ranks jobs by compatibility score</li>
                      <li>• Shows personalized recommendations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 bg-gray-50 flex gap-3">
            <button
              onClick={() => setShowAIModal(false)}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleAIRecommendation}
              disabled={!aiJobDescription.trim() || aiLoading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {aiLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <TrendingUp className="w-5 h-5" />
                  Find Matching Jobs
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
};

const JobCard = ({ job }) => {
const isExternal = !!job.applyLink;
  
  const getSourceBadgeColor = (source) => {
    if (source === 'Internal') return 'bg-green-100 text-green-800 border-green-200';
    if (source === 'LinkedIn') return 'bg-blue-100 text-blue-800 border-blue-200';
    if (source === 'Naukri') return 'bg-purple-100 text-purple-800 border-purple-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

const getLocationTypeIcon = (type) => {
  if (!type) return '📍';
  const mode = type.toLowerCase();
  if (mode === 'remote') return '🌍';
  if (mode === 'hybrid') return '🏢';
  return '📍';
};


  const daysAgo = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  };
const handleApply = () => {
  if (job.applyLink) {
    window.open(job.applyLink, '_blank', 'noopener,noreferrer');
  } else {
    alert(`Internal application coming soon for: ${job.title}`);
  }
};

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4 flex-1">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">
           {job.companyLogo ? (
  <img
    src={job.companyLogo}
    alt={job.companyName}
    className="w-12 h-12 object-contain rounded"
  />
) : (
  <span>{job.companyName.charAt(0)}</span>
)}

          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-1 hover:text-blue-600 cursor-pointer">
              {job.title}
            </h3>
            <p className="text-gray-700 font-medium mb-2">{job.companyName}</p>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
             {getLocationTypeIcon(job.workMode)} {job.location}
              </span>
              <span className="flex items-center gap-1">
                <Briefcase className="w-4 h-4" />
                {job.jobType}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {daysAgo(job.postedAt || job.createdAt)}
              </span>
            </div>
          </div>
        </div>
        <button className="text-gray-400 hover:text-blue-600 transition-colors">
          <Bookmark className="w-5 h-5" />
        </button>
      </div>

      {/* Skills */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {job.skills.map(skill => (
            <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getSourceBadgeColor(job.source)}`}>
            {job.source}
          </span>
          <span className="text-sm font-semibold text-gray-900">{job.salary}</span>
        </div>
        <button
          onClick={handleApply}
          className={`px-6 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
            isExternal
              ? 'bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isExternal ? (
            <>
              Apply on {job.source}
              <ExternalLink className="w-4 h-4" />
            </>
          ) : (
            <>
              Apply Now
              <ArrowUpRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      {/* External Job Disclaimer */}
      {isExternal && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            This is an external opportunity. You'll be redirected to {job.source} to complete your application.
          </p>
        </div>
      )}
    </div>
  );
};

const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
        <div className="flex-1">
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
          <div className="flex gap-3">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mb-4">
        <div className="h-6 bg-gray-200 rounded-full w-20"></div>
        <div className="h-6 bg-gray-200 rounded-full w-20"></div>
        <div className="h-6 bg-gray-200 rounded-full w-20"></div>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="h-6 bg-gray-200 rounded w-24"></div>
        <div className="h-10 bg-gray-200 rounded w-32"></div>
      </div>
    </div>
  );
};

const JobsList = () => {
  const { filteredJobs, loading, error, sortBy, setSortBy } = useJobs();

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded w-40 animate-pulse"></div>
        </div>
        {[...Array(6)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-red-900 mb-2">Failed to Load Jobs</h3>
        <p className="text-red-700 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (filteredJobs.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
        <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Jobs Found</h3>
        <p className="text-gray-600 mb-4">Try adjusting your filters or search query</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Clear Filters
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            {filteredJobs.length} {filteredJobs.length === 1 ? 'Job' : 'Jobs'} Available
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Showing opportunities from multiple platforms
          </p>
        </div>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer"
          >
            <option value="recent">Most Recent</option>
            <option value="relevance">Most Relevant</option>
          </select>
          <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Job Cards */}
      <div className="space-y-4">
        {filteredJobs.map(job => (
<JobCard key={job._id} job={job} />
        ))}
      </div>

      {/* Pagination Placeholder */}
      <div className="mt-8 flex justify-center">
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Previous
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">1</button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">2</button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">3</button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default function JobsListingPage() {
  const [showTracker, setShowTracker] = useState(false);

  return (
    <JobsProvider>
      <div className="min-h-screen bg-gray-50">
        <Header showTracker={showTracker} setShowTracker={setShowTracker} />
        
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-3xl font-bold">Discover Your Next Opportunity</h2>
              <button 
                onClick={() => setShowTracker(true)}
                className="px-6 py-2.5 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all shadow-md hover:shadow-lg flex items-center gap-2 font-medium border border-white/30"
              >
                <TrendingUp className="w-5 h-5" />
                Track Applied Jobs
              </button>
            </div>
            <p className="text-blue-100 mb-6">
              Explore off-campus jobs and internships from top companies — all in one place
            </p>
            <SearchBar />
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
            {/* Filters Sidebar */}
            <aside className="lg:sticky lg:top-24 h-fit">
              <FilterSection />
            </aside>

            {/* Jobs List */}
            <main>
              <JobsList />
            </main>
          </div>
        </div>
      </div>
    </JobsProvider>
  );
}