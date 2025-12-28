import { useEffect, useState } from "react";
import JobCard from "./JobCard";
import axios from "axios";
import { useGlobalContext } from "../AUTH/GlobalContext";
import { RefreshCw, Briefcase, TrendingUp, Filter, Search, Building2, Clock, Grid3x3, List, X, Bookmark } from "lucide-react";

const SaveButton = ({ jobId, onSaveSuccess }) => {
  const { user } = useGlobalContext();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

const saveJob = async () => {
  if (!user) {
    alert("Please login to save jobs");
    return;
  }

  try {
    setSaving(true);

    const token = localStorage.getItem("jwtToken");

    await axios.post(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/api/jobs/save`,
      {
        userId: user._id,
        jobId: jobId
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setSaved(true);
    onSaveSuccess?.();

    setTimeout(() => setSaved(false), 2000);
  } catch (error) {
    console.error("Error saving job:", error);

    if (error.response?.status === 409) {
      alert("Job already saved!");
    } else {
      alert("Failed to save job");
    }
  } finally {
    setSaving(false);
  }
};


  return (
    <button
      onClick={saveJob}
      disabled={saving || saved}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
        saved
          ? "bg-green-50 text-green-600 border border-green-200"
          : "bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100"
      } ${saving ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <Bookmark className={`w-4 h-4 ${saved ? "fill-current" : ""}`} />
      {saving ? "Saving..." : saved ? "Saved!" : "Save Job"}
    </button>
  );
};

const RandomJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedWorkMode, setSelectedWorkMode] = useState("all");
  const [selectedJobType, setSelectedJobType] = useState("all");
  const [selectedSource, setSelectedSource] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  
  // View mode
  const [viewMode, setViewMode] = useState("grid");
  
  // Pagination
  const [displayCount, setDisplayCount] = useState(12);

  const fetchJobs = async () => {
    try {
      setRefreshing(true);
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/jobs/random?limit=50`);
      setJobs(res.data.jobs);
      setFilteredJobs(res.data.jobs);
      setError(null);
    } catch (error) {
      console.error(error);
      setError("Failed to load jobs. Please try again.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Filter jobs based on search and filters
  useEffect(() => {
    let filtered = [...jobs];

    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedWorkMode !== "all") {
      filtered = filtered.filter(job => job.workMode === selectedWorkMode);
    }

    if (selectedJobType !== "all") {
      filtered = filtered.filter(job => job.jobType === selectedJobType);
    }

    if (selectedSource !== "all") {
      filtered = filtered.filter(job => job.source === selectedSource);
    }

    setFilteredJobs(filtered);
    setDisplayCount(12);
  }, [searchTerm, selectedWorkMode, selectedJobType, selectedSource, jobs]);

  // Get unique values for filters
  const workModes = ["all", ...new Set(jobs.map(j => j.workMode).filter(Boolean))];
  const jobTypes = ["all", ...new Set(jobs.map(j => j.jobType).filter(Boolean))];
  const sources = ["all", ...new Set(jobs.map(j => j.source).filter(Boolean))];

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedWorkMode("all");
    setSelectedJobType("all");
    setSelectedSource("all");
  };

  const activeFiltersCount = [
    searchTerm,
    selectedWorkMode !== "all",
    selectedJobType !== "all",
    selectedSource !== "all"
  ].filter(Boolean).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading opportunities...</p>
        </div>
      </div>
    );
  }

  if (error && jobs.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to Load Jobs</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchJobs}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="max-w-7xl mx-auto mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Find Your Next Opportunity
            </h1>
            <p className="text-lg text-gray-600">
              {filteredJobs.length} positions available from top companies
            </p>
          </div>

          {/* Search and Filters Bar */}
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by job title, company, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors relative"
                >
                  <Filter className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-700">Filters</span>
                  {activeFiltersCount > 0 && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>

                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-3 transition-colors ${viewMode === "grid" ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50"}`}
                  >
                    <Grid3x3 className="w-5 h-5" />
                  </button>
                  <div className="w-px h-6 bg-gray-300"></div>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-3 transition-colors ${viewMode === "list" ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50"}`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>

                <button
                  onClick={fetchJobs}
                  disabled={refreshing}
                  className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
                  <span className="font-medium">{refreshing ? 'Refreshing' : 'Refresh'}</span>
                </button>
              </div>
            </div>

            {/* Expandable Filters */}
            {showFilters && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6 animate-fade-in">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Filter Results</h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Work Mode</label>
                    <select
                      value={selectedWorkMode}
                      onChange={(e) => setSelectedWorkMode(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {workModes.map(mode => (
                        <option key={mode} value={mode}>
                          {mode === "all" ? "All Work Modes" : mode}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
                    <select
                      value={selectedJobType}
                      onChange={(e) => setSelectedJobType(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {jobTypes.map(type => (
                        <option key={type} value={type}>
                          {type === "all" ? "All Job Types" : type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Source</label>
                    <select
                      value={selectedSource}
                      onChange={(e) => setSelectedSource(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {sources.map(source => (
                        <option key={source} value={source}>
                          {source === "all" ? "All Sources" : source}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {activeFiltersCount > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <button
                      onClick={clearFilters}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{filteredJobs.length}</p>
                  <p className="text-sm text-gray-600">Open Positions</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-50 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{sources.length - 1}</p>
                  <p className="text-sm text-gray-600">Job Boards</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <Building2 className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{new Set(jobs.map(j => j.companyName)).size}</p>
                  <p className="text-sm text-gray-600">Companies</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-50 rounded-lg">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">24h</p>
                  <p className="text-sm text-gray-600">Last Updated</p>
                </div>
              </div>
            </div>
          </div>

          {/* Jobs Grid/List */}
          {filteredJobs.length === 0 ? (
            <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow-sm p-12 text-center">
              <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Jobs Found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
              <button
                onClick={clearFilters}
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <div className={`${viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}`}>
                {filteredJobs.slice(0, displayCount).map((job, index) => (
                  <div
                    key={job._id}
                    className="group animate-fade-in bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg hover:border-blue-300 transition-all cursor-pointer"
                    style={{ animationDelay: `${index * 0.03}s` }}
                  >
                    <JobCard job={job} viewMode={viewMode} />
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <SaveButton jobId={job._id} onSaveSuccess={() => console.log(`Job ${job._id} saved!`)} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More */}
              {displayCount < filteredJobs.length && (
                <div className="text-center mt-8">
                  <button
                    onClick={() => setDisplayCount(prev => prev + 12)}
                    className="px-8 py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all"
                  >
                    Load More ({filteredJobs.length - displayCount} remaining)
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default RandomJobs;