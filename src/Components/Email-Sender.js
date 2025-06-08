import React, { useEffect, useState } from 'react';
import Lottie from "lottie-react";
import loaderAnimation from "../assets/loader.json"; // Adjust path as needed
import mailConnected from "../assets/mailConnected.json"; // Adjust path as neededs

const EmailSender = () => {
    const CLIENT_ID = "556192005152-spj1li8ltud44rk9339n788fmt9m6btm.apps.googleusercontent.com";
    const REDIRECT_URI = "https://9cfc-182-69-178-195.ngrok-free.app/api/oauth2/callback";

    const SCOPE = [
        "openid",
        "email",
        "profile",
        "https://www.googleapis.com/auth/gmail.send"
    ].join(" ");

    const [isConnected, setIsConnected] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkConnection = async () => {
            const email = localStorage.getItem('username');
            if (email) {
                try {
                    const response = await fetch('http://localhost:8080/api/check-email-connection', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email }),
                    });
                    const data = await response.json();
                    setIsConnected(data.success);
                } catch (error) {
                    console.error('Error checking email connection:', error);
                }
            }
            setLoading(false);
        };

        checkConnection();
    }, []);

    const handleConnectClick = () => {
        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth` +
            `?client_id=${CLIENT_ID}` +
            `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
            `&response_type=code` +
            `&scope=${encodeURIComponent(SCOPE)}` +
            `&access_type=offline` +
            `&prompt=consent`;

        window.location.href = authUrl;
    };

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh'
            }}>
                <Lottie animationData={loaderAnimation} loop={true} style={{ width: 200, height: 200 }} />
            </div>
        );
    }

    if (isConnected) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center', padding: '20px' }}>
                <Lottie animationData={mailConnected} loop={true} style={{ width: 200, height: 200 }} />
                <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>You're already connected!</h2>
                <p style={{ maxWidth: '400px', color: '#666', marginBottom: '20px' }}>
                    Your email is already connected. You can now send emails to recruiters.
                </p>
                <button
                    onClick={() => window.location.href = '/email-setup'}
                    style={{
                        backgroundColor: '#10b981',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '12px 24px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        marginTop: '20px'
                    }}
                >
                    Setup Email Template
                </button>
            </div>
        );
    
    }
   
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center', padding: '20px' }}>
            <img
                src="/your-email-connect-image.png"
                alt="Connect to Email"
                style={{ width: '180px', height: 'auto', marginBottom: '20px' }}
            />
            <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>Connect your email</h2>
            <p style={{ maxWidth: '400px', color: '#666', marginBottom: '20px' }}>
                Allow us to send emails to recruiters on your behalf. You’ll always be in control and can disconnect at any time.
            </p>
            <button
                onClick={handleConnectClick}
                style={{
                    backgroundColor: '#2563eb',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '12px 24px',
                    cursor: 'pointer',
                    fontSize: '16px'
                }}
            >
                Connect
            </button>
        </div>
    );
};

export default EmailSender;
