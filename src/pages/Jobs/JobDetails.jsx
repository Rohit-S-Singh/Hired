import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { 
  Building2, MapPin, Briefcase, Clock, Globe, ExternalLink, Calendar, 
  Users, DollarSign, Award, GraduationCap, Gift, TrendingUp, Navigation 
} from "lucide-react";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/jobs/jobs/${id}`);
        setJob(res.data.job);
        setError(null);
      } catch (error) {
        console.error(error);
        setError("Failed to load job details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-sm p-8 max-w-md text-center border border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900 mb-2">Job not found</h2>
          <p className="text-slate-600">{error || "This job posting may have been removed"}</p>
        </div>
      </div>
    );
  }

  const formatDate = (date) => {
    if (!date) return "N/A";
    const d = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now - d);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const formatSalary = (salary) => {
    if (!salary || (!salary.min && !salary.max)) return null;
    
    const formatNumber = (num) => {
      return new Intl.NumberFormat('en-US', {
        maximumFractionDigits: 0,
      }).format(num);
    };

    const period = salary.period ? `per ${salary.period.toLowerCase()}` : '';

    if (salary.min && salary.max) {
      return `$${formatNumber(salary.min)} - $${formatNumber(salary.max)} ${period}`;
    } else if (salary.min) {
      return `From $${formatNumber(salary.min)} ${period}`;
    } else if (salary.max) {
      return `Up to $${formatNumber(salary.max)} ${period}`;
    }
    return null;
  };

  const salaryText = formatSalary(job.salary);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Main Content Card */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          {/* Header Section */}
          <div className="p-8 border-b border-slate-200">
            <div className="flex items-start gap-6 mb-6">
              {job.companyLogo ? (
                <img
                  src={job.companyLogo}
                  alt={job.companyName}
                  className="w-16 h-16 rounded-lg object-contain bg-white border border-slate-200"
                />
              ) : (
                <div className="w-16 h-16 rounded-lg bg-slate-100 flex items-center justify-center border border-slate-200">
                  <Building2 className="w-8 h-8 text-slate-400" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-bold text-slate-900 mb-2">{job.title}</h1>
                <div className="text-slate-700 mb-2">{job.companyName}</div>
                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                  {job.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                  )}
                  {!job.location && (job.city || job.state || job.country) && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>
                        {[job.city, job.state, job.country].filter(Boolean).join(', ')}
                      </span>
                    </div>
                  )}
                  {job.postedAt && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{formatDate(job.postedAt)}</span>
                    </div>
                  )}
                  {job.publisher && (
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{job.publisher}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Job Type Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {job.jobType && (
                <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                  {job.jobType}
                </span>
              )}
              {job.workMode && (
                <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                  {job.workMode}
                </span>
              )}
              {job.applyType && (
                <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium capitalize">
                  {job.applyType}
                </span>
              )}
              {job.status && (
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  job.status === 'Open' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {job.status}
                </span>
              )}
            </div>

            {/* Salary Information */}
            {salaryText && (
              <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 text-green-800">
                  <DollarSign className="w-5 h-5" />
                  <span className="font-semibold text-lg">{salaryText}</span>
                </div>
              </div>
            )}

            {/* Apply Button */}
            <div className="flex gap-3">
              <a
                href={job.applyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full transition-colors inline-flex items-center gap-2"
              >
                Apply
                <ExternalLink className="w-4 h-4" />
              </a>
              <button className="px-6 py-2.5 border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-semibold rounded-full transition-colors">
                Save
              </button>
            </div>
          </div>

          {/* Job Details Section */}
          <div className="p-8">
            {/* About the job */}
            {job.description && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">About the job</h2>
                <div className="text-slate-700 leading-relaxed whitespace-pre-line">
                  {job.description}
                </div>
              </div>
            )}

            {/* Benefits */}
            {job.benefits && job.benefits.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Gift className="w-5 h-5 text-indigo-600" />
                  Benefits
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {job.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-2 text-slate-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 flex-shrink-0"></div>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Company Info */}
            <div className="pt-8 border-t border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">About the company</h2>
              <div className="flex items-start gap-4">
                {job.companyLogo ? (
                  <img
                    src={job.companyLogo}
                    alt={job.companyName}
                    className="w-12 h-12 rounded object-contain bg-white border border-slate-200"
                  />
                ) : (
                  <div className="w-12 h-12 rounded bg-slate-100 flex items-center justify-center border border-slate-200">
                    <Building2 className="w-6 h-6 text-slate-400" />
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">{job.companyName}</h3>
                  {job.companyWebsite && (
                    <a
                      href={job.companyWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-indigo-600 hover:underline inline-flex items-center gap-1"
                    >
                      <Globe className="w-4 h-4" />
                      Company Website
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Job Information */}
        <div className="mt-4 bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">Job Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {/* Status and Active State */}
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Status:</span>
              <span className={`font-medium ${job.status === 'Open' ? 'text-green-600' : 'text-slate-900'}`}>
                {job.status || 'N/A'}
              </span>
            </div>
            
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Active:</span>
              <span className={`font-medium ${job.isActive ? 'text-green-600' : 'text-red-600'}`}>
                {job.isActive !== undefined ? (job.isActive ? 'Yes' : 'No') : 'N/A'}
              </span>
            </div>

            {/* Source and Publisher */}
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Source:</span>
              <span className="font-medium text-slate-900 capitalize">{job.source || 'N/A'}</span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Publisher:</span>
              <span className="font-medium text-slate-900">{job.publisher || 'N/A'}</span>
            </div>

            {/* Dates */}
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Posted:</span>
              <span className="font-medium text-slate-900">{formatDate(job.postedAt)}</span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Listed:</span>
              <span className="font-medium text-slate-900">{formatDate(job.createdAt)}</span>
            </div>

            {job.updatedAt && job.updatedAt !== job.createdAt && (
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Last Updated:</span>
                <span className="font-medium text-slate-900">{formatDate(job.updatedAt)}</span>
              </div>
            )}

            {/* Job Types */}
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Job Type:</span>
              <span className="font-medium text-slate-900">{job.jobType || 'N/A'}</span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Work Mode:</span>
              <span className="font-medium text-slate-900">{job.workMode || 'N/A'}</span>
            </div>

            {/* Location Details */}
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Location:</span>
              <span className="font-medium text-slate-900">{job.location || 'N/A'}</span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">City:</span>
              <span className="font-medium text-slate-900">{job.city || 'N/A'}</span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">State:</span>
              <span className="font-medium text-slate-900">{job.state || 'N/A'}</span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Country:</span>
              <span className="font-medium text-slate-900">{job.country || 'N/A'}</span>
            </div>

            {/* Coordinates */}
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Latitude:</span>
              <span className="font-medium text-slate-900">
                {job.coordinates?.lat !== null && job.coordinates?.lat !== undefined 
                  ? job.coordinates.lat.toFixed(4) 
                  : 'N/A'}
              </span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Longitude:</span>
              <span className="font-medium text-slate-900">
                {job.coordinates?.lng !== null && job.coordinates?.lng !== undefined 
                  ? job.coordinates.lng.toFixed(4) 
                  : 'N/A'}
              </span>
            </div>

            {/* Salary Details */}
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Salary Range:</span>
              <span className="font-medium text-slate-900">{salaryText || 'N/A'}</span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Salary Period:</span>
              <span className="font-medium text-slate-900 capitalize">
                {job.salary?.period || 'N/A'}
              </span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Min Salary:</span>
              <span className="font-medium text-slate-900">
                {job.salary?.min ? `$${job.salary.min.toLocaleString()}` : 'N/A'}
              </span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Max Salary:</span>
              <span className="font-medium text-slate-900">
                {job.salary?.max ? `$${job.salary.max.toLocaleString()}` : 'N/A'}
              </span>
            </div>

            {/* Apply Info */}
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Application Type:</span>
              <span className="font-medium text-slate-900 capitalize">{job.applyType || 'N/A'}</span>
            </div>

            {/* Company Info */}
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Company Website:</span>
              <span className="font-medium text-slate-900">
                {job.companyWebsite ? (
                  <a 
                    href={job.companyWebsite} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline"
                  >
                    View
                  </a>
                ) : 'N/A'}
              </span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Company Logo:</span>
              <span className="font-medium text-slate-900">
                {job.companyLogo ? 'Available' : 'N/A'}
              </span>
            </div>

            {/* Benefits Count */}
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Benefits Offered:</span>
              <span className="font-medium text-slate-900">
                {job.benefits && job.benefits.length > 0 ? `${job.benefits.length} benefits` : 'N/A'}
              </span>
            </div>

            {/* Description Status */}
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Description:</span>
              <span className="font-medium text-slate-900">
                {job.description ? 'Available' : 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;