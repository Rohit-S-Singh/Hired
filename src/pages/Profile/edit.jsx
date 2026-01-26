"use client"

import { useState, useEffect } from "react"
import {
  User,
  Briefcase,
  GraduationCap,
  MapPin,
  Globe,
  Github,
  Linkedin,
  Plus,
  Trash2,
  Save,
  Camera,
  BriefcaseBusiness,
  ShieldCheck,
} from "lucide-react"
import { useGlobalContext } from "../AUTH/GlobalContext"
import { Trophy, UserCheck } from "lucide-react"
import toast from "react-hot-toast";


export default function EditProfileForm() {
  const { userProfile, setUserProfile } = useGlobalContext()
  const [activeTab, setActiveTab] = useState("basic")
  const [formData, setFormData] = useState(null)

  // Initialize form data from userProfile
  useEffect(() => {
    if (userProfile) {
      setFormData({ ...userProfile })
    }
  }, [userProfile])

  if (!formData) return <div className="p-8 text-center text-gray-500">Loading profile data...</div>

  const handleInputChange = (e, section = null, subSection = null) => {
    const { name, value } = e.target

    setFormData((prev) => {
      const newData = { ...prev }
      if (subSection) {
        newData[section][subSection][name] = value
      } else if (section) {
        newData[section][name] = value
      } else {
        newData[name] = value
      }
      return newData
    })
  }

  const handleArrayChange = (index, section, field, value) => {
    setFormData((prev) => {
      const newArray = [...prev[section]]
      newArray[index] = { ...newArray[index], [field]: value }
      return { ...prev, [section]: newArray }
    })
  }

  const addItem = (section, defaultObj) => {
    setFormData((prev) => ({
      ...prev,
      [section]: [...(prev[section] || []), defaultObj],
    }))
  }

  const removeItem = (section, index) => {
    setFormData((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }))
  }

