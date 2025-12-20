import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Briefcase, DollarSign, Calendar, CheckCircle, Star, ArrowRight, Search } from "lucide-react";

const FindMentor = () => {
  const [mentors, setMentors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/interviews/mentors`);
      const data = await res.json();
      if (data.success) setMentors(data.mentors);
    } catch (err) {
      console.error(err);
    }
  };

  const goToMentorDetail = (mentorId, userId) => {
    navigate(`/mentor/${mentorId}?user=${userId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">Find Your Perfect Mentor</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Connect with experienced professionals who can guide your journey
          </p>
        </div>

        {/* Search Bar (Visual Only) */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by expertise, experience, or availability..."
              className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-slate-700 font-medium shadow-sm"
            />
          </div>
        </div>

        {/* Mentors Grid */}
        {mentors.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-10 h-10 text-slate-400" />
            </div>
            <p className="text-xl text-slate-600">No mentors available at the moment</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentors.map((mentor) => (
              <div
                key={mentor._id}
                onClick={() => goToMentorDetail(mentor._id, mentor.user)}
                className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer group"
              >
                {/* Card Header with Gradient */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-24 relative">
                  <div className="absolute -bottom-12 left-6">
                    <div className="w-24 h-24 bg-white rounded-2xl shadow-xl flex items-center justify-center border-4 border-white group-hover:scale-110 transition-transform duration-300">
                      <User className="w-12 h-12 text-indigo-600" />
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="pt-16 px-6 pb-6">
                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {mentor.expertise.slice(0, 3).map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold"
                      >
                        {skill}
                      </span>
                    ))}
                    {mentor.expertise.length > 3 && (
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-semibold">
                        +{mentor.expertise.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Stats Grid */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                          <Briefcase className="w-4 h-4 text-indigo-600" />
                        </div>
                        <span className="text-sm font-medium text-slate-600">Experience</span>
                      </div>
                      <span className="text-sm font-bold text-slate-900">{mentor.experience} years</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                          <DollarSign className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="text-sm font-medium text-slate-600">Price/Hour</span>
                      </div>
                      <span className="text-sm font-bold text-green-600">${mentor.pricePerHour}</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                          <Calendar className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="text-sm font-medium text-slate-600">Availability</span>
                      </div>
                      <span className="text-sm font-bold text-slate-900">{mentor.availability}</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="text-sm font-medium text-green-800">Completed</span>
                      </div>
                      <span className="text-sm font-bold text-green-900">{mentor.completedInterviews} sessions</span>
                    </div>
                  </div>

                  {/* View Profile Button */}
                  <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group-hover:gap-3">
                    <span>View Profile</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            ))}
          </div>
        )}

        {/* Stats Banner */}
        {mentors.length > 0 && (
          <div className="mt-16 bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="w-8 h-8 text-indigo-600" />
                </div>
                <p className="text-3xl font-bold text-slate-900 mb-1">{mentors.length}</p>
                <p className="text-slate-600 font-medium">Expert Mentors</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-3xl font-bold text-slate-900 mb-1">
                  {mentors.reduce((sum, m) => sum + m.completedInterviews, 0)}
                </p>
                <p className="text-slate-600 font-medium">Total Sessions</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="w-8 h-8 text-yellow-600" />
                </div>
                <p className="text-3xl font-bold text-slate-900 mb-1">
                  {Math.round(mentors.reduce((sum, m) => sum + m.experience, 0) / mentors.length)}
                </p>
                <p className="text-slate-600 font-medium">Avg. Experience (Years)</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindMentor;