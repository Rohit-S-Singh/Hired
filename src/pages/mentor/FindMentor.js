import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Briefcase, DollarSign, Calendar, CheckCircle, Star, ArrowRight, Search, Filter, Mail } from "lucide-react";
import { useGlobalContext } from "../AUTH/GlobalContext";

const FindMentor = () => {
  const [mentors, setMentors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { user } = useGlobalContext();

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

  const filteredMentors = mentors.filter(mentor => 
    searchQuery === "" || 
    mentor.expertise.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
    mentor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Connect with Expert Mentors
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Learn from experienced professionals and accelerate your career growth
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name or expertise (e.g., React, Python, Design...)"
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-slate-700"
                  />
                </div>
                <button className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-slate-900">
            {filteredMentors.length} {filteredMentors.length === 1 ? 'Mentor' : 'Mentors'} Available
          </h3>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span>Sort by:</span>
            <select className="border border-slate-300 rounded-lg px-3 py-1.5 outline-none focus:border-indigo-500">
              <option>Recommended</option>
              <option>Experience</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Mentors List */}
        {filteredMentors.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg border border-slate-200">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-lg text-slate-600">No mentors found matching your search</p>
            <button 
              onClick={() => setSearchQuery("")}
              className="mt-4 text-indigo-600 font-semibold hover:underline"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMentors.map((mentor) => (
              <div
                key={mentor._id}
                onClick={() => goToMentorDetail(mentor._id, user._id)}
                className="bg-white rounded-lg border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Profile Image */}
                    <div className="flex-shrink-0">
                      {mentor.avatar ? (
                        <img 
                          src={mentor.avatar} 
                          alt={mentor.name}
                          className="w-24 h-24 rounded-lg object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div 
                        className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center"
                        style={{ display: mentor.avatar ? 'none' : 'flex' }}
                      >
                        <User className="w-12 h-12 text-indigo-600" />
                      </div>
                    </div>

                    {/* Main Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                        <div>
                          <h4 className="text-xl font-bold text-slate-900 mb-1">
                            {mentor.name}
                          </h4>
                          <div className="flex items-center gap-2 text-slate-600 mb-3">
                            <Mail className="w-4 h-4" />
                            <span className="text-sm">{mentor.email}</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {mentor.expertise.slice(0, 4).map((skill, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium"
                              >
                                {skill}
                              </span>
                            ))}
                            {mentor.expertise.length > 4 && (
                              <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm font-medium">
                                +{mentor.expertise.length - 4}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="text-2xl font-bold text-indigo-600">
                            ${mentor.pricePerHour}<span className="text-sm font-normal text-slate-600">/hour</span>
                          </div>
                          <button className="px-5 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
                            View Profile
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Stats Row */}
                      <div className="flex flex-wrap gap-6 text-sm">
                        <div className="flex items-center gap-2 text-slate-600">
                          <Briefcase className="w-4 h-4" />
                          <span className="font-medium">{mentor.experience} years experience</span>
                        </div>
                        {mentor.completedInterviews !== undefined && (
                          <div className="flex items-center gap-2 text-slate-600">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="font-medium">{mentor.completedInterviews} sessions completed</span>
                          </div>
                        )}
                        {mentor.availability && (
                          <div className="flex items-center gap-2 text-slate-600">
                            <Calendar className="w-4 h-4" />
                            <span className="font-medium">{mentor.availability}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-slate-600">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-medium">Top Rated</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Stats Banner */}
        {mentors.length > 0 && (
          <div className="mt-12 bg-white rounded-lg border border-slate-200 p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-indigo-600 mb-2">
                  {mentors.length}+
                </div>
                <p className="text-slate-600 font-medium">Expert Mentors</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-indigo-600 mb-2">
                  {mentors.reduce((sum, m) => sum + (m.completedInterviews || 0), 0)}+
                </div>
                <p className="text-slate-600 font-medium">Sessions Completed</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-indigo-600 mb-2">
                  {Math.round(mentors.reduce((sum, m) => sum + m.experience, 0) / mentors.length)}+
                </div>
                <p className="text-slate-600 font-medium">Years Avg. Experience</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-slate-600 text-sm">
            © 2024 MentorHub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FindMentor;