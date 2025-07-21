import React from "react";
import FounderImg from "../assets/Founder.png";

const About = () => (
  <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
    <div className="bg-white shadow-lg rounded-lg max-w-2xl w-full p-8">
      <h1 className="text-4xl font-bold text-blue-700 mb-4 text-center">
        About Us
      </h1>
      <div className="flex flex-col items-center">
        <img
          src={FounderImg}
          alt="Founder"
          className="w-64 h-64 rounded-full shadow mb-8 border-4 border-blue-200 object-cover"
        />
        <h2 className="text-2xl font-semibold mb-2">Rohit Shekhar Singh</h2>
        <div className="text-blue-800 font-bold text-lg mb-4">
          Founder & CEO
        </div>
        <p className="text-gray-700 mb-4 text-center max-w-xl">
          <span className="font-semibold text-blue-700">
            Bringing Transparency and Clarity to the Job Hunt.
          </span>{" "}
          We're building a platform that cuts through the noise of job portals
          by surfacing the real picture — no more black boxes, vague JD buzzwords,
          or misleading posts.
        </p>
        <p className="text-gray-600 mb-4 text-center max-w-xl">
          Our mission is to simplify job discovery for candidates who are tired of
          spending hours applying to roles without feedback or understanding.
          We give you clear, structured insights into job openings, skill requirements,
          recruiter details, and application outcomes — all in one place.
        </p>
        <p className="text-gray-600 mb-4 text-center max-w-xl">
          Whether you're just starting your career or actively switching jobs,
          our goal is to make the journey less overwhelming and more transparent.
          Think of us as your personal job-hunting assistant — helping you apply smarter,
          not harder.
        </p>
        <p className="text-gray-700 text-center max-w-xl">
          We're not just another job board. We're a movement towards honesty,
          clarity, and candidate-first hiring.
        </p>
        <div className="flex gap-4 mt-6">
          <a
            href="https://www.linkedin.com/in/rohitshekharsingh/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-medium"
          >
            LinkedIn
          </a>
          <a
            href="mailto:rohitshekrsingh@gmail.com"
            className="text-blue-600 hover:underline font-medium"
          >
            Email
          </a>
          <a
            href="https://github.com/rohitshekhar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-medium"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default About;
