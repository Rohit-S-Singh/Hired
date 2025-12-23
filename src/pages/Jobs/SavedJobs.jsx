import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../AUTH/GlobalContext";
import { useNavigate } from "react-router-dom";
import { Bookmark, MapPin, Building2, ExternalLink, Trash2, Loader2 } from "lucide-react";

const SavedJobs = () => {
  const { user, loading: userLoading } = useGlobalContext();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLoading && user) {
      fetchSavedJobs();
    } else if (!userLoading && !user) {
      setLoading(false);
    }
  }, [userLoading, user]);

  const fetchSavedJobs = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/jobs/saved/${user._id}`
      );

      setJobs(res.data.savedJobs || []);
    } catch (error) {
      console.error(
        "Failed to fetch saved jobs",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

 const removeJob = async (jobId) => {
  try {
    await axios.delete(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/api/jobs/remove`,
      {
        data: {
          jobId,
          userId: user._id,
        },
      }
    );

    setJobs((prev) => prev.filter((item) => item.job._id !== jobId));
  } catch (error) {
    console.error(
      "Failed to remove job",
      error.response?.data || error.message
    );
  }
};


  /* ===============================
     UI STATES
  =============================== */

  if (loading || userLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading your saved jobs...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bookmark className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Sign In Required</h2>
          <p className="text-gray-600">Please login to view your saved jobs</p>
        </div>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bookmark className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Saved Jobs</h2>
          <p className="text-gray-600 mb-6">Start saving jobs you're interested in to see them here</p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Bookmark className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Saved Jobs</h1>
          </div>
          <p className="text-gray-600 ml-13">
            {jobs.length} {jobs.length === 1 ? "job" : "jobs"} saved by {user.name || user.email}
          </p>
        </div>

        {/* Jobs Grid */}
        <div className="grid gap-4">
          {jobs.map(({ job }) => (
            <div
              key={job._id}
              onClick={() => navigate(`/job/${job._id}`)}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 cursor-pointer border border-gray-100 hover:border-blue-200 group"
            >
              <div className="flex justify-between items-start gap-4">
                {/* LEFT SIDE */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {job.title}
                  </h3>
                  
                  <div className="flex flex-wrap gap-3 mb-4">
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <Building2 className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm">{job.companyName}</span>
                    </div>
                    
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm">{job.location}</span>
                    </div>
                  </div>

                  <a
                    href={job.applyLink}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                  >
                    Apply Now
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* RIGHT SIDE */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeJob(job._id);
                  }}
                  className="flex-shrink-0 p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                  title="Remove from saved jobs"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavedJobs;