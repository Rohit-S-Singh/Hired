import { useState } from "react";

export default function UserCategoryModal({ isOpen, onClose, onSubmit }) {
  const [userType, setUserType] = useState("");

  // ---------------- STUDENT STATE ----------------
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

  // ---------------- PROFESSIONAL STATE ----------------
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

  const handleSubmit = () => {
    if (!userType) return alert("Please select user type!");

    const payload =
      userType === "student"
        ? {
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
            userType,
            professionalDetails: {
              ...professional,
              skills: professional.skills.split(",").map((s) => s.trim()),
              preferredLocations: professional.preferredLocations
                .split(",")
                .map((s) => s.trim()),
            },
          };

    onSubmit(payload);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={overlay}>
      <div style={modal}>
        <h2>Select Your Category</h2>

        {/* USER TYPE SELECTION */}
        <div style={{ marginBottom: "15px" }}>
          <label>
            <input
              type="radio"
              value="student"
              checked={userType === "student"}
              onChange={() => setUserType("student")}
            />
            Student
          </label>

          <br />

          <label>
            <input
              type="radio"
              value="professional"
              checked={userType === "professional"}
              onChange={() => setUserType("professional")}
            />
            Working Professional
          </label>
        </div>

        {/* ---------------- STUDENT FORM ---------------- */}
        {userType === "student" && (
          <div style={form}>
            {Object.keys(student).map((key) => (
              <input
                key={key}
                type="text"
                placeholder={key.replace(/([A-Z])/g, " $1")}
                value={student[key]}
                onChange={(e) =>
                  setStudent({ ...student, [key]: e.target.value })
                }
              />
            ))}
          </div>
        )}

        {/* ---------------- PROFESSIONAL FORM ---------------- */}
        {userType === "professional" && (
          <div style={form}>
            {Object.keys(professional).map((key) => (
              <input
                key={key}
                type="text"
                placeholder={key.replace(/([A-Z])/g, " $1")}
                value={professional[key]}
                onChange={(e) =>
                  setProfessional({ ...professional, [key]: e.target.value })
                }
              />
            ))}
          </div>
        )}

        {/* BUTTONS */}
        <div style={actions}>
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSubmit}>Save</button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- SIMPLE STYLING ---------------- */
const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const modal = {
  width: "500px",
  maxHeight: "90vh",
  overflowY: "auto",
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
};

const form = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  marginTop: "10px",
};

const actions = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "20px",
};
