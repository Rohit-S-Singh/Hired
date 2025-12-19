import React from "react";

const JobSpecificCheck = ({ darkMode }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className={`text-3xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
        Job Specific Check
      </h2>

      <textarea className="w-full p-4 border rounded" rows="6" />
      <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded">
        Analyze
      </button>
    </div>
  );
};

export default JobSpecificCheck;
