import React, { useState, useEffect, createContext, useContext } from 'react';
import { Search, MapPin, Briefcase, ExternalLink, Building2, Calendar, Filter, X, ChevronDown, TrendingUp, Clock, Bookmark, AlertCircle, Loader2, ArrowUpRight, Plus, Edit2, Trash2, FileText, Phone, Mail, MessageSquare, Bell, Download, Eye, CheckCircle, XCircle, AlertTriangle, BarChart3, Users, Target, PieChart, TrendingDown, Activity, Paperclip, Save, Home, LayoutDashboard } from 'lucide-react';

// Mock API Response - Normalized Job Data
const mockJobsData = [
  {
    id: 1,
    title: 'Software Engineer - Full Stack',
    company: 'TechCorp Solutions',
    companyLogo: 'TC',
    location: 'Bangalore, India',
    locationType: 'hybrid',
    jobType: 'Full-Time',
    source: 'Internal',
    applyType: 'internal',
    applyUrl: '/jobs/1/apply',
    postedDate: '2025-12-15',
    salary: '₹12-18 LPA',
    skills: ['React', 'Node.js', 'MongoDB'],
    experienceLevel: '0-2 years'
  },
  {
    id: 2,
    title: 'Frontend Developer Intern',
    company: 'Startup Hub',
    companyLogo: 'SH',
    location: 'Remote',
    locationType: 'remote',
    jobType: 'Internship',
    source: 'Internal',
    applyType: 'internal',
    applyUrl: '/jobs/2/apply',
    postedDate: '2025-12-16',
    salary: '₹15k-25k/month',
    skills: ['JavaScript', 'React', 'CSS'],
    experienceLevel: 'Fresher'
  },
  {
    id: 3,
    title: 'Product Manager - Early Career',
    company: 'Google',
    companyLogo: 'G',
    location: 'Hyderabad, India',
    locationType: 'onsite',
    jobType: 'Full-Time',
    source: 'LinkedIn',
    applyType: 'external',
    applyUrl: 'https://linkedin.com/jobs/google-pm-123',
    postedDate: '2025-12-14',
    salary: 'Competitive',
    skills: ['Product Strategy', 'Analytics', 'Roadmap'],
    experienceLevel: '0-1 years'
  },
  {
    id: 4,
    title: 'Data Analyst Intern',
    company: 'Amazon',
    companyLogo: 'A',
    location: 'Mumbai, India',
    locationType: 'hybrid',
    jobType: 'Internship',
    source: 'Naukri',
    applyType: 'external',
    applyUrl: 'https://naukri.com/amazon-data-analyst-456',
    postedDate: '2025-12-17',
    salary: '₹20k-30k/month',
    skills: ['Python', 'SQL', 'Excel'],
    experienceLevel: 'Fresher'
  },
  {
    id: 5,
    title: 'Backend Engineer',
    company: 'Microsoft',
    companyLogo: 'M',
    location: 'Bangalore, India',
    locationType: 'hybrid',
    jobType: 'Full-Time',
    source: 'Company Career Page',
    applyType: 'external',
    applyUrl: 'https://careers.microsoft.com/backend-eng-789',
    postedDate: '2025-12-13',
    salary: 'Competitive',
    skills: ['Java', 'Spring Boot', 'Microservices'],
    experienceLevel: '0-2 years'
  },
  {
    id: 6,
    title: 'UI/UX Designer Intern',
    company: 'Design Studio Pro',
    companyLogo: 'DS',
    location: 'Remote',
    locationType: 'remote',
    jobType: 'Internship',
    source: 'Internal',
    applyType: 'internal',
    applyUrl: '/jobs/6/apply',
    postedDate: '2025-12-18',
    salary: '₹12k-18k/month',
    skills: ['Figma', 'User Research', 'Prototyping'],
    experienceLevel: 'Fresher'
  }
];

