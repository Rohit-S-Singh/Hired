import React, { useState, useEffect } from 'react';
import axios from 'axios';

import excelLogo from '../assets/excel_logo.png';

const JobApplication = () => {
  const [applications, setApplications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingApplication, setEditingApplication] = useState(null);

  const [newApplication, setNewApplication] = useState({
    date: '',
    companyName: '',
    interviewRounds: '',
    recruiterEmail: '',
    position: 'Frontend (SDE-1)',
    status: '',
  });

  const statusOptions = [
    'APPLIED',
    'APPLICATION UNDER REVIEW',
    'INTERVIEW X UNDER PROCESS',
    'SELECTED',
    'REJECTED',
    'REJECTED AFTER APPLICATION REVIEW',
    'REJECT AFTER INTERVIEW ROUND X'
  ];

  useEffect(() => {
    // Fetching applications data
    const token= localStorage.getItem('jwtToken')
    const userName = localStorage.getItem('userName');
    console.log()
    const header={
      headers:{
        'Authorization' : `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
    axios.get('http://localhost:8080/application/getAllUserApplications/'+userName,header)
    .then(response => {
        console.log("response--->", response);
  
        // Sort applications by dateOfApplication in descending order
        const sortedApplications = response.data.sort((a, b) => {
          // Convert dates to timestamps for comparison
          return new Date(b.dateOfApplication) - new Date(a.dateOfApplication);
        });

        setApplications(sortedApplications);
      })
      .catch(error => {
        console.error('Error fetching the applications:', error);
      });
  }, []);
  

  const handleOpenModal = (application = null) => {
    if (application) {
      setIsEditMode(true);
      setEditingApplication(application);
      setNewApplication({
        date: application.dateOfApplication || '',
        companyName: application.companyName || '',
        interviewRounds: application.noOfInterviewRounds || '',
        recruiterEmail: application.recruiterEmailId || '',
        position: application.roleAppliedFor || 'Frontend (SDE-1)',
        status: application.currentStatus || 'APPLIED',
      });
    } else {
      setIsEditMode(false);
      setNewApplication({
        date: '',
        companyName: '',
        interviewRounds: '',
        recruiterEmail: '',
        position: '',
        status: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewApplication(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userName=localStorage.getItem('userName');
    const applicationData = {
      userId: userName,
      companyName: newApplication.companyName,
      noOfInterviewRounds: newApplication.interviewRounds,
      recruiterEmailId: newApplication.recruiterEmail,
      roleAppliedFor: newApplication.position,
      currentStatus: newApplication.status,
      id: isEditMode ? editingApplication.id : Date.now().toString(),
      dateOfApplication: newApplication.date
    };

    const header={
      headers:{
        'Authorization' : `Bearer ${localStorage.getItem('jwtToken')}`
      }
    }

    const request = isEditMode
      ? axios.post(`http://localhost:8080/application/updateApplication/${editingApplication.id}`, applicationData,header)
      : axios.post('http://localhost:8080/application/add', applicationData,header);

    request
      .then(response => {
        const updatedApplications = isEditMode
          ? applications.map(app => app.id === editingApplication.id ? applicationData : app)
          : [...applications, applicationData];
        setApplications(updatedApplications);
        handleCloseModal();
      })
      .catch(error => {
        console.error('Error posting the application:', error);
      });
  };

  const handleDelete = (id) => {
    const header={
      headers:{
        'Authorization' : `Bearer ${localStorage.getItem('jwtToken')}`
      }
    }
    
    axios.delete(`http://localhost:8080/application/delete/${id}`,header)
      .then(response => {
        const updatedApplications = applications.filter(app => app.id !== id);
        setApplications(updatedApplications);
      })
      .catch(error => {
        console.error('Error deleting the application:', error);
      });
  };

  const counts = applications.reduce((acc, app) => {
    acc[app.currentStatus] = (acc[app.currentStatus] || 0) + 1;
    return acc;
  }, {});

  const getStatusColor = (status) => {
    switch (status) {
      case 'REJECTED':
      case 'REJECTED AFTER APPLICATION REVIEW':
      case 'REJECT AFTER INTERVIEW ROUND X':
        return 'text-red-500'; // Red
      case 'APPLICATION UNDER REVIEW':
        return 'text-blue-500'; // Gray
      case 'INTERVIEW X UNDER PROCESS':
        return 'text-green-500'; // Blue
      case 'SELECTED':
        return 'text-green-500'; // Green
      default:
        return 'text-black'; // Default
    }
  };

  return (
    <div className="overflow-x-auto p-4">
      {/* Summary Section */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Application Summary</h2>
        <div className="flex space-x-4 mt-2">
          {Object.keys(counts).map(status => (
            <div key={status} className="text-sm">
              {status}: {counts[status]}
            </div>
          ))}
        </div>
        <div className="flex space-x-4">
  <button
    onClick={() => handleOpenModal()}
    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
  >
    Add New Application
  </button>

  <button
    onClick={() => handleOpenModal()}
    className="mt-4 bg-green-800 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center"
  >
    <img src={excelLogo} alt="Excel Logo" className="w-5 h-5 mr-2" />
    Link your Daily Tracker
  </button>
</div>

      </div>

      {/* Application Table */}
      <table className="min-w-full bg-white border border-gray-300 shadow-sm rounded-lg">
        <thead className="bg-gray-200 text-gray-700 font-semibold uppercase text-sm">
          <tr>
            <th className="py-3 px-6 border-b">SNo</th>
            <th className="py-3 px-6 border-b">Date of Application</th>
            <th className="py-3 px-6 border-b">Company Name</th>
            <th className="py-3 px-6 border-b">No. of Interview Rounds</th>
            <th className="py-3 px-6 border-b">Recruiter Email ID</th>
            <th className="py-3 px-6 border-b">Position</th>
            <th className="py-3 px-6 border-b">Current Status</th>
            <th className="py-3 px-6 border-b">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-800 text-sm">
          {applications.map((application, index) => (
            <tr key={application.id} className="hover:bg-gray-50">
              <td className="py-3 px-6 border-b">{index + 1}</td>
              <td className="py-3 px-6 border-b">{application.dateOfApplication}</td>
              <td className="py-3 px-6 border-b">{application.companyName}</td>
              <td className="py-3 px-6 border-b">{application.noOfInterviewRounds}</td>
              <td className="py-3 px-6 border-b">{application.recruiterEmailId}</td>
              <td className="py-3 px-6 border-b">{application.roleAppliedFor}</td>
              <td className={`py-3 px-6 border-b ${getStatusColor(application.currentStatus)}`}>
                {application.currentStatus}
              </td>
              <td className="py-3 px-6 border-b flex space-x-2">
                <button
                  onClick={() => handleOpenModal(application)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(application.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Adding or Editing Application */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              type="button"
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-4">{isEditMode ? 'Edit Application' : 'Add Your New Application Now'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <input
                  type="date"
                  name="date"
                  value={newApplication.date}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded p-2 w-full"
                  required
                />
                <input
                  type="text"
                  name="companyName"
                  value={newApplication.companyName}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded p-2 w-full"
                  placeholder="Company Name"
                  required
                />
                <input
                  type="number"
                  name="interviewRounds"
                  value={newApplication.interviewRounds}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded p-2 w-full"
                  placeholder="No. of Interview Rounds"
                  required
                />
                <input
                  type="text"
                  name="recruiterEmail"
                  value={newApplication.recruiterEmail}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded p-2 w-full"
                  placeholder="Recruiter Email ID"
                  required
                />
                <input
                  type="text"
                  name="position"
                  value={newApplication.position}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded p-2 w-full"
                  placeholder="Position"
                  required
                />
                <select
                  name="status"
                  value={newApplication.status}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded p-2 w-full"
                  required
                >
                  <option value="" disabled>Select Status</option>
                  {statusOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                {isEditMode ? 'Update Application' : 'Add Application'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobApplication;
