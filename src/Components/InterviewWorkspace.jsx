"use client";

import { useEffect } from "react";
import React, { useState } from "react";

import aiThinkingVideo from "../assets/ai-thinking.webm";

import { Player } from "@lottiefiles/react-lottie-player";
import aiThinkingLottie from "../assets/ai-thinking.lottie";


import aiSpeakGif from "../assets/ai-speak.gif";

export default function InterviewWorkspace({
    startInterview,
    messages,
    status,
    onEnd }
) {

    const [isMicOn, setIsMicOn] = useState(true);
    const [isCamOn, setIsCamOn] = useState(true);
    const [pinned, setPinned] = useState("candidate");
    const [reaction, setReaction] = useState(null);
    const [isAiSpeaking, setIsAiSpeaking] = useState(true);

    useEffect(() => {
        startInterview();
    }, []);

    console.log(messages);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-6 grid grid-cols-3 gap-6">
                {/* LEFT: Interview Area */}
                <div className="col-span-2">
                    {/* Main Interview Screen */}
                    {/* Main Interview Screen */}
                    <div className="relative bg-gray-200 rounded-xl h-[420px] grid grid-cols-2 overflow-hidden">
                        {/* Human Screen */}
                        <div className="flex items-center justify-center text-gray-500 text-lg">
                            <img src="https://picsum.photos/seed/picsum/200/300" alt="" />
                            {/* {pinned === "candidate" ? "Candidate Screen" : "Interviewer Screen"} */}
                        </div>

                        {/* AI Screen */}
                        <div className="flex flex-col items-center justify-center bg-gray-100 border-l">
                            {isAiSpeaking ? (
                                <Player
                                    src={aiThinkingLottie}
                                    autoplay
                                    loop
                                    style={{ width: 400, height: 300 }}
                                />
                            ) : (
                                <span className="text-sm text-gray-400">AI Idle</span>
                            )}
                            <span className=" text-md text-gray-500">RealHired AI</span>
                        </div>

                        {/* Floating Thumbnail */}
                        {/* <div
                            onClick={() => {
                                setPinned(pinned === "candidate" ? "interviewer" : "candidate");
                                setIsAiSpeaking(false);
                            }}
                            className="absolute bottom-4 right-4 w-40 h-28 bg-gray-300 rounded-lg flex items-center justify-center text-sm cursor-pointer"
                        >
                            Click to Pin
                        </div> */}
                    </div>


                    {/* Meeting Meta Info */}
                    <div className="flex flex-wrap gap-3 mt-4 text-sm text-gray-600">
                        <span className="px-3 py-1 bg-gray-100 rounded-lg">📅 Jul 10, 2025</span>
                        <span className="px-3 py-1 bg-gray-100 rounded-lg">👩‍💼 Mrs. Tania Shahira</span>
                        <span className="px-3 py-1 bg-gray-100 rounded-lg">👩‍💻 Regina Tanya</span>
                        <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg">
                            Frontend Developer Hiring
                        </span>
                    </div>

                    {/* Controls */}
                    <div className="flex gap-3 mt-4">
                        <button
                            onClick={() => setIsMicOn(!isMicOn)}
                            className={`px-4 py-2 rounded-lg text-sm ${isMicOn ? "bg-green-500 text-white" : "bg-red-500 text-white"
                                }`}
                        >
                            {isMicOn ? "Mic On" : "Mic Off"}
                        </button>

                        <button
                            onClick={() => setIsCamOn(!isCamOn)}
                            className={`px-4 py-2 rounded-lg text-sm ${isCamOn ? "bg-green-500 text-white" : "bg-red-500 text-white"
                                }`}
                        >
                            {isCamOn ? "Cam On" : "Cam Off"}
                        </button>

                        {["👍", "👏", "😊"].map((emo) => (
                            <button
                                key={emo}
                                onClick={() => setReaction(emo)}
                                className="px-3 py-2 bg-indigo-100 rounded-lg"
                            >
                                {emo}
                            </button>
                        ))}
                    </div>

                    {reaction && (
                        <div className="mt-4 text-3xl animate-bounce">{reaction}</div>
                    )}

                    {/* AI Summary Section */}
                    <div className="mt-6 bg-indigo-50 border border-indigo-100 rounded-xl p-4">
                        <h3 className="font-medium text-indigo-700 mb-2">
                            ✨ AI Summary of Interview
                        </h3>
                        <p className="text-sm text-gray-700">
                            The interview focused on frontend performance optimization,
                            Tailwind CSS experience, and clean component architecture. The
                            candidate showed strong real-world problem solving and React
                            fundamentals.
                        </p>
                    </div>
                </div>

                {/* RIGHT: Chat Panel */}
                <div className="bg-gray-50 border rounded-xl p-4 flex flex-col">
                    <h3 className="font-medium mb-2">💬 Interview Chat</h3>

                    <div className="flex-1 overflow-y-auto space-y-2 text-sm">
                        <div className="bg-white p-2 rounded-lg">
                            👩‍💼 Please introduce yourself.
                        </div>
                        <div className="bg-indigo-100 p-2 rounded-lg self-end">
                            👩‍💻 Sure! I'm a frontend developer with React experience.
                        </div>
                    </div>

                    <input
                        placeholder="Type a message..."
                        className="mt-3 px-3 py-2 border rounded-lg text-sm"
                    />
                </div>
            </div>

            <div className="text-center text-sm text-gray-400 mt-6">
                Powered by <span className="font-medium">RealHired</span>
            </div>
        </div>
    );
}
