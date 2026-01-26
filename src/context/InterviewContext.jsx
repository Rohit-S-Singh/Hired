"use client";

import { createContext, useContext, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";

const InterviewContext = createContext(null);

export const InterviewProvider = ({ children }) => {
  const vapiRef = useRef(null);

  const [status, setStatus] = useState("idle"); 
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  const initVapi = () => {
    if (vapiRef.current) return;

    vapiRef.current = new Vapi(
      process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY
    );

    vapiRef.current.on("call-start", () => {
      setStatus("running");
    });

    vapiRef.current.on("call-end", () => {
      setStatus("ended");
    });

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
      setError(err.message || "Interview failed");
      setStatus("idle");
    });
  };

  const startInterview = async (assistantId) => {
    initVapi();
    setStatus("loading");
    await vapiRef.current.start(assistantId);
  };

  const stopInterview = async () => {
    await vapiRef.current?.stop();
    setStatus("ended");
  };

  return (
    <InterviewContext.Provider
      value={{
        status,
        messages,
        error,
        startInterview,
        stopInterview,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
};

export const useInterview = () => useContext(InterviewContext);
