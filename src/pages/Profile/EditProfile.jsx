import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../AUTH/GlobalContext";

export default function EditProfile() {
  const { user } = useGlobalContext();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    userType: "student",
    picture: "",
    coverImage: "",
    details: {
      company: "",
      logo: "",
      title: "",
      experience: "",
      location: "",
      ctc: "",
      expectedCTC: "",
      notice: "",
      workMode: "",
      skills: [],
      github: "",
      linkedin: "",
      portfolio: ""
    },
    experience: [],
    projects: [],
    certs: [],
    achievements: [],
    recommendations: []
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // FETCH PROFILE
  useEffect(() => {
    if (!user?._id) return;

    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/api/profile/user/${user._id}`
        );
        const p = res.data.profile || {};
        setForm({
          name: p.name || "",
          email: p.email || "",
          phone: p.phone || "",
          bio: p.bio || "",
          userType: p.userType || "student",
          picture: p.picture || "",
          coverImage: p.coverImage || "",
          details: {
            ...p.details,
            skills: p.details?.skills || []
          },
          experience: p.experience || [],
          projects: p.projects || [],
          certs: p.certs || [],
          achievements: p.achievements || [],
          recommendations: p.recommendations || []
        });
      } catch (err) {
        console.error("Profile fetch error:", err);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  // BASIC & DETAILS CHANGE
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleDetailsChange = (e) => setForm({ ...form, details: { ...form.details, [e.target.name]: e.target.value } });

  // ARRAY HANDLERS
  const handleArrayChange = (arrayName, index, key, value) => {
    const arr = [...form[arrayName]];
    arr[index][key] = value;
    setForm({ ...form, [arrayName]: arr });
  };

  const handleNestedArrayChange = (arrayName, index, key, nestedIndex, value) => {
    const arr = [...form[arrayName]];
    arr[index][key][nestedIndex] = value;
    setForm({ ...form, [arrayName]: arr });
  };

  const addArrayItem = (arrayName, defaultValue) => {
    setForm({ ...form, [arrayName]: [...form[arrayName], defaultValue] });
  };

  const removeArrayItem = (arrayName, index) => {
    const arr = [...form[arrayName]];
    arr.splice(index, 1);
    setForm({ ...form, [arrayName]: arr });
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/profile/user/${user._id}`, form);
      alert("Profile updated successfully ✅");
    } catch (err) {
      console.error("Update error:", err);
      setError("Profile update failed ❌");
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <p className="text-xl text-gray-600">Loading...</p>
    </div>
  );
  
  if (error) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <p className="text-xl text-red-500">{error}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-black mb-4">Edit Your Profile</h1>
          <p className="text-lg text-gray-600">Update your information to keep your profile current</p>
        </div>

        {/* Basic Information Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-black mb-6">Basic Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
              <input
                name="name"
                value={form.name || ""}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input
                name="email"
                value={form.email || ""}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
              <input
                name="phone"
                value={form.phone || ""}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Bio</label>
              <textarea
                name="bio"
                value={form.bio || ""}
                onChange={handleChange}
                placeholder="Tell us about yourself"
                rows="4"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">User Type</label>
              <select
                name="userType"
                value={form.userType}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="student">Student</option>
                <option value="working_professional">Working Professional</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Profile Picture URL</label>
              <input
                name="picture"
                value={form.picture || ""}
                onChange={handleChange}
                placeholder="Enter profile picture URL"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image URL</label>
              <input
                name="coverImage"
                value={form.coverImage || ""}
                onChange={handleChange}
                placeholder="Enter cover image URL"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-black mb-6">Professional Details</h2>
          <div className="space-y-4">
            {Object.keys(form.details).map((key) =>
              Array.isArray(form.details[key]) ? (
                <div key={key} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 capitalize">{key}</label>
                  {form.details[key].map((val, idx) => (
                    <div key={idx} className="flex gap-2 mb-2">
                      <input
                        value={val}
                        onChange={(e) => {
                          const arr = [...form.details[key]];
                          arr[idx] = e.target.value;
                          setForm({ ...form, details: { ...form.details, [key]: arr } });
                        }}
                        className="border border-gray-300 p-2 rounded-lg flex-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={`Enter ${key}`}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const arr = [...form.details[key]];
                          arr.splice(idx, 1);
                          setForm({ ...form, details: { ...form.details, [key]: arr } });
                        }}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-bold"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, details: { ...form.details, [key]: [...form.details[key], ""] } })}
                    className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-bold text-sm"
                  >
                    + Add {key}
                  </button>
                </div>
              ) : (
                <div key={key}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 capitalize">{key}</label>
                  <input
                    name={key}
                    value={form.details[key] || ""}
                    onChange={handleDetailsChange}
                    placeholder={`Enter ${key}`}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              )
            )}
          </div>
        </div>

        {/* Experience Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-black mb-6">Experience</h2>
          {form.experience.map((exp, i) => (
            <div key={i} className="border-2 border-blue-200 rounded-xl p-6 mb-6 bg-blue-50 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-blue-600">Experience #{i + 1}</h3>
                <button
                  type="button"
                  onClick={() => removeArrayItem("experience", i)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-bold"
                >
                  Remove
                </button>
              </div>
              <div className="space-y-4">
                {Object.keys(exp).map((key) =>
                  Array.isArray(exp[key]) ? (
                    <div key={key} className="border border-gray-200 rounded-lg p-4 bg-white">
                      <label className="block text-sm font-semibold text-gray-700 mb-3 capitalize">{key}</label>
                      {exp[key].map((val, idx) => (
                        <div key={idx} className="flex gap-2 mb-2">
                          <input
                            value={val}
                            onChange={(e) => handleNestedArrayChange("experience", i, key, idx, e.target.value)}
                            className="border border-gray-300 p-2 rounded-lg flex-1 focus:ring-2 focus:ring-blue-500"
                            placeholder={`Enter ${key}`}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const arr = [...exp[key]];
                              arr.splice(idx, 1);
                              handleArrayChange("experience", i, key, arr);
                            }}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-bold"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => handleArrayChange("experience", i, key, [...exp[key], ""])}
                        className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-bold text-sm"
                      >
                        + Add {key}
                      </button>
                    </div>
                  ) : (
                    <div key={key}>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 capitalize">{key}</label>
                      <input
                        value={exp[key] || ""}
                        onChange={(e) => handleArrayChange("experience", i, key, e.target.value)}
                        placeholder={`Enter ${key}`}
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem("experience", { company:"", logo:"", role:"", duration:"", location:"", points:[], current:false, teamSize:"", technologies:[], description:"" })}
            className="w-full py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:scale-105 transition-all font-bold text-lg shadow-lg"
          >
            + Add Experience
          </button>
        </div>

        {/* Projects Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-black mb-6">Projects</h2>
          {form.projects.map((proj, i) => (
            <div key={i} className="border-2 border-orange-200 rounded-xl p-6 mb-6 bg-orange-50 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-orange-600">Project #{i + 1}</h3>
                <button
                  type="button"
                  onClick={() => removeArrayItem("projects", i)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-bold"
                >
                  Remove
                </button>
              </div>
              <div className="space-y-4">
                {Object.keys(proj).map((key) =>
                  Array.isArray(proj[key]) ? (
                    <div key={key} className="border border-gray-200 rounded-lg p-4 bg-white">
                      <label className="block text-sm font-semibold text-gray-700 mb-3 capitalize">{key}</label>
                      {proj[key].map((val, idx) => (
                        <div key={idx} className="flex gap-2 mb-2">
                          <input
                            value={val}
                            onChange={(e) => handleNestedArrayChange("projects", i, key, idx, e.target.value)}
                            className="border border-gray-300 p-2 rounded-lg flex-1 focus:ring-2 focus:ring-orange-500"
                            placeholder={`Enter ${key}`}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const arr = [...proj[key]];
                              arr.splice(idx, 1);
                              handleArrayChange("projects", i, key, arr);
                            }}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-bold"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => handleArrayChange("projects", i, key, [...proj[key], ""])}
                        className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-bold text-sm"
                      >
                        + Add {key}
                      </button>
                    </div>
                  ) : (
                    <div key={key}>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 capitalize">{key}</label>
                      <input
                        value={proj[key] || ""}
                        onChange={(e) => handleArrayChange("projects", i, key, e.target.value)}
                        placeholder={`Enter ${key}`}
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem("projects", { name:"", desc:"", tech:[], status:"development", featured:false, githubLink:"", deployedLink:"", teamSize:"", responsibilities:[] })}
            className="w-full py-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 hover:scale-105 transition-all font-bold text-lg shadow-lg"
          >
            + Add Project
          </button>
        </div>

        {/* Certifications, Achievements, Recommendations */}
        {["certs", "achievements", "recommendations"].map((arrName) => (
          <div key={arrName} className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-black mb-6 capitalize">{arrName}</h2>
            {form[arrName].map((item, i) => (
              <div key={i} className="border-2 border-gray-200 rounded-xl p-6 mb-6 bg-gray-50 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-700">{arrName.slice(0, -1)} #{i + 1}</h3>
                  <button
                    type="button"
                    onClick={() => removeArrayItem(arrName, i)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-bold"
                  >
                    Remove
                  </button>
                </div>
                <div className="space-y-4">
                  {Object.keys(item).map((key) => (
                    <div key={key}>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 capitalize">{key}</label>
                      <input
                        value={item[key] || ""}
                        onChange={(e) => handleArrayChange(arrName, i, key, e.target.value)}
                        placeholder={`Enter ${key}`}
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem(arrName, Object.fromEntries(Object.keys(form[arrName][0] || {}).map(k => [k, ""])))}
              className="w-full py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:scale-105 transition-all font-bold text-lg shadow-lg"
            >
              + Add {arrName}
            </button>
          </div>
        ))}

        {/* Submit Button */}
        <div className="sticky bottom-0 bg-white border-t-4 border-blue-600 rounded-xl shadow-2xl p-6">
          <button
            type="submit"
            className="w-full py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 hover:scale-105 transition-all font-bold text-xl shadow-lg"
          >
            💾 Save All Changes
          </button>
        </div>
      </form>
    </div>
  );
}