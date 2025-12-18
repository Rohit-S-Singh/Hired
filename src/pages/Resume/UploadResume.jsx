import React, { useState } from "react";
import axios from "axios";
import { Upload } from "lucide-react";
import { toast } from "react-toastify";

const UploadResume = ({ darkMode }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (
      selectedFile &&
      ![
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(selectedFile.type)
    ) {
      toast.error("Only PDF or DOCX files are allowed");
      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a resume file first");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);
      const token = localStorage.getItem("jwtToken");

      await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ NO Content-Type
          },
        }
      );

      toast.success("Resume uploaded successfully");
      setFile(null);
    } catch (error) {
      toast.error(
        error.response?.data?.errorMessage || "Resume upload failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className={`text-3xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
        Upload Resume
      </h2>

      <div className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} p-8 rounded-xl shadow border`}>
        <div className={`border-2 border-dashed p-10 text-center rounded-lg ${darkMode ? "border-gray-600 text-gray-200" : "border-gray-300"}`}>
          <Upload size={40} className="mx-auto mb-4 opacity-80" />

          <p className="mb-2">Drag & drop your resume here, or click to select</p>
          <p className="text-sm opacity-70 mb-4">Supported formats: PDF, DOCX (Max 5MB)</p>

          <input
            type="file"
            accept=".pdf,.docx"
            onChange={handleFileChange}
            className="hidden"
            id="resume-upload"
          />

          <label htmlFor="resume-upload" className="cursor-pointer inline-block px-6 py-2 border rounded-md mb-4">
            Choose File
          </label>

          {file && <p className="text-sm mb-4">Selected: <strong>{file.name}</strong></p>}

          <button
            onClick={handleUpload}
            disabled={loading}
            className={`px-6 py-2 rounded text-white ${
              loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Uploading..." : "Upload Resume"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadResume;
