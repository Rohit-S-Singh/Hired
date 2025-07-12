import React, { useState, useEffect } from "react";
import { ProgressBar, Step } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const StatusAccordion = ({ recruiter, logs }) => {
  const [progressPercent, setProgressPercent] = useState(0);

  recruiter = recruiter || { name: "G Y SUHAS" };

  console.log(logs);

  // Process logs to create steps with automatic no-reply insertion
  const steps = [];
  
  if (logs && logs.length > 0) {
    // Create a new array with no-reply states inserted before follow-ups
    const processedLogs = [];
    
    logs.forEach((log, index) => {
      // Add the current log
      processedLogs.push(log);
      
      // If this is a follow_up and the next log is not a no-reply, insert a no-reply
      if (log.status === 'follow_up') {
        const nextLog = logs[index + 1];
        if (nextLog && nextLog.status !== 'no-reply') {
          processedLogs.push({
            status: 'no-reply',
            createdAt: null
          });
        }
      }
    });
    
    // Process the enhanced logs to create steps
    processedLogs.forEach((log, index) => {
      switch (log.status) {
        case 'thread_start':
          steps.push({
            title: "Thread Start",
            icon: <FaCheckCircle className="text-green-600 text-3xl" />,
            date: log.createdAt,
          });
          break;
          
        case 'no-reply':
          steps.push({
            title: "No Reply",
            icon: <FaTimesCircle className="text-red-500 text-3xl" />,
            date: log.createdAt,
          });
          break;
          
        case 'follow_up':
          // Count how many follow-ups we've had so far
          const followUpCount = processedLogs.slice(0, index + 1).filter(l => l.status === 'follow_up').length;
          steps.push({
            title: `Follow-up ${followUpCount}`,
            icon: <FaCheckCircle className="text-green-600 text-3xl" />,
            date: log.createdAt,
          });
          break;
          
        case 'closed':
          steps.push({
            title: "Closed",
            icon: <div className="w-4 h-4 rounded-full bg-gray-400" />,
            date: log.createdAt,
          });
          break;
          
        default:
          break;
      }
    });
    
    // Add closed state at the end if not already present
    const hasClosedState = steps.some(step => step.title === "Closed");
    if (!hasClosedState && steps.length > 0) {
      steps.push({
        title: "Closed",
        icon: <div className="w-4 h-4 rounded-full bg-gray-400" />,
        date: null,
      });
    }
  }

  // Animate progress on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      // Calculate progress based on steps, excluding the last step if it's 'closed'
      const totalSteps = steps.length;
      const stepsToFill = steps[totalSteps - 1]?.title === "Closed" ? totalSteps - 1 : totalSteps;
      const progressPercent = totalSteps > 0 ? (stepsToFill / totalSteps) * 100 : 0;
      setProgressPercent(progressPercent);
    }, 500); // Start animation after 500ms

    return () => clearTimeout(timer);
  }, [steps]);

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
