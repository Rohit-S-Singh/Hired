import React, { useState, createContext, useContext, useEffect } from 'react';
import { LayoutDashboard, Briefcase, Users, User, LogOut, Plus, Search, Filter, X, Edit, Trash2, Eye, Moon, Sun, Bell, ChevronDown, TrendingUp, TrendingDown } from 'lucide-react';

// Context for global state management
const DashboardContext = createContext();

// Mock data
const initialJobs = [
  {
    id: 1,
    title: 'Senior Software Engineer',
    description: 'Looking for experienced developer with strong backend skills',
    skills: ['React', 'Node.js', 'MongoDB', 'AWS'],
    location: 'Bangalore',
    salary: '15-25 LPA',
    experience: '3-5 years',
    lastDate: '2026-02-15',
    status: 'Open',
    applicants: 45,
    createdAt: '2026-01-01'
  },
  {
    id: 2,
    title: 'Frontend Developer',
    description: 'Building responsive web applications',
    skills: ['React', 'TypeScript', 'CSS', 'Redux'],
    location: 'Remote',
    salary: '10-18 LPA',
    experience: '2-4 years',
    lastDate: '2026-02-20',
    status: 'Open',
    applicants: 32,
    createdAt: '2026-01-05'
  },
  {
    id: 3,
    title: 'Data Scientist',
    description: 'ML and AI projects',
    skills: ['Python', 'TensorFlow', 'SQL', 'Statistics'],
    location: 'Mumbai',
    salary: '20-30 LPA',
    experience: '4-6 years',
    lastDate: '2026-01-20',
    status: 'Closed',
    applicants: 28,
    createdAt: '2025-12-15'
  }
];

const initialApplicants = [
  {
    id: 1,
    jobId: 1,
    name: 'Rahul Sharma',
    email: 'rahul@email.com',
    phone: '+91 9876543210',
    college: 'IIT Delhi',
    skills: ['React', 'Node.js', 'MongoDB'],
    experience: '3 years',
    status: 'Shortlisted',
    appliedDate: '2026-01-10',
    resume: 'rahul_resume.pdf'
  },
  {
    id: 2,
    jobId: 1,
    name: 'Priya Singh',
    email: 'priya@email.com',
    phone: '+91 9876543211',
    college: 'NIT Trichy',
    skills: ['React', 'AWS', 'Docker'],
    experience: '4 years',
    status: 'Interviewed',
    appliedDate: '2026-01-08',
    resume: 'priya_resume.pdf'
  },
  {
    id: 3,
    jobId: 2,
    name: 'Amit Kumar',
    email: 'amit@email.com',
    phone: '+91 9876543212',
    college: 'BITS Pilani',
    skills: ['React', 'TypeScript', 'CSS'],
    experience: '2 years',
    status: 'Applied',
    appliedDate: '2026-01-12',
    resume: 'amit_resume.pdf'
  },
  {
    id: 4,
    jobId: 1,
    name: 'Sneha Patel',
    email: 'sneha@email.com',
    phone: '+91 9876543213',
    college: 'IIT Bombay',
    skills: ['Node.js', 'MongoDB', 'AWS'],
    experience: '5 years',
    status: 'Hired',
    appliedDate: '2026-01-05',
    resume: 'sneha_resume.pdf'
  },
  {
    id: 5,
    jobId: 2,
    name: 'Vikram Reddy',
    email: 'vikram@email.com',
    phone: '+91 9876543214',
    college: 'VIT Vellore',
    skills: ['React', 'Redux', 'JavaScript'],
    experience: '3 years',
    status: 'Rejected',
    appliedDate: '2026-01-11',
    resume: 'vikram_resume.pdf'
  }
];

