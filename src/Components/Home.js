import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PricingPage from "./PricingPage.jsx";
import RecruiterPromptModal from "./RecruiterPromptModal.jsx";
import MentorCarousel from "./MentorCarousel.js";
import HelpSection from "./Faqs.js";
import FAQSection from "./Faq.js";
import { useGlobalContext } from "../pages/AUTH/GlobalContext.js";
import axios from 'axios';
import { ArrowRight, Briefcase as BriefcaseIcon } from "lucide-react";

import JobCard from '../pages/Jobs/JobCard.jsx'; // Import the JobCard component

import JobBoard from "./JobBoard.js";
const SaveButton = ({ jobId, onSaveSuccess }) => {
  const { user } = useGlobalContext();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const saveJob = async () => {
    if (!user) {
      alert("Please login to save jobs");
      return;
    }

    try {
      setSaving(true);

      const token = localStorage.getItem("jwtToken");

      await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/jobs/save`,
        {
          userId: user._id,
          jobId: jobId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSaved(true);
      onSaveSuccess?.();

      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error("Error saving job:", error);

      if (error.response?.status === 409) {
        alert("Job already saved!");
      } else {
        alert("Failed to save job");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <button
      onClick={(e) => {
        e.stopPropagation(); // Prevent card click when saving
        saveJob();
      }}
      disabled={saving || saved}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
        saved
          ? "bg-green-50 text-green-600 border border-green-200"
          : "bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100"
      } ${saving ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {saving ? "Saving..." : saved ? "Saved!" : "Save Job"}
    </button>
  );
};
const HomePage = () => {

  const [applications, setApplications] = useState([]);
  const [coldEmailsSent, setColdEmailsSent] = useState(0);
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
    const navigate = useNavigate();
      const { setIsLoggedIn, setUser } = useGlobalContext();
    const [showRecruiterModal, setShowRecruiterModal] = useState(false);

    useEffect(() => {
      const fetchJobs = async () => {
        try {
          setLoadingJobs(true);
          const token = localStorage.getItem('jwtToken');
          
          const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_BASE_URL}/api/jobs/random?limit=6`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
  
          if (response.data.success) {
            setJobs(response.data.jobs || []);
          }
        } catch (error) {
          console.error('Error fetching jobs:', error);
        } finally {
          setLoadingJobs(false);
        }
      };
  
      fetchJobs();
    }, []);
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
        {loadingJobs ? (
  <div className="flex items-center justify-center py-14">
    <div className="text-center">
      <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
      <p className="text-gray-600 text-sm font-medium">
        Loading opportunities...
      </p>
    </div>
  </div>
) : jobs.length === 0 ? (
  <div className="px-4 md:px-6 lg:px-10">
    <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
      <BriefcaseIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
      <h3 className="text-lg font-semibold text-gray-900 mb-1">
        No Jobs Available
      </h3>
      <p className="text-gray-600 text-sm">
        Check back soon for new opportunities
      </p>
    </div>
  </div>
) : (
  <div className="px-4 md:px-6 lg:px-10">
    {/* ===== Heading ===== */}
    <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
      Latest Jobs
    </h2>

    {/* ===== Job Cards Grid ===== */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {jobs.map((job, index) => (
        <div
          key={job._id}
          className="group relative animate-fade-in bg-white border border-gray-200 rounded-xl p-3 hover:shadow-lg transition-all cursor-pointer hover:-translate-y-1"
          style={{ animationDelay: `${index * 0.04}s` }}
        >
          {/* Gradient Accent */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity" />

          <JobCard job={job} viewMode="grid" />

          <div className="mt-3 pt-2 border-t border-gray-100 flex justify-end">
            <SaveButton
              jobId={job._id}
              onSaveSuccess={() =>
                console.log(`Job ${job._id} saved!`)
              }
            />
          </div>
        </div>
      ))}
    </div>
  </div>
)}


        {/* <JobBoard></JobBoard> */}
  
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
  
