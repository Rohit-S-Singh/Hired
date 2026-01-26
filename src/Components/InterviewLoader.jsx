"use client";

import { useEffect, useState } from "react";

const STEPS = [
  "🔍 Searching interview assistant...",
  "🧠 Preparing interview environment...",
  "🎤 Almost there, getting ready...",
];

export default function InterviewLoader({ onComplete }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => {
        if (s === STEPS.length - 1) {
          clearInterval(interval);
          setTimeout(onComplete, 800);
          return s;
        }
        return s + 1;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      <div className="text-white text-center space-y-4">
        <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
        <p className="text-lg font-medium">{STEPS[step]}</p>
      </div>
    </div>
  );
}
