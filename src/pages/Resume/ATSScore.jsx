import React from "react";

const ATSScore = ({ darkMode }) => {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <h2 className={`text-3xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
        ATS Score
      </h2>

      <div className={`${darkMode ? "bg-gray-800" : "bg-white"} p-10 rounded-xl shadow border`}>
        <div className="text-5xl font-bold text-green-500">85%</div>
        <p className="mt-2">ATS Optimized</p>
      </div>
    </div>
  );
};

export default ATSScore;
