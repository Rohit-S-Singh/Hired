import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Building2, MapPin, Briefcase, Clock, Globe, ExternalLink, Calendar, CheckCircle2, XCircle } from "lucide-react";

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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
          <p className="text-gray-600">{error || "Job not found"}</p>
        </div>
      </div>
    );
  }

  const formatDate = (date) => {
    if (!date) return "Not specified";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status) => {
    return status === "Open" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800";
  };

  const getWorkModeColor = (mode) => {
    const colors = {
      Remote: "bg-blue-100 text-blue-800",
      Onsite: "bg-purple-100 text-purple-800",
      Hybrid: "bg-indigo-100 text-indigo-800",
    };
    return colors[mode] || "bg-gray-100 text-gray-800";
  };

  const getJobTypeColor = (type) => {
    const colors = {
      "Full-Time": "bg-emerald-100 text-emerald-800",
      "Part-Time": "bg-amber-100 text-amber-800",
      Internship: "bg-pink-100 text-pink-800",
      Contract: "bg-orange-100 text-orange-800",
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
            <div className="flex items-start gap-6">
              {job.companyLogo ? (
                <img
                  src={job.companyLogo}
                  alt={job.companyName}
                  className="w-20 h-20 rounded-xl bg-white p-2 object-contain shadow-lg"
                />
              ) : (
                <div className="w-20 h-20 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center shadow-lg">
                  <Building2 className="w-10 h-10 text-white" />
                </div>
              )}
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
                <div className="flex items-center gap-2 text-blue-100 text-lg">
                  <Building2 className="w-5 h-5" />
                  <span className="font-semibold">{job.companyName}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Key Info Badges */}
            <div className="flex flex-wrap gap-3 mb-6">
              {job.status && (
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(job.status)}`}>
                  {job.status}
                </span>
              )}
              {job.workMode && (
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getWorkModeColor(job.workMode)}`}>
                  {job.workMode}
                </span>
              )}
              {job.jobType && (
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getJobTypeColor(job.jobType)}`}>
                  {job.jobType}
                </span>
              )}
              {job.isActive !== undefined && (
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${job.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                  {job.isActive ? "Active" : "Inactive"}
                </span>
              )}
            </div>

            {/* Quick Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {job.location && (
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-semibold text-gray-800">{job.location}</p>
                  </div>
                </div>
              )}
              {job.source && (
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <Briefcase className="w-5 h-5 text-purple-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Source</p>
                    <p className="font-semibold text-gray-800">{job.source}</p>
                  </div>
                </div>
              )}
              {job.postedAt && (
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <Calendar className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Posted Date</p>
                    <p className="font-semibold text-gray-800">{formatDate(job.postedAt)}</p>
                  </div>
                </div>
              )}
              {job.applyType && (
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <Clock className="w-5 h-5 text-orange-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Application Type</p>
                    <p className="font-semibold text-gray-800 capitalize">{job.applyType}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Company Website */}
            {job.companyWebsite && (
              <a
                href={job.companyWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-8 group"
              >
                <Globe className="w-5 h-5" />
                <span className="group-hover:underline">Visit Company Website</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            {/* Description */}
            {job.description && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded"></div>
                  Job Description
                </h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">{job.description}</p>
                </div>
              </div>
            )}

            {/* Skills */}
            {job.skills && job.skills.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded"></div>
                  Required Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 text-gray-800 rounded-lg font-medium border border-blue-200 hover:border-blue-400 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Metadata Section */}
            <div className="mb-8 p-6 bg-gray-50 rounded-xl">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Additional Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                {job.externalJobId && (
                  <div>
                    <span className="text-gray-500">External Job ID:</span>
                    <span className="ml-2 font-mono text-gray-800">{job.externalJobId}</span>
                  </div>
                )}
                {job.createdAt && (
                  <div>
                    <span className="text-gray-500">Listed On:</span>
                    <span className="ml-2 text-gray-800">{formatDate(job.createdAt)}</span>
                  </div>
                )}
                {job.updatedAt && (
                  <div>
                    <span className="text-gray-500">Last Updated:</span>
                    <span className="ml-2 text-gray-800">{formatDate(job.updatedAt)}</span>
                  </div>
                )}
                {job._id && (
                  <div>
                    <span className="text-gray-500">Job ID:</span>
                    <span className="ml-2 font-mono text-gray-800">{job._id}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Apply Button */}
            <a
              href={job.applyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 text-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <span className="flex items-center justify-center gap-2 text-lg">
                Apply Now
                <ExternalLink className="w-5 h-5" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;