import React from "react";
import { Mail, BarChart3, Timer, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FeatureHighlights() {
  const navigate = useNavigate();

  const features = [
    {
      title: "Automated Email Sender",
      desc: "Auto-send personalized cold emails & track responses.",
      icon: <Mail className="w-10 h-10 text-blue-500" />,
      color: "from-blue-500/10 to-blue-600/10",
      url: "/email-sender",
    },
    {
      title: "Application Tracker",
      desc: "Track all job applications with real-time insights.",
      icon: <BarChart3 className="w-10 h-10 text-purple-500" />,
      color: "from-purple-500/10 to-purple-600/10",
      url: "/tracker",
    },
    {
      title: "Auto Follow-Ups",
      desc: "Never miss follow-ups — automated timeline reminders.",
      icon: <Timer className="w-10 h-10 text-green-500" />,
      color: "from-green-500/10 to-green-600/10",
      url: "/followups",
    },
  ];

  return (
    <div className="w-full flex flex-col items-center mt-12 mb-16 px-4">
      <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-3">
        Smart Tools That Boost Your Job Hunt
      </h2>
      <p className="text-gray-600 text-center mb-10 max-w-xl">
        Use powerful AI-based features designed to help you get hired faster.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        {features.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(item.url)}
            className={`cursor-pointer rounded-3xl p-7 border backdrop-blur-xl bg-gradient-to-br ${item.color}
                       shadow-xl hover:shadow-2xl transition-all duration-300
                       hover:-translate-y-2 group`}
          >
            <div className="flex flex-col items-center text-center">
              <div className="p-4 rounded-full bg-white/60 backdrop-blur-lg shadow group-hover:scale-110 transition">
                {item.icon}
              </div>

              <h3 className="text-xl font-semibold mt-5 text-gray-900 group-hover:text-black">
                {item.title}
              </h3>

              <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                {item.desc}
              </p>

              <button
                className="mt-5 px-5 py-2 rounded-full bg-black text-white text-sm flex items-center gap-2
                           group-hover:bg-gray-900 transition-all duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(item.url);
                }}
              >
                Explore <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
