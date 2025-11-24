"use client";
import React, { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import axios from "axios";

export default function MentorCarousel() {
  const [mentors, setMentors] = useState([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  // Auto scroll
  useEffect(() => {
    if (!emblaApi) return;

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000);

    emblaApi.on("destroy", () => clearInterval(interval));

    return () => clearInterval(interval);
  }, [emblaApi]);

  // Fetch mentors
  const fetchMentors = useCallback(async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/mentors/get-all-mentors`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setMentors(res.data.mentors || []);
    } catch (err) {
      console.error("Error fetching mentors:", err);
    }
  }, []);

  useEffect(() => {
    fetchMentors();
  }, [fetchMentors]);

  return (
    <div className="w-full py-16 bg-gradient-to-b from-[#eceffe] to-white text-black">
      <motion.h2
        className="text-4xl font-bold text-center mb-10 text-gray-900"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Our Mentors
      </motion.h2>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {mentors.map((mentor, index) => (
            <motion.div
              key={index}
              className="flex-none w-80 mx-4 bg-white/20 backdrop-blur-xl border border-white/30 
                         rounded-3xl shadow-lg p-6 cursor-pointer
                         transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 180 }}
            >
              <div className="flex flex-col items-center">
                <div className="relative">
                  <img
                    src={mentor.avatar}
                    alt={mentor.name}
                    className="w-28 h-28 rounded-full object-cover shadow-md border-4 border-white"
                  />
                  <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full shadow"></span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mt-4">
                  {mentor.name}
                </h3>

                <span className="mt-1 px-3 py-1 text-xs font-semibold bg-purple-100 text-purple-700 rounded-full shadow-sm">
                  ⭐ Verified Mentor
                </span>

                <p className="text-center text-sm text-gray-700 mt-3">
                  {mentor.profile?.bio || "No bio available"}
                </p>
              </div>

              {mentor.profile?.expertise?.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-semibold text-sm text-gray-800 mb-2">
                    Expertise
                  </h4>

                  <div className="flex flex-wrap gap-2">
                    {mentor.profile.expertise.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gradient-to-r from-blue-100 to-blue-200 
                                   text-blue-800 rounded-full text-xs font-medium shadow-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-5 flex justify-between items-center">
                <div className="text-sm">
                  <span className="font-semibold text-gray-800">Experience: </span>
                  <span className="text-gray-700">
                    {mentor.profile?.experience || 0} yrs
                  </span>
                </div>

                <div className="text-sm">
                  <span className="font-semibold text-gray-800">Rate: </span>
                  <span className="text-purple-700 font-bold">
                    ${mentor.profile?.hourlyRate || "N/A"}/hr
                  </span>
                </div>
              </div>

              <button
                className="w-full mt-5 py-2 rounded-xl bg-purple-600 text-white font-semibold 
                           hover:bg-purple-700 shadow-md transition-all"
              >
                View Profile
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
