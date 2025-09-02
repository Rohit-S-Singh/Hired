import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ReferralRequestPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [people, setPeople] = useState([]);
  const [companyEmployees, setCompanyEmployees] = useState([]);
  const [personInput, setPersonInput] = useState({ name: '', email: '', linkedin: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/jobs/${jobId}`)
      .then((res) => setJob(res.data))
      .catch(() => setJob(null));
  }, [jobId]);

  // Populate dummy employees on mount (independent of job fetch)
  useEffect(() => {
    const dummy = [
      {
        id: 'e1',
        name: 'Aarav Mehta',
        position: 'Senior Software Engineer',
        tenure: '3 yrs 4 mos',
        referralsGiven: 12,
        linkedin: 'https://www.linkedin.com/in/example-aarav',
        email: 'aarav@example.com'
      },
      {
        id: 'e2',
        name: 'Sara Khan',
        position: 'Engineering Manager',
        tenure: '5 yrs 1 mo',
        referralsGiven: 27,
        linkedin: 'https://www.linkedin.com/in/example-sara',
        email: 'sara@example.com'
      },
      {
        id: 'e3',
        name: 'Rohan Patel',
        position: 'Staff Engineer, Platform',
        tenure: '2 yrs 9 mos',
        referralsGiven: 8,
        linkedin: 'https://www.linkedin.com/in/example-rohan',
        email: 'rohan@example.com'
      },
      {
        id: 'e4',
        name: 'Ananya Gupta',
        position: 'Product Manager',
        tenure: '1 yr 6 mos',
        referralsGiven: 5,
        linkedin: 'https://www.linkedin.com/in/example-ananya',
        email: 'ananya@example.com'
      }
    ];
    setCompanyEmployees(dummy);
  }, []);

  const addPerson = () => {
    if (!personInput.name && !personInput.email && !personInput.linkedin) return;
    setPeople((prev) => [...prev, personInput]);
    setPersonInput({ name: '', email: '', linkedin: '' });
  };

  const removePerson = (index) => {
    setPeople((prev) => prev.filter((_, i) => i !== index));
  };

  const submitReferralRequest = () => {
    setSubmitting(true);
    const userId = '123'; // TODO: replace with actual logged-in user ID
    axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/jobs/${jobId}/referrals`, { userId, people })
      .then(() => navigate('/jobs'))
      .finally(() => setSubmitting(false));
  };

  const addEmployeeToRequest = (emp) => {
    // Avoid duplicates by name+email+linkedin
    const exists = people.some(p => (p.name === emp.name) && (p.email === emp.email) && (p.linkedin === emp.linkedin));
    if (exists) return;
    setPeople(prev => [...prev, { name: emp.name, email: emp.email, linkedin: emp.linkedin }]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow">
        <button className="mb-4 text-blue-600 hover:underline" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <h1 className="mb-1 text-2xl font-bold">Request Referral</h1>
        <p className="mb-6 text-gray-600">
          {job ? (
            <>
              You are requesting a referral for <span className="font-semibold">{job.title}</span> at
              {' '}<span className="font-semibold">{job.company}</span>.
            </>
          ) : (
            'Loading job details...'
          )}
        </p>

        <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-3">
          <input
            type="text"
            placeholder="Person's name"
            className="rounded border p-2"
            value={personInput.name}
            onChange={(e) => setPersonInput({ ...personInput, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Work email (optional)"
            className="rounded border p-2"
            value={personInput.email}
            onChange={(e) => setPersonInput({ ...personInput, email: e.target.value })}
          />
          <input
            type="url"
            placeholder="LinkedIn URL (optional)"
            className="rounded border p-2"
            value={personInput.linkedin}
            onChange={(e) => setPersonInput({ ...personInput, linkedin: e.target.value })}
          />
        </div>
        <button className="mb-6 rounded bg-gray-800 px-4 py-2 text-white hover:bg-gray-900" onClick={addPerson}>
          Add person
        </button>

        {/* Company employees list */}
        <div className="mb-8">
          <h2 className="mb-3 text-lg font-semibold">Suggested people{job?.company ? ` at ${job.company}` : ''}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {companyEmployees.map((emp) => (
              <div key={emp.id} className="rounded-lg border bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-semibold">
                      {emp.name.split(' ').map(n => n[0]).slice(0,2).join('')}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{emp.name}</div>
                      <div className="text-sm text-gray-600">{emp.position}</div>
                      <div className="text-xs text-gray-500">Tenure: {emp.tenure}</div>
                    </div>
                  </div>
                  <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                    {emp.referralsGiven} referrals
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  {emp.linkedin && (
                    <a className="text-blue-600 hover:underline text-sm" href={emp.linkedin} target="_blank" rel="noreferrer">
                      LinkedIn
                    </a>
                  )}
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => addEmployeeToRequest(emp)}
                    className="rounded bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    Add to request
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {people.length > 0 && (
          <div className="mb-6">
            <h2 className="mb-2 text-lg font-semibold">People to request referral from</h2>
            <ul className="space-y-2">
              {people.map((p, idx) => (
                <li key={idx} className="flex items-center justify-between rounded border p-3 text-sm">
                  <div>
                    <div className="font-medium">{p.name || 'Unnamed'}</div>
                    <div className="text-gray-600">{p.email || p.linkedin || 'No contact provided'}</div>
                  </div>
                  <button className="text-red-600 hover:underline" onClick={() => removePerson(idx)}>Remove</button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          disabled={submitting || !job}
          className="rounded bg-green-600 px-5 py-2 font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
          onClick={submitReferralRequest}
        >
          {submitting ? 'Submitting...' : 'Submit referral request'}
        </button>
      </div>
    </div>
  );
};

export default ReferralRequestPage;


