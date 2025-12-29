import React from "react";
import { useNavigate } from "react-router-dom";

const MentorMenu = ({ mentorStatus, close }) => {
  const navigate = useNavigate();

  return (
    <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
      
      {/* NOT A MENTOR */}
      {mentorStatus === "None" && (
        <button
          onClick={() => {
            navigate("/BecomeMentorForm");
            close();
          }}
          className="w-full text-left px-4 py-2 hover:bg-gray-100"
        >
          Become Mentor
        </button>
      )}

      {/* REQUEST PENDING */}
      {mentorStatus === "Pending" && (
        <div className="px-4 py-2 text-yellow-600 cursor-not-allowed">
          Pending Request
        </div>
      )}

      {/* APPROVED */}
      {mentorStatus === "Approved" && (
        <div className="px-4 py-2 text-green-600 font-semibold cursor-not-allowed">
          MENTOR
        </div>
      )}
    </div>
  );
};

export default MentorMenu;
