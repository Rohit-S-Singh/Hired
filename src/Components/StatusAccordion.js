import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const STATUS_STEPS = [
  { key: 'sent', label: 'Sent', description: 'Mail sent successfully' },
  { key: 'replied', label: 'Replied', description: 'Recruiter responded' },
  { key: 'followed_up', label: 'Follow-up', description: 'Follow-up email sent' },
  { key: 'closed', label: 'Closed', description: 'Conversation closed' },
];
const StatusAccordion = ({ recruiter, logs }) => {
  return (
    <div className="p-4 bg-gray-100 rounded-md">
      <h4 className="font-semibold text-gray-700 mb-2">Email Status Logs</h4>
      {logs.length === 0 ? (
        <p className="text-sm text-gray-500">No logs found.</p>
      ) : (
        <ul className="space-y-2">
          {logs.map((log, idx) => (
            <li key={idx} className="flex justify-between text-sm bg-white p-2 rounded shadow">
              <span>{log.status}</span>
              <span>{new Date(log.createdAt).toLocaleDateString()}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


export default StatusAccordion;
