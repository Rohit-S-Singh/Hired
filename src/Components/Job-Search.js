import React, { useState } from 'react';
import { Briefcase, MapPin, DollarSign, Clock, Building, Users, Calendar, Mail } from 'lucide-react';

export default function JobDetailsPage() {
  const [jobData, setJobData] = useState({
    title: 'Senior Frontend Developer',
    company: 'TechCorp Solutions',
    location: 'San Francisco, CA',
    salary: '$120,000 - $160,000',
    type: 'Full-time',
    experience: '5+ years',
    posted: '2 days ago',
    applicants: '47 applicants',
    description: 'We are looking for an experienced Frontend Developer to join our dynamic team. You will be responsible for building and maintaining high-quality web applications using modern JavaScript frameworks.',
    responsibilities: [
      'Develop and maintain responsive web applications using React.js',
      'Collaborate with designers and backend developers to implement new features',
      'Write clean, maintainable, and well-documented code',
      'Optimize applications for maximum speed and scalability',
      'Participate in code reviews and mentor junior developers'
    ],
    requirements: [
      'Bachelor\'s degree in Computer Science or related field',
      '5+ years of experience with React.js and modern JavaScript',
      'Strong understanding of HTML5, CSS3, and responsive design',
      'Experience with state management libraries (Redux, Zustand)',
      'Excellent problem-solving and communication skills'
    ],
    benefits: [
      'Competitive salary and equity package',
      'Health, dental, and vision insurance',
      'Flexible work hours and remote options',
      '401(k) with company match',
      'Professional development budget',
      'Unlimited PTO'
    ],
    contact: 'careers@techcorp.com'
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{jobData.title}</h1>
              <div className="flex items-center text-gray-600 mb-3">
                <Building className="w-5 h-5 mr-2" />
                <span className="text-lg font-medium">{jobData.company}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                Apply Now
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition">
                Save
              </button>
            </div>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="flex items-center text-gray-700">
              <MapPin className="w-5 h-5 mr-2 text-blue-600" />
              <span>{jobData.location}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <DollarSign className="w-5 h-5 mr-2 text-green-600" />
              <span>{jobData.salary}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Clock className="w-5 h-5 mr-2 text-purple-600" />
              <span>{jobData.type}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Briefcase className="w-5 h-5 mr-2 text-orange-600" />
              <span>{jobData.experience}</span>
            </div>
          </div>

          <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              <span>Posted {jobData.posted}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Users className="w-4 h-4 mr-2" />
              <span>{jobData.applicants}</span>
            </div>
          </div>
        </div>

        {/* Job Description */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Description</h2>
          <p className="text-gray-700 leading-relaxed">{jobData.description}</p>
        </div>

        {/* Responsibilities */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Responsibilities</h2>
          <ul className="space-y-3">
            {jobData.responsibilities.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Requirements */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h2>
          <ul className="space-y-3">
            {jobData.requirements.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-block w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Benefits */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Benefits & Perks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {jobData.benefits.map((item, index) => (
              <div key={index} className="flex items-start">
                <span className="inline-block w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
          <div className="flex items-center text-gray-700">
            <Mail className="w-5 h-5 mr-3 text-blue-600" />
            <a href={`mailto:${jobData.contact}`} className="text-blue-600 hover:underline">
              {jobData.contact}
            </a>
          </div>
        </div>

        {/* Bottom Action */}
        <div className="mt-8 flex justify-center">
          <button className="bg-blue-600 text-white px-12 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition shadow-lg">
            Apply for this Position
          </button>
        </div>
      </div>
    </div>
  );
}