import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../AUTH/GlobalContext";
import { useNavigate } from "react-router-dom";

const ProfileSection = () => {
  const { user } = useGlobalContext();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/api/profile/user/${user._id}`
        );
        setProfile(response.data.profile);
      } catch (error) {
        console.error("Failed to fetch profile:", error.response?.data || error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-xl text-gray-600">Loading profile...</p>
    </div>
  );
  
  if (!profile) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-xl text-gray-600">No profile data available.</p>
    </div>
  );

  const { name, email, phone, picture, coverImage, bio, stats, details, experience, projects, certs, achievements, recommendations } = profile;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Image Section */}
      <div className="relative">
        {coverImage ? (
          <img src={coverImage} alt="Cover" className="w-full h-64 md:h-80 object-cover" />
        ) : (
          <div className="w-full h-64 md:h-80 bg-gradient-to-r from-blue-500 to-blue-700"></div>
        )}
        
        {/* Edit Profile Button */}
        <button
          onClick={() => navigate("/edit-profile")}
          className="absolute top-4 right-4 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 hover:scale-105 transition-all duration-200"
        >
          Edit Profile
        </button>
      </div>

      {/* Main Content Container */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 -mt-20 relative mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {picture ? (
              <img 
                src={picture} 
                alt={name} 
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover" 
              />
            ) : (
              <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-blue-500 flex items-center justify-center text-white text-4xl font-bold">
                {name?.charAt(0)?.toUpperCase()}
              </div>
            )}
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-2">{name || "N/A"}</h1>
              <p className="text-lg text-gray-600 mb-4">{bio || "N/A"}</p>
              <div className="space-y-1 text-gray-700">
                <p className="flex items-center justify-center md:justify-start gap-2">
                  <span className="font-semibold">Email:</span> {email || "N/A"}
                </p>
                <p className="flex items-center justify-center md:justify-start gap-2">
                  <span className="font-semibold">Phone:</span> {phone || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-gray-200">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">{stats?.profileViews || "N/A"}</p>
              <p className="text-sm text-gray-600 mt-1">Profile Views</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">{stats?.connections || "N/A"}</p>
              <p className="text-sm text-gray-600 mt-1">Connections</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">{stats?.endorsements || "N/A"}</p>
              <p className="text-sm text-gray-600 mt-1">Endorsements</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">{stats?.projects || "N/A"}</p>
              <p className="text-sm text-gray-600 mt-1">Projects</p>
            </div>
          </div>
        </div>

        {/* Details Section */}
        {details && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-black mb-6">Details</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <span className="font-semibold text-gray-700">Company:</span>
                <span className="text-gray-600">{details.company || "N/A"}</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-semibold text-gray-700">Title:</span>
                <span className="text-gray-600">{details.title || "N/A"}</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-semibold text-gray-700">Location:</span>
                <span className="text-gray-600">{details.location || "N/A"}</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-semibold text-gray-700">GitHub:</span>
                {details.github ? (
                  <a href={details.github} className="text-blue-600 hover:text-blue-700 hover:underline">
                    {details.github}
                  </a>
                ) : (
                  <span className="text-gray-600">N/A</span>
                )}
              </div>
              <div className="flex items-start gap-3">
                <span className="font-semibold text-gray-700">LinkedIn:</span>
                {details.linkedin ? (
                  <a href={details.linkedin} className="text-blue-600 hover:text-blue-700 hover:underline">
                    {details.linkedin}
                  </a>
                ) : (
                  <span className="text-gray-600">N/A</span>
                )}
              </div>
              <div className="flex items-start gap-3">
                <span className="font-semibold text-gray-700">Portfolio:</span>
                {details.portfolio ? (
                  <a href={details.portfolio} className="text-blue-600 hover:text-blue-700 hover:underline">
                    {details.portfolio}
                  </a>
                ) : (
                  <span className="text-gray-600">N/A</span>
                )}
              </div>
            </div>
            {details.skills?.length > 0 ? (
              <div className="mt-6">
                <span className="font-semibold text-gray-700 block mb-3">Skills:</span>
                <div className="flex flex-wrap gap-2">
                  {details.skills.map((skill, i) => (
                    <span 
                      key={i} 
                      className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-6">
                <span className="font-semibold text-gray-700 block mb-3">Skills:</span>
                <span className="text-gray-600">N/A</span>
              </div>
            )}
          </div>
        )}

        {/* Experience Section */}
        {experience?.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-black mb-6">Experience</h2>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <div 
                  key={index} 
                  className="border-l-4 border-blue-600 pl-6 py-2 hover:bg-gray-50 transition-colors duration-200 rounded-r-lg"
                >
                  <h3 className="text-xl font-bold text-black">{exp.role}</h3>
                  <p className="text-lg text-orange-600 font-semibold">{exp.company}</p>
                  <p className="text-gray-600 mt-1">{exp.duration} | {exp.location}</p>
                  {exp.description && <p className="text-gray-700 mt-3">{exp.description}</p>}
                  {exp.technologies?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {exp.technologies.map((tech, i) => (
                        <span 
                          key={i} 
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  {exp.points?.length > 0 && (
                    <ul className="mt-3 space-y-2">
                      {exp.points.map((point, i) => (
                        <li key={i} className="text-gray-600 flex items-start gap-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects Section */}
        {projects?.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-black mb-6">Projects</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((proj, index) => (
                <div 
                  key={index} 
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-xl hover:scale-105 transition-all duration-200"
                >
                  <h3 className="text-xl font-bold text-black mb-2">{proj.name}</h3>
                  {proj.desc && <p className="text-gray-600 mb-4">{proj.desc}</p>}
                  {proj.tech?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {proj.tech.map((tech, i) => (
                        <span 
                          key={i} 
                          className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="space-y-2">
                    {proj.githubLink && (
                      <a 
                        href={proj.githubLink} 
                        className="block text-blue-600 hover:text-blue-700 hover:underline font-medium"
                      >
                        View on GitHub →
                      </a>
                    )}
                    {proj.deployedLink && (
                      <a 
                        href={proj.deployedLink} 
                        className="inline-block px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 font-bold text-sm"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                  {proj.responsibilities?.length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {proj.responsibilities.map((r, i) => (
                        <li key={i} className="text-gray-600 flex items-start gap-2 text-sm">
                          <span className="text-blue-600 mt-1">•</span>
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications Section */}
        {certs?.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-black mb-6">Certifications</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {certs.map((cert, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold">✓</span>
                  </div>
                  <div>
                    <p className="font-bold text-black">{cert.name}</p>
                    <p className="text-gray-600 text-sm">{cert.issuer}</p>
                    <p className="text-gray-500 text-xs mt-1">{cert.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Achievements Section */}
        {achievements?.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-black mb-6">Achievements</h2>
            <div className="space-y-4">
              {achievements.map((ach, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-4 p-4 border-l-4 border-orange-500 bg-orange-50 rounded-r-lg hover:shadow-md transition-shadow duration-200"
                >
                  <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl">🏆</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-black text-lg">{ach.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{ach.desc}</p>
                    <p className="text-orange-600 font-semibold text-sm mt-2">{ach.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations Section */}
        {recommendations?.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-black mb-6">Recommendations</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {recommendations.map((rec, index) => (
                <div 
                  key={index} 
                  className="p-6 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg">
                      {rec.name?.charAt(0)?.toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-black">{rec.name}</p>
                      <p className="text-sm text-gray-600">{rec.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">"{rec.text}"</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSection;