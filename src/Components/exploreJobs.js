import React from "react";

const JobCategories = () => {
  const categories = [
    {
      name: "Frontend Development",
      jobs: 205,
      icon: "https://via.placeholder.com/40",
    },
    {
      name: "Backend Development",
      jobs: 400,
      icon: "https://via.placeholder.com/40",
    },
    {
      name: "Full Stack Development",
      jobs: 205,
      icon: "https://via.placeholder.com/40",
    },
    {
      name: "AI Engineering",
      jobs: 205,
      icon: "https://via.placeholder.com/40",
    },
    {
      name: "Human Resource and TA",
      jobs: 205,
      icon: "https://via.placeholder.com/40",
    },
    {
      name: "UI Designing",
      jobs: 205,
      icon: "https://via.placeholder.com/40",
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto text-center">
        {/* Header */}
        <div className="mb-8">
          <span className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-medium">
            Grab Your Dream Jobs
          </span>
          <h2 className="text-4xl font-extrabold mt-4 text-gray-800">
            Explore Jobs Category
          </h2>
          <p className="text-gray-500 mt-2">
            Here are some broad job categories along with examples of specific
            roles within each category.
          </p>
        </div>

        {/* Job Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          {categories.map((category) => (
            <div
              key={category.name}
              className="bg-white shadow-md rounded-lg p-6"
            >
              <div className="flex items-center mb-4">
                <img
                  src={category.icon}
                  alt={`${category.name} Icon`}
                  className="mr-4"
                />
                <h3 className="text-xl font-semibold text-gray-700">
                  {category.name}
                </h3>
              </div>
              <p className="text-gray-500">{category.jobs} Jobs Available</p>
            </div>
          ))}
        </div>

        {/* Explore More Button */}
        <div className="mt-12">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition">
            Explore More Categories
          </button>
        </div>
      </div>
    </section>
  );
};

export default JobCategories;