// Mock Applications Data
const mockApplicationsData = [
  {
    id: 'app1',
    jobId: 1,
    jobTitle: 'Software Engineer - Full Stack',
    company: 'TechCorp Solutions',
    companyLogo: 'TC',
    location: 'Bangalore, India',
    salary: '₹12-18 LPA',
    appliedDate: '2025-12-10',
    status: 'interview',
    source: 'LinkedIn',
    resumeVersion: 'Resume_v3_TechStack.pdf',
    coverLetter: true,
    referral: 'John Doe - Senior Engineer',
    notes: 'Great company culture. Emphasize React experience in interview.',
    interviews: [
      { round: 'Phone Screen', date: '2025-12-14', time: '10:00 AM', interviewer: 'Sarah Johnson - HR', status: 'completed', feedback: 'Positive. Moving to technical round.' },
      { round: 'Technical Round 1', date: '2025-12-20', time: '2:00 PM', interviewer: 'Mike Chen - Tech Lead', status: 'scheduled', feedback: '' }
    ],
    communications: [
      { date: '2025-12-10', type: 'email', content: 'Application submitted' },
      { date: '2025-12-12', type: 'email', content: 'Received interview invitation' }
    ],
    followUpDate: '2025-12-22',
    offerDeadline: null
  },
  {
    id: 'app2',
    jobId: 3,
    jobTitle: 'Product Manager - Early Career',
    company: 'Google',
    companyLogo: 'G',
    location: 'Hyderabad, India',
    salary: 'Competitive',
    appliedDate: '2025-12-08',
    status: 'applied',
    source: 'LinkedIn',
    resumeVersion: 'Resume_v2_PM.pdf',
    coverLetter: true,
    referral: null,
    notes: 'Dream job! Focus on metrics and impact in previous projects.',
    interviews: [],
    communications: [
      { date: '2025-12-08', type: 'email', content: 'Application submitted' }
    ],
    followUpDate: '2025-12-22',
    offerDeadline: null
  },
  {
    id: 'app3',
    jobId: 4,
    jobTitle: 'Data Analyst Intern',
    company: 'Amazon',
    companyLogo: 'A',
    location: 'Mumbai, India',
    salary: '₹20k-30k/month',
    appliedDate: '2025-12-05',
    status: 'offer',
    source: 'Naukri',
    resumeVersion: 'Resume_v1_DataAnalytics.pdf',
    coverLetter: false,
    referral: null,
    notes: 'Great offer! Flexible work hours. Need to respond by Dec 25.',
    interviews: [
      { round: 'HR Round', date: '2025-12-09', time: '11:00 AM', interviewer: 'Priya Sharma - HR', status: 'completed', feedback: 'Excellent fit for the role' },
      { round: 'Technical Assessment', date: '2025-12-11', time: '3:00 PM', interviewer: 'Online Test', status: 'completed', feedback: 'Scored 92/100' },
      { round: 'Final Round', date: '2025-12-15', time: '10:00 AM', interviewer: 'Rajesh Kumar - Manager', status: 'completed', feedback: 'Offered position' }
    ],
    communications: [
      { date: '2025-12-05', type: 'email', content: 'Application submitted' },
      { date: '2025-12-07', type: 'email', content: 'Interview scheduled' },
      { date: '2025-12-16', type: 'email', content: 'Offer letter received' }
    ],
    followUpDate: null,
    offerDeadline: '2025-12-25'
  },
  {
    id: 'app4',
    jobId: 2,
    jobTitle: 'Frontend Developer Intern',
    company: 'Startup Hub',
    companyLogo: 'SH',
    location: 'Remote',
    salary: '₹15k-25k/month',
    appliedDate: '2025-12-12',
    status: 'screening',
    source: 'Internal',
    resumeVersion: 'Resume_v3_Frontend.pdf',
    coverLetter: true,
    referral: null,
    notes: 'Startup environment. Good learning opportunity.',
    interviews: [],
    communications: [
      { date: '2025-12-12', type: 'email', content: 'Application submitted' },
      { date: '2025-12-14', type: 'email', content: 'Application under review' }
    ],
    followUpDate: '2025-12-21',
    offerDeadline: null
  },
  {
    id: 'app5',
    jobId: 5,
    jobTitle: 'Backend Engineer',
    company: 'Microsoft',
    companyLogo: 'M',
    location: 'Bangalore, India',
    salary: 'Competitive',
    appliedDate: '2025-11-28',
    status: 'rejected',
    source: 'Company Career Page',
    resumeVersion: 'Resume_v2_Backend.pdf',
    coverLetter: true,
    referral: null,
    notes: 'Didn\'t make it past first round. Good learning experience.',
    interviews: [
      { round: 'Phone Screen', date: '2025-12-02', time: '3:00 PM', interviewer: 'Tech Recruiter', status: 'completed', feedback: 'Not proceeding to next round' }
    ],
    communications: [
      { date: '2025-11-28', type: 'email', content: 'Application submitted' },
      { date: '2025-12-03', type: 'email', content: 'Application rejected' }
    ],
    followUpDate: null,
    offerDeadline: null
  }
];





// Context for Jobs State Management
const JobsContext = createContext();

const JobsProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [applications, setApplications] = useState([]);
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
  const [currentPage, setCurrentPage] = useState('jobs');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setJobs(mockJobsData);
        setFilteredJobs(mockJobsData);
        setApplications(mockApplicationsData);
        setError(null);
      } catch (err) {
        setError('Failed to load jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    let result = [...jobs];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(job => 
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.skills.some(skill => skill.toLowerCase().includes(query))
      );
    }

    if (filters.jobType.length > 0) {
      result = result.filter(job => filters.jobType.includes(job.jobType));
    }

    if (filters.locationType.length > 0) {
      result = result.filter(job => filters.locationType.includes(job.locationType));
    }

    if (filters.source.length > 0) {
      result = result.filter(job => filters.source.includes(job.source));
    }

    if (sortBy === 'recent') {
      result.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
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

  const addApplication = (application) => {
    setApplications(prev => [...prev, application]);
  };

  const updateApplication = (id, updates) => {
    setApplications(prev => prev.map(app => app.id === id ? { ...app, ...updates } : app));
  };

  const deleteApplication = (id) => {
    setApplications(prev => prev.filter(app => app.id !== id));
  };

  const activeFilterCount = Object.values(filters).flat().length;

  return (
    <JobsContext.Provider value={{
      jobs,
      filteredJobs,
      applications,
      loading,
      error,
      searchQuery,
      setSearchQuery,
      filters,
      toggleFilter,
      clearAllFilters,
      activeFilterCount,
      sortBy,
      setSortBy,
      addApplication,
      updateApplication,
      deleteApplication,
      currentPage,
      setCurrentPage
    }}>
      {children}
    </JobsContext.Provider>
  );
};

const useJobs = () => useContext(JobsContext);

// Navigation Header Component
const NavigationHeader = () => {
  const { currentPage, setCurrentPage, applications } = useJobs();
  
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">JobTracker</h1>
            </div>
            
            <nav className="flex gap-2">
              <button
                onClick={() => setCurrentPage('jobs')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  currentPage === 'jobs' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Search className="w-4 h-4" />
                Find Jobs
              </button>
              <button
                onClick={() => setCurrentPage('tracker')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  currentPage === 'tracker' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                My Applications
                {applications.length > 0 && (
                  <span className="bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full">
                    {applications.length}
                  </span>
                )}
              </button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

// Job Search Page Components
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
  const [showSkillsModal, setShowSkillsModal] = useState(false);
  const [userSkills, setUserSkills] = useState('');
  const [selectedResume, setSelectedResume] = useState('');
  const [isLoadingBestJobs, setIsLoadingBestJobs] = useState(false);
  const [bestJobsResult, setBestJobsResult] = useState(null);

  const filterOptions = {
    jobType: ['Full-Time', 'Internship', 'Contract'],
    locationType: [
      { value: 'remote', label: 'Remote' },
      { value: 'onsite', label: 'Onsite' },
      { value: 'hybrid', label: 'Hybrid' }
    ],
    source: ['Internal', 'LinkedIn', 'Naukri', 'Company Career Page']
  };

  const handleFindBestJobs = async () => {
    if (!userSkills.trim()) {
      alert('Please enter your skills first!');
      setShowSkillsModal(true);
      return;
    }

    setIsLoadingBestJobs(true);
    
    try {
      // Simulating API call to backend
      const response = await fetch('/api/find-best-jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          skills: userSkills,
          resume: selectedResume,
          filters: filters
        })
      });

      // Simulate response delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock response - replace with actual API response
      const mockResult = {
        matchedJobs: 8,
        topMatch: 'Software Engineer - Full Stack',
        recommendations: [
          'Based on your React skills, 3 frontend positions are highly recommended',
          'Your Node.js experience matches 5 backend positions',
          'Consider applying to TechCorp Solutions - 95% match'
        ]
      };
      
      setBestJobsResult(mockResult);
      alert(`Found ${mockResult.matchedJobs} jobs matching your profile!\n\nTop Match: ${mockResult.topMatch}\n\n${mockResult.recommendations.join('\n')}`);
      
    } catch (error) {
      console.error('Error finding best jobs:', error);
      alert('Failed to find best jobs. Please try again.');
    } finally {
      setIsLoadingBestJobs(false);
    }
  };

  const handleSaveSkills = () => {
    if (userSkills.trim()) {
      setShowSkillsModal(false);
      // Optionally trigger search immediately after saving
      // handleFindBestJobs();
    } else {
      alert('Please enter at least one skill');
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 p-6">
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

        <div className="mb-6">
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

        {/* AI-Powered Job Matching Section */}
        <div className="pt-6 border-t border-gray-200">
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">AI Job Matching</h3>
                <p className="text-xs text-gray-600">Find jobs that perfectly match your skills and resume</p>
              </div>
            </div>
            
            {userSkills && (
              <div className="bg-white rounded p-2 mb-3 text-xs">
                <span className="font-medium text-gray-700">Your Skills:</span>
                <p className="text-gray-600 mt-1 line-clamp-2">{userSkills}</p>
              </div>
            )}

            <button
              onClick={() => setShowSkillsModal(true)}
              className="w-full px-4 py-2 bg-white border border-purple-200 text-purple-600 rounded-lg text-sm font-medium hover:bg-purple-50 transition-colors mb-2 flex items-center justify-center gap-2"
            >
              <Edit2 className="w-4 h-4" />
              {userSkills ? 'Update Skills & Resume' : 'Add Your Skills & Resume'}
            </button>

            <button
              onClick={handleFindBestJobs}
              disabled={isLoadingBestJobs}
              className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg text-sm font-semibold hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md"
            >
              {isLoadingBestJobs ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Finding Best Matches...
                </>
              ) : (
                <>
                  <Target className="w-4 h-4" />
                  Find Best Jobs for Me
                </>
              )}
            </button>
          </div>

          {bestJobsResult && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 animate-fade-in">
              <div className="flex items-center gap-2 text-green-700 font-semibold mb-2">
                <CheckCircle className="w-5 h-5" />
                {bestJobsResult.matchedJobs} Jobs Found!
              </div>
              <p className="text-sm text-green-600">{bestJobsResult.topMatch}</p>
            </div>
          )}
        </div>
      </div>

      {/* Skills and Resume Modal */}
      {showSkillsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-1">Your Profile</h2>
                  <p className="text-purple-100 text-sm">Help us find the perfect jobs for you</p>
                </div>
                <button 
                  onClick={() => setShowSkillsModal(false)} 
                  className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4 text-purple-600" />
                  Your Skills *
                </label>
                <p className="text-xs text-gray-600 mb-3">
                  Enter your skills separated by commas (e.g., React, Node.js, Python, Machine Learning)
                </p>
                <textarea
                  value={userSkills}
                  onChange={(e) => setUserSkills(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  rows="4"
                  placeholder="e.g., React, Node.js, JavaScript, TypeScript, MongoDB, AWS, Docker, Git"
                />
                <div className="mt-2 flex flex-wrap gap-2">
                  {userSkills && userSkills.split(',').filter(s => s.trim()).map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-medium">
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-purple-600" />
                  Select Resume
                </label>
                <p className="text-xs text-gray-600 mb-3">
                  Choose the resume version you want to use for job matching
                </p>
                <select
                  value={selectedResume}
                  onChange={(e) => setSelectedResume(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select a resume...</option>
                  <option value="resume_v3_techstack.pdf">Resume_v3_TechStack.pdf</option>
                  <option value="resume_v2_pm.pdf">Resume_v2_PM.pdf</option>
                  <option value="resume_v1_dataanalytics.pdf">Resume_v1_DataAnalytics.pdf</option>
                  <option value="resume_v3_frontend.pdf">Resume_v3_Frontend.pdf</option>
                  <option value="resume_v2_backend.pdf">Resume_v2_Backend.pdf</option>
                </select>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-900 text-sm mb-1">How it works</h4>
                    <ul className="text-xs text-blue-700 space-y-1">
                      <li>• Our AI analyzes your skills and resume</li>
                      <li>• We match you with jobs that fit your profile</li>
                      <li>• Get personalized recommendations instantly</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => setShowSkillsModal(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveSkills}
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all flex items-center gap-2 shadow-md"
                >
                  <Save className="w-4 h-4" />
                  Save & Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const JobCard = ({ job }) => {
  const isExternal = job.applyType === 'external';
  
  const getSourceBadgeColor = (source) => {
    if (source === 'Internal') return 'bg-green-100 text-green-800 border-green-200';
    if (source === 'LinkedIn') return 'bg-blue-100 text-blue-800 border-blue-200';
    if (source === 'Naukri') return 'bg-purple-100 text-purple-800 border-purple-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getLocationTypeIcon = (type) => {
    if (type === 'remote') return '🌍';
    if (type === 'hybrid') return '🏢';
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
    if (isExternal) {
      window.open(job.applyUrl, '_blank', 'noopener,noreferrer');
    } else {
      alert(`Redirecting to internal application for: ${job.title}`);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4 flex-1">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">
            {job.companyLogo}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-1 hover:text-blue-600 cursor-pointer">
              {job.title}
            </h3>
            <p className="text-gray-700 font-medium mb-2">{job.company}</p>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {getLocationTypeIcon(job.locationType)} {job.location}
              </span>
              <span className="flex items-center gap-1">
                <Briefcase className="w-4 h-4" />
                {job.jobType}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {daysAgo(job.postedDate)}
              </span>
            </div>
          </div>
        </div>
        <button className="text-gray-400 hover:text-blue-600 transition-colors">
          <Bookmark className="w-5 h-5" />
        </button>
      </div>

      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {job.skills.map(skill => (
            <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
              {skill}
            </span>
          ))}
        </div>
      </div>

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

const JobsList = () => {
  const { filteredJobs, loading, error, sortBy, setSortBy } = useJobs();

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
              <div className="flex-1">
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-red-900 mb-2">Failed to Load Jobs</h3>
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  if (filteredJobs.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
        <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Jobs Found</h3>
        <p className="text-gray-600">Try adjusting your filters or search query</p>
      </div>
    );
  }

  return (
    <div>
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

      <div className="space-y-4">
        {filteredJobs.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

const JobSearchPage = () => {
  return (
    <>
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">Find Your Next Opportunity</h1>
          <p className="text-blue-100 text-lg">Discover jobs from multiple platforms in one place</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <SearchBar />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <FilterSection />
          </aside>

          <main className="lg:col-span-3">
            <JobsList />
          </main>
        </div>
      </div>
    </>
  );
};

// Application Tracker Page Components
const ApplicationTrackerPage = () => {
  const { applications, updateApplication, deleteApplication, addApplication } = useJobs();
  const [view, setView] = useState('kanban');
  const [selectedApp, setSelectedApp] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const statusCategories = {
    applied: { label: 'Applied', color: 'bg-blue-100 text-blue-700 border-blue-200', icon: '📝' },
    screening: { label: 'Screening', color: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: '🔍' },
    interview: { label: 'Interview', color: 'bg-purple-100 text-purple-700 border-purple-200', icon: '💼' },
    offer: { label: 'Offer', color: 'bg-green-100 text-green-700 border-green-200', icon: '🎉' },
    rejected: { label: 'Rejected', color: 'bg-red-100 text-red-700 border-red-200', icon: '❌' }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Application Tracker</h1>
              <p className="text-purple-100">Manage and track your job applications</p>
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Application
            </button>
          </div>

          <div className="grid grid-cols-5 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">{applications.length}</div>
              <div className="text-purple-100 text-sm">Total Applications</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">
                {applications.filter(a => a.status === 'interview').length}
              </div>
              <div className="text-purple-100 text-sm">In Interview</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">
                {applications.filter(a => a.status === 'offer').length}
              </div>
              <div className="text-purple-100 text-sm">Offers</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">
                {applications.filter(a => a.interviews.length > 0).length}
              </div>
              <div className="text-purple-100 text-sm">With Interviews</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">
                {applications.filter(a => a.followUpDate).length}
              </div>
              <div className="text-purple-100 text-sm">Follow-ups Due</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1 py-4">
            <button
              onClick={() => setView('kanban')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                view === 'kanban' ? 'bg-purple-600 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Kanban Board
            </button>
            <button
              onClick={() => setView('list')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                view === 'list' ? 'bg-purple-600 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FileText className="w-4 h-4" />
              List View
            </button>
            <button
              onClick={() => setView('calendar')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                view === 'calendar' ? 'bg-purple-600 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Calendar className="w-4 h-4" />
              Calendar
            </button>
            <button
              onClick={() => setView('analytics')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                view === 'analytics' ? 'bg-purple-600 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              Analytics
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {view === 'kanban' && <KanbanView applications={applications} statusCategories={statusCategories} updateApplication={updateApplication} setSelectedApp={setSelectedApp} />}
        {view === 'list' && <ListView applications={applications} statusCategories={statusCategories} setSelectedApp={setSelectedApp} deleteApplication={deleteApplication} />}
        {view === 'calendar' && <CalendarView applications={applications} />}
        {view === 'analytics' && <AnalyticsView applications={applications} statusCategories={statusCategories} />}
      </div>

      {selectedApp && (
        <ApplicationDetailModal
          application={selectedApp}
          onClose={() => setSelectedApp(null)}
          statusCategories={statusCategories}
          updateApplication={updateApplication}
          deleteApplication={deleteApplication}
        />
      )}

      {isAddModalOpen && (
        <AddApplicationModal
          onClose={() => setIsAddModalOpen(false)}
          addApplication={addApplication}
        />
      )}
    </div>
  );
};

const KanbanView = ({ applications, statusCategories, updateApplication, setSelectedApp }) => {
  const [draggedApp, setDraggedApp] = useState(null);

  const handleDragStart = (app) => {
    setDraggedApp(app);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (status) => {
    if (draggedApp) {
      updateApplication(draggedApp.id, { status });
      setDraggedApp(null);
    }
  };

  return (
    <div className="grid grid-cols-5 gap-4">
      {Object.entries(statusCategories).map(([status, { label, color, icon }]) => {
        const statusApps = applications.filter(app => app.status === status);
        
        return (
          <div key={status} className="bg-gray-100 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <span>{icon}</span>
                {label}
              </h3>
              <span className="bg-white px-2 py-1 rounded-full text-sm font-medium text-gray-700">
                {statusApps.length}
              </span>
            </div>
            
            <div
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(status)}
              className="space-y-3 min-h-[400px]"
            >
              {statusApps.map(app => (
                <div
                  key={app.id}
                  draggable
                  onDragStart={() => handleDragStart(app)}
                  onClick={() => setSelectedApp(app)}
                  className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer border-l-4 border-purple-500"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">
                      {app.companyLogo}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 text-sm mb-1 truncate">
                        {app.jobTitle}
                      </h4>
                      <p className="text-xs text-gray-600">{app.company}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Applied {new Date(app.appliedDate).toLocaleDateString()}
                    </div>
                    {app.interviews.length > 0 && (
                      <div className="flex items-center gap-1 text-purple-600">
                        <Clock className="w-3 h-3" />
                        {app.interviews.length} interview{app.interviews.length > 1 ? 's' : ''}
                      </div>
                    )}
                    {app.offerDeadline && (
                      <div className="flex items-center gap-1 text-orange-600 font-medium">
                        <AlertTriangle className="w-3 h-3" />
                        Deadline: {new Date(app.offerDeadline).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const ListView = ({ applications, statusCategories, setSelectedApp, deleteApplication }) => {
  const [filterStatus, setFilterStatus] = useState('all');
  
  const filteredApps = filterStatus === 'all' 
    ? applications 
    : applications.filter(app => app.status === filterStatus);

  return (
    <div>
      <div className="flex gap-2 mb-6 overflow-x-auto">
        <button
          onClick={() => setFilterStatus('all')}
          className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
            filterStatus === 'all' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 border border-gray-200'
          }`}
        >
          All ({applications.length})
        </button>
        {Object.entries(statusCategories).map(([status, { label, icon }]) => {
          const count = applications.filter(app => app.status === status).length;
          return (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap flex items-center gap-2 ${
                filterStatus === status ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 border border-gray-200'
              }`}
            >
              <span>{icon}</span>
              {label} ({count})
            </button>
          );
        })}
      </div>

      <div className="space-y-3">
        {filteredApps.map(app => {
          const statusInfo = statusCategories[app.status];
          
          return (
            <div key={app.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">
                    {app.companyLogo}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{app.jobTitle}</h3>
                        <p className="text-gray-700 font-medium">{app.company}</p>
                      </div>
                      <span className={`px-3 py-1 text-sm font-medium rounded-full border ${statusInfo.color} flex items-center gap-1`}>
                        <span>{statusInfo.icon}</span>
                        {statusInfo.label}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {app.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Applied {new Date(app.appliedDate).toLocaleDateString()}
                      </span>
                      {app.salary && (
                        <span className="font-medium text-gray-900">{app.salary}</span>
                      )}
                    </div>
                    
                    {app.interviews.length > 0 && (
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm text-purple-600 font-medium">
                          {app.interviews.length} interview round{app.interviews.length > 1 ? 's' : ''}
                        </span>
                        {app.interviews.some(i => i.status === 'scheduled') && (
                          <span className="text-sm text-orange-600 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Upcoming interview
                          </span>
                        )}
                      </div>
                    )}
                    
                    {app.notes && (
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">{app.notes}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => setSelectedApp(app)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    title="View Details"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this application?')) {
                        deleteApplication(app.id);
                      }
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        
        {filteredApps.length === 0 && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
            <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Applications Found</h3>
            <p className="text-gray-600">No applications in this category yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

const CalendarView = ({ applications }) => {
  const upcomingInterviews = applications
    .flatMap(app => 
      app.interviews
        .filter(interview => interview.status === 'scheduled')
        .map(interview => ({ ...interview, app }))
    )
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Interviews</h2>
      
      {upcomingInterviews.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Upcoming Interviews</h3>
          <p className="text-gray-600">Your scheduled interviews will appear here</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {upcomingInterviews.map((interview, index) => (
            <div key={index} className="bg-white rounded-lg border-2 border-purple-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">
                  {interview.app.companyLogo}
                </div>
                
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{interview.app.jobTitle}</h3>
                  <p className="text-gray-700 mb-3">{interview.app.company}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-purple-600 font-medium">
                      <span className="bg-purple-100 px-2 py-1 rounded text-sm">
                        {interview.round}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-700">
                      <Calendar className="w-4 h-4" />
                      {new Date(interview.date).toLocaleDateString('en-IN', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-700">
                      <Clock className="w-4 h-4" />
                      {interview.time}
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-700">
                      <Users className="w-4 h-4" />
                      {interview.interviewer}
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-orange-500" />
                      <span className="text-orange-600 font-medium">
                        {(() => {
                          const interviewDate = new Date(interview.date);
                          const today = new Date();
                          const diffTime = interviewDate - today;
                          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                          
                          if (diffDays === 0) return 'Today';
                          if (diffDays === 1) return 'Tomorrow';
                          if (diffDays < 0) return 'Past';
                          return `In ${diffDays} days`;
                        })()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const AnalyticsView = ({ applications, statusCategories }) => {
  const totalApps = applications.length;
  const interviewApps = applications.filter(app => app.interviews.length > 0).length;
  const offers = applications.filter(app => app.status === 'offer').length;
  const rejected = applications.filter(app => app.status === 'rejected').length;
  
  const successRate = totalApps > 0 ? ((offers / totalApps) * 100).toFixed(1) : 0;
  const interviewRate = totalApps > 0 ? ((interviewApps / totalApps) * 100).toFixed(1) : 0;

  const statusBreakdown = Object.entries(statusCategories).map(([status, { label, color, icon }]) => ({
    status,
    label,
    color,
    icon,
    count: applications.filter(app => app.status === status).length,
    percentage: totalApps > 0 ? ((applications.filter(app => app.status === status).length / totalApps) * 100).toFixed(1) : 0
  }));

  const recentActivity = applications
    .sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate))
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <Target className="w-8 h-8 opacity-80" />
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="text-3xl font-bold mb-1">{totalApps}</div>
            <div className="text-blue-100">Total Applications</div>
          </div>
          
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-8 h-8 opacity-80" />
              <span className="text-sm font-medium">Success</span>
            </div>
            <div className="text-3xl font-bold mb-1">{successRate}%</div>
            <div className="text-green-100">Offer Rate</div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <Activity className="w-8 h-8 opacity-80" />
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="text-3xl font-bold mb-1">{interviewRate}%</div>
            <div className="text-purple-100">Interview Rate</div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <PieChart className="w-8 h-8 opacity-80" />
              <span className="text-sm font-medium">{offers}</span>
            </div>
            <div className="text-3xl font-bold mb-1">{offers}</div>
            <div className="text-orange-100">Offers Received</div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Application Status Breakdown</h2>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="space-y-4">
            {statusBreakdown.map(({ status, label, color, icon, count, percentage }) => (
              <div key={status}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span>{icon}</span>
                    <span className="font-medium text-gray-900">{label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">{count} applications</span>
                    <span className="font-semibold text-gray-900">{percentage}%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${color.split(' ')[0]}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
        <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
          {recentActivity.map(app => {
            const statusInfo = statusCategories[app.status];
            return (
              <div key={app.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">
                    {app.companyLogo}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">{app.jobTitle}</h4>
                        <p className="text-sm text-gray-600">{app.company}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full border ${statusInfo.color}`}>
                          {statusInfo.icon} {statusInfo.label}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(app.appliedDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const ApplicationDetailModal = ({ application, onClose, statusCategories, updateApplication, deleteApplication }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedApp, setEditedApp] = useState(application);
  const [activeTab, setActiveTab] = useState('overview');

  const handleSave = () => {
    updateApplication(application.id, editedApp);
    setIsEditing(false);
  };

  const statusInfo = statusCategories[application.status];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-white font-bold text-xl">
                {application.companyLogo}
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-1">{application.jobTitle}</h2>
                <p className="text-purple-100 text-lg">{application.company}</p>
                <div className="flex items-center gap-3 mt-2 text-sm text-purple-100">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {application.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Applied {new Date(application.appliedDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            <button onClick={onClose} className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            <span className={`px-4 py-2 text-sm font-medium rounded-full border bg-white ${statusInfo.color}`}>
              {statusInfo.icon} {statusInfo.label}
            </span>
            {application.salary && (
              <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                {application.salary}
              </span>
            )}
          </div>
        </div>

        <div className="border-b border-gray-200 px-6">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-3 border-b-2 font-medium transition-colors ${
                activeTab === 'overview' 
                  ? 'border-purple-600 text-purple-600' 
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('interviews')}
              className={`py-3 border-b-2 font-medium transition-colors flex items-center gap-2 ${
                activeTab === 'interviews' 
                  ? 'border-purple-600 text-purple-600' 
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Interviews
              {application.interviews.length > 0 && (
                <span className="bg-purple-100 text-purple-600 text-xs px-2 py-0.5 rounded-full">
                  {application.interviews.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('communications')}
              className={`py-3 border-b-2 font-medium transition-colors ${
                activeTab === 'communications' 
                  ? 'border-purple-600 text-purple-600' 
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Communications
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`py-3 border-b-2 font-medium transition-colors ${
                activeTab === 'documents' 
                  ? 'border-purple-600 text-purple-600' 
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Documents
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Application Source</label>
                  <div className="text-gray-900">{application.source}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Resume Version</label>
                  <div className="text-gray-900">{application.resumeVersion}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Cover Letter</label>
                  <div className="text-gray-900">{application.coverLetter ? 'Yes' : 'No'}</div>
                </div>
                {application.referral && (
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Referral</label>
                    <div className="text-gray-900">{application.referral}</div>
                  </div>
                )}
              </div>

              {application.notes && (
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Notes</label>
                  {isEditing ? (
                    <textarea
                      value={editedApp.notes}
                      onChange={(e) => setEditedApp({ ...editedApp, notes: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      rows="4"
                    />
                  ) : (
                    <div className="bg-gray-50 p-4 rounded-lg text-gray-700">{application.notes}</div>
                  )}
                </div>
              )}

              <div className="grid grid-cols-2 gap-6">
                {application.followUpDate && (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-orange-700 font-medium mb-1">
                      <Bell className="w-5 h-5" />
                      Follow-up Reminder
                    </div>
                    <div className="text-orange-900">{new Date(application.followUpDate).toLocaleDateString()}</div>
                  </div>
                )}
                {application.offerDeadline && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-red-700 font-medium mb-1">
                      <AlertTriangle className="w-5 h-5" />
                      Offer Deadline
                    </div>
                    <div className="text-red-900">{new Date(application.offerDeadline).toLocaleDateString()}</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'interviews' && (
            <div className="space-y-4">
              {application.interviews.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p>No interviews scheduled yet</p>
                </div>
              ) : (
                application.interviews.map((interview, index) => (
                  <div key={index} className={`border-2 rounded-lg p-4 ${
                    interview.status === 'scheduled' ? 'border-purple-200 bg-purple-50' : 'border-gray-200 bg-white'
                  }`}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{interview.round}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(interview.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {interview.time}
                          </span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        interview.status === 'scheduled' 
                          ? 'bg-purple-100 text-purple-700' 
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {interview.status === 'scheduled' ? 'Scheduled' : 'Completed'}
                      </span>
                    </div>
                    
                    <div className="text-sm text-gray-700 mb-2">
                      <span className="font-medium">Interviewer:</span> {interview.interviewer}
                    </div>
                    
                    {interview.feedback && (
                      <div className="bg-white border border-gray-200 rounded p-3 text-sm text-gray-700">
                        <span className="font-medium">Feedback:</span> {interview.feedback}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'communications' && (
            <div className="space-y-3">
              {application.communications.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p>No communications logged</p>
                </div>
              ) : (
                application.communications.map((comm, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        comm.type === 'email' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                      }`}>
                        {comm.type === 'email' ? <Mail className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-gray-900 capitalize">{comm.type}</span>
                          <span className="text-sm text-gray-500">{new Date(comm.date).toLocaleDateString()}</span>
                        </div>
                        <p className="text-gray-700 text-sm">{comm.content}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{application.resumeVersion}</div>
                      <div className="text-sm text-gray-500">Resume</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <Eye className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
              
              {application.coverLetter && (
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Cover Letter</div>
                        <div className="text-sm text-gray-500">PDF Document</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this application?')) {
                  deleteApplication(application.id);
                  onClose();
                }
              }}
              className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete Application
            </button>
            
            <div className="flex items-center gap-3">
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center gap-2"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AddApplicationModal = ({ onClose, addApplication }) => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    company: '',
    location: '',
    salary: '',
    appliedDate: new Date().toISOString().split('T')[0],
    status: 'applied',
    source: '',
    resumeVersion: '',
    coverLetter: false,
    referral: '',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newApp = {
      id: `app${Date.now()}`,
      jobId: null,
      companyLogo: formData.company.substring(0, 2).toUpperCase(),
      ...formData,
      interviews: [],
      communications: [
        { date: formData.appliedDate, type: 'email', content: 'Application submitted' }
      ],
      followUpDate: null,
      offerDeadline: null
    };
    
    addApplication(newApp);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Add New Application</h2>
            <button onClick={onClose} className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Job Title *</label>
              <input
                type="text"
                required
                value={formData.jobTitle}
                onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., Software Engineer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company *</label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., Google"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., Bangalore, India"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Salary</label>
              <input
                type="text"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., ₹12-18 LPA"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Applied Date *</label>
              <input
                type="date"
                required
                value={formData.appliedDate}
                onChange={(e) => setFormData({ ...formData, appliedDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Source *</label>
              <select
                required
                value={formData.source}
                onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select source</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Naukri">Naukri</option>
                <option value="Internal">Internal</option>
                <option value="Company Career Page">Company Career Page</option>
                <option value="Referral">Referral</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Resume Version</label>
              <input
                type="text"
                value={formData.resumeVersion}
                onChange={(e) => setFormData({ ...formData, resumeVersion: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., Resume_v3.pdf"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="coverLetter"
                checked={formData.coverLetter}
                onChange={(e) => setFormData({ ...formData, coverLetter: e.target.checked })}
                className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
              />
              <label htmlFor="coverLetter" className="text-sm font-medium text-gray-700">
                Included Cover Letter
              </label>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Referral</label>
              <input
                type="text"
                value={formData.referral}
                onChange={(e) => setFormData({ ...formData, referral: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., John Doe - Senior Engineer"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows="3"
                placeholder="Add any notes about this application..."
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const TrackJob = () => {
  return (
    <JobsProvider>
      <div className="min-h-screen bg-gray-50">
        <NavigationHeader />
        <MainContent />
      </div>
    </JobsProvider>
  );
};

const MainContent = () => {
  const { currentPage } = useJobs();
  
  return currentPage === 'jobs' ? <JobSearchPage /> : <ApplicationTrackerPage />;
};

export default TrackJob;