// Dashboard Provider Component
const DashboardProvider = ({ children }) => {
  const [jobs, setJobs] = useState(initialJobs);
  const [applicants, setApplicants] = useState(initialApplicants);
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [notifications] = useState(5);

  const recruiterInfo = {
    name: 'Sarah Johnson',
    company: 'TechCorp Solutions',
    email: 'sarah@techcorp.com'
  };

  // Calculate statistics
  const stats = {
    totalJobs: jobs.length,
    totalApplicants: applicants.length,
    shortlisted: applicants.filter(a => a.status === 'Shortlisted').length,
    hired: applicants.filter(a => a.status === 'Hired').length,
    interviewed: applicants.filter(a => a.status === 'Interviewed').length,
    rejected: applicants.filter(a => a.status === 'Rejected').length
  };

  return (
    <DashboardContext.Provider value={{
      jobs, setJobs,
      applicants, setApplicants,
      darkMode, setDarkMode,
      currentPage, setCurrentPage,
      recruiterInfo,
      stats,
      notifications
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

// Custom hook to use dashboard context
const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) throw new Error('useDashboard must be used within DashboardProvider');
  return context;
};

// Removed Sidebar Component - Now using top navigation only



// Dashboard Overview Component
const DashboardOverview = () => {
  const { stats, darkMode, jobs, applicants, setCurrentPage } = useDashboard();

  const statCards = [
    { label: 'Total Jobs', value: stats.totalJobs, icon: Briefcase, color: 'blue', trend: '+12%' },
    { label: 'Total Applicants', value: stats.totalApplicants, icon: Users, color: 'green', trend: '+8%' },
    { label: 'Shortlisted', value: stats.shortlisted, icon: TrendingUp, color: 'yellow', trend: '+15%' },
    { label: 'Hired', value: stats.hired, icon: TrendingUp, color: 'purple', trend: '+5%' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Dashboard Overview</h2>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Welcome back, here's what's happening</p>
        </div>
        <button
          onClick={() => setCurrentPage('applicants')}
          className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors shadow-lg"
        >
          <Users size={20} />
          View All Applicants
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => (
          <div key={idx} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900`}>
                <stat.icon className={`text-${stat.color}-600`} size={24} />
              </div>
              <span className="text-green-500 text-sm font-medium flex items-center gap-1">
                <TrendingUp size={16} />
                {stat.trend}
              </span>
            </div>
            <h3 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stat.value}</h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Recent Jobs</h3>
          <div className="space-y-3">
            {jobs.slice(0, 3).map(job => (
              <div key={job.id} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{job.title}</h4>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{job.location} • {job.salary}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    job.status === 'Open' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {job.status}
                  </span>
                </div>
                <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{job.applicants} applicants</p>
              </div>
            ))}
          </div>
        </div>

        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Application Status</h3>
          <div className="space-y-3">
            {[
              { status: 'Applied', count: applicants.filter(a => a.status === 'Applied').length, color: 'blue' },
              { status: 'Shortlisted', count: stats.shortlisted, color: 'yellow' },
              { status: 'Interviewed', count: stats.interviewed, color: 'purple' },
              { status: 'Hired', count: stats.hired, color: 'green' }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{item.status}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className={`bg-${item.color}-500 h-2 rounded-full`} style={{ width: `${(item.count / stats.totalApplicants) * 100}%` }} />
                  </div>
                  <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Job Management Component
const JobManagement = () => {
  const { jobs, setJobs, darkMode, applicants } = useDashboard();
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [formData, setFormData] = useState({
    title: '', description: '', skills: '', location: '', 
    salary: '', experience: '', lastDate: '', status: 'Open'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const skillsArray = formData.skills.split(',').map(s => s.trim());
    
    if (editingJob) {
      setJobs(jobs.map(job => job.id === editingJob.id 
        ? { ...job, ...formData, skills: skillsArray }
        : job
      ));
    } else {
      const newJob = {
        id: Date.now(),
        ...formData,
        skills: skillsArray,
        applicants: 0,
        createdAt: new Date().toISOString()
      };
      setJobs([newJob, ...jobs]);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', skills: '', location: '', salary: '', experience: '', lastDate: '', status: 'Open' });
    setEditingJob(null);
    setShowForm(false);
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setFormData({ ...job, skills: job.skills.join(', ') });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      setJobs(jobs.filter(job => job.id !== id));
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || job.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Job Management</h2>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Create and manage job postings</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus size={20} />
          Post New Job
        </button>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search jobs by title or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className={`px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
        >
          <option>All</option>
          <option>Open</option>
          <option>Closed</option>
        </select>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {editingJob ? 'Edit Job' : 'Post New Job'}
              </h3>
              <button onClick={resetForm} className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Job Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Description *</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Skills (comma-separated) *</label>
                  <input
                    type="text"
                    required
                    value={formData.skills}
                    onChange={(e) => setFormData({...formData, skills: e.target.value})}
                    className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Location *</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Salary *</label>
                  <input
                    type="text"
                    required
                    value={formData.salary}
                    onChange={(e) => setFormData({...formData, salary: e.target.value})}
                    className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Experience *</label>
                  <input
                    type="text"
                    required
                    value={formData.experience}
                    onChange={(e) => setFormData({...formData, experience: e.target.value})}
                    className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Last Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.lastDate}
                    onChange={(e) => setFormData({...formData, lastDate: e.target.value})}
                    className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                  />
                </div>
              </div>

              <div className="flex gap-3 justify-end">
                <button type="button" onClick={resetForm} className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'}`}>
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  {editingJob ? 'Update Job' : 'Post Job'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {filteredJobs.map(job => {
          const jobApplicants = applicants.filter(a => a.jobId === job.id).length;
          return (
            <div key={job.id} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{job.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      job.status === 'Open' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {job.status}
                    </span>
                  </div>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-3`}>{job.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {job.skills.map((skill, idx) => (
                      <span key={idx} className={`px-2 py-1 rounded text-xs ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className={`flex gap-6 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <span>📍 {job.location}</span>
                    <span>💰 {job.salary}</span>
                    <span>📅 Exp: {job.experience}</span>
                    <span>⏰ Closes: {new Date(job.lastDate).toLocaleDateString()}</span>
                    <span>👥 {jobApplicants} applicants</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(job)}
                    className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 text-blue-400' : 'bg-blue-50 text-blue-600'} hover:bg-opacity-80`}
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(job.id)}
                    className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 text-red-400' : 'bg-red-50 text-red-600'} hover:bg-opacity-80`}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Applicant Management Component  
const ApplicantManagement = () => {
  const { applicants, setApplicants, jobs, darkMode, setCurrentPage } = useDashboard();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterJob, setFilterJob] = useState('All');
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [currentPageLocal, setCurrentPageLocal] = useState(1);
  const itemsPerPage = 5;

  const handleStatusChange = (applicantId, newStatus) => {
    setApplicants(applicants.map(app => 
      app.id === applicantId ? { ...app, status: newStatus } : app
    ));
  };

  const filteredApplicants = applicants.filter(applicant => {
    const matchesSearch = 
      applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
      applicant.college.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || applicant.status === filterStatus;
    const matchesJob = filterJob === 'All' || applicant.jobId === parseInt(filterJob);
    return matchesSearch && matchesStatus && matchesJob;
  });

  // Pagination
  const totalPages = Math.ceil(filteredApplicants.length / itemsPerPage);
  const paginatedApplicants = filteredApplicants.slice(
    (currentPageLocal - 1) * itemsPerPage,
    currentPageLocal * itemsPerPage
  );

  const getJobTitle = (jobId) => {
    const job = jobs.find(j => j.id === jobId);
    return job ? job.title : 'Unknown';
  };

  const statusColors = {
    'Applied': 'bg-blue-100 text-blue-700',
    'Shortlisted': 'bg-yellow-100 text-yellow-700',
    'Interviewed': 'bg-purple-100 text-purple-700',
    'Hired': 'bg-green-100 text-green-700',
    'Rejected': 'bg-red-100 text-red-700'
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Applicant Management</h2>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Review and manage candidate applications</p>
        </div>
        <button
          onClick={() => setCurrentPage('dashboard')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          <LayoutDashboard size={20} />
          Back to Dashboard
        </button>
      </div>

      <div className="flex gap-4 flex-wrap">
        <div className="flex-1 min-w-[200px] relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by name, skills, or college..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className={`px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
        >
          <option>All</option>
          <option>Applied</option>
          <option>Shortlisted</option>
          <option>Interviewed</option>
          <option>Hired</option>
          <option>Rejected</option>
        </select>
        <select
          value={filterJob}
          onChange={(e) => setFilterJob(e.target.value)}
          className={`px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
        >
          <option value="All">All Jobs</option>
          {jobs.map(job => (
            <option key={job.id} value={job.id}>{job.title}</option>
          ))}
        </select>
      </div>

      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'} overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Candidate</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Job Position</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Skills</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Status</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Applied Date</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Actions</th>
              </tr>
            </thead>
            <tbody className={`${darkMode ? 'divide-gray-700' : 'divide-gray-200'} divide-y`}>
              {paginatedApplicants.map(applicant => (
                <tr key={applicant.id} className={darkMode ? 'hover:bg-gray-750' : 'hover:bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                        {applicant.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{applicant.name}</div>
                        <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{applicant.college}</div>
                      </div>
                    </div>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                    {getJobTitle(applicant.jobId)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {applicant.skills.slice(0, 2).map((skill, idx) => (
                        <span key={idx} className={`px-2 py-1 rounded text-xs ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                          {skill}
                        </span>
                      ))}
                      {applicant.skills.length > 2 && (
                        <span className={`px-2 py-1 rounded text-xs ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                          +{applicant.skills.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={applicant.status}
                      onChange={(e) => handleStatusChange(applicant.id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[applicant.status]} border-0 cursor-pointer`}
                    >
                      <option>Applied</option>
                      <option>Shortlisted</option>
                      <option>Interviewed</option>
                      <option>Hired</option>
                      <option>Rejected</option>
                    </select>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                    {new Date(applicant.appliedDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => setSelectedApplicant(applicant)}
                      className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 text-blue-400' : 'bg-blue-50 text-blue-600'} hover:bg-opacity-80`}
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className={`px-6 py-4 flex items-center justify-between border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
              Showing {((currentPageLocal - 1) * itemsPerPage) + 1} to {Math.min(currentPageLocal * itemsPerPage, filteredApplicants.length)} of {filteredApplicants.length} results
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPageLocal(p => Math.max(1, p - 1))}
                disabled={currentPageLocal === 1}
                className={`px-3 py-1 rounded ${currentPageLocal === 1 ? 'opacity-50 cursor-not-allowed' : ''} ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPageLocal(i + 1)}
                  className={`px-3 py-1 rounded ${currentPageLocal === i + 1 ? 'bg-blue-500 text-white' : darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPageLocal(p => Math.min(totalPages, p + 1))}
                disabled={currentPageLocal === totalPages}
                className={`px-3 py-1 rounded ${currentPageLocal === totalPages ? 'opacity-50 cursor-not-allowed' : ''} ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Applicant Detail Modal */}
      {selectedApplicant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto`}>
            <div className="flex justify-between items-center mb-6">
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Candidate Profile</h3>
              <button onClick={() => setSelectedApplicant(null)} className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  {selectedApplicant.name.charAt(0)}
                </div>
                <div>
                  <h4 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedApplicant.name}</h4>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{selectedApplicant.college}</p>
                  <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${statusColors[selectedApplicant.status]}`}>
                    {selectedApplicant.status}
                  </span>
                </div>
              </div>

              <div className={`grid grid-cols-2 gap-4 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Email</p>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedApplicant.email}</p>
                </div>
                <div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Phone</p>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedApplicant.phone}</p>
                </div>
                <div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Experience</p>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedApplicant.experience}</p>
                </div>
                <div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Applied For</p>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{getJobTitle(selectedApplicant.jobId)}</p>
                </div>
              </div>

              <div>
                <h5 className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Skills</h5>
                <div className="flex flex-wrap gap-2">
                  {selectedApplicant.skills.map((skill, idx) => (
                    <span key={idx} className={`px-3 py-1 rounded-lg ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h5 className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Resume</h5>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`Downloading: ${selectedApplicant.resume}`);
                  }}
                >
                  <Eye size={18} />
                  View Resume
                </a>
              </div>

              <div>
                <h5 className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Update Status</h5>
                <select
                  value={selectedApplicant.status}
                  onChange={(e) => {
                    handleStatusChange(selectedApplicant.id, e.target.value);
                    setSelectedApplicant({ ...selectedApplicant, status: e.target.value });
                  }}
                  className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                >
                  <option>Applied</option>
                  <option>Shortlisted</option>
                  <option>Interviewed</option>
                  <option>Hired</option>
                  <option>Rejected</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Removed Profile Component - Not needed

// Removed Job Management Component - Not needed

// Main App Component
const App = () => {
  const { currentPage, darkMode } = useDashboard();

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <DashboardOverview />;
      case 'applicants': return <ApplicantManagement />;
      default: return <DashboardOverview />;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <main className="pt-16 p-6">
        <div className="max-w-7xl mx-auto">
          {renderPage()}
        </div>
      </main>
    </div>
  );
};

// Root Component with Provider
export default function RecruiterDashboard() {
  return (
    <DashboardProvider>
      <App />
    </DashboardProvider>
  );
}