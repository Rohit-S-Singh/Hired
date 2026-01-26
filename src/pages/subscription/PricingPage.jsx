import { PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../AUTH/GlobalContext";
import toast from "react-hot-toast";

export default function PricingPage() {
  const { user } = useGlobalContext();

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const plans = [
    {
      name: "Student Premium",
      price: "9.00",
      description: "Faster referrals, premium jobs, mentor priority",
      planKey: "student_premium",
      features: [
        "Priority job referrals",
        "Access to premium job listings",
        "Mentor priority queue",
        "Enhanced profile visibility",
        "Resume review credits",
        "Interview preparation resources"
      ]
    },
    {
      name: "Mentor Pro",
      price: "19.00",
      description: "Monetize profile, get student requests",
      planKey: "mentor_pro",
      features: [
        "Monetize your expertise",
        "Receive student requests",
        "Pro badge on profile",
        "Priority support",
        "Analytics dashboard",
        "Unlimited mentorship sessions"
      ]
    },
    {
      name: "Enterprise",
      price: "49.00",
      description: "Complete placement solution for organizations",
      planKey: "enterprise",
      features: [
        "Bulk student accounts",
        "Dedicated account manager",
        "Custom branding options",
        "Advanced analytics & reporting",
        "API access",
        "Priority placement support",
        "Training & onboarding sessions",
        "24/7 dedicated support"
      ]
    },
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Sign in required</h2>
          <p className="text-gray-600">Please login to view and subscribe to our premium plans.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Choose your plan</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upgrade your experience and unlock powerful features to accelerate your career growth
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {plans.map((plan, idx) => (
            <div 
              key={idx} 
              className={`relative bg-white border-2 rounded-2xl p-8 transition-all duration-300 ${
                selectedPlan?.planKey === plan.planKey 
                  ? 'border-blue-600 shadow-xl scale-105' 
                  : 'border-gray-200 hover:border-blue-400 hover:shadow-lg'
              } ${idx === 1 ? 'md:scale-105' : ''}`}
            >
              {/* Popular Badge for middle plan */}
              {idx === 1 && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-sm font-semibold px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}

              {/* Selected Indicator */}
              {selectedPlan?.planKey === plan.planKey && (
                <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Selected
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="mb-8">
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold text-gray-900">${plan.price}</span>
                  <span className="text-gray-600 ml-2">/month</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={() => setSelectedPlan(plan)}
                className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-200 ${
                  selectedPlan?.planKey === plan.planKey
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {selectedPlan?.planKey === plan.planKey ? 'Selected' : 'Select plan'}
              </button>
            </div>
          ))}
        </div>

        {/* PayPal Section */}
        {selectedPlan && (
          <div className="max-w-lg mx-auto">
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
              {/* Payment Header */}
              <div className="text-center mb-8">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Complete your subscription
                </h3>
                <p className="text-gray-600">
                  {selectedPlan.name} • ${selectedPlan.price}/month
                </p>
              </div>

              {/* Payment Summary */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Plan</span>
                  <span className="font-semibold text-gray-900">{selectedPlan.name}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-gray-900">${selectedPlan.price}</span>
                </div>
              </div>

              {/* PayPal Buttons */}
              <PayPalButtons
                style={{ layout: "vertical" }}

                createOrder={async () => {
                  try {
                    setLoading(true);
                    const token = localStorage.getItem("jwtToken");

                    const res = await axios.post(
                      `${process.env.REACT_APP_BACKEND_BASE_URL}/api/payment/create-order`,
                      {
                        userId: user._id,
                        amount: selectedPlan.price,
                        purpose: selectedPlan.planKey,
                      },
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      }
                    );

                    return res.data.orderId;
                  } catch (err) {
                    toast.error("Unable to create payment");
                    throw err;
                  } finally {
                    setLoading(false);
                  }
                }}

                onApprove={async (data) => {
                  try {
                    const token = localStorage.getItem("jwtToken");

                    await axios.post(
                      `${process.env.REACT_APP_BACKEND_BASE_URL}/api/payment/capture/${data.orderID}`,
                      {
                        userId: user._id,
                      },
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      }
                    );

                    toast.success("🎉 Subscription activated!");
                    setSelectedPlan(null);
                    window.location.href = "/overview";

                  } catch (err) {
                    toast.error("Payment verification failed");
                  }
                }}

                onCancel={() => {
                  toast("Payment cancelled");
                  setSelectedPlan(null);
                }}

                onError={(err) => {
                  console.error(err);
                  toast.error("Payment failed");
                }}
              />

              {/* Cancel Button */}
              <button
                onClick={() => setSelectedPlan(null)}
                className="w-full mt-4 py-3 text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}