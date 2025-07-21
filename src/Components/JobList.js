import React from 'react';

const JobList = ({ jobs, onRequestReferral }) => {
  return (
    <div className="max-w-4xl mx-auto mt-8 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Available Jobs</h2>
      
      {jobs.length === 0 ? (
        <p className="text-gray-600">No jobs posted yet.</p>
      ) : (
        jobs.map((job) => (
          <div key={job._id} className="bg-white shadow-md rounded-lg p-5 border">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold">{job.title}</h3>
                <p className="text-sm text-gray-600">{job.company}</p>
                <p className="text-sm text-gray-500 mt-1">Category: {job.category}</p>
                <a
                  href={job.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline mt-2 inline-block"
                >
                  View Job
                </a>
                {job.referralInstructions && (
                  <p className="mt-2 text-sm text-gray-700">
                    <strong>Referral Instructions:</strong> {job.referralInstructions}
                  </p>
                )}
              </div>

              <button
                onClick={() => onRequestReferral(job._id)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Request Referral
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default JobList;
