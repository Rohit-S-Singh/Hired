import React, { useState, useEffect } from "react";
import { ProgressBar, Step } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const StatusAccordion = ({ recruiter, logs }) => {
  const [progressPercent, setProgressPercent] = useState(0);

  recruiter = recruiter || { name: "G Y SUHAS" };

  // Dummy logs if none provided
  // if (!logs || logs.length === 0) {
  logs = [
    { status: "sent", createdAt: "2025-07-01T10:00:00Z" },
    { status: "followed_up", createdAt: "2025-09-03T10:00:00Z" },
    { status: "followed_up", createdAt: "2025-10-03T10:00Z" },
    { status: "followed_up", createdAt: "2025-10-03T10:00Z" },
    { status: "followed_up", createdAt: "2025-10-03T10:00Z" },
    { status: "followed_up", createdAt: "2025-10-03T10:00Z" },
    { status: "closed", createdAt: "2025-11-05T10:00Z" },
  ];
  // }

  // Create arrays for each status type to handle multiple entries
  const statusGroups = logs.reduce((acc, log) => {
    if (!acc[log.status]) {
      acc[log.status] = [];
    }
    acc[log.status].push(log);
    return acc;
  }, {});

  const steps = [];

  // Step 1: Sent
  if (statusGroups.sent && statusGroups.sent.length > 0) {
    steps.push({
      title: "Sent",
      icon: <FaCheckCircle className="text-green-600 text-3xl" />,
      date: statusGroups.sent[0]?.createdAt,
    });
  }

  // Step 2: No Reply after Sent?
  if (statusGroups.sent && !statusGroups.replied && statusGroups.followed_up) {
    steps.push({
      title: "No Reply",
      icon: <FaTimesCircle className="text-red-500 text-3xl" />,
    });
  }

  // Step 3: Follow-ups (create separate step for each follow-up)
  if (statusGroups.followed_up && statusGroups.followed_up.length > 0) {
    statusGroups.followed_up.forEach((followUp, index) => {
      // Add follow-up step
      steps.push({
        title: `Follow-up ${index + 1}`,
        icon: <FaCheckCircle className="text-green-600 text-3xl" />,
        date: followUp.createdAt,
      });
      
      // Add "No Reply" step after each follow-up (except the last one if there's a reply or closed)
      const isLastFollowUp = index === statusGroups.followed_up.length - 1;
      const hasReply = statusGroups.replied && statusGroups.replied.length > 0;
      const hasClosed = statusGroups.closed && statusGroups.closed.length > 0;
      
      if (!isLastFollowUp || (!hasReply && !hasClosed)) {
        steps.push({
          title: "No Reply",
          icon: <FaTimesCircle className="text-red-500 text-3xl" />,
        });
      }
    });
  }

  // Step 4: No Reply after Follow-up?
  if (statusGroups.followed_up && !statusGroups.replied && statusGroups.closed) {
    steps.push({
      title: "No Reply",
      icon: <FaTimesCircle className="text-red-500 text-3xl" />,
    });
  }

  // Step 5: Closed
  if (statusGroups.closed && statusGroups.closed.length > 0) {
    steps.push({
      title: "Closed",
      icon: <div className="w-4 h-4 rounded-full bg-gray-400" />,
      date: statusGroups.closed[0]?.createdAt,
    });
  }

  // Animate progress on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressPercent(80);
    }, 500); // Start animation after 500ms

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-4 bg-white shadow-md w-full border-b-2 border-l-2 border-r-2 border-gray-300">
      <h3 className="text-lg font-semibold text-green-600 mb-2">Email Status Tracker</h3>
      <div className="mb-24">
        <p className="text-sm text-gray-700">
          Recruiter: <strong>{recruiter?.name || recruiter?.email}</strong>
        </p>
      </div>

      <div className="max-w-7xl mx-auto pb-4">
        <ProgressBar
          percent={progressPercent}
          filledBackground="linear-gradient(to right, #00c851, #007E33)"
          height={4}
          transition="width 8s ease-in-out"
        >
          {steps.map((step, index) => (
            <Step key={index}>
              {() => (
                <div className="flex flex-col items-center relative" style={{ transform: "translateY(-18px)" }}>
                  <div className="z-10">{step.icon}</div>
                  <div className="text-xs text-center mt-2">
                    <div className="font-medium">{step.title}</div>
                    {step.date && (
                      <div className="text-[10px] text-gray-500">
                        {new Date(step.date).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </Step>
          ))}
        </ProgressBar>
      </div>
    </div>
  );
};

export default StatusAccordion;
