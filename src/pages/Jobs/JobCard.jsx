import { useNavigate } from "react-router-dom";
import { MapPin, Briefcase, DollarSign, Calendar, ExternalLink } from "lucide-react";

const JobCard = ({ job, viewMode = "grid" }) => {
  const navigate = useNavigate();

  const openJob = () => {
    navigate(`/job/${job._id}`);
  };

  // Format salary display
  const formatSalary = () => {
    if (!job.salary?.min && !job.salary?.max) return null;
    
    const formatNumber = (num) => {
      if (num >= 100000) return `${(num / 100000).toFixed(1)}L`;
      if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
      return num;
    };

    if (job.salary.min && job.salary.max) {
      return `₹${formatNumber(job.salary.min)} - ₹${formatNumber(job.salary.max)}${job.salary.period ? `/${job.salary.period.toLowerCase()}` : ''}`;
    }
    if (job.salary.min) return `₹${formatNumber(job.salary.min)}+${job.salary.period ? `/${job.salary.period.toLowerCase()}` : ''}`;
    if (job.salary.max) return `Up to ₹${formatNumber(job.salary.max)}${job.salary.period ? `/${job.salary.period.toLowerCase()}` : ''}`;
  };

  // Format posted date
  const formatPostedDate = () => {
    if (!job.postedAt) return null;
    
    const date = new Date(job.postedAt);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const salary = formatSalary();
  const postedDate = formatPostedDate();

  if (viewMode === "list") {
    return (
      <div onClick={openJob} className="cursor-pointer">
        <div className="flex items-start gap-4">
          {/* Company Logo */}
          <div className="flex-shrink-0">
            {job.companyLogo ? (
              <img
                src={job.companyLogo}
                alt={`${job.companyName} logo`}
                className="w-16 h-16 rounded-lg object-contain border border-gray-200 bg-white p-2"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div
              className={`w-16 h-16 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center ${job.companyLogo ? 'hidden' : 'flex'}`}
            >
              <span className="text-white text-xl font-bold">
                {job.companyName.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>

          {/* Job Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                  {job.title}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-gray-700 font-medium">{job.companyName}</p>
                  {job.publisher && (
                    <span className="text-xs text-gray-500 px-2 py-0.5 bg-gray-100 rounded">
                      via {job.publisher}
                    </span>
                  )}
                </div>
              </div>
              
              {salary && (
                <div className="flex items-center gap-1.5 text-green-600 font-semibold bg-green-50 px-3 py-1.5 rounded-lg flex-shrink-0">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-sm">{salary}</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
              {job.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>{job.location}</span>
                </div>
              )}
              
              {job.workMode && (
                <div className="flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-gray-400" />
                  <span>{job.workMode}</span>
                </div>
              )}
              
              {job.jobType && (
                <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md font-medium">
                  {job.jobType}
                </span>
              )}

              {postedDate && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>{postedDate}</span>
                </div>
              )}
            </div>

            {job.description && (
              <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                {job.description.replace(/<[^>]*>/g, '').substring(0, 150)}...
              </p>
            )}

            {job.benefits && job.benefits.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {job.benefits.slice(0, 3).map((benefit, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-1 bg-purple-50 text-purple-700 rounded-md"
                  >
                    {benefit}
                  </span>
                ))}
                {job.benefits.length > 3 && (
                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-md">
                    +{job.benefits.length - 3} more
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Grid view (default)
  return (
    <div onClick={openJob} className="cursor-pointer">
      {/* Company Logo Header */}
      <div className="flex items-center gap-3 mb-4">
        {job.companyLogo ? (
          <img
            src={job.companyLogo}
            alt={`${job.companyName} logo`}
            className="w-12 h-12 rounded-lg object-contain border border-gray-200 bg-white p-1.5"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div
          className={`w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center ${job.companyLogo ? 'hidden' : 'flex'}`}
        >
          <span className="text-white text-lg font-bold">
            {job.companyName.charAt(0).toUpperCase()}
          </span>
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 truncate">{job.companyName}</h4>
          {job.publisher && (
            <p className="text-xs text-gray-500 truncate">via {job.publisher}</p>
          )}
        </div>
      </div>

      {/* Job Title */}
      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-3 line-clamp-2">
        {job.title}
      </h3>

      {/* Location & Work Mode */}
      <div className="space-y-2 mb-4">
        {job.location && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span className="truncate">{job.location}</span>
          </div>
        )}
        
        <div className="flex items-center gap-2 flex-wrap">
          {job.workMode && (
            <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md font-medium">
              <Briefcase className="w-3.5 h-3.5" />
              {job.workMode}
            </span>
          )}
          
          {job.jobType && (
            <span className="inline-flex items-center text-xs px-2.5 py-1 bg-green-50 text-green-700 rounded-md font-medium">
              {job.jobType}
            </span>
          )}
        </div>
      </div>

      {/* Salary */}
      {salary && (
        <div className="flex items-center gap-1.5 text-green-600 font-semibold mb-3 bg-green-50 px-3 py-2 rounded-lg">
          <DollarSign className="w-4 h-4" />
          <span className="text-sm">{salary}</span>
        </div>
      )}

      {/* Benefits */}
      {job.benefits && job.benefits.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {job.benefits.slice(0, 2).map((benefit, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 bg-purple-50 text-purple-700 rounded-md truncate"
            >
              {benefit}
            </span>
          ))}
          {job.benefits.length > 2 && (
            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-md">
              +{job.benefits.length - 2}
            </span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
        {postedDate && (
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{postedDate}</span>
          </div>
        )}
        
        <div className="flex items-center gap-1 text-blue-600 group-hover:text-blue-700 font-medium">
          <span>View Details</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};

export default JobCard;