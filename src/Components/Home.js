import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PricingPage from "./PricingPage.jsx";
import RecruiterPromptModal from "./RecruiterPromptModal.jsx";
import MentorCarousel from "./MentorCarousel.js";
import HelpSection from "./Faqs.js";
import FAQSection from "./Faq.js";
import { useGlobalContext } from "../pages/AUTH/GlobalContext.js";
const HomePage = () => {
    const navigate = useNavigate();
      const { setIsLoggedIn, setUser } = useGlobalContext();
    const [showRecruiterModal, setShowRecruiterModal] = useState(false);

useEffect(() => {
  const autoLogin = async () => {
    const token = localStorage.getItem("jwtToken"); // Consistent key
    console.log("Checking if token exists in localStorage...");
    console.log("hi");
    
    if (token) {
      console.log("Token found, verifying...");
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/verifyToken`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        console.log("Verification response:", data);
        if (res.status === 200 || data.success) {
          console.log("✅ Token valid, user logged in automatically");
          setIsLoggedIn(true);
          setUser(res.data.user);   
          navigate("/overview");
        } else {
          console.warn("⚠️ Invalid or expired token");
          localStorage.removeItem("jwtToken"); // Fixed key
        }
      } catch (error) {
        console.error("❌ Error verifying token:", error);
      }
    } else {
      console.log("No token found, skipping auto login");
    }
  };
  autoLogin();
}, [navigate]);

    useEffect(() => {
      const handleScroll = () => {
        const doc = document.documentElement;
        const scrollTop = window.scrollY || doc.scrollTop;
        const viewportHeight = window.innerHeight;
        const fullHeight = doc.scrollHeight;
        const scrollProgress = (scrollTop + viewportHeight) / Math.max(fullHeight, 1);

        if (scrollProgress >= 0.5) {
          setShowRecruiterModal(true);
          window.removeEventListener("scroll", handleScroll, { passive: true });
        }
      };
      window.addEventListener("scroll", handleScroll, { passive: true });
      // Run once in case the page is short or already scrolled
      handleScroll();
      return () => {
        window.removeEventListener("scroll", handleScroll, { passive: true });
      };
    }, []);
    const problems = [
      { icon: "👥", text: "Connections to Recruiters", bg: "bg-red-100", textColor: "text-red-500", status: "coming-soon" },
      { icon: "🔥", text: "Getting Interview Calls", bg: "bg-purple-100", textColor: "text-purple-500", status: "coming-soon" },
      { icon: "🕒", text: "Automated Application Process", bg: "bg-blue-100", textColor: "text-blue-500", status: "live" },
      { icon: "📥", text: "Job Application Tracking", bg: "bg-green-100", textColor: "text-green-500", status: "coming-soon" },
      { icon: "🧰", text: "Faster Referrals", bg: "bg-violet-100", textColor: "text-violet-500", status: "live" },
      { icon: "👑", text: "Quick Job Opening Updates", bg: "bg-yellow-100", textColor: "text-yellow-500", status: "coming-soon" },
    ];
    return (
      <div className="bg-white text-black">
        {/* Hero Section */}
        <section className="py-20 px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">RealHired - Ace Your Interviews and get Hired for Real</h1>
          <p className="text-lg text-gray-600 mb-8">
            Personalized mock interviews, instant feedback, and real-world questions to help you crack your dream job.
          </p>
          <button onClick={() => navigate("/pricing")} className="bg-blue-600 text-white px-6 py-3 rounded font-semibold hover:bg-blue-700">
            Get Started for Free
          </button>
        </section>
  
        {/* Problem Cards Section */}
        <section className="py-16 bg-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">Our Tools</h2>
          <div className="flex flex-wrap justify-center gap-6 px-4">
            {problems.map((item, index) => (
              <div
                key={index}
                className={`w-64 rounded-xl shadow-md border p-6 text-center transition hover:shadow-lg bg-white relative ${
                  item.status === "live" ? "cursor-pointer hover:scale-105" : "cursor-not-allowed"
                }`}
                onClick={() => {
                  if (item.status === "live") {
                    if (item.text === "Automated Application Process") {
                      navigate("/email-sender");
                    } else if (item.text === "Faster Referrals") {
                      navigate("/jobs");
                    }
                  }
                }}
              >
                <div className={`w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-xl ${item.bg}`}>
                  <span className={`text-2xl ${item.textColor}`}>{item.icon}</span>
                </div>
                <p className="text-base font-medium text-gray-900">{item.text}</p>
                
                {/* Status Badge */}
                <div className="mt-3">
                  {item.status === "live" ? (
                    <span className="inline-block bg-green-100 text-green-600 text-xs font-medium px-2 py-1 rounded-full">
                      Live
                    </span>
                  ) : (
                    <span className="inline-block bg-orange-100 text-orange-600 text-xs font-medium px-2 py-1 rounded-full">
                      Coming Soon
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <button className="bg-orange-500 text-white px-6 py-3 rounded font-semibold hover:bg-orange-600">
              Sign up now, it's free!
            </button>
          </div>
        </section>
        {/* Pricing Section */}
        <MentorCarousel></MentorCarousel>
        <HelpSection></HelpSection>
        <FAQSection></FAQSection>
        <PricingPage />
        <RecruiterPromptModal
          open={showRecruiterModal}
          onClose={() => setShowRecruiterModal(false)}
          onCta={() => {
            setShowRecruiterModal(false);
            navigate("/recruiters");
          }}
        />
      </div>
    );
  };
  export default HomePage;
  
