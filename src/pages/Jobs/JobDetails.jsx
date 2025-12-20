import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const JobDetails = () => {
  const { jobId } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Helper: show "Not Available" if value is missing
  const showValue = (value) =>
    value && (Array.isArray(value) ? value.length > 0 : true)
      ? value
      : "Not Available";

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/api/jobs/${jobId}`
        );
        setJob(res.data.job);
      } catch (err) {
        setError("Job not found or no longer available");
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  /* ===============================
     🌀 STATES
  =============================== */

  if (loading) {
    return <div className="text-center mt-10">Loading job details...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  if (!job) {
    return <div className="text-center mt-10">No job data available</div>;
  }

  /* ===============================
     📄 JOB DETAILS UI
  =============================== */

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        {job.companyLogo ? (
          <img
            src={job.companyLogo}
            alt={job.companyName}
            className="w-16 h-16 object-contain"
          />
        ) : (
          <div className="w-16 h-16 flex items-center justify-center bg-gray-200 rounded">
            N/A
          </div>
        )}

        <div>
          <h1 className="text-2xl font-bold">{showValue(job.title)}</h1>
          <p className="text-gray-600">{showValue(job.companyName)}</p>
          <p className="text-sm text-gray-500">
            {showValue(job.location)} • {showValue(job.jobType)} •{" "}
            {showValue(job.workMode)}
          </p>
        </div>
      </div>

      {/* Apply Button */}
      <div className="mt-6">
        {job.applyLink ? (
          <a
            href={job.applyLink}
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Apply on {showValue(job.source)}
          </a>
        ) : (
          <span className="text-gray-500">Apply link not available</span>
        )}
      </div>

      {/* Skills */}
      <div className="mt-8">
        <h2 className="font-semibold mb-2">Skills Required</h2>
        {job.skills?.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-200 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Not Available</p>
        )}
      </div>

      {/* Description */}
      <div className="mt-8">
        <h2 className="font-semibold mb-2">Job Description</h2>
        <p className="text-gray-700 whitespace-pre-line">
          {showValue(job.description)}
        </p>
      </div>

      {/* Responsibilities */}
      <div className="mt-8">
        <h2 className="font-semibold mb-2">Responsibilities</h2>
        {job.responsibilities?.length > 0 ? (
          <ul className="list-disc list-inside text-gray-700">
            {job.responsibilities.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Not Available</p>
        )}
      </div>

      {/* Salary */}
      <div className="mt-8">
        <h2 className="font-semibold mb-2">Salary</h2>
        {job.salary?.min ? (
          <p>
            ₹{job.salary.min.toLocaleString()} – ₹
            {job.salary.max?.toLocaleString() || "Not Available"}{" "}
            {job.salary.currency} ({job.salary.period})
          </p>
        ) : (
          <p className="text-gray-500">Not Available</p>
        )}
      </div>

      {/* Eligibility */}
      <div className="mt-8">
        <h2 className="font-semibold mb-2">Eligibility</h2>
        <p>
          Minimum CGPA:{" "}
          {job.eligibility?.minCGPA ?? "Not Available"}
        </p>
        <p>
          Branches Allowed:{" "}
          {job.eligibility?.branchesAllowed?.length > 0
            ? job.eligibility.branchesAllowed.join(", ")
            : "Not Available"}
        </p>
      </div>

      {/* Deadline */}
      <div className="mt-8 text-sm text-gray-500">
        Apply before:{" "}
        {job.applicationDeadline
          ? new Date(job.applicationDeadline).toLocaleDateString()
          : "Not Available"}
      </div>
    </div>
  );
};

export default JobDetails;
