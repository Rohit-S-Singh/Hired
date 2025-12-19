import React from "react";

const LaTeXEditor = ({ darkMode }) => {
  return (
    <div className="max-w-6xl mx-auto">
      <h2 className={`text-3xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
        LaTeX Editor
      </h2>

      <div className="grid grid-cols-2 gap-6">
        <textarea
          rows="20"
          className="p-4 border rounded font-mono"
          defaultValue="\\documentclass{article}"
        />
        <div className="border p-6 rounded bg-white">
          <h1 className="text-xl font-bold">Preview</h1>
        </div>
      </div>
    </div>
  );
};

export default LaTeXEditor;
