import React from "react";

const RecruiterPromptModal = ({ open, onClose, onCta }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-11/12 max-w-md rounded-lg bg-white p-6 shadow-xl">
        <button
          aria-label="Close"
          className="absolute right-3 top-3 rounded p-1 text-gray-500 hover:bg-gray-100"
          onClick={onClose}
        >
          ✕
        </button>
        <h3 className="mb-2 text-xl font-bold text-gray-900">
          Get connected to a recruiter now
        </h3>
        <p className="mb-5 text-sm text-gray-600">
          Boost your chances to get hired with tailored connections and guidance.
        </p>
        <div className="flex items-center gap-3">
          <button
            className="flex-1 rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
            onClick={onCta}
          >
            Connect me
          </button>
          <button
            className="rounded border px-4 py-2 text-gray-700 hover:bg-gray-50"
            onClick={onClose}
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecruiterPromptModal;


