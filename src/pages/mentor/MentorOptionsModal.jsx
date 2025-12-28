import React from "react";
import { useNavigate } from "react-router-dom";

export default function MentorOptionsModal({ mentorStatus, onClose }) {
  const navigate = useNavigate();

  return (
    <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
      <ul className="py-1 text-sm text-gray-700">
        
        {/* Become Mentor */}
        {mentorStatus === "None" && (
          <li
            onClick={() => {
              navigate("/BecomeMentorForm");
              onClose();
            }}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          >
            Become Mentor
          </li>
        )}

        {/* Pending Request */}
        {mentorStatus === "Pending" && (
          <li className="px-4 py-2 text-yellow-600 cursor-not-allowed">
            Pending Request
          </li>
        )}

        {/* Approved */}
        {mentorStatus === "Approved" && (
          <li className="px-4 py-2 text-green-600 font-semibold cursor-not-allowed">
            MENTOR
          </li>
        )}
      </ul>
    </div>
  );
}