const saveProfile = async () => {
  const toastId = toast.loading("Saving profile...");

  try {
    const payload = {
      userId: userProfile.userId, // 🔴 REQUIRED
      ...formData,
    };

    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/api/update`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();

    if (res.status !== 200) {
      throw new Error(data.message || "Profile update failed");
    }

    setUserProfile(data.profile);

    // ✅ SUCCESS TOAST
    toast.success("Profile updated successfully!", {
      id: toastId,
    });

  } catch (err) {
    console.error(err);

    // ❌ ERROR TOAST
    toast.error(err.message || "Failed to update profile", {
      id: toastId,
    });
  }
};
  const tabs = [
    { id: "basic", label: "Basic Info", icon: User },
    {
      id: "professional",
      label: formData.userType === "student" ? "Education" : "Professional",
      icon: formData.userType === "student" ? GraduationCap : Briefcase,
    },
    { id: "experience", label: "Experience", icon: BriefcaseBusiness },
    { id: "projects", label: "Projects", icon: Globe },
    { id: "skills", label: "Skills & Social", icon: ShieldCheck },
    { id: "certs", label: "Certifications", icon: ShieldCheck },
{ id: "achievements", label: "Achievements", icon: Trophy },
{ id: "recommendations", label: "Recommendations", icon: UserCheck },

  ]
  return (
    <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mt-6">
      <div className="flex flex-col md:flex-row min-h-[600px]">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 bg-gray-50 border-r border-gray-200">
          <div className="p-6">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Edit Profile</h2>
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === tab.id ? "bg-blue-600 text-white shadow-md" : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
          <div className="p-6 mt-auto border-t border-gray-200">
            <button
              onClick={saveProfile}
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-sm"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </aside>

        {/* Form Content Area */}
        <main className="flex-1 p-8 overflow-y-auto max-h-[80vh]">
          {activeTab === "basic" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 border-b pb-4">
                  <User className="w-5 h-5 text-blue-600" />
                  Basic Information
                </h3>

                <div className="flex flex-col sm:flex-row gap-8 mb-8">
                  <div className="relative group">
                    <img
                      src={formData.picture || "https://api.dicebear.com/7.x/avataaars/svg?seed=default"}
                      alt="Profile"
                      className="w-32 h-32 rounded-full border-4 border-gray-100 object-cover shadow-sm"
                    />
                    <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full shadow-lg hover:scale-110 transition-transform">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name || ""}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email || ""}
                          disabled
                          className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-500 cursor-not-allowed"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone || ""}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">User Type</label>
                        <select
                          name="userType"
                          value={formData.userType}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                          <option value="student">Student</option>
                          <option value="working_professional">Working Professional</option>
                          <option value="None">None</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Profile Bio</label>
                    <textarea
                      name="bio"
                      rows={4}
                      value={formData.bio || ""}
                      onChange={handleInputChange}
                      placeholder="Write a brief introduction about yourself..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        name="location"
                        value={formData.details?.location || ""}
                        onChange={(e) => handleInputChange(e, "details")}
                        placeholder="e.g. San Francisco, CA"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}

          {activeTab === "professional" && formData.userType === "working_professional" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 border-b pb-4">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                  Professional Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Current Company</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.professionalDetails?.company || ""}
                      onChange={(e) => handleInputChange(e, "professionalDetails")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Job Title</label>
                    <input
                      type="text"
                      name="jobTitle"
                      value={formData.professionalDetails?.jobTitle || ""}
                      onChange={(e) => handleInputChange(e, "professionalDetails")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Experience (Years)</label>
                    <input
                      type="text"
                      name="experience"
                      value={formData.professionalDetails?.experience || ""}
                      onChange={(e) => handleInputChange(e, "professionalDetails")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Notice Period</label>
                    <input
                      type="text"
                      name="noticePeriod"
                      value={formData.professionalDetails?.noticePeriod || ""}
                      onChange={(e) => handleInputChange(e, "professionalDetails")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>
              </section>
            </div>
          )}

          {activeTab === "professional" && formData.userType === "student" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 border-b pb-4">
                  <GraduationCap className="w-5 h-5 text-blue-600" />
                  Education Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">College/University</label>
                    <input
                      type="text"
                      name="college"
                      value={formData.studentDetails?.college || ""}
                      onChange={(e) => handleInputChange(e, "studentDetails")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Degree</label>
                    <input
                      type="text"
                      name="degree"
                      value={formData.studentDetails?.degree || ""}
                      onChange={(e) => handleInputChange(e, "studentDetails")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Branch/Major</label>
                    <input
                      type="text"
                      name="branch"
                      value={formData.studentDetails?.branch || ""}
                      onChange={(e) => handleInputChange(e, "studentDetails")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Current CGPA</label>
                    <input
                      type="text"
                      name="currentCGPA"
                      value={formData.studentDetails?.currentCGPA || ""}
                      onChange={(e) => handleInputChange(e, "studentDetails")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Graduation Year</label>
                    <input
                      type="text"
                      name="graduationYear"
                      value={formData.studentDetails?.graduationYear || ""}
                      onChange={(e) => handleInputChange(e, "studentDetails")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>
              </section>
            </div>
          )}

          {activeTab === "experience" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex justify-between items-center border-b pb-4 mb-4">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <BriefcaseBusiness className="w-5 h-5 text-blue-600" />
                  Work Experience
                </h3>
                <button
                  onClick={() =>
                    addItem("experience", {
                      company: "",
                      role: "",
                      duration: "",
                      location: "",
                      current: false,
                      description: "",
                    })
                  }
                  className="text-blue-600 font-semibold text-sm flex items-center gap-1 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" /> Add New
                </button>
              </div>

              {formData.experience?.map((exp, index) => (
                <div key={index} className="p-6 bg-gray-50 rounded-xl border border-gray-200 relative group">
                  <button
                    onClick={() => removeItem("experience", index)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Company</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => handleArrayChange(index, "experience", "company", e.target.value)}
                        className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Role</label>
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) => handleArrayChange(index, "experience", "role", e.target.value)}
                        className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Duration</label>
                      <input
                        type="text"
                        value={exp.duration}
                        onChange={(e) => handleArrayChange(index, "experience", "duration", e.target.value)}
                        className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 outline-none"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description</label>
                      <textarea
                        rows={3}
                        value={exp.description}
                        onChange={(e) => handleArrayChange(index, "experience", "description", e.target.value)}
                        className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 outline-none resize-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "projects" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex justify-between items-center border-b pb-4 mb-4">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-blue-600" />
                  Key Projects
                </h3>
                <button
                  onClick={() =>
                    addItem("projects", { name: "", desc: "", tech: [], status: "development", githubLink: "" })
                  }
                  className="text-blue-600 font-semibold text-sm flex items-center gap-1 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" /> Add New
                </button>
              </div>

              {formData.projects?.map((project, index) => (
                <div key={index} className="p-6 bg-gray-50 rounded-xl border border-gray-200 relative group">
                  <button
                    onClick={() => removeItem("projects", index)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Project Name</label>
                      <input
                        type="text"
                        value={project.name}
                        onChange={(e) => handleArrayChange(index, "projects", "name", e.target.value)}
                        className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={project.desc}
                        onChange={(e) => handleArrayChange(index, "projects", "desc", e.target.value)}
                        className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 outline-none resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">GitHub Link</label>
                      <input
                        type="url"
                        value={project.githubLink}
                        onChange={(e) => handleArrayChange(index, "projects", "githubLink", e.target.value)}
                        className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Status</label>
                      <select
                        value={project.status}
                        onChange={(e) => handleArrayChange(index, "projects", "status", e.target.value)}
                        className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 outline-none"
                      >
                        <option value="development">Development</option>
                        <option value="live">Live</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
           {activeTab === "certs" && (
  <div className="space-y-6">
    <div className="flex justify-between items-center border-b pb-4">
      <h3 className="text-xl font-bold">Certifications</h3>
      <button
        onClick={() =>
          addItem("certs", { name: "", issuer: "", year: "", icon: "" })
        }
        className="text-blue-600 font-semibold text-sm"
      >
        + Add
      </button>
    </div>

    {formData.certs?.map((cert, index) => (
      <div key={index} className="p-4 border rounded-lg relative">
        <button
          onClick={() => removeItem("certs", index)}
          className="absolute top-2 right-2 text-red-500"
        >
          <Trash2 />
        </button>

        <input
          placeholder="Certification Name"
          value={cert.name}
          onChange={(e) =>
            handleArrayChange(index, "certs", "name", e.target.value)
          }
          className="input"
        />
        <input
          placeholder="Issuer"
          value={cert.issuer}
          onChange={(e) =>
            handleArrayChange(index, "certs", "issuer", e.target.value)
          }
          className="input"
        />
        <input
          placeholder="Year"
          value={cert.year}
          onChange={(e) =>
            handleArrayChange(index, "certs", "year", e.target.value)
          }
          className="input"
        />
        <input
          placeholder="Icon URL"
          value={cert.icon}
          onChange={(e) =>
            handleArrayChange(index, "certs", "icon", e.target.value)
          }
          className="input"
        />
      </div>
    ))}
  </div>
          )}
          {activeTab === "achievements" && (
  <div className="space-y-6">
    <div className="flex justify-between items-center border-b pb-4">
      <h3 className="text-xl font-bold">Achievements</h3>
      <button
        onClick={() =>
          addItem("achievements", { title: "", year: "", desc: "" })
        }
        className="text-blue-600 font-semibold text-sm"
      >
        + Add
      </button>
    </div>

    {formData.achievements?.map((ach, index) => (
      <div key={index} className="p-4 border rounded-lg relative">
        <button
          onClick={() => removeItem("achievements", index)}
          className="absolute top-2 right-2 text-red-500"
        >
          <Trash2 />
        </button>

        <input
          placeholder="Title"
          value={ach.title}
          onChange={(e) =>
            handleArrayChange(index, "achievements", "title", e.target.value)
          }
          className="input"
        />
        <input
          placeholder="Year"
          value={ach.year}
          onChange={(e) =>
            handleArrayChange(index, "achievements", "year", e.target.value)
          }
          className="input"
        />
        <textarea
          placeholder="Description"
          value={ach.desc}
          onChange={(e) =>
            handleArrayChange(index, "achievements", "desc", e.target.value)
          }
          className="input resize-none"
          rows={2}
        />
      </div>
    ))}

  </div>
       )}
         {activeTab === "recommendations" && (
  <div className="space-y-6">
    <div className="flex justify-between items-center border-b pb-4">
      <h3 className="text-xl font-bold">Recommendations</h3>
      <button
        onClick={() =>
          addItem("recommendations", { name: "", role: "", text: "", avatar: "" })
        }
        className="text-blue-600 font-semibold text-sm"
      >
        + Add
      </button>
    </div>

    {formData.recommendations?.map((rec, index) => (
      <div key={index} className="p-4 border rounded-lg relative">
        <button
          onClick={() => removeItem("recommendations", index)}
          className="absolute top-2 right-2 text-red-500"
        >
          <Trash2 />
        </button>

        <input
          placeholder="Name"
          value={rec.name}
          onChange={(e) =>
            handleArrayChange(index, "recommendations", "name", e.target.value)
          }
          className="input"
        />
        <input
          placeholder="Role / Position"
          value={rec.role}
          onChange={(e) =>
            handleArrayChange(index, "recommendations", "role", e.target.value)
          }
          className="input"
        />
        <textarea
          placeholder="Recommendation text"
          value={rec.text}
          onChange={(e) =>
            handleArrayChange(index, "recommendations", "text", e.target.value)
          }
          className="input resize-none"
          rows={2}
        />
        <input
          placeholder="Avatar URL"
          value={rec.avatar}
          onChange={(e) =>
            handleArrayChange(index, "recommendations", "avatar", e.target.value)
          }
          className="input"
        />
      </div>
    ))}
  </div>
   )}

  {activeTab === "skills" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 border-b pb-4">
                  <ShieldCheck className="w-5 h-5 text-blue-600" />
                  Skills & Platforms
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Technical Skills (Comma separated)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. React, Node.js, TypeScript, AWS"
                      value={formData.details?.skills?.join(", ") || ""}
                      onChange={(e) => {
                        const skillsArray = e.target.value.split(",").map((s) => s.trim())
                        setFormData((prev) => ({
                          ...prev,
                          details: { ...prev.details, skills: skillsArray },
                        }))
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-2">
                        <Github className="w-4 h-4" /> GitHub
                      </label>
                      <input
                        type="url"
                        name="github"
                        value={formData.details?.github || ""}
                        onChange={(e) => handleInputChange(e, "details")}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-2">
                        <Linkedin className="w-4 h-4" /> LinkedIn
                      </label>
                      <input
                        type="url"
                        name="linkedin"
                        value={formData.details?.linkedin || ""}
                        onChange={(e) => handleInputChange(e, "details")}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
