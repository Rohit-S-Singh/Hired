"use client";

import { useEffect } from "react";

export default function InterviewWorkspace({
  startInterview,
  messages,
  status,
  onEnd,
}) {

    // ============================
// START INTERVIEW
// ============================
// const startInterview = async () => {
//     if (!interviewType) {
//       setError("Please select an interview type");
//       return;
//     }
  
//     setError(null);
  
//     try {
//       const vapi = new Vapi("f5a33db8-32ac-4f51-bfc9-51532cf07850");
  
//       // Start voice conversation
//       vapi.start("78e0240f-801f-4f89-b47d-4e61ce7198a9");
  
//       // Listen for events
//       vapi.on("call-start", () => {
//         console.log("Call started");
//       });
  
//       vapi.on("call-end", () => {
//         console.log("Call ended");
//       });
  
//       vapi.on("message", (message) => {
//         if (message.type === "transcript") {
//           console.log(`${message.role}: ${message.transcript}`);
//         }
//       });
//     } catch (err) {
//       console.log("Error AAgya");
//       console.error(err);
//       setError("Microphone permission denied or interview failed");
//     }
//   };
  





  // 🚀 AUTO START WHEN PAGE LOADS
  useEffect(() => {
    startInterview();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-xl font-bold">TalentSync</h1>
        <button
          onClick={onEnd}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          End Interview
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Notes</h2>
          <textarea className="w-full h-40 border rounded p-2" />
        </div>

        <div className="bg-white p-4 rounded shadow flex items-center justify-center">
          {status === "running" ? "🎤 Listening..." : "Starting..."}
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-3">Conversation</h2>
          <div className="space-y-2 text-sm max-h-80 overflow-y-auto">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-2 rounded ${
                  m.role === "assistant"
                    ? "bg-gray-100"
                    : "bg-blue-100 text-right"
                }`}
              >
                <b>{m.role === "assistant" ? "AI" : "You"}:</b> {m.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
