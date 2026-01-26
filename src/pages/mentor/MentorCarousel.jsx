import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Briefcase, Star, ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useGlobalContext } from "../AUTH/GlobalContext";
import toast, { Toaster } from 'react-hot-toast';

const MentorCarousel = () => {
  const { user: loggedInUser } = useGlobalContext();
  const navigate = useNavigate();
  
  const [mentors, setMentors] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [interviewDetails, setInterviewDetails] = useState({
    date: "",
    day: "",
    time: "",
    duration: "",
    message: "",
    additionalDetails: "",
  });

  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/mentors/show-all-mentor`);
      const data = await res.json();
      if (data.success) setMentors(data.mentors);
    } catch (err) {
      console.error(err);
    }
  };

  const goToMentorDetail = (mentorId, userId) => {
    navigate(`/mentor/${mentorId}?user=${userId}`);
  };

  const openModal = (mentor) => {
    setSelectedMentor(mentor);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMentor(null);
    setInterviewDetails({
      date: "",
      day: "",
      time: "",
      duration: "",
      message: "",
      additionalDetails: "",
    });
    document.body.style.overflow = 'unset';
  };

  const handleChange = (e) => {
    setInterviewDetails({ ...interviewDetails, [e.target.name]: e.target.value });
  };

  const submitInterviewRequest = async () => {
    if (!loggedInUser) {
      toast.error("You must be logged in to request an interview", {
        duration: 4000,
        icon: '🔒',
      });
      return;
    }

    if (!interviewDetails.date || !interviewDetails.time || !interviewDetails.message) {
      toast.error("Please fill in date, time, and message fields", {
        duration: 3000,
      });
      return;
    }

    const payload = {
      mentor: selectedMentor._id,
      user: loggedInUser._id,
      ...interviewDetails
    };

    try {
      setSubmitting(true);
      
      const res = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/interviews/request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Interview request sent successfully!", {
          duration: 4000,
          icon: '✅',
        });
        
        closeModal();
      } else {
        toast.error(data.message || "Failed to send request", {
          duration: 4000,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong! Please try again.", {
        duration: 4000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const nextSlide = () => {
    if (currentIndex < mentors.length - 4) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  if (mentors.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <User className="w-8 h-8 text-slate-400" />
          </div>
          <p className="text-lg text-slate-600">Loading mentors...</p>
        </div>
      </div>
    );
  }

  const canScrollLeft = currentIndex > 0;
  const canScrollRight = currentIndex < mentors.length - 4;

  return (
    <div className="min-h-screen bg-white">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
            padding: '16px',
            borderRadius: '8px',
          },
          success: {
            duration: 4000,
            style: {
              background: '#10b981',
            },
          },
          error: {
            duration: 4000,
            style: {
              background: '#ef4444',
            },
          },
        }}
      />

      {/* Carousel Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative">
          {/* Cards Container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mentors.slice(currentIndex, currentIndex + 4).map((mentor) => (
              <div
                key={mentor._id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 flex flex-col border border-slate-100"
                style={{ height: '600px' }}
              >
                {/* Image Section - 60% height */}
                <div className="relative overflow-hidden" style={{ height: '60%' }}>
                  {mentor.avatar ? (
                    <img 
                      src={mentor.avatar} 
                      alt={mentor.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&h=500&fit=crop';
                      }}
                    />
                  ) : (
                    <img 
                      src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&h=500&fit=crop"
                      alt={mentor.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  )}
                  
                  {/* Overlay Brand/Name */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                    <h3 className="text-white text-2xl font-bold text-center drop-shadow-2xl">
                      {mentor.name}
                    </h3>
                  </div>

                  {/* Top Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-semibold text-slate-700">Top Rated</span>
                    </div>
                  </div>
                </div>

                {/* Details Section - 40% height */}
                <div className="p-6 flex flex-col justify-between" style={{ height: '40%' }}>
                  <div>
                    {/* Expertise Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {mentor.expertise.slice(0, 3).map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-semibold border border-indigo-100"
                        >
                          {skill}
                        </span>
                      ))}
                      {mentor.expertise.length > 3 && (
                        <span className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-semibold border border-slate-200">
                          +{mentor.expertise.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="space-y-2 text-sm text-slate-600 mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                          <Briefcase className="w-4 h-4 text-indigo-600" />
                        </div>
                        <span className="font-medium">{mentor.experience} years experience</span>
                      </div>
                      {mentor.completedInterviews !== undefined && (
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                            <Star className="w-4 h-4 text-green-600 fill-green-600" />
                          </div>
                          <span className="font-medium">{mentor.completedInterviews} sessions completed</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Price and CTA */}
                  <div className="pt-3 border-t border-slate-200">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                          ${mentor.pricePerHour}
                        </div>
                        <div className="text-xs text-slate-500 font-medium">per hour</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal(mentor);
                        }}
                        className="flex-1 px-3 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-indigo-800 transition-all duration-300 shadow-md hover:shadow-lg text-xs whitespace-nowrap"
                      >
                        Schedule Interview
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          goToMentorDetail(mentor._id, loggedInUser?._id);
                        }}
                        className="px-3 py-2.5 border-2 border-indigo-600 text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 transition-all duration-300 flex items-center justify-center flex-shrink-0 w-12"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          {mentors.length > 4 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevSlide();
                }}
                disabled={!canScrollLeft}
                className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-xl hover:shadow-2xl transition-all duration-200 z-10 ${
                  !canScrollLeft ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-100'
                }`}
                aria-label="Previous"
              >
                <ChevronLeft className="w-6 h-6 text-slate-700" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextSlide();
                }}
                disabled={!canScrollRight}
                className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-xl hover:shadow-2xl transition-all duration-200 z-10 ${
                  !canScrollRight ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-100'
                }`}
                aria-label="Next"
              >
                <ChevronRight className="w-6 h-6 text-slate-700" />
              </button>
            </>
          )}
        </div>

        {/* Dots Indicator */}
        {mentors.length > 4 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: Math.ceil(mentors.length - 3) }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 rounded-full ${
                  currentIndex === idx
                    ? 'w-8 h-3 bg-indigo-600'
                    : 'w-3 h-3 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to page ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </main>

      {/* Interview Request Modal */}
      {isModalOpen && selectedMentor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                  {selectedMentor.avatar ? (
                    <img 
                      src={selectedMentor.avatar} 
                      alt={selectedMentor.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Schedule Interview</h2>
                  <p className="text-sm text-gray-600">{selectedMentor.name}</p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={interviewDetails.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Day of Week
                  </label>
                  <input
                    type="text"
                    name="day"
                    placeholder="e.g., Monday"
                    value={interviewDetails.day}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Time *
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={interviewDetails.time}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration
                  </label>
                  <select
                    name="duration"
                    value={interviewDetails.duration}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  >
                    <option value="">Select duration</option>
                    <option value="30 minutes">30 minutes</option>
                    <option value="1 hour">1 hour</option>
                    <option value="1.5 hours">1.5 hours</option>
                    <option value="2 hours">2 hours</option>
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Message *
                </label>
                <textarea
                  name="message"
                  placeholder="Introduce yourself and explain what you'd like to discuss..."
                  value={interviewDetails.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Details
                </label>
                <textarea
                  name="additionalDetails"
                  placeholder="Any other information you'd like to share..."
                  value={interviewDetails.additionalDetails}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
                />
              </div>

              {/* Price Info */}
              <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Session Rate:</span>
                  <span className="text-2xl font-bold text-indigo-600">${selectedMentor.pricePerHour}/hour</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={closeModal}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={submitInterviewRequest}
                  disabled={submitting}
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-medium py-3 rounded-lg hover:from-indigo-700 hover:to-indigo-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    'Send Request'
                  )}
                </button>
              </div>
              
              <p className="mt-3 text-sm text-gray-500 text-center">
                * Required fields
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorCarousel;