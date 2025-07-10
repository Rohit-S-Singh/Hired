import React, { useEffect, useState, Fragment } from 'react';
import Lottie from "lottie-react";
import loaderAnimation from "../assets/loader.json";
import mailConnected from "../assets/mailConnected.json";
import mailSent from "../assets/mail-sent.json";
import { useNavigate } from 'react-router-dom';
import StatusAccordion from './StatusAccordion';

import * as XLSX from 'xlsx';


import { Dialog, Transition } from '@headlessui/react';
import { FaUser, FaClock } from 'react-icons/fa';
import axios from 'axios';
import { useGlobalContext } from './GlobalContext';

const EmailSender = () => {
  const { user, token } = useGlobalContext();
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [recruiters, setRecruiters] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [newRecruiter, setNewRecruiter] = useState({ name: "", email: "" });
  const [resumeFile, setResumeFile] = useState(null);
  const [emailLogs, setEmailLogs] = useState({});


  const navigate = useNavigate();
  const [openRowId, setOpenRowId] = useState(null);





  useEffect(() => {
    const checkConnectionAndFetchRecruiters = async () => {
      try {
        if (user?.email) {
          const { data: connectData } = await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/check-email-connection`, {
            email: user.email,
          });
          setIsConnected(connectData?.success);
        }

        const { data: recruiterData } = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/recruiters`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { userEmail: user?.email }
        });

        setRecruiters(recruiterData?.recruiters || []);
      } catch (error) {
        console.error('Error in connection check or fetching recruiters:', error);
      } finally {
        setLoading(false);
      }
    };

    checkConnectionAndFetchRecruiters();
  }, [user?.email, token]);

  const handleConnectClick = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/authUrl`);
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error fetching auth URL:', error);
    }
  };

  const fetchEmailLogs = async (recruiterId) => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/email-logs`, {
        params: {
          recruiterId,
          userEmail: user?.email,
        },
        headers: { Authorization: `Bearer ${token}` },
      });

      setEmailLogs((prevLogs) => ({
        ...prevLogs,
        [recruiterId]: data.logs || [],
      }));
    } catch (error) {
      console.error("Error fetching email logs:", error);
    }
  };

  const handleAddRecruiter = async () => {
    if (!newRecruiter.name || !newRecruiter.email) return;

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/recruiters`,
        {
          name: newRecruiter.name,
          email: newRecruiter.email,
          userEmail: user?.email
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setRecruiters(prev => [...prev, data.recruiter]);
      setIsModalOpen(false);
      setNewRecruiter({ name: "", email: "" });
    } catch (error) {
      console.error('Error adding recruiter:', error);
    }
  };

  const handleExcelUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(worksheet); // [{ name: '', email: '' }, ...]

      for (const row of jsonData) {
        const name = row.Name || row.name;
        const email = row.Email || row.email;

        if (!name || !email) continue;

        try {
          const { data } = await axios.post(
            `${process.env.REACT_APP_BACKEND_BASE_URL}/api/recruiters`,
            {
              name,
              email,
              userEmail: user?.email
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          setRecruiters(prev => [...prev, data.recruiter]);
        } catch (error) {
          console.error(`Failed to add ${email}:`, error);
        }
      }
    };

    reader.readAsArrayBuffer(file);
  };


  const handleSendMail = async (recruiter) => {
    if (!resumeFile) {
      alert("Please upload your resume before sending the email.");
      return;
    }

    setSendingEmail(true);
    try {
      // Fetch the template from the backend
      let finalHtml = '';
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/get-html-template`, {
          params: { email: user?.email },
        });
        if (response.data && response.data.success && response.data.htmlEmailTemplate) {
          finalHtml = response.data.htmlEmailTemplate.finalHtml;
        }
      } catch (fetchTemplateError) {
        console.error('Error fetching HTML template:', fetchTemplateError);
        alert('Failed to fetch email template.');
        setSendingEmail(false);
        return;
      }

      console.log("finalHtml", finalHtml);

      alert("finalHtml", finalHtml);

      // Optionally, replace variables in the template here if needed
      // Example: finalHtml = finalHtml.replace(/{{recruiter.name}}/g, recruiter.name);
      finalHtml = finalHtml.replace(/{{\s*recruiter\.name\s*}}/g, recruiter.name);

      const formData = new FormData();
      formData.append("from", user?.email);
      formData.append("to", recruiter.email);
      formData.append("subject", "Application For Engineering Roles (SDE-1)");
      formData.append("body", finalHtml);
      formData.append("attachment", resumeFile);

      await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/send-email`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      // Save the HTML template to the backend (optional, if you want to keep this ste

      setRecruiters(prev =>
        prev.map(r =>
          r._id === recruiter._id ? { ...r, status: "Sent", sentAt: new Date().toISOString().split('T')[0] } : r
        )
      );
    } catch (error) {
      console.error('Error sending email:', error);
    } finally {
      setTimeout(() => setSendingEmail(false), 1500);
    }
  };


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Lottie animationData={loaderAnimation} loop style={{ width: 200, height: 200 }} />
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50 relative">
      {/* Email Connected */}
      {isConnected && user?.email ? (
        <div className="flex items-center gap-4 mb-6 bg-green-100 p-4 rounded-md">
          <Lottie animationData={mailConnected} loop={false} style={{ width: 50, height: 50 }} />
          <div>
            <p className="text-sm text-green-700">Connected Email:</p>
            <p className="text-lg font-semibold text-green-800">{user.email}</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-4 mb-6 bg-red-100 p-4 rounded-md">
          <div>
            <p className="text-sm text-red-700">Email not connected.</p>
            <button
              onClick={handleConnectClick}
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Connect Gmail
            </button>
          </div>
          <button
            className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700"
            onClick={() => navigate('/email-editor')}
          >
            Open Email Editor
          </button>
        </div>
      )}

      {/* Header Actions */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Recruiter Email Tracker</h1>
        <div className="flex gap-4 flex-wrap">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            onClick={() => setIsModalOpen(true)}
          >
            + Add Recruiter
          </button>
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
            onClick={handleConnectClick}
          >
            + Connect New Email
          </button>
          <button
            className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700"
            onClick={() => navigate('/email-editor')}
          >
            Open Email Editor
          </button>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleExcelUpload}
            className="hidden"
            id="excel-upload"
          />
          <label
            htmlFor="excel-upload"
            className="cursor-pointer bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Upload Excel
          </label>

        </div>
        <div className="my-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload Resume</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setResumeFile(e.target.files[0])}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
               file:rounded-full file:border-0
               file:text-sm file:font-semibold
               file:bg-blue-50 file:text-blue-700
               hover:file:bg-blue-100"
          />
        </div>

      </div>


      {/* Recruiter Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Email</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Sent At</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {recruiters.map((r) => (
              <React.Fragment key={r._id}>
                <tr
                  onClick={() => {
                    if (openRowId !== r._id) {
                      fetchEmailLogs(r._id);
                    } setOpenRowId(openRowId === r._id ? null : r._id)
                  }}
                  className="border-t hover:bg-gray-100 cursor-pointer"
                >
                  <td className="px-4 py-2 flex items-center gap-2">
                    <FaUser className="text-gray-500" /> {r.name}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600">{r.email}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${r.status === "Responded"
                          ? "bg-green-100 text-green-600"
                          : r.status === "Sent"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                    >
                      {r.status || "No Response"}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600">
                    {r.sentAt ? (
                      <>
                        <FaClock className="inline mr-1" />
                        {r.sentAt}
                      </>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSendMail(r);
                      }}
                      disabled={sendingEmail}
                      className={`bg-green-600 text-white text-sm px-3 py-1 rounded hover:bg-green-700 ${sendingEmail ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                      Send Mail
                    </button>
                    {resumeFile && (
                      <p className="text-sm text-green-600 mt-1">Selected: {resumeFile.name}</p>
                    )}
                  </td>
                </tr>

                {/* Accordion row */}
                {openRowId === r._id && (
                  <tr>
                    <td colSpan="5">
                      <StatusAccordion
                        recruiter={r}
                        logs={emailLogs[r._id] || []}
                      />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>

        </table>
      </div>

      {/* Modal to Add Recruiter */}
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsModalOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Add Recruiter
                  </Dialog.Title>
                  <div className="mt-4 space-y-4">
                    <input
                      type="text"
                      placeholder="Name"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newRecruiter.name}
                      onChange={(e) => setNewRecruiter(prev => ({ ...prev, name: e.target.value }))}
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newRecruiter.email}
                      onChange={(e) => setNewRecruiter(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>

                  <div className="mt-6 flex justify-end space-x-4">
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      onClick={handleAddRecruiter}
                    >
                      Add
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Email Sending Animation */}
      {sendingEmail && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center">
          <Lottie animationData={mailSent} loop={false} style={{ width: 200, height: 200 }} />
        </div>
      )}
    </div>
  );
};

export default EmailSender;
