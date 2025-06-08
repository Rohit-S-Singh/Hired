import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast'; // Optional: Add `npm install react-hot-toast`

const dummyRecruiters = [
    { id: 1, name: "Anjali Mehta", email: "anjali@techcorp.com" },
    { id: 2, name: "Rohit Sharma", email: "rohit@startuphub.in" },
    { id: 3, name: "Neha Kapoor", email: "neha@innovate.com" },
    { id: 4, name: "Arjun Verma", email: "arjun@fintechzone.co" },
];

const RecruiterList = () => {
    const [recruiters, setRecruiters] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [emailConnected, setEmailConnected] = useState(false);

    useEffect(() => {
        // Load dummy recruiters
        setRecruiters(dummyRecruiters);

        const email = localStorage.getItem("username");
        setIsLoggedIn(!!email);

        if (email) {
            fetch("http://localhost:8080/api/check-email-connection", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            })
            .then(res => res.json())
            .then(data => setEmailConnected(data.success))
            .catch(err => console.error(err));
        }
    }, []);
 
    const handleSendEmail = async (recruiterEmail) => {
        try {
            const res = await fetch("http://localhost:8080/api/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    to: recruiterEmail,
                    from: localStorage.getItem("username"),
                    subject: "Job Application",
                    body: "Hi, I'm interested in opportunities at your company. Please find my profile attached."
                }),
            });

            const result = await res.json();
            if (result.success) {
                toast.success("Email sent to " + recruiterEmail);
            } else {
                toast.error("Failed to send email.");
            }
        } catch (error) {
            toast.error("Something went wrong.");
            console.error(error);
        }
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
            <Toaster />
            <h1 style={{ marginBottom: '1rem' }}>Recruiters</h1>
            {recruiters.map((rec) => (
                <div
                    key={rec.id}
                    style={{
                        border: "1px solid #e0e0e0",
                        borderRadius: "8px",
                        padding: "1rem",
                        marginBottom: "1rem",
                        boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                    }}
                >
                    <h3 style={{ margin: 0 }}>{rec.name}</h3>
                    <p style={{ color: "#555" }}>{rec.email}</p>
                    <button
                        onClick={() => handleSendEmail(rec.email)}
                        style={{
                            marginTop: '10px',
                            padding: '10px 20px',
                            backgroundColor: '#2563eb',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                        }}
                    >
                        Send Email
                    </button>
                </div>
            ))}
        </div>
    );
};

export default RecruiterList;
