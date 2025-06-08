import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ heading, description }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/email-sender");
  };

  return (
    <div
      onClick={handleClick}
      className="max-w-sm p-8 bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow border-2 border-blue-500"
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleClick();
        }
      }}
    >
      <h2 className="text-xl font-semibold mb-2">{heading}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Card;
