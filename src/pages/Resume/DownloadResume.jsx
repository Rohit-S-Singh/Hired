import React from "react";
import { Download } from "lucide-react";

const DownloadResume = ({ darkMode }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className={`text-3xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
        Download Resume
      </h2>

      <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded">
        <Download /> Download PDF
      </button>
    </div>
  );
};

export default DownloadResume;
