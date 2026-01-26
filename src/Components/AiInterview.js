"use client";

import { useEffect, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";
import InterviewLoader from "./InterviewLoader";
import InterviewWorkspace from "./InterviewWorkspace";

const INTERVIEW_TYPES = [
  { value: "hld", label: "High Level Design (HLD)" },
  { value: "lld", label: "Low Level Design (LLD)" },
  { value: "hld_lld", label: "HLD + LLD (Full Interview)" },
];

export default function AiInterviewPage() {
  const vapiRef = useRef(null);

  const [status, setStatus] = useState("idle"); // idle | loading | running | ended
  const [error, setError] = useState(null);
  const [interviewType, setInterviewType] = useState("");
  const [messages, setMessages] = useState([]);

  // ============================
  // INIT VAPI (ONCE)
  // ============================
  useEffect(() => {
    vapiRef.current = new Vapi("f5a33db8-32ac-4f51-bfc9-51532cf07850");

    vapiRef.current.on("call-start", () => setStatus("running"));
    vapiRef.current.on("call-end", () => setStatus("ended"));

    vapiRef.current.on("message", (msg) => {
      if (msg.type === "transcript") {
        setMessages((prev) => [
          ...prev,
          { role: msg.role, text: msg.transcript },
        ]);
      }
    });

    vapiRef.current.on("error", (err) => {
      console.error(err);
      setError("Interview failed");
      setStatus("idle");
    });

    return () => vapiRef.current?.stop();
  }, []);

  // ============================
  // START INTERVIEW
  // ============================
  const startInterview = async () => {
        if (!interviewType) {
          setError("Please select an interview type");
          return;
        }
      
        setError(null);
      
        try {
          const vapi = new Vapi("f5a33db8-32ac-4f51-bfc9-51532cf07850");
      
          // Start voice conversation
          vapi.start("78e0240f-801f-4f89-b47d-4e61ce7198a9");
      
          // Listen for events
          vapi.on("call-start", () => {
            console.log("Call started");
          });
      
          vapi.on("call-end", () => {
            console.log("Call ended");
          });
      
          vapi.on("message", (message) => {
            if (message.type === "transcript") {
              // console.log(`${message.role}: ${message.transcript}`);
            }
          });
        } catch (err) {
          console.log("Error AAgya");
          console.error(err);
          setError("Microphone permission denied or interview failed");
        }
      };

  // ============================
  // STOP INTERVIEW
  // ============================
  const stopInterview = async () => {
    await vapiRef.current.stop();
    setStatus("ended");
  };

  // ============================
  // UI FLOW
  // ============================
  if (status === "loading") {
    return <InterviewLoader onComplete={() => setStatus("running")} />;
  }

  if (status === "running" || status === "ended") {
    return (
      <InterviewWorkspace
        startInterview={startInterview}
        messages={messages}
        status={status}
        onEnd={stopInterview}
      />
    );
  }

  // ============================
  // START SCREEN
  // ============================
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-4">AI Interview</h1>

        <select
          value={interviewType}
          onChange={(e) => setInterviewType(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4"
        >
          <option value="">Select interview type</option>
          {INTERVIEW_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          onClick={() => setStatus("loading")}
          disabled={!interviewType}
          className="w-full bg-black text-white py-3 rounded disabled:opacity-50"
        >
          Start Interview
        </button>
      </div>
    </div>
  );
}
