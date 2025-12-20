import { useEffect, useState } from "react";
import axios from "axios";

export default function PostJobPage() {
  /* ===============================
     🧠 ALL HOOKS AT TOP
  =============================== */
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    companyName: "",
    companyLogo: "",
    category: "",
    jobType: "Full-Time",
    workMode: "Onsite",
    location: "",
    experienceLevel: "",
    description: "",
    responsibilities: "",
    skills: "",
    minSalary: "",
    maxSalary: "",
    applyLink: "",
    applicationDeadline: "",
  });

  /* ===============================
     🔐 LOAD USER (OPTIONAL)
  =============================== */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  /* ===============================
     🧩 HANDLERS
  =============================== */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      postedBy: user
        ? {
            userId: user._id,
            role: user.role,
            name: user.name,
          }
        : null,

      source: user?.role
        ? user.role === "admin"
          ? "Admin"
          : user.role === "mentor"
          ? "Mentor"
          : "Recruiter"
        : "UI-Test",

      title: form.title,
      companyName: form.companyName,
      companyLogo: form.companyLogo || undefined,
      category: form.category || undefined,
      jobType: form.jobType,
      workMode: form.workMode,
      location: form.location,
      experienceLevel: form.experienceLevel || undefined,

      description: form.description || undefined,

      responsibilities: form.responsibilities
        ? form.responsibilities.split("\n").map(r => r.trim())
        : [],

      skills: form.skills
        ? form.skills.split(",").map(s => s.trim().toLowerCase())
        : [],

      salary:
        form.minSalary || form.maxSalary
          ? {
              min: form.minSalary || undefined,
              max: form.maxSalary || undefined,
            }
          : undefined,

      applyLink: form.applyLink || undefined,
      applicationDeadline: form.applicationDeadline || undefined,
    };

    try {
      setLoading(true);

      await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/jobs`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );

      alert("Job posted successfully ✅");
    } catch (error) {
      console.error(error);
      alert("Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  /* ===============================
     🖥 UI (ALWAYS RENDERS)
  =============================== */
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-3xl font-bold">Post Job</h1>

          {/* ✅ SAFE DISPLAY */}
          <p className="text-blue-100 mt-1">
            Posting as{" "}
            <b>{user?.role || "UI Preview Mode"}</b>
            {user?.name ? ` — ${user.name}` : ""}
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto px-6 py-10 space-y-6"
      >
        <Section title="Basic Information">
          <Input label="Job Title" name="title" value={form.title} onChange={handleChange} required />
          <Input label="Company Name" name="companyName" value={form.companyName} onChange={handleChange} required />
          <Input label="Location" name="location" value={form.location} onChange={handleChange} required />
          <Input label="Company Logo URL (optional)" name="companyLogo" value={form.companyLogo} onChange={handleChange} />
        </Section>

        <Section title="Job Details">
          <Select label="Job Type" name="jobType" value={form.jobType} onChange={handleChange}
            options={["Full-Time", "Part-Time", "Internship", "Contract"]} />
          <Select label="Work Mode" name="workMode" value={form.workMode} onChange={handleChange}
            options={["Onsite", "Remote", "Hybrid"]} />
          <Input label="Category" name="category" value={form.category} onChange={handleChange} />
          <Input label="Experience Level" name="experienceLevel" value={form.experienceLevel} onChange={handleChange} />
        </Section>

        <Section title="Description">
          <Textarea label="Job Description" name="description" value={form.description} onChange={handleChange} />
          <Textarea label="Responsibilities (one per line)" name="responsibilities" value={form.responsibilities} onChange={handleChange} />
        </Section>

        <Section title="Skills">
          <Input label="Skills (comma separated)" name="skills" value={form.skills} onChange={handleChange} />
        </Section>

        <Section title="Salary (Optional)">
          <div className="grid grid-cols-2 gap-4">
            <Input type="number" label="Min Salary" name="minSalary" value={form.minSalary} onChange={handleChange} />
            <Input type="number" label="Max Salary" name="maxSalary" value={form.maxSalary} onChange={handleChange} />
          </div>
        </Section>

        <Section title="Application">
          <Input label="Apply Link" name="applyLink" value={form.applyLink} onChange={handleChange} />
          <Input type="date" label="Application Deadline" name="applicationDeadline" value={form.applicationDeadline} onChange={handleChange} />
        </Section>

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Posting..." : "Post Job"}
        </button>
      </form>
    </div>
  );
}

/* ===============================
   REUSABLE COMPONENTS
=============================== */

function Section({ title, children }) {
  return (
    <div className="bg-white border rounded-lg p-6 space-y-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      {children}
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input {...props} className="w-full border rounded-lg px-3 py-2" />
    </div>
  );
}

function Textarea({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <textarea {...props} rows={4} className="w-full border rounded-lg px-3 py-2" />
    </div>
  );
}

function Select({ label, options, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <select {...props} className="w-full border rounded-lg px-3 py-2">
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
