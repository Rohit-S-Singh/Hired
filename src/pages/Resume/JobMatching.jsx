import React from "react";

const JobMatching = ({ darkMode }) => {
  const jobs = [
    { title: "Frontend Dev", match: "92%" },
    { title: "Full Stack Dev", match: "88%" }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className={`text-3xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
        Job Matching
      </h2>

      {jobs.map((job, i) => (
        <div key={i} className="p-6 border rounded mb-4 bg-white">
          <h3 className="font-bold">{job.title}</h3>
          <p className="text-green-500">{job.match}</p>
        </div>
      ))}
    </div>
  );
};

export default JobMatching;
