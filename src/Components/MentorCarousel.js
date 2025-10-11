"use client";
import React, { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import axios from "axios";

export default function MentorCarousel() {
  const [mentors, setMentors] = useState([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  // Auto-scroll effect
  useEffect(() => {
    if (!emblaApi) return;
    let interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000); // Auto scroll every 3s
    return () => clearInterval(interval);
  }, [emblaApi]);

  // Fetch mentors
  const fetchMentors = useCallback(async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/get-all-mentors`, {
        headers: { "Content-Type": "application/json" },
      });
      setMentors(res.data || []);
    } catch (err) {
      console.error("Error fetching mentors:", err);
    }
  }, []);

  useEffect(() => {
    fetchMentors();
  }, [fetchMentors]);

  return (
    <div className="w-full py-10 bg-white text-black">
      <h2 className="text-3xl font-bold text-center mb-6">Our Mentors</h2>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {mentors.map((mentor, index) => (
            <motion.div
              key={index}
              className="flex-none w-80 mx-4 bg-gray-100 rounded-2xl shadow-md p-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src={mentor.avatar}
                alt={mentor.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-lg font-semibold text-center">{mentor.name}</h3>
              <p className="text-center text-sm text-gray-600">
                {mentor.profile?.bio}
              </p>

              <div className="mt-3">
                <h4 className="font-semibold text-sm mb-1">Expertise:</h4>
                <div className="flex flex-wrap gap-2">
                  {mentor.profile?.expertise?.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <p className="mt-3 text-sm text-gray-700">
                <strong>Experience:</strong> {mentor.profile?.experience} yrs
              </p>

              <p className="text-sm text-gray-700">
                <strong>Hourly Rate:</strong> ${mentor.profile?.hourlyRate}/hr
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
