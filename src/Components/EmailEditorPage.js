import React, { useState } from "react";
import Mustache from "mustache";
import Lottie from "lottie-react";
import emailTemplateAnimation from "../assets/Email-Template.json";

const TemplateEditor = () => {
  const [template, setTemplate] = useState(`
    <div style="font-family: 'Segoe UI', Inter, sans-serif; color: #333; line-height: 1.6; max-width: 700px;">
      <p>Hi,</p>

      <p style="margin-top: 20px;">Introduction</p>

      <p style="margin-top: 20px;">Enter Your Experience and Skill sets</p>

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

  const [previewData, setPreviewData] = useState({
    location: "Enter Location",
    noticePeriod: "Enter Notice Period",
    ctc: "Enter CTC",
    workMode: "Enter Work Mode",
    experience: "Enter Experience",
    name: "Enter Name",
    phone: "Enter Phone Number",
  });

  const handleInputChange = (key, value) => {
    setPreviewData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const renderedHtml = Mustache.render(template, previewData);

  const handleSaveTemplate = () => {
    const payload = {
      template,
      placeholders: previewData,
    };

    // Example save logic
    console.log("📩 Template saved:", payload);

    alert("Template saved! (Check console)");
  };

  return (
    <div className="p-6 max-w-screen-xl mx-auto font-sans bg-gray-100 min-h-screen">
      {/* Header with animation */}
      <div className="flex justify-center items-center mb-6">
        <Lottie animationData={emailTemplateAnimation} loop={true} style={{ width: 200, height: 200 }} />
        <h2 className="text-3xl font-bold ml-4">📧 Email Template Editor</h2>
      </div>

      <p className="text-center text-gray-600 mb-8">
        You can fully edit this email using HTML. <br className="hidden sm:block" />
        This format will be used to send your emails. Variables like will be dynamically replaced.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Editor & Inputs */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between">
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Edit HTML Template</label>
            <textarea
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              rows={16}
              className="w-full border border-gray-300 rounded-lg p-4 font-mono text-sm mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-gray-50"
              style={{ minHeight: "300px", maxHeight: "500px", overflowY: "auto" }}
            />

            <h3 className="text-lg font-semibold mb-3 text-gray-800">Placeholder Inputs</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(previewData).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-sm font-medium capitalize mb-1 text-gray-600">{key}</label>
                  <input
                    value={value}
                    placeholder={key}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                    className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSaveTemplate}
            className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-fit self-start"
          >
            💾 Save Template
          </button>
        </div>

        {/* Right: Preview */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Live Email Preview</h3>
          <div
            className="border border-gray-200 bg-[#f6f8fc] p-6 rounded overflow-auto shadow-inner"
            style={{
              maxHeight: "700px",
              minHeight: "300px",
              fontFamily: "Segoe UI, Inter, sans-serif",
              boxShadow: "inset 0 0 8px rgba(0,0,0,0.05)",
            }}
            dangerouslySetInnerHTML={{ __html: renderedHtml }}
          />
        </div>
      </div>
    </div>
  );
};

export default TemplateEditor;
