import React from "react";

const EditResume = ({ darkMode }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className={`text-3xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
        Edit Resume
      </h2>

      <div className={`${darkMode ? "bg-gray-800" : "bg-white"} p-8 rounded-xl shadow border space-y-4`}>
        <input className="w-full p-2 border rounded" defaultValue="John Anderson" />
        <input className="w-full p-2 border rounded" defaultValue="Software Engineer" />
        <textarea className="w-full p-2 border rounded" rows="4" />

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditResume;
