import React, { useState } from 'react';

const EmailSetup = () => {
    const [emailTemplate, setEmailTemplate] = useState('');

    const handleTemplateChange = (event) => {
        setEmailTemplate(event.target.value);
    };

    const handleSave = () => {
        alert('Email template saved!');
        // Add logic to save the email template
    };

    return (
        <div style={{ display: 'flex', gap: '20px', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            {/* Email Editor */}
            <div style={{ flex: 1 }}>
                <h2>Email Setup</h2>
                <textarea
                    style={{
                        width: '100%',
                        height: '200px',
                        padding: '10px',
                        fontSize: '16px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                    }}
                    placeholder="Write your email template here..."
                    value={emailTemplate}
                    onChange={handleTemplateChange}
                />
                <button
                    style={{
                        marginTop: '10px',
                        padding: '10px 20px',
                        fontSize: '16px',
                        color: '#fff',
                        backgroundColor: '#007BFF',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                    onClick={handleSave}
                >
                    Save Template
                </button>
            </div>

            {/* Email Preview */}
            <div style={{ flex: 1, border: '1px solid #ccc', borderRadius: '4px', padding: '10px' }}>
                <h3>Preview</h3>
                <div style={{ whiteSpace: 'pre-wrap', fontSize: '16px', lineHeight: '1.5' }}>
                    {emailTemplate || 'Your email template preview will appear here...'}
                </div>
            </div>
        </div>
    );
};

export default EmailSetup;
