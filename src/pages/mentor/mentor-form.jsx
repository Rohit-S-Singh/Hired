import React, { useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../AUTH/GlobalContext";

const BecomeMentorForm = () => {
const { user, setUser } = useGlobalContext();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: "",
    expertise: "",
    experience: "",
    bio: "",
    pricePerHour: "",
    interviewTypes: []
  });

  const interviewOptions = [
    { value: "technical", label: "Technical Interview" },
    { value: "behavioral", label: "Behavioral Interview" },
    { value: "mock", label: "Mock Interview" },
    { value: "resume_review", label: "Resume Review" },
    { value: "career_guidance", label: "Career Guidance" },
    { value: "system_design", label: "System Design" }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleInterviewTypeChange = (type) => {
    setFormData((prev) => ({
      ...prev,
      interviewTypes: prev.interviewTypes.includes(type)
        ? prev.interviewTypes.filter((t) => t !== type)
        : [...prev.interviewTypes, type]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user._id) {
      alert("User not logged in");
      return;
    }

    try {
      const payload = {
        userId: user._id,
        ...formData,
        expertise: formData.expertise
          .split(",")
          .map((skill) => skill.trim())
      };

      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/mentors/become-mentor`,
        payload
      );

   if (res.status === 200) {
  setUser((prev) => ({
    ...prev,
    mentorStatus: "pending"
  }));

  alert(res.data.message || "Mentor request submitted successfully!");
}


    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || "Something went wrong");
      } else {
        alert("Server not reachable. Please try again later.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Become a Mentor
          </h1>
          <p className="text-gray-600">
            Share your expertise and help shape the next generation of professionals
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Basic Information
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="text"
                      name="phone"
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Profile Image URL
                  </label>
                  <input
                    type="text"
                    name="avatar"
                    placeholder="https://example.com/your-photo.jpg"
                    value={formData.avatar}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Professional Information Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Professional Information
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Areas of Expertise *
                  </label>
                  <input
                    type="text"
                    name="expertise"
                    placeholder="e.g., JavaScript, React, Node.js, System Design"
                    value={formData.expertise}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Separate multiple skills with commas
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Years of Experience *
                  </label>
                  <input
                    type="number"
                    name="experience"
                    placeholder="5"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                    min="0"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Professional Bio
                  </label>
                  <textarea
                    name="bio"
                    placeholder="Tell us about yourself, your background, and what you're passionate about..."
                    value={formData.bio}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Hourly Rate (₹) *
                  </label>
                  <input
                    type="number"
                    name="pricePerHour"
                    placeholder="1000"
                    value={formData.pricePerHour}
                    onChange={handleChange}
                    required
                    min="0"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Services Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Services Offered
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Select the types of mentoring sessions you can provide
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {interviewOptions.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-3 p-3 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50 transition"
                  >
                    <input
                      type="checkbox"
                      checked={formData.interviewTypes.includes(option.value)}
                      onChange={() => handleInterviewTypeChange(option.value)}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 font-medium">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
              >
                Submit Application
              </button>
              <p className="text-xs text-gray-500 text-center mt-3">
                Your application will be reviewed within 2-3 business days
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BecomeMentorForm;