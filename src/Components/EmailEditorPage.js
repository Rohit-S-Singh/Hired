import React, { useState } from "react";
import Mustache from "mustache";
import { useEffect } from "react";

import Lottie from "lottie-react";
import emailTemplateAnimation from "../assets/Email-Template.json";

import { useGlobalContext } from "../pages/AUTH/GlobalContext";

const TemplateEditor = () => {
  const [template, setTemplate] = useState(`
    <div style="font-family: 'Segoe UI', Inter, sans-serif; color: #333; line-height: 1.6; max-width: 700px;">
      <p>Hi {{recruiter.name}},</p>

      <p style="margin-top: 20px;">{{introduction}}</p>

      <p style="margin-top: 20px;">{{skills}}</p>

      <p style="margin-top: 20px;">
        I am reaching out to you to find in-office or remote full-time opportunities at your organization.
      </p>

      <div style="margin-top: 30px;">
        <strong>Additional Details:</strong><br />
        Current Location: {{location}}<br />
        Notice Period: {{noticePeriod}}<br />
        Current CTC: {{ctc}}<br />
        Preferred Work Mode: {{workMode}}<br />
        YOE: {{experience}}<br />
      </div>

      <p style="margin-top: 30px;">
        I am attaching my resume for you to look over. I would love to connect with you and talk about how my background could be a valuable addition. Please let me know and we can talk about this more.
      </p>

      <p style="margin-top: 30px;">
        Kind Regards,<br />
        {{name}}<br />
        {{phone}}<br />
      </p>
    </div>
  `);

  useEffect(() => {
  if (!user?.email) return;

  fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/fetch/template?email=${user.email}`)
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        if (data.mainTemplate?.finalHtml) {
          setTemplate(data.mainTemplate.finalHtml);
        }

        if (data.followUps?.length > 0) {
          setFollowUpTemplates(data.followUps);
        }
      }
    })
    .catch(err => console.log("Fetch template error:", err));
}, [user]);

  const [previewData, setPreviewData] = useState({
    location: "Enter Location",
    noticePeriod: "Enter Notice Period",
    ctc: "Enter CTC",
    workMode: "Enter Work Mode",
    experience: "Enter Experience",
    name: "Enter Name",
    phone: "Enter Phone Number",
    introduction: "Enter your introduction here...",
    skills: "Enter your skills and experience here...",
  });

  const [followUpTemplates, setFollowUpTemplates] = useState([
    {
      id: 1,
      name: "Follow-up 1",
      message:
        "Hi {{recruiter.name}},\n\nI hope this email finds you well. I wanted to follow up on my previous application for engineering roles at your organization.\n\nI remain very interested in the opportunity and would love to discuss how my skills and experience could contribute to your team.\n\nLooking forward to hearing from you.\n\nBest regards,\n{{name}}",
    },
  ]);

  const { user } = useGlobalContext();

  const handleInputChange = (key, value) => {
    setPreviewData((prev) => ({ ...prev, [key]: value }));
  };

  const addFollowUpTemplate = () => {
    const newId = Math.max(...followUpTemplates.map((t) => t.id), 0) + 1;
    setFollowUpTemplates((prev) => [
      ...prev,
      {
        id: newId,
        name: `Follow-up ${newId}`,
        message:
          "Hi {{recruiter.name}},\n\nI hope this email finds you well.\n\nBest regards,\n{{name}}",
      },
    ]);
  };

  const updateFollowUpTemplate = (id, field, value) => {
    setFollowUpTemplates((prev) =>
      prev.map((template) =>
        template.id === id ? { ...template, [field]: value } : template
      )
    );
  };

  const removeFollowUpTemplate = (id) => {
    setFollowUpTemplates((prev) => prev.filter((t) => t.id !== id));
  };

  const renderedHtml = Mustache.render(template, previewData);

  // Save Primary Template
  const handleSaveTemplate = () => {
    if (!user?.email) return alert("User email missing.");

    let finalHtml = template;

    const getValueByPath = (obj, path) =>
      path.split(".").reduce(
        (acc, part) => (acc && acc[part] !== undefined ? acc[part] : ""),
        obj
      );

    finalHtml = finalHtml.replace(/{{\s*([\w.]+)\s*}}/g, (_, variable) => {
      const value = getValueByPath(previewData, variable);
      return value !== undefined ? value : _;
    });

    const payload = {
      email: user.email,
      finalHtml,
      followUpTemplates,
    };

    fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/save-html-template`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((r) => r.json())
      .then(() => alert("Template saved!"))
      .catch(() => alert("Failed to save."));
  };

  // Save Follow-Up Template Array
  const handleSaveFollowUps = () => {
    if (!user?.email) return alert("User email missing.");

    const payload = {
      email: user.email,
      followupTemplate: followUpTemplates,
    };

    fetch(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/api/save-followup-template`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    )
      .then((r) => r.json())
      .then(() => alert("Follow-up templates saved!"))
      .catch(() => alert("Failed to save follow-ups."));
  };

  return (
    <div className="p-6 max-w-screen-xl mx-auto bg-gray-100 min-h-screen font-sans">
      {/* HEADER */}
      <div className="flex flex-col items-center mb-8">
        <Lottie
          animationData={emailTemplateAnimation}
          loop
          style={{ width: 160, height: 160 }}
        />
        <h2 className="text-3xl font-bold mt-2 text-gray-800">
          📧 Email Template Editor
        </h2>
        <p className="text-gray-600 mt-2 text-center max-w-lg">
          Create your main email + follow-up sequences with dynamic fields like
          <code className="bg-gray-200 px-1 rounded mx-1">{"{{name}}"}</code> or
          <code className="bg-gray-200 px-1 rounded mx-1">
            {"{{recruiter.name}}"}
          </code>
          .  
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LEFT SIDE */}
        <div className="bg-white shadow-xl rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Main Email Template
          </h3>

          <textarea
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            rows={14}
            className="w-full border rounded-lg p-4 font-mono text-sm bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-500 mb-6"
          />

          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Placeholder Inputs
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(previewData).map(([key, value]) => (
              <div
                key={key}
                className={
                  key === "introduction" || key === "skills"
                    ? "sm:col-span-2"
                    : ""
                }
              >
                <label className="block text-sm text-gray-600 capitalize mb-1">
                  {key}
                </label>

                {key === "introduction" || key === "skills" ? (
                  <textarea
                    value={value}
                    onChange={(e) =>
                      handleInputChange(key, e.target.value)
                    }
                    rows={4}
                    className="w-full border rounded p-3 bg-white focus:ring-2 focus:ring-blue-400 resize-none"
                  />
                ) : (
                  <input
                    value={value}
                    onChange={(e) =>
                      handleInputChange(key, e.target.value)
                    }
                    className="w-full border rounded p-2 bg-white focus:ring-2 focus:ring-blue-400"
                  />
                )}
              </div>
            ))}
          </div>

          {/* FOLLOW UPS */}
          <div className="mt-10">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-gray-800">
                Follow-up Templates
              </h3>
              <button
                onClick={addFollowUpTemplate}
                className="bg-green-600 text-white text-sm px-3 py-1 rounded-lg hover:bg-green-700 shadow"
              >
                + Add
              </button>
            </div>

            <div className="space-y-4">
              {followUpTemplates.map((t) => (
                <div
                  key={t.id}
                  className="border border-gray-300 bg-gray-50 p-4 rounded-lg shadow-sm"
                >
                  <div className="flex justify-between mb-2">
                    <input
                      type="text"
                      className="font-semibold text-gray-800 bg-transparent outline-none w-full"
                      value={t.name}
                      onChange={(e) =>
                        updateFollowUpTemplate(t.id, "name", e.target.value)
                      }
                    />
                    <button
                      onClick={() => removeFollowUpTemplate(t.id)}
                      className="text-red-600 text-sm hover:text-red-800 ml-4"
                    >
                      Remove
                    </button>
                  </div>

                  <textarea
                    value={t.message}
                    onChange={(e) =>
                      updateFollowUpTemplate(t.id, "message", e.target.value)
                    }
                    rows={5}
                    className="w-full border rounded p-3 text-sm bg-white focus:ring-2 focus:ring-blue-400 resize-none"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* BUTTONS */}
          <div className="mt-8 flex gap-4">
            <button
              onClick={handleSaveTemplate}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow"
            >
              Save Main Template
            </button>

            <button
              onClick={handleSaveFollowUps}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 shadow"
            >
              Save Follow-Ups
            </button>
          </div>
        </div>

        {/* RIGHT — PREVIEW */}
        <div className="bg-white shadow-xl rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Live Preview
          </h3>
          <div
            className="border bg-[#f8fafc] p-6 rounded-lg shadow-inner overflow-auto"
            style={{ maxHeight: "700px" }}
            dangerouslySetInnerHTML={{ __html: renderedHtml }}
          />
        </div>
      </div>
    </div>
  );
};

export default TemplateEditor;
