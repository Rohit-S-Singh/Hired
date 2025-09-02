import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast'; // Optional: Add `npm install react-hot-toast`

const RecruiterList = () => {
    const [recruiters, setRecruiters] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [emailConnected, setEmailConnected] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Check login status
        const email = localStorage.getItem("username");
        setIsLoggedIn(!!email);

        if (email) {
            fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/check-email-connection`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            })
            .then(res => res.json())
            .then(data => setEmailConnected(data.success))
            .catch(err => console.error(err));
        }

        // Fetch recruiters from API
        fetchRecruiters();
    }, []);

    const fetchRecruiters = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const token = localStorage.getItem('token') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NzNiZDdhM2NlZDM1YWQxMmViMzIxNSIsImVtYWlsIjoicm9oaXRzaGVrcnNpbmdoQGdtYWlsLmNvbSIsImlhdCI6MTc1NjY2OTI5MSwiZXhwIjoxNzU2NzU1NjkxfQ.CTKv8JZig2-hGCOZxRAhoi79mKC4VmZHsw83CVuS7cU';
            
            const response = await fetch('http://localhost:8080/api/recruiters/all', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            
            // Handle the actual API response structure
            if (result.success && result.data && result.data.recruiters) {
                setRecruiters(result.data.recruiters);
            } else if (result.success && result.recruiters) {
                setRecruiters(result.recruiters);
            } else if (Array.isArray(result)) {
                setRecruiters(result);
            } else {
                setRecruiters([]);
            }
        } catch (err) {
            console.error('Error fetching recruiters:', err);
            setError('Failed to load recruiters. Please try again later.');
            setRecruiters([]);
        } finally {
            setLoading(false);
        }
    };

    const getInitials = (name) => {
        if (!name) return 'R';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };
 
    const handleSendEmail = async (recruiterEmail, e) => {
        e.preventDefault(); // Prevent the link from navigating when clicking the email button
        e.stopPropagation(); // Stop event bubbling
        
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/send-email`, {
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

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading recruiters...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-6">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Recruiters</h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                        onClick={fetchRecruiters}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Toaster />
                
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Your Perfect Recruiter</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Connect with top recruiters who can help you land your dream job
                    </p>
                </div>

                {/* Controls */}
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center space-x-4">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            Available Recruiters ({recruiters.length})
                        </h2>
                    </div>
                    <button
                        onClick={fetchRecruiters}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                        <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Refresh
                    </button>
                </div>
                
                {/* Recruiters Grid */}
                {recruiters.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="bg-white rounded-2xl shadow-xl p-12 max-w-md mx-auto">
                            <div className="text-gray-400 text-6xl mb-6">👥</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No recruiters found</h3>
                            <p className="text-gray-600">
                                There are no recruiters available at the moment. Check back later!
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {recruiters.map((rec) => (
                            <Link
                                key={rec._id || rec.id}
                                to={`/recruiter/${rec._id || rec.id}`}
                                className="group block"
                            >
                                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100 overflow-hidden">
                                    {/* Header with Avatar */}
                                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white relative">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-shrink-0">
                                                {rec.picture ? (
                                                    <img
                                                        src={rec.picture}
                                                        alt={rec.name}
                                                        className="w-16 h-16 rounded-full border-4 border-white shadow-lg object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-16 h-16 rounded-full border-4 border-white shadow-lg bg-white bg-opacity-20 flex items-center justify-center text-xl font-bold text-white">
                                                        {getInitials(rec.name)}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-lg font-bold truncate">
                                                    {rec.name || 'Recruiter'}
                                                </h3>
                                                <p className="text-blue-100 text-sm truncate">
                                                    {rec.companyName || 'Professional Recruiter'}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        {/* Recruiter Badge */} 
                                        <div className="absolute top-4 right-4">
                                            <span className="bg-white bg-opacity-20 text-white text-xs px-2 py-1 rounded-full font-medium">
                                                Recruiter
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        {/* Email */}
                                        <div className="flex items-center space-x-2 mb-4">
                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            <span className="text-sm text-gray-600 truncate">
                                                {rec.email}
                                            </span>
                                        </div>

                                        {/* Additional Info */}
                                        {(rec.givenName || rec.familyName) && (
                                            <div className="flex items-center space-x-2 mb-4">
                                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                <span className="text-sm text-gray-600">
                                                    {rec.givenName} {rec.familyName}
                                                </span>
                                            </div>
                                        )}

                                        {/* Member Since */}
                                        <div className="flex items-center space-x-2 mb-6">
                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span className="text-sm text-gray-600">
                                                Member since {formatDate(rec.createdAt)}
                                            </span>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="space-y-3">
                                            <button
                                                onClick={(e) => handleSendEmail(rec.email, e)}
                                                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm flex items-center justify-center space-x-2 group-hover:shadow-lg"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                <span>Send Email</span>
                                            </button>
                                            
                                            <div className="text-center">
                                                <span className="text-xs text-gray-500 font-medium">
                                                    Click card to view full profile →
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecruiterList;
