import React from "react";
import { HelpCircle, MessageSquare, Users, Settings } from "lucide-react";

const HelpSection = () => {
  const helpItems = [
    {
      icon: <HelpCircle className="w-10 h-10 text-indigo-500" />,
      title: "24/7 Support",
      description: "We’re always here to assist you with any query or concern.",
    },
    {
      icon: <MessageSquare className="w-10 h-10 text-green-500" />,
      title: "Instant Chat",
      description: "Connect instantly with our support team through live chat.",
    },
    {
      icon: <Users className="w-10 h-10 text-blue-500" />,
      title: "Expert Guidance",
      description: "Get personalized help from our experienced professionals.",
    },
    {
      icon: <Settings className="w-10 h-10 text-purple-500" />,
      title: "Custom Solutions",
      description: "Tailored options that perfectly fit your unique needs.",
    },
  ];

  return (
    <section className="bg-gray-50 py-16 px-6 md:px-20 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">How Can We Help You?</h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-12">
        We’re here to simplify your journey and provide the best support possible.
      </p>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {helpItems.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md hover:shadow-xl transition-shadow rounded-2xl p-6 text-left flex flex-col items-center"
          >
            <div className="mb-4">{item.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm text-center">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HelpSection;
