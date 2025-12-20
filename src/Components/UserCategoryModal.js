import { useState } from "react";
import { X, User, Briefcase, GraduationCap, Building, Award, Code, MapPin, Calendar, TrendingUp } from "lucide-react";
import { useGlobalContext } from '../pages/AUTH/GlobalContext';


export default function UserCategoryModal({ isOpen, onClose, onSubmit }) {
    const { user, setUser } = useGlobalContext();

  const [userType, setUserType] = useState("");
  const [currentStep, setCurrentStep] = useState(1);

  const [student, setStudent] = useState({
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
    skills: "",
    resumeLink: "",
    portfolioLink: "",
    github: "",
    leetcode: "",
    codeforces: "",
    careerInterest: "",
    preferredJobRole: "",
    preferredLocations: "",
  });

  const [professional, setProfessional] = useState({
    company: "",
    companyWebsite: "",
    jobTitle: "",
    department: "",
    experience: "",
    currentCTC: "",
    expectedCTC: "",
    noticePeriod: "",
    skills: "",
    resumeLink: "",
    portfolioLink: "",
    github: "",
    linkedin: "",
    careerLevel: "",
    workMode: "",
    preferredJobRole: "",
    preferredLocations: "",
  });

const handleSubmit = async () => {
  if (!userType) return alert("Please select user type!");

  const email = user.email; // your logged-in user's email

  const payload =
    userType === "student"
      ? {
          email,
          userType,
          studentDetails: {
            ...student,
            skills: student.skills.split(",").map((s) => s.trim()),
            preferredLocations: student.preferredLocations
              .split(",")
              .map((s) => s.trim()),
          },
        }
      : {
          email,
          userType,
        professionalDetails: {
  ...professional,
  careerLevel: professional.careerLevel || undefined,
  workMode: professional.workMode || undefined,
  skills: professional.skills.split(",").map(s => s.trim()),
  preferredLocations: professional.preferredLocations
    .split(",")
    .map(s => s.trim()),
}
,
        };

  try {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/api/enter-updateUserCategory`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Failed to update profile");
      return;
    }

    alert("Profile updated successfully!");
    onClose();

  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong while updating profile");
  }
};


  if (!isOpen) return null;

  const studentSections = [
    {
      title: "Academic Information",
      icon: GraduationCap,
      fields: ["college", "collegeWebsite", "university", "degree", "branch", "year", "graduationYear"]
    },
    {
      title: "Academic Performance",
      icon: Award,
      fields: ["currentCGPA", "tenthPercentage", "twelfthPercentage"]
    },
    {
      title: "Skills & Projects",
      icon: Code,
      fields: ["skills", "resumeLink", "portfolioLink", "github", "leetcode", "codeforces"]
    },
    {
      title: "Career Preferences",
      icon: TrendingUp,
      fields: ["careerInterest", "preferredJobRole", "preferredLocations"]
    }
  ];

  const professionalSections = [
    {
      title: "Current Employment",
      icon: Building,
      fields: ["company", "companyWebsite", "jobTitle", "department", "experience"]
    },
    {
      title: "Compensation & Notice",
      icon: Award,
      fields: ["currentCTC", "expectedCTC", "noticePeriod"]
    },
    {
      title: "Skills & Portfolio",
      icon: Code,
      fields: ["skills", "resumeLink", "portfolioLink", "github", "linkedin"]
    },
    {
      title: "Career Preferences",
      icon: TrendingUp,
      fields: ["careerLevel", "workMode", "preferredJobRole", "preferredLocations"]
    }
  ];

  const getFieldLabel = (key) => {
    return key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());
  };

  const getFieldType = (key) => {
    if (key.includes("Link") || key.includes("Website") || key.includes("github") || key.includes("linkedin")) {
      return "url";
    }
    if (key.includes("Percentage") || key.includes("CGPA") || key.includes("CTC") || key.includes("year") || key.includes("Year")) {
      return "text";
    }
    return "text";
  };

  const renderField = (key, value, onChange) => (
    <div key={key} className="field-group">
      <label className="field-label">{getFieldLabel(key)}</label>
      {key === "skills" || key === "preferredLocations" ? (
        <textarea
          className="field-input"
          placeholder={key === "skills" ? "e.g., React, Node.js, Python" : "e.g., New York, San Francisco, Remote"}
          value={value}
          onChange={onChange}
          rows={3}
        />
      ) : key === "careerLevel" ? (
        <select className="field-input" value={value} onChange={onChange}>
          <option value="">Select level</option>
          <option value="entry">Entry Level</option>
          <option value="mid">Mid Level</option>
          <option value="senior">Senior Level</option>
          <option value="lead">Lead</option>
          <option value="executive">Executive</option>
        </select>
      ) : key === "workMode" ? (
        <select className="field-input" value={value} onChange={onChange}>
          <option value="">Select mode</option>
          <option value="remote">Remote</option>
          <option value="onsite">On-site</option>
          <option value="hybrid">Hybrid</option>
        </select>
      ) : (
        <input
          type={getFieldType(key)}
          className="field-input"
          placeholder={`Enter ${getFieldLabel(key).toLowerCase()}`}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="modal-header">
          <h2 className="modal-title">Complete Your Profile</h2>
          <p className="modal-subtitle">Help us personalize your experience</p>
        </div>

        {currentStep === 1 && (
          <div className="user-type-selection">
            <h3 className="section-title">I am a...</h3>
            <div className="type-cards">
              <button
                className={`type-card ${userType === "student" ? "selected" : ""}`}
                onClick={() => setUserType("student")}
              >
                <GraduationCap size={32} />
                <h4>Student</h4>
                <p>Looking for internships and entry-level opportunities</p>
              </button>

              <button
                className={`type-card ${userType === "professional" ? "selected" : ""}`}
                onClick={() => setUserType("professional")}
              >
                <Briefcase size={32} />
                <h4>Working Professional</h4>
                <p>Seeking new career opportunities and growth</p>
              </button>
            </div>

            <div className="actions">
              <button className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={() => setCurrentStep(2)}
                disabled={!userType}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {currentStep === 2 && userType === "student" && (
          <div className="form-content">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "100%" }}></div>
            </div>

            <div className="form-sections">
              {studentSections.map((section) => {
                const Icon = section.icon;
                return (
                  <div key={section.title} className="form-section">
                    <div className="section-header">
                      <Icon size={20} />
                      <h3>{section.title}</h3>
                    </div>
                    <div className="fields-grid">
                      {section.fields.map((key) =>
                        renderField(key, student[key], (e) =>
                          setStudent({ ...student, [key]: e.target.value })
                        )
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="actions">
              <button className="btn btn-secondary" onClick={() => setCurrentStep(1)}>
                Back
              </button>
              <button className="btn btn-primary" onClick={handleSubmit}>
                Save Profile
              </button>
            </div>
          </div>
        )}

        {currentStep === 2 && userType === "professional" && (
          <div className="form-content">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "100%" }}></div>
            </div>

            <div className="form-sections">
              {professionalSections.map((section) => {
                const Icon = section.icon;
                return (
                  <div key={section.title} className="form-section">
                    <div className="section-header">
                      <Icon size={20} />
                      <h3>{section.title}</h3>
                    </div>
                    <div className="fields-grid">
                      {section.fields.map((key) =>
                        renderField(key, professional[key], (e) =>
                          setProfessional({ ...professional, [key]: e.target.value })
                        )
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="actions">
              <button className="btn btn-secondary" onClick={() => setCurrentStep(1)}>
                Back
              </button>
              <button className="btn btn-primary" onClick={handleSubmit}>
                Save Profile
              </button>
            </div>
          </div>
        )}

        <style jsx>{`
          .overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(4px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            padding: 20px;
            animation: fadeIn 0.2s ease-out;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          .modal {
            width: 100%;
            max-width: 800px;
            max-height: 90vh;
            background: #ffffff;
            border-radius: 16px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            animation: slideUp 0.3s ease-out;
            position: relative;
          }

          @keyframes slideUp {
            from {
              transform: translateY(20px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }

          .close-btn {
            position: absolute;
            top: 16px;
            right: 16px;
            background: #f3f4f6;
            border: none;
            border-radius: 8px;
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s;
            z-index: 10;
          }

          .close-btn:hover {
            background: #e5e7eb;
            transform: scale(1.05);
          }

          .modal-header {
            padding: 32px 32px 24px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
          }

          .modal-title {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 8px;
          }

          .modal-subtitle {
            margin: 0;
            font-size: 15px;
            opacity: 0.95;
          }

          .user-type-selection {
            padding: 32px;
          }

          .section-title {
            font-size: 18px;
            font-weight: 600;
            color: #1f2937;
            margin: 0 0 20px 0;
          }

          .type-cards {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
            margin-bottom: 32px;
          }

          .type-card {
            background: #f9fafb;
            border: 2px solid #e5e7eb;
            border-radius: 12px;
            padding: 24px;
            cursor: pointer;
            transition: all 0.2s;
            text-align: center;
          }

          .type-card:hover {
            border-color: #667eea;
            background: #f5f7ff;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
          }

          .type-card.selected {
            border-color: #667eea;
            background: linear-gradient(135deg, #f5f7ff 0%, #faf5ff 100%);
            box-shadow: 0 4px 16px rgba(102, 126, 234, 0.2);
          }

          .type-card svg {
            color: #667eea;
            margin-bottom: 12px;
          }

          .type-card h4 {
            margin: 0 0 8px 0;
            font-size: 18px;
            font-weight: 600;
            color: #1f2937;
          }

          .type-card p {
            margin: 0;
            font-size: 14px;
            color: #6b7280;
            line-height: 1.5;
          }

          .form-content {
            flex: 1;
            overflow-y: auto;
            padding: 24px 32px 32px;
          }

          .progress-bar {
            height: 4px;
            background: #e5e7eb;
            border-radius: 2px;
            margin-bottom: 24px;
            overflow: hidden;
          }

          .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
            transition: width 0.3s ease;
          }

          .form-sections {
            display: flex;
            flex-direction: column;
            gap: 28px;
          }

          .form-section {
            background: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            padding: 20px;
          }

          .section-header {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 20px;
            padding-bottom: 12px;
            border-bottom: 2px solid #f3f4f6;
          }

          .section-header svg {
            color: #667eea;
          }

          .section-header h3 {
            margin: 0;
            font-size: 16px;
            font-weight: 600;
            color: #1f2937;
          }

          .fields-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
          }

          .field-group {
            display: flex;
            flex-direction: column;
            gap: 6px;
          }

          .field-group:has(textarea) {
            grid-column: 1 / -1;
          }

          .field-label {
            font-size: 13px;
            font-weight: 500;
            color: #374151;
          }

          .field-input {
            padding: 10px 14px;
            border: 1.5px solid #e5e7eb;
            border-radius: 8px;
            font-size: 14px;
            transition: all 0.2s;
            font-family: inherit;
          }

          .field-input:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
          }

          textarea.field-input {
            resize: vertical;
            min-height: 60px;
          }

          select.field-input {
            cursor: pointer;
          }

          .actions {
            display: flex;
            gap: 12px;
            justify-content: flex-end;
            margin-top: 24px;
            padding-top: 24px;
            border-top: 1px solid #e5e7eb;
          }

          .btn {
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            border: none;
          }

          .btn-secondary {
            background: #f3f4f6;
            color: #374151;
          }

          .btn-secondary:hover {
            background: #e5e7eb;
          }

          .btn-primary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
          }

          .btn-primary:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
          }

          .btn-primary:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none;
          }

          @media (max-width: 768px) {
            .modal {
              max-width: 100%;
              max-height: 100vh;
              border-radius: 0;
            }

            .type-cards {
              grid-template-columns: 1fr;
            }

            .fields-grid {
              grid-template-columns: 1fr;
            }

            .modal-header {
              padding: 24px 20px 20px;
            }

            .form-content {
              padding: 20px;
            }

            .modal-title {
              font-size: 24px;
            }
          }
        `}</style>
      </div>
    </div>
  );
}