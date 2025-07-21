import React from "react";
import { CheckCircle } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "Free",
    features: [
      "Apply to 3 jobs/day",
      "Create your public profile",
      "Basic job recommendations",
    ],
    color: "bg-blue-50 border-blue-400 text-blue-800",
    buttonColor: "bg-blue-500 hover:bg-blue-600",
  },
  {
    name: "Pro",
    price: "₹199/month",
    features: [
      "Unlimited job applications",
      "Priority recommendations",
      "Access to recruiter views",
      "Earn coins for actions",
    ],
    color: "bg-green-50 border-green-400 text-green-800",
    buttonColor: "bg-green-500 hover:bg-green-600",
  },
  {
    name: "Elite",
    price: "₹399/month",
    features: [
      "All Pro benefits",
      "1:1 career consultation",
      "Early access to top jobs",
      "Job tracking dashboard",
      "Exclusive community access",
    ],
    color: "bg-purple-50 border-purple-400 text-purple-800",
    buttonColor: "bg-purple-500 hover:bg-purple-600",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Simple Pricing, Powerful Value
        </h2>
        <p className="text-gray-600 mb-12">
          Choose a plan that fits your job-seeking journey.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-2xl shadow-md border ${plan.color} p-6 flex flex-col justify-between`}
            >
              <div>
                <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-3xl font-bold mb-6">{plan.price}</p>
                <ul className="space-y-4 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                className={`w-full py-2 px-4 text-white font-semibold rounded-md transition-colors duration-300 ${plan.buttonColor}`}
              >
                Choose {plan.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
