import React from "react";
import FounderImg from "../assets/Founder.png";

const About = () => (
  <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
    <div className="bg-white shadow-lg rounded-lg max-w-2xl w-full p-8">
      <h1 className="text-4xl font-bold text-blue-700 mb-4 text-center">About Me</h1>
      <div className="flex flex-col items-center">
        <img
          src={FounderImg}
          alt="Rohit Shekhar Singh"
          className="w-64 h-64 rounded-full shadow mb-8 border-4 border-blue-200 object-cover"
        />
        <h2 className="text-2xl font-semibold mb-2">Rohit Shekhar Singh</h2>
        <p className="text-gray-600 mb-4 text-center max-w-xl">
          Hi! I'm Rohit, a passionate Software Engineer with 2+ years of experience in building scalable web applications and automation solutions. I love working with JavaScript, React, Node.js, and modern web technologies. My journey includes delivering projects for clients like ASUS India, Air Arabia, and Education First, and building no-code/low-code platforms for rapid app development.
        </p>
        <p className="text-gray-700 mb-2 text-center max-w-xl">
          I enjoy solving real-world problems, collaborating with talented people, and constantly learning new things. My goal is to create impactful products that make people's lives easier and more productive.
        </p>
        <div className="flex gap-4 mt-4">
          <a href="https://www.linkedin.com/in/rohitshekharsingh/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">LinkedIn</a>
          <a href="mailto:rohitshekrsingh@gmail.com" className="text-blue-600 hover:underline font-medium">Email</a>
          <a href="https://github.com/rohitshekhar" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">GitHub</a>
        </div>
        <div className="mt-6 text-blue-800 font-bold text-lg">Founder & CEO</div>
      </div>
    </div>
  </div>
);

export default About; 