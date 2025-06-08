import React from 'react';
import Card from './ToolCards';

const Tools = () => {
  return (
    <div style={{ 
      width: '100vw', 
      padding: '20px', 
      boxSizing: 'border-box', 
      display: 'grid', 
      gridTemplateColumns: 'repeat(4, 1fr)', // 4 cards per row
      gap: '20px' // Adds spacing between the cards
    }}>
      <Card heading="Email Sender" description="Send Email to recruiters using a common Template on one click" url=""></Card>
      <Card heading="Job Buddy Application Analyser Chrome Extension" description="Get you emails analysed and application status updated on a well structured Dashboard" url=""></Card>
      <Card heading="Resume Builder" description="Create a professional resume with ease" url=""></Card>
      <Card heading="Interview Prep" description="Practice interview questions and get feedback" url=""></Card>
      <Card heading="Job Tracker" description="Track your job applications in one place" url=""></Card>
    </div>
  );
};

export default Tools;
