import React, { useState, useEffect } from "react";
import { Upload, FileText, CheckCircle, X, Trash2, Download, Eye, Calendar, FileType } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../AUTH/GlobalContext";

const UploadResume = ({ darkMode = false }) => {
  const navigate = useNavigate();
  const { user } = useGlobalContext();
  const userId = user?._id;
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadedResumes, setUploadedResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mainResumeId, setMainResumeId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedResumeForMain, setSelectedResumeForMain] = useState(null);

  // Fetch user's resumes on component mount
  useEffect(() => {
    if (user?._id) {
      fetchResumes();
    }
  }, [user]);

  const fetchResumes = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("jwtToken");

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/resumes/my?userId=${user._id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.resumes) {
          setUploadedResumes(result.resumes);
          // Find and set the main resume
          const main = result.resumes.find(resume => resume.isMain);
          if (main) {
            setMainResumeId(main._id);
          }
        }
      } else {
        console.error("Failed to fetch resumes");
      }
    } catch (error) {
      console.error("Error fetching resumes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "application/pdf" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
      setSelectedFile(file);
      setUploadSuccess(false);
    } else {
      alert("Please upload a PDF or DOCX file");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && (file.type === "application/pdf" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
      setSelectedFile(file);
      setUploadSuccess(false);
    } else {
      alert("Please upload a PDF or DOCX file");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    setUploading(true);
    
    try {
      const token = localStorage.getItem("jwtToken");
      const formData = new FormData();
      formData.append("resume", selectedFile);
      formData.append("userId", user._id);

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/resumes/upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setUploadSuccess(true);
          // Refresh the resumes list
          await fetchResumes();
          
          setTimeout(() => {
            setSelectedFile(null);
            setUploadSuccess(false);
          }, 2000);
        }
      } else {
        const error = await response.json();
        alert(error.message || "Failed to upload resume");
      }
    } catch (error) {
      console.error("Error uploading resume:", error);
      alert("Failed to upload resume. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setUploadSuccess(false);
  };

  const deleteResume = async (id) => {
    if (!window.confirm('Are you sure you want to delete this resume?')) {
      return;
    }

    try {
      const token = localStorage.getItem("jwtToken");

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/resumes/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          // Remove from state
          setUploadedResumes(uploadedResumes.filter(resume => resume._id !== id));
        }
      } else {
        const error = await response.json();
        alert(error.message || "Failed to delete resume");
      }
    } catch (error) {
      console.error("Error deleting resume:", error);
      alert("Failed to delete resume. Please try again.");
    }
  };

  const downloadResume = (fileUrl, fileName) => {
    const link = document.createElement('a');
    link.href = `${process.env.REACT_APP_BACKEND_BASE_URL}${fileUrl}`;
    link.download = fileName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const viewResume = (fileUrl) => {
    window.open(`${process.env.REACT_APP_BACKEND_BASE_URL}${fileUrl}`, '_blank');
  };

  const handleSetMainResume = (resume) => {
    setSelectedResumeForMain(resume);
    setShowPopup(true);
  };

  const confirmSetMainResume = async () => {
    if (!selectedResumeForMain) return;

    try {
      const token = localStorage.getItem("jwtToken");

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/resumes/${selectedResumeForMain._id}/set-main`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user._id }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setMainResumeId(selectedResumeForMain._id);
          setShowPopup(false);
          setSelectedResumeForMain(null);
          // Optionally refresh resumes
          await fetchResumes();
        }
      } else {
        const error = await response.json();
        alert(error.message || "Failed to set main resume");
      }
    } catch (error) {
      console.error("Error setting main resume:", error);
      alert("Failed to set main resume. Please try again.");
    }
  };

  const cancelSetMainResume = () => {
    setShowPopup(false);
    setSelectedResumeForMain(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"} p-6`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className={`text-3xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
              My Resumes
            </h1>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Manage and upload your resumes
            </p>
          </div>
          <button 
            onClick={() => navigate("/resume-EditResume")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              darkMode
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Resume
          </button>
        </div>

        {/* Uploaded Resumes Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
              All Resumes
              <span className={`ml-2 text-sm font-normal ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                ({uploadedResumes.length} total)
              </span>
            </h2>
          </div>
          
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className={`mt-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Loading resumes...</p>
            </div>
          ) : uploadedResumes.length === 0 ? (
            <div className={`text-center py-16 rounded-xl border-2 border-dashed ${
              darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"
            }`}>
              <FileText className={`mx-auto mb-4 ${darkMode ? "text-gray-600" : "text-gray-400"}`} size={56} />
              <p className={`text-lg font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                No resumes uploaded yet
              </p>
              <p className={`${darkMode ? "text-gray-500" : "text-gray-500"}`}>
                Upload your first resume below to get started
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {uploadedResumes.map((resume) => (
                <div
                  key={resume._id}
                  onClick={() => handleSetMainResume(resume)}
                  className={`group rounded-xl border transition-all duration-200 hover:shadow-lg cursor-pointer ${
                    mainResumeId === resume._id
                      ? darkMode
                        ? "bg-blue-900 bg-opacity-20 border-blue-500 border-2 shadow-blue-500/50"
                        : "bg-blue-50 border-blue-500 border-2 shadow-blue-200"
                      : darkMode
                      ? "bg-gray-800 border-gray-700 hover:border-blue-500"
                      : "bg-white border-gray-200 hover:border-blue-400 hover:shadow-blue-100"
                  }`}
                >
                  <div className="p-5">
                    {/* Main Resume Badge */}
                    {mainResumeId === resume._id && (
                      <div className="mb-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded ${
                          darkMode ? "bg-blue-500 text-white" : "bg-blue-600 text-white"
                        }`}>
                          <CheckCircle size={12} />
                          Main Resume
                        </span>
                      </div>
                    )}

                    {/* File Icon & Type Badge */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-lg ${
                        darkMode ? "bg-blue-500 bg-opacity-10" : "bg-blue-50"
                      }`}>
                        <FileText className={darkMode ? "text-blue-400" : "text-blue-600"} size={28} />
                      </div>
                      <span className={`px-2 py-1 text-xs font-semibold rounded uppercase ${
                        resume.fileType === 'pdf'
                          ? darkMode ? "bg-red-500 bg-opacity-10 text-red-400" : "bg-red-50 text-red-600"
                          : darkMode ? "bg-blue-500 bg-opacity-10 text-blue-400" : "bg-blue-50 text-blue-600"
                      }`}>
                        {resume.fileType}
                      </span>
                    </div>

                    {/* File Name */}
                    <h3 className={`font-semibold mb-3 truncate ${darkMode ? "text-white" : "text-gray-900"}`}>
                      {resume.fileName}
                    </h3>

                    {/* File Info */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm">
                        <FileType className={`mr-2 ${darkMode ? "text-gray-500" : "text-gray-400"}`} size={16} />
                        <span className={darkMode ? "text-gray-400" : "text-gray-600"}>
                          {resume.fileSize} KB
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Calendar className={`mr-2 ${darkMode ? "text-gray-500" : "text-gray-400"}`} size={16} />
                        <span className={darkMode ? "text-gray-400" : "text-gray-600"}>
                          {formatDate(resume.createdAt)}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          viewResume(resume.fileUrl);
                        }}
                        className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          darkMode
                            ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                        title="View Resume"
                      >
                        <Eye size={16} />
                        View
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadResume(resume.fileUrl, resume.fileName);
                        }}
                        className={`p-2 rounded-lg transition-colors ${
                          darkMode
                            ? "hover:bg-gray-700 text-gray-400 hover:text-blue-400"
                            : "hover:bg-blue-50 text-gray-600 hover:text-blue-600"
                        }`}
                        title="Download"
                      >
                        <Download size={18} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteResume(resume._id);
                        }}
                        className={`p-2 rounded-lg transition-colors ${
                          darkMode
                            ? "hover:bg-red-900 hover:bg-opacity-20 text-gray-400 hover:text-red-400"
                            : "hover:bg-red-50 text-gray-600 hover:text-red-600"
                        }`}
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Confirmation Popup */}
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className={`rounded-xl shadow-2xl max-w-md w-full p-6 ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${darkMode ? "bg-blue-500 bg-opacity-10" : "bg-blue-100"}`}>
                  <CheckCircle className={darkMode ? "text-blue-400" : "text-blue-600"} size={24} />
                </div>
                <h3 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                  Set Main Resume
                </h3>
              </div>
              
              <p className={`mb-6 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Set <span className="font-semibold">{selectedResumeForMain?.fileName}</span> as your main resume? 
                This resume will be used for auto-applying to jobs.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={cancelSetMainResume}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                    darkMode
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={confirmSetMainResume}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Upload New Resume Section */}
        <div className={`rounded-xl ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg p-8`}>
          <h2 className={`text-2xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Upload New Resume
          </h2>

          {!selectedFile ? (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 ${
                darkMode
                  ? "border-gray-700 bg-gray-900 hover:border-blue-500 hover:bg-gray-850"
                  : "border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50"
              }`}
            >
              <div className={`inline-flex p-4 rounded-full mb-4 ${
                darkMode ? "bg-blue-500 bg-opacity-10" : "bg-blue-100"
              }`}>
                <Upload className={darkMode ? "text-blue-400" : "text-blue-600"} size={40} />
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                Drag and drop your resume here
              </h3>
              <p className={`mb-6 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                or click the button below to browse
              </p>
              <input
                type="file"
                accept=".pdf,.docx"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors font-medium"
              >
                <Upload size={20} />
                Choose File
              </label>
              <p className={`mt-4 text-sm ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
                Supported formats: PDF, DOCX (Max size: 5MB)
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className={`flex items-center justify-between p-5 rounded-xl ${
                darkMode ? "bg-gray-700 border border-gray-600" : "bg-gray-50 border border-gray-200"
              }`}>
                <div className="flex items-center space-x-4 flex-1">
                  <div className={`p-3 rounded-lg ${darkMode ? "bg-blue-500 bg-opacity-10" : "bg-blue-100"}`}>
                    <FileText className={darkMode ? "text-blue-400" : "text-blue-600"} size={28} />
                  </div>
                  <div className="flex-1">
                    <p className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                      {selectedFile.name}
                    </p>
                    <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      {(selectedFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
                <button
                  onClick={removeFile}
                  className={`p-2 rounded-lg transition-colors ${
                    darkMode ? "hover:bg-gray-600 text-gray-400" : "hover:bg-gray-200 text-gray-600"
                  }`}
                >
                  <X size={20} />
                </button>
              </div>

              {uploadSuccess && (
                <div className="flex items-center justify-center gap-2 p-4 bg-green-50 dark:bg-green-900 dark:bg-opacity-20 text-green-600 dark:text-green-400 rounded-xl">
                  <CheckCircle size={20} />
                  <span className="font-medium">Resume uploaded successfully!</span>
                </div>
              )}

              <button
                onClick={handleUpload}
                disabled={uploading || uploadSuccess}
                className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${
                  uploading || uploadSuccess
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {uploading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Uploading...
                  </>
                ) : uploadSuccess ? (
                  <>
                    <CheckCircle size={20} />
                    Uploaded
                  </>
                ) : (
                  <>
                    <Upload size={20} />
                    Upload Resume
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadResume;