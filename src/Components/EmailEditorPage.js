import React, { useState } from "react";
import Mustache from "mustache";
import Lottie from "lottie-react";
import emailTemplateAnimation from "../assets/Email-Template.json";

import { useGlobalContext } from './GlobalContext'; // ⬅️ import context


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
      message: "Hi {{recruiter.name}},\n\nI hope this email finds you well. I wanted to follow up on my previous application for engineering roles at your organization.\n\nI remain very interested in the opportunity and would love to discuss how my skills and experience could contribute to your team.\n\nLooking forward to hearing from you.\n\nBest regards,\n{{name}}"
    }
  ]);

  const handleInputChange = (key, value) => {
    setPreviewData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const addFollowUpTemplate = () => {
    const newId = Math.max(...followUpTemplates.map(t => t.id), 0) + 1;
    setFollowUpTemplates(prev => [...prev, {
      id: newId,
      name: `Follow-up ${newId}`,
      message: "Hi {{recruiter.name}},\n\nI hope this email finds you well. I wanted to follow up on my previous application for engineering roles at your organization.\n\nI remain very interested in the opportunity and would love to discuss how my skills and experience could contribute to your team.\n\nLooking forward to hearing from you.\n\nBest regards,\n{{name}}"
    }]);
  };

  const updateFollowUpTemplate = (id, field, value) => {
    setFollowUpTemplates(prev => prev.map(template => 
      template.id === id ? { ...template, [field]: value } : template
    ));
  };

  const removeFollowUpTemplate = (id) => {
    setFollowUpTemplates(prev => prev.filter(template => template.id !== id));
  };

  const renderedHtml = Mustache.render(template, previewData);
  const { user } = useGlobalContext(); // ⬅️ get user from global context

  const handleSaveTemplate = () => {
    // Replace variables in the template with values from previewData
    let finalHtml = template;
    if (previewData && typeof previewData === 'object') {
      // Helper to get nested value by path (e.g., recruiter.name)
      const getValueByPath = (obj, path) => {
        return path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : ''), obj);
      };
      // Replace all {{...}} with correct value from previewData
      finalHtml = finalHtml.replace(/{{\s*([\w.]+)\s*}}/g, (match, p1) => {
        const value = getValueByPath(previewData, p1);
        return value !== undefined ? value : match;
      });
    }

    const payload = {
      email: user?.email, // Replace with dynamic user email if available
      finalHtml: finalHtml,
      followUpTemplates: followUpTemplates,
    };

    console.log("payload", payload); 

    // Call the API to save the HTML template
    fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/save-html-template`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Template saved to backend:', data);
        alert('Template saved to backend!');
      })
      .catch((error) => {
        console.error('Error saving template:', error);
        alert('Failed to save template.');
      });
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
                <div key={key} className={key === 'introduction' || key === 'skills' ? 'sm:col-span-2' : ''}>
                  <label className="block text-sm font-medium capitalize mb-1 text-gray-600">{key}</label>
                  {key === 'introduction' || key === 'skills' ? (
                    <textarea
                      value={value}
                      placeholder={key}
                      onChange={(e) => handleInputChange(key, e.target.value)}
                      rows={4}
                      className="border border-gray-300 rounded p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white resize-none"
                      style={{ minHeight: "100px", maxHeight: "150px" }}
                    />
                  ) : (
                    <input
                      value={value}
                      placeholder={key}
                      onChange={(e) => handleInputChange(key, e.target.value)}
                      className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Follow-up Templates Section */}
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Follow-up Message Templates</h3>
                <button
                  onClick={addFollowUpTemplate}
                  className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition"
                >
                  + Add Template
                </button>
              </div>
              
              <div className="space-y-4">
                {followUpTemplates.map((template) => (
                  <div key={template.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-center mb-3">
                      <input
                        type="text"
                        value={template.name}
                        onChange={(e) => updateFollowUpTemplate(template.id, 'name', e.target.value)}
                        className="text-lg font-semibold bg-transparent border-none focus:outline-none focus:ring-0"
                        placeholder="Template Name"
                      />
                      <button
                        onClick={() => removeFollowUpTemplate(template.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                    <textarea
                      value={template.message}
                      onChange={(e) => updateFollowUpTemplate(template.id, 'message', e.target.value)}
                      rows={6}
                      className="w-full border border-gray-300 rounded p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white resize-none"
                      placeholder="Enter your follow-up message template..."
                      style={{ minHeight: "120px", maxHeight: "200px" }}
                    />
                  </div>
                ))}
              </div>
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
