import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const MyResume = ({ darkMode }) => {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const token = localStorage.getItem("jwtToken");

        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/api/get-my-resume`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setResume(res.data.resume);
      } catch (error) {
        toast.error("Failed to load resume");
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading resume...</p>;
  }

  if (!resume) {
    return <p className="text-center mt-10">No resume found</p>;
  }

  const { content } = resume;

  return (
    <div className="max-w-4xl mx-auto">
      <h2
        className={`text-3xl font-bold mb-6 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        My Resume
      </h2>

      <div
        className={`${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white"
        } p-8 rounded-xl shadow border`}
      >
        {/* Resume Sheet (ATS-safe) */}
        <div className="bg-white text-gray-900 p-10 rounded-lg font-serif">

          {/* HEADER */}
          <h1 className="text-4xl font-bold">
            {content.header.name}
          </h1>
          <p className="text-sm text-gray-700 mb-4">
            {content.header.email}
            {content.header.phone && ` | ${content.header.phone}`}
            {content.header.linkedin && ` | ${content.header.linkedin}`}
            {content.header.github && ` | ${content.header.github}`}
          </p>

          {/* SUMMARY */}
          {content.summary && (
            <>
              <h2 className="font-bold mt-6">Professional Summary</h2>
              <p className="text-sm mt-1">{content.summary}</p>
            </>
          )}

          {/* EXPERIENCE */}
          {content.experience.length > 0 && (
            <>
              <h2 className="font-bold mt-6">Experience</h2>
              {content.experience.map((exp, idx) => (
                <div key={idx} className="mt-2">
                  <p className="font-medium">
                    {exp.role} — {exp.company}
                  </p>
                  <ul className="list-disc ml-6 text-sm">
                    {exp.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </>
          )}

          {/* PROJECTS */}
          {content.projects.length > 0 && (
            <>
              <h2 className="font-bold mt-6">Projects</h2>
              {content.projects.map((proj, idx) => (
                <div key={idx} className="mt-2">
                  <p className="font-medium">{proj.title}</p>
                  <p className="text-sm">
                    Tech Stack: {proj.techStack.join(", ")}
                  </p>
                  <ul className="list-disc ml-6 text-sm">
                    {proj.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </>
          )}

          {/* SKILLS */}
          <h2 className="font-bold mt-6">Skills</h2>
          <ul className="text-sm mt-1">
            {Object.entries(content.skills).map(([key, values]) =>
              values.length ? (
                <li key={key}>
                  <strong className="capitalize">{key}:</strong>{" "}
                  {values.join(", ")}
                </li>
              ) : null
            )}
          </ul>

          {/* EDUCATION */}
          <h2 className="font-bold mt-6">Education</h2>
          {content.education.map((edu, idx) => (
            <p key={idx} className="text-sm mt-1">
              {edu.degree} in {edu.branch} — {edu.college} ({edu.year})
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyResume;
