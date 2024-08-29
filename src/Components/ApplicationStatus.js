import React, { useState } from 'react';

const JobApplication = () => {
  const [applications, setApplications] = useState([
    {
      id: 1,
      date: '2024-08-29',
      companyName: 'Google',
      interviewRounds: 3,
      recruiterEmail: 'recruiter@google.com',
      position: 'Frontend (SDE-1)',
      status: 'Interview Stage',
    },
    // Add more data as needed
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newApplication, setNewApplication] = useState({
    date: '',
    companyName: '',
    interviewRounds: '',
    recruiterEmail: '',
    position: 'Frontend (SDE-1)',
    status: 'Applied',
  });

  const positions = ["Frontend (SDE-1)", "Backend - SDE-1", "DevOps"];
  const statuses = [
    { label: "Interview Stage", color: "text-blue-600" },
    { label: "Rejected", color: "text-red-600" },
    { label: "Applied", color: "text-green-600" },
  ];

  const handleOpenModal = () => setIsModalOpen(true);
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
    setApplications([...applications, { id: Date.now(), ...newApplication }]);
    setNewApplication({
      date: '',
      companyName: '',
      interviewRounds: '',
      recruiterEmail: '',
      position: 'Frontend (SDE-1)',
      status: 'Applied',
    });
    handleCloseModal();
  };

  const counts = statuses.reduce((acc, status) => {
    acc[status.label] = applications.filter(app => app.status === status.label).length;
    return acc;
  }, {});

  return (
    <div className="overflow-x-auto p-4">
      {/* Summary Section */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Application Summary</h2>
        <div className="flex space-x-4 mt-2">
          {statuses.map(status => (
            <div key={status.label} className={`text-sm ${status.color}`}>
              {status.label}: {counts[status.label] || 0}
            </div>
          ))}
        </div>
        <button
          onClick={handleOpenModal}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New Application
        </button>
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
          </tr>
        </thead>
        <tbody className="text-gray-800 text-sm">
          {applications.map((application, index) => (
            <tr key={application.id} className="hover:bg-gray-50">
              <td className="py-3 px-6 border-b">{index + 1}</td>
              <td className="py-3 px-6 border-b">{application.date}</td>
              <td className="py-3 px-6 border-b">{application.companyName}</td>
              <td className="py-3 px-6 border-b">{application.interviewRounds}</td>
              <td className="py-3 px-6 border-b">{application.recruiterEmail}</td>
              <td className="py-3 px-6 border-b">
                <select
                  value={application.position}
                  className="border border-gray-300 rounded p-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled
                >
                  {positions.map((position) => (
                    <option key={position} value={position}>
                      {position}
                    </option>
                  ))}
                </select>
              </td>
              <td className="py-3 px-6 border-b">
                <select
                  value={application.status}
                  className="border border-gray-300 rounded p-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  // disabled
                >
                  {statuses.map((status) => (
                    <option
                      key={status.label}
                      value={status.label}
                      className={status.color}
                    >
                      {status.label}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Adding New Application */}
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
            <h2 className="text-lg font-semibold mb-4">Add Your New Application Now</h2>
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
                  placeholder="Company Name"
                  className="border border-gray-300 rounded p-2 w-full"
                  required
                />
                <input
                  type="number"
                  name="interviewRounds"
                  value={newApplication.interviewRounds}
                  onChange={handleInputChange}
                  placeholder="No. of Interview Rounds"
                  className="border border-gray-300 rounded p-2 w-full"
                  required
                />
                <input
                  type="email"
                  name="recruiterEmail"
                  value={newApplication.recruiterEmail}
                  onChange={handleInputChange}
                  placeholder="Recruiter Email ID"
                  className="border border-gray-300 rounded p-2 w-full"
                  required
                />
                <select
                  name="position"
                  value={newApplication.position}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded p-2 w-full"
                >
                  {positions.map((position) => (
                    <option key={position} value={position}>
                      {position}
                    </option>
                  ))}
                </select>
                <select
                  name="status"
                  value={newApplication.status}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded p-2 w-full"
                >
                  {statuses.map((status) => (
                    <option key={status.label} value={status.label}>
                      {status.label}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobApplication;
