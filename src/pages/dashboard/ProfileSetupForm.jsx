import { useState, useCallback } from "react";
import { UserCircle, GraduationCap, Briefcase, X, ArrowLeft, CheckCircle } from "lucide-react";
import { useGlobalContext } from "../AUTH/GlobalContext";
import { useNavigate } from "react-router-dom";
import React from "react";


const Input = React.memo(({ name, placeholder, type = "text", required = false, value, onChange }) => {
  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 border ${required ? 'border-blue-300' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
      {required && <span className="absolute right-3 top-3 text-red-500 text-sm">*</span>}
    </div>
  );
});

const Select = React.memo(({ name, placeholder, options, required = false, value, onChange }) => {
  return (
    <div className="relative">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 border ${required ? 'border-blue-300' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white`}
      >
        <option value="">{placeholder}</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {required && <span className="absolute right-10 top-3 text-red-500 text-sm">*</span>}
    </div>
  );
});

const StudentFields = ({ form, handleChange }) => (
  <div className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Input
        name="college"
        placeholder="College Name"
        required
        value={form.college}
        onChange={handleChange}
      />

      <Input
        name="university"
        placeholder="University Name"
        required
        value={form.university}
        onChange={handleChange}
      />
    </div>

    <Input
      name="collegeWebsite"
      placeholder="College Website"
      type="url"
      value={form.collegeWebsite}
      onChange={handleChange}
    />

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Input
        name="degree"
        placeholder="Degree"
        required
        value={form.degree}
        onChange={handleChange}
      />

      <Input
        name="branch"
        placeholder="Branch / Major"
        required
        value={form.branch}
        onChange={handleChange}
      />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Select
        name="year"
        placeholder="Current Year"
        required
        value={form.year}
        onChange={handleChange}
        options={[
          { value: "1st", label: "1st Year" },
          { value: "2nd", label: "2nd Year" },
          { value: "3rd", label: "3rd Year" },
          { value: "4th", label: "4th Year" },
          { value: "5th", label: "5th Year" },
        ]}
      />

      <Input
        name="graduationYear"
        placeholder="Graduation Year"
        required
        value={form.graduationYear}
        onChange={handleChange}
      />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Input
        name="currentCGPA"
        placeholder="Current CGPA"
        required
        value={form.currentCGPA}
        onChange={handleChange}
      />

      <Input
        name="tenthPercentage"
        placeholder="10th %"
        required
        value={form.tenthPercentage}
        onChange={handleChange}
      />

      <Input
        name="twelfthPercentage"
        placeholder="12th %"
        required
        value={form.twelfthPercentage}
        onChange={handleChange}
      />
    </div>

    <Input
      name="careerInterest"
      placeholder="Career Interest"
      required
      value={form.careerInterest}
      onChange={handleChange}
    />

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Input
        name="leetcode"
        placeholder="LeetCode Username"
        value={form.leetcode}
        onChange={handleChange}
      />

      <Input
        name="codeforces"
        placeholder="Codeforces Username"
        value={form.codeforces}
        onChange={handleChange}
      />
    </div>
  </div>
);



const ProfessionalFields = ({ form, handleChange }) => (
  <div className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Input
        name="company"
        placeholder="Current Company"
        required
        value={form.company}
        onChange={handleChange}
      />

      <Input
        name="jobTitle"
        placeholder="Job Title"
        required
        value={form.jobTitle}
        onChange={handleChange}
      />
    </div>

    <Input
      name="companyWebsite"
      placeholder="Company Website"
      type="url"
      value={form.companyWebsite}
      onChange={handleChange}
    />

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Input
        name="department"
        placeholder="Department"
        required
        value={form.department}
        onChange={handleChange}
      />

      <Input
        name="experience"
        placeholder="Years of Experience"
        required
        value={form.experience}
        onChange={handleChange}
      />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Input
        name="currentCTC"
        placeholder="Current CTC"
        value={form.currentCTC}
        onChange={handleChange}
      />

      <Input
        name="expectedCTC"
        placeholder="Expected CTC"
        value={form.expectedCTC}
        onChange={handleChange}
      />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Select
        name="careerLevel"
        placeholder="Career Level"
        required
        value={form.careerLevel}
        onChange={handleChange}
        options={[
          { value: "intern", label: "Intern" },
          { value: "entry", label: "Entry Level" },
          { value: "mid", label: "Mid Level" },
          { value: "senior", label: "Senior" },
          { value: "lead", label: "Lead" },
          { value: "executive", label: "Executive" },
        ]}
      />

      <Input
        name="noticePeriod"
        placeholder="Notice Period"
        value={form.noticePeriod}
        onChange={handleChange}
      />
    </div>

    <Select
      name="workMode"
      placeholder="Preferred Work Mode"
      required
      value={form.workMode}
      onChange={handleChange}
      options={[
        { value: "remote", label: "Remote" },
        { value: "hybrid", label: "Hybrid" },
        { value: "onsite", label: "On-site" },
      ]}
    />
  </div>
);











export default function ProfileSetupForm({ userId, onComplete }) {
  const { user } = useGlobalContext();
  const navigate = useNavigate();
  const [step, setStep] = useState("type");
  const [userType, setUserType] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [form, setForm] = useState({
    // Student fields
    college: "",
    collegeWebsite: "",
    university: "",
    degree: "",
    branch: "",
    year: "",
    graduationYear: "",
    currentCGPA: "",
    tenthPercentage: "",
    twelfthPercentage: "",
    careerInterest: "",
    
    // Professional fields
    company: "",
    companyWebsite: "",
    jobTitle: "",
    department: "",
    experience: "",
    currentCTC: "",
    expectedCTC: "",
    noticePeriod: "",
    careerLevel: "",
    workMode: "",
    
    // Common fields
    skills: "",
    portfolio: "",
    github: "",
    linkedin: "",
    leetcode: "",
    codeforces: "",
    preferredJobRole: "",
    preferredLocations: "",
    location: "",
  });

  // Use useCallback to prevent re-creating the function on every render
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSkip = () => {
    onComplete?.({ skipped: true });
  };

  const validateForm = () => {
    const errors = [];

    if (userType === "student") {
      // Required fields for students
      if (!form.college?.trim()) errors.push("College Name");
      if (!form.university?.trim()) errors.push("University Name");
      if (!form.degree?.trim()) errors.push("Degree");
      if (!form.branch?.trim()) errors.push("Branch/Major");
      if (!form.year) errors.push("Current Year");
      if (!form.graduationYear?.trim()) errors.push("Graduation Year");
      if (!form.currentCGPA?.trim()) errors.push("Current CGPA");
      if (!form.tenthPercentage?.trim()) errors.push("10th Percentage");
      if (!form.twelfthPercentage?.trim()) errors.push("12th Percentage");
      if (!form.careerInterest?.trim()) errors.push("Career Interest");
    } else if (userType === "working_professional") {
      // Required fields for professionals
      if (!form.company?.trim()) errors.push("Current Company");
      if (!form.jobTitle?.trim()) errors.push("Job Title");
      if (!form.department?.trim()) errors.push("Department");
      if (!form.experience?.trim()) errors.push("Years of Experience");
      if (!form.careerLevel) errors.push("Career Level");
      if (!form.workMode) errors.push("Preferred Work Mode");
    }

    // Common required fields
    if (!form.skills?.trim()) errors.push("Skills");
    if (!form.location?.trim()) errors.push("Current Location");
    if (!form.preferredJobRole?.trim()) errors.push("Preferred Job Role");
    if (!form.preferredLocations?.trim()) errors.push("Preferred Locations");

    return errors;
  };


   const saveUserTypeOnly = async (selectedType) => {
  const payload = {
    userId,
    userType: selectedType,
    name: user?.name || "",
    email: user?.email || ""
  };

  const res = await fetch(
    `${process.env.REACT_APP_BACKEND_BASE_URL}/api/first-time-details-fill`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }
  );

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Failed to save user type");
  }

  return res.json();
};


  const handleSubmit = async () => {
    // Validate form
    const errors = validateForm();
    if (errors.length > 0) {
      alert(`Please fill in the following required fields:\n\n${errors.join("\n")}`);
      return;
    }

    setLoading(true);
    
    try {
      // Prepare the request payload according to controller expectations
      const payload = {
        userId,
        name: user?.name || "",
        email: user?.email || "",
        userType,
        details: {
          location: form.location || undefined,
          skills: form.skills ? form.skills.split(",").map(s => s.trim()).filter(Boolean) : [],
          github: form.github || undefined,
          linkedin: form.linkedin || undefined,
          portfolio: form.portfolio || undefined,
          leetcode: form.leetcode || undefined,
          codeforces: form.codeforces || undefined,
        }
      };

      // Add type-specific details
      if (userType === "student") {
        payload.studentDetails = {
          college: form.college || undefined,
          collegeWebsite: form.collegeWebsite || undefined,
          university: form.university || undefined,
          degree: form.degree || undefined,
          branch: form.branch || undefined,
          year: form.year || undefined,
          graduationYear: form.graduationYear || undefined,
          currentCGPA: form.currentCGPA || undefined,
          tenthPercentage: form.tenthPercentage || undefined,
          twelfthPercentage: form.twelfthPercentage || undefined,
          careerInterest: form.careerInterest || undefined,
          preferredJobRole: form.preferredJobRole || undefined,
          preferredLocations: form.preferredLocations 
            ? form.preferredLocations.split(",").map(l => l.trim()).filter(Boolean)
            : [],
        };
      } else if (userType === "working_professional") {
        payload.professionalDetails = {
          company: form.company || undefined,
          companyWebsite: form.companyWebsite || undefined,
          jobTitle: form.jobTitle || undefined,
          department: form.department || undefined,
          experience: form.experience || undefined,
          currentCTC: form.currentCTC || undefined,
          expectedCTC: form.expectedCTC || undefined,
          noticePeriod: form.noticePeriod || undefined,
          careerLevel: form.careerLevel || undefined,
          workMode: form.workMode || undefined,
          preferredJobRole: form.preferredJobRole || undefined,
          preferredLocations: form.preferredLocations 
            ? form.preferredLocations.split(",").map(l => l.trim()).filter(Boolean)
            : [],
        };
      }

      const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/first-time-details-fill`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      // Check for 200 status code (success)
      if (response.status === 200 && response.ok) {
        // Show success popup
        setShowSuccessPopup(true);
        
        // Call onComplete if provided
        onComplete?.({ skipped: false, data: data.data });
        
        // Refresh the page and navigate after 2 seconds
        setTimeout(() => {
          window.location.href = "/overview";
        }, 2000);
      } else {
        throw new Error(data.message || "Failed to save profile");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      alert(error.message || "Failed to save profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Success Popup Component
  const SuccessPopup = () => (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-[60] animate-[fadeIn_0.3s_ease-out]">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center animate-[scaleIn_0.3s_ease-out]">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Registration Successful!
        </h3>
        <p className="text-gray-600 mb-4">
          Your profile has been created successfully. Redirecting you to the overview page...
        </p>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      </div>
    </div>
  );

//   // Input Component - Memoized to prevent re-renders
//   const Input = ({ name, placeholder, type = "text", required = false }) => (
//     <div className="relative">
//       <input
//         type={type}
//         name={name}
//         placeholder={placeholder}
//         value={form[name]}
//         onChange={handleChange}
//         className={`w-full px-4 py-3 border ${required ? 'border-blue-300' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
//       />
//       {required && (
//         <span className="absolute right-3 top-3 text-red-500 text-sm">*</span>
//       )}
//     </div>
//   );

//   const Select = ({ name, placeholder, options, required = false }) => (
//     <div className="relative">
//       <select
//         name={name}
//         value={form[name]}
//         onChange={handleChange}
//         className={`w-full px-4 py-3 border ${required ? 'border-blue-300' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white`}
//       >
//         <option value="">{placeholder}</option>
//         {options.map((opt) => (
//           <option key={opt.value} value={opt.value}>
//             {opt.label}
//           </option>
//         ))}
//       </select>
//       {required && (
//         <span className="absolute right-10 top-3 text-red-500 text-sm">*</span>
//       )}
//     </div>
//   );

  // TYPE SELECTION STEP
  if (step === "type") {
    return (
      <>
        <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative animate-[fadeIn_0.3s_ease-out]">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mb-4">
                <UserCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome{user?.name ? `, ${user.name.split(' ')[0]}` : ''}! Let's get started
              </h2>
              <p className="text-gray-600">
                Help us personalize your experience by telling us about yourself
              </p>
            </div>

            <div className="space-y-3">
              <button
               onClick={async () => {
  try {
    setLoading(true);
    await saveUserTypeOnly("student");
    setUserType("student");
    setStep("form");
  } catch (err) {
    alert(err.message);
  } finally {
    setLoading(false);
  }
}}

                className="w-full group relative overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border-2 border-blue-200 rounded-xl p-5 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-semibold text-gray-900 text-lg">Student</div>
                    <div className="text-sm text-gray-600">Currently pursuing education</div>
                  </div>
                </div>
              </button>

              <button
             onClick={async () => {
  try {
    setLoading(true);
    await saveUserTypeOnly("working_professional");
    setUserType("working_professional");
    setStep("form");
  } catch (err) {
    alert(err.message);
  } finally {
    setLoading(false);
  }
}}

                className="w-full group relative overflow-hidden bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 border-2 border-indigo-200 rounded-xl p-5 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-semibold text-gray-900 text-lg">Professional</div>
                    <div className="text-sm text-gray-600">Currently working</div>
                  </div>
                </div>
              </button>
            </div>

            <div className="mt-6 text-center">
           
            </div>
          </div>
        </div>
        {showSuccessPopup && <SuccessPopup />}
      </>
    );
  }

  // FORM STEP
  const isStudent = userType === "student";
  


  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8 animate-[fadeIn_0.3s_ease-out]">
          {/* Header */}
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setStep("type")}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm font-medium">Back</span>
              </button>
              <button
                onClick={handleSkip}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                isStudent ? 'bg-blue-500' : 'bg-indigo-500'
              }`}>
                {isStudent ? (
                  <GraduationCap className="w-6 h-6 text-white" />
                ) : (
                  <Briefcase className="w-6 h-6 text-white" />
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {isStudent ? "Student Profile" : "Professional Profile"}
                </h2>
                <p className="text-gray-600 text-sm">
                  Fill in your details to get personalized recommendations
                </p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 max-h-[60vh] overflow-y-auto">
{isStudent ? (
  <StudentFields form={form} handleChange={handleChange} />
) : (
  <ProfessionalFields form={form} handleChange={handleChange} />
)}
            
            {/* Common Fields */}
            <div className="mt-6 pt-6 border-t border-gray-200 space-y-4">
              <label className="text-sm font-medium text-gray-700 block">
                Additional Information <span className="text-red-500">*</span>
              </label>
           <Input name="skills" placeholder="Skills" required value={form.skills} onChange={handleChange} />
<Input name="location" placeholder="Current Location" required value={form.location} onChange={handleChange} />
<Input name="preferredJobRole" placeholder="Preferred Job Role" required value={form.preferredJobRole} onChange={handleChange} />
<Input name="preferredLocations" placeholder="Preferred Locations" required value={form.preferredLocations} onChange={handleChange} />
              
              <div className="pt-2">
                <label className="text-sm font-medium text-gray-700 mb-2 block">Links (optional)</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <Input name="portfolio" value={form.portfolio} onChange={handleChange} />
<Input name="github" value={form.github} onChange={handleChange} />
<Input name="linkedin" value={form.linkedin} onChange={handleChange} />




                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-6 bg-gray-50 rounded-b-2xl">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full py-3.5 rounded-lg font-semibold text-white transition-all duration-300 ${
                loading ? 'bg-gray-400 cursor-not-allowed' : isStudent
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 hover:shadow-lg hover:scale-[1.02]'
                  : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 hover:shadow-lg hover:scale-[1.02]'
              }`}
            >
              {loading ? "Saving..." : "Save Profile"}
            </button>
            <p className="text-center text-xs text-gray-500 mt-3">
              * Required fields | You can update these details anytime from your profile settings
            </p>
          </div>
        </div>
      </div>
      {showSuccessPopup && <SuccessPopup />}
    </>
  );
}