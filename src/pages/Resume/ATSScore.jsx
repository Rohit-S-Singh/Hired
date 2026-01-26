import React, { useState } from "react";
import { FileText, Star, Download, Eye, Trash2, CheckCircle, BarChart3, AlertCircle, TrendingUp, Award } from "lucide-react";

const MyResume = ({ darkMode = false }) => {
  const [resumes, setResumes] = useState([
    {
      id: 1,
      name: "Software_Engineer_Resume.pdf",
      uploadDate: "2025-01-15",
      size: 245,
      type: "pdf",
      isMain: true,
      atsScore: 87,
      analysis: {
        strengths: ["Clear formatting", "Keywords optimized", "Professional structure"],
        improvements: ["Add more quantifiable achievements", "Include more technical skills"],
        sections: {
          contact: 95,
          experience: 85,
          education: 90,
          skills: 82
        }
      }
    },
    {
      id: 2,
      name: "John_Doe_Resume_2024.docx",
      uploadDate: "2025-01-10",
      size: 189,
      type: "docx",
      isMain: false,
      atsScore: 72,
      analysis: {
        strengths: ["Good use of action verbs", "Clear job titles"],
        improvements: ["Add metrics to achievements", "Improve keyword density", "Better formatting needed"],
        sections: {
          contact: 88,
          experience: 70,
          education: 75,
          skills: 68
        }
      }
    },
    {
      id: 3,
      name: "Updated_Resume_Jan2025.pdf",
      uploadDate: "2025-01-05",
      size: 312,
      type: "pdf",
      isMain: false,
      atsScore: 91,
      analysis: {
        strengths: ["Excellent keyword optimization", "Strong quantifiable results", "ATS-friendly format"],
        improvements: ["Consider adding certifications section"],
        sections: {
          contact: 92,
          experience: 93,
          education: 88,
          skills: 90
        }
      }
    },
    {
      id: 4,
      name: "Frontend_Developer_Resume.pdf",
      uploadDate: "2025-01-02",
      size: 278,
      type: "pdf",
      isMain: false,
      atsScore: 65,
      analysis: {
        strengths: ["Creative design", "Portfolio links included"],
        improvements: ["Too much formatting may confuse ATS", "Add more relevant keywords", "Simplify layout"],
        sections: {
          contact: 70,
          experience: 62,
          education: 68,
          skills: 60
        }
      }
    }
  ]);

  const [selectedResume, setSelectedResume] = useState(null);
  const [analyzing, setAnalyzing] = useState(null);

  const setAsMain = (id) => {
    setResumes(resumes.map(resume => ({
      ...resume,
      isMain: resume.id === id
    })));
  };

  const deleteResume = (id) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      setResumes(resumes.filter(resume => resume.id !== id));
      if (selectedResume?.id === id) {
        setSelectedResume(null);
      }
    }
  };

  const analyzeResume = (id) => {
    setAnalyzing(id);
    setTimeout(() => {
      setAnalyzing(null);
    }, 2000);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getScoreColor = (score) => {
    if (score >= 85) return darkMode ? "text-green-400" : "text-green-600";
    if (score >= 70) return darkMode ? "text-yellow-400" : "text-yellow-600";
    return darkMode ? "text-red-400" : "text-red-600";
  };

  const getScoreBgColor = (score) => {
    if (score >= 85) return darkMode ? "bg-green-500 bg-opacity-20" : "bg-green-100";
    if (score >= 70) return darkMode ? "bg-yellow-500 bg-opacity-20" : "bg-yellow-100";
    return darkMode ? "bg-red-500 bg-opacity-20" : "bg-red-100";
  };

  const getScoreLabel = (score) => {
    if (score >= 85) return "Excellent";
    if (score >= 70) return "Good";
    return "Needs Improvement";
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"} p-6`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
            My Resumes
          </h1>
          <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Manage your resumes and check their ATS scores
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className={`p-6 rounded-xl ${darkMode ? "bg-gray-800" : "bg-white"} shadow-sm`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Total Resumes</p>
                <p className={`text-3xl font-bold mt-1 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  {resumes.length}
                </p>
              </div>
              <FileText className={darkMode ? "text-blue-400" : "text-blue-600"} size={32} />
            </div>
          </div>
          <div className={`p-6 rounded-xl ${darkMode ? "bg-gray-800" : "bg-white"} shadow-sm`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Avg ATS Score</p>
                <p className={`text-3xl font-bold mt-1 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  {Math.round(resumes.reduce((acc, r) => acc + r.atsScore, 0) / resumes.length)}
                </p>
              </div>
              <BarChart3 className={darkMode ? "text-green-400" : "text-green-600"} size={32} />
            </div>
          </div>
          <div className={`p-6 rounded-xl ${darkMode ? "bg-gray-800" : "bg-white"} shadow-sm`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Highest Score</p>
                <p className={`text-3xl font-bold mt-1 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  {Math.max(...resumes.map(r => r.atsScore))}
                </p>
              </div>
              <TrendingUp className={darkMode ? "text-purple-400" : "text-purple-600"} size={32} />
            </div>
          </div>
          <div className={`p-6 rounded-xl ${darkMode ? "bg-gray-800" : "bg-white"} shadow-sm`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Main Resume</p>
                <p className={`text-lg font-bold mt-1 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  {resumes.find(r => r.isMain)?.atsScore || 0}
                </p>
              </div>
              <Star className={darkMode ? "text-yellow-400" : "text-yellow-600"} size={32} />
            </div>
          </div>
        </div>

        {/* Resume Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {resumes.map((resume) => (
            <div
              key={resume.id}
              className={`rounded-xl border transition-all duration-200 ${
                selectedResume?.id === resume.id
                  ? darkMode
                    ? "bg-gray-800 border-blue-500 shadow-lg"
                    : "bg-white border-blue-500 shadow-lg"
                  : darkMode
                  ? "bg-gray-800 border-gray-700 hover:border-gray-600"
                  : "bg-white border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`p-3 rounded-lg ${darkMode ? "bg-blue-500 bg-opacity-10" : "bg-blue-50"}`}>
                      <FileText className={darkMode ? "text-blue-400" : "text-blue-600"} size={24} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                          {resume.name}
                        </h3>
                        {resume.isMain && (
                          <Star className="text-yellow-500 fill-yellow-500" size={18} />
                        )}
                      </div>
                      <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                        {resume.size} KB • {formatDate(resume.uploadDate)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* ATS Score */}
                <div className={`p-4 rounded-lg mb-4 ${getScoreBgColor(resume.atsScore)}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Award className={getScoreColor(resume.atsScore)} size={20} />
                      <span className={`font-semibold ${getScoreColor(resume.atsScore)}`}>
                        ATS Score
                      </span>
                    </div>
                    <div className="text-right">
                      <div className={`text-3xl font-bold ${getScoreColor(resume.atsScore)}`}>
                        {resume.atsScore}
                      </div>
                      <div className={`text-xs ${getScoreColor(resume.atsScore)}`}>
                        {getScoreLabel(resume.atsScore)}
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        resume.atsScore >= 85
                          ? "bg-green-500"
                          : resume.atsScore >= 70
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                      style={{ width: `${resume.atsScore}%` }}
                    />
                  </div>
                </div>

                {/* Section Scores */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {Object.entries(resume.analysis.sections).map(([section, score]) => (
                    <div key={section} className={`p-3 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
                      <div className="flex items-center justify-between">
                        <span className={`text-sm capitalize ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                          {section}
                        </span>
                        <span className={`text-sm font-bold ${getScoreColor(score)}`}>
                          {score}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                  {!resume.isMain && (
                    <button
                      onClick={() => setAsMain(resume.id)}
                      className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        darkMode
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "bg-blue-600 hover:bg-blue-700 text-white"
                      }`}
                    >
                      <Star size={16} />
                      Set as Main
                    </button>
                  )}
                  {resume.isMain && (
                    <div className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-green-500 bg-opacity-20 text-green-600 dark:text-green-400">
                      <CheckCircle size={16} />
                      Main Resume
                    </div>
                  )}
                  <button
                    onClick={() => setSelectedResume(selectedResume?.id === resume.id ? null : resume)}
                    className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      darkMode
                        ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                  >
                    <Eye size={16} />
                    {selectedResume?.id === resume.id ? "Hide" : "Details"}
                  </button>
                  <button
                    className={`p-2 rounded-lg transition-colors ${
                      darkMode
                        ? "hover:bg-gray-700 text-gray-400 hover:text-blue-400"
                        : "hover:bg-blue-50 text-gray-600 hover:text-blue-600"
                    }`}
                  >
                    <Download size={18} />
                  </button>
                  <button
                    onClick={() => deleteResume(resume.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      darkMode
                        ? "hover:bg-red-900 hover:bg-opacity-20 text-gray-400 hover:text-red-400"
                        : "hover:bg-red-50 text-gray-600 hover:text-red-600"
                    }`}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              {/* Detailed Analysis (Expandable) */}
              {selectedResume?.id === resume.id && (
                <div className={`border-t p-6 ${darkMode ? "border-gray-700 bg-gray-750" : "border-gray-200 bg-gray-50"}`}>
                  <h4 className={`font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                    Detailed Analysis
                  </h4>
                  
                  {/* Strengths */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="text-green-500" size={18} />
                      <h5 className={`font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Strengths
                      </h5>
                    </div>
                    <ul className={`ml-7 space-y-1 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      {resume.analysis.strengths.map((strength, idx) => (
                        <li key={idx}>• {strength}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Improvements */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="text-orange-500" size={18} />
                      <h5 className={`font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Suggestions for Improvement
                      </h5>
                    </div>
                    <ul className={`ml-7 space-y-1 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      {resume.analysis.improvements.map((improvement, idx) => (
                        <li key={idx}>• {improvement}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Re-analyze Button */}
                  <button
                    onClick={() => analyzeResume(resume.id)}
                    disabled={analyzing === resume.id}
                    className={`mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      analyzing === resume.id
                        ? "bg-gray-400 cursor-not-allowed text-white"
                        : darkMode
                        ? "bg-purple-600 hover:bg-purple-700 text-white"
                        : "bg-purple-600 hover:bg-purple-700 text-white"
                    }`}
                  >
                    {analyzing === resume.id ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Re-analyzing...
                      </>
                    ) : (
                      <>
                        <BarChart3 size={16} />
                        Re-analyze Resume
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Tips Section */}
        <div className={`p-6 rounded-xl ${darkMode ? "bg-gray-800" : "bg-white"} shadow-sm`}>
          <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
            <Award size={20} />
            How to Improve Your ATS Score
          </h3>
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            <div>
              <h4 className={`font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Use Keywords</h4>
              <p>Include relevant keywords from the job description throughout your resume.</p>
            </div>
            <div>
              <h4 className={`font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Simple Formatting</h4>
              <p>Use standard fonts and avoid complex layouts that ATS systems can't read.</p>
            </div>
            <div>
              <h4 className={`font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Quantify Achievements</h4>
              <p>Add metrics and numbers to demonstrate your impact and results.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyResume;