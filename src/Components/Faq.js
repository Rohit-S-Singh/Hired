import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQSection = () => {
  const faqs = [
    {
      question: "What services does your website provide?",
      answer:
        "We provide a range of services to help you achieve your goals, including support, guidance, and custom solutions tailored to your needs.",
    },
    {
      question: "How can I contact support?",
      answer:
        "You can reach our support team via live chat, email, or phone. We’re available 24/7 to assist you with any queries.",
    },
    {
      question: "Is my data secure on your platform?",
      answer:
        "Absolutely! We prioritize your security and use advanced encryption and best practices to protect all user data.",
    },
    {
      question: "Can I customize my experience?",
      answer:
        "Yes, we offer personalized and customizable options to ensure that our solutions perfectly fit your requirements.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-16 px-6 md:px-20">
      <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Frequently Asked Questions</h2>
      <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
        Find answers to common questions about our website and services.
      </p>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl overflow-hidden"
          >
            <button
              className="flex justify-between w-full px-6 py-4 text-left focus:outline-none bg-gray-50 hover:bg-gray-100 transition-colors"
              onClick={() => toggleFAQ(index)}
            >
              <span className="font-medium text-gray-800">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
            </button>

            {openIndex === index && (
              <div className="px-6 py-4 text-gray-600 bg-white border-t border-gray-200">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
