import { Home } from "@mui/icons-material";
const HomePage = () => {
    const problems = [
      { icon: "👥", text: "Connections to Recruiters", bg: "bg-red-100", textColor: "text-red-500" },
      { icon: "🔥", text: "Getting Interview Calls", bg: "bg-purple-100", textColor: "text-purple-500" },
      { icon: "🧰", text: "Lack of Experience and Preparation", bg: "bg-violet-100", textColor: "text-violet-500" },
      { icon: "👑", text: "Low Interview Success Rate", bg: "bg-yellow-100", textColor: "text-yellow-500" },
      { icon: "📥", text: "Job Application Tracking", bg: "bg-green-100", textColor: "text-green-500" },
      { icon: "🕒", text: "Slow Job Search Process", bg: "bg-blue-100", textColor: "text-blue-500" },
    ];
  
    return (
      <div className="bg-white text-black">
        {/* Hero Section */}
        <section className="py-20 px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Ace Your Interviews and get Hiredd</h1>
          <p className="text-lg text-gray-600 mb-8">
            Personalized mock interviews, instant feedback, and real-world questions to help you crack your dream job.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded font-semibold hover:bg-blue-700">
            Get Started for Free
          </button>
        </section>
  
        {/* Problem Cards Section */}
        <section className="py-16 bg-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">What Problems Does Hiredd Solve?</h2>
          <div className="flex flex-wrap justify-center gap-6 px-4">
            {problems.map((item, index) => (
              <div
                key={index}
                className="w-64 rounded-xl shadow-md border p-6 text-center transition hover:shadow-lg bg-white"
              >
                <div className={`w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-xl ${item.bg}`}>
                  <span className={`text-2xl ${item.textColor}`}>{item.icon}</span>
                </div>
                <p className="text-base font-medium text-gray-900">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <button className="bg-orange-500 text-white px-6 py-3 rounded font-semibold hover:bg-orange-600">
              Sign up now, it's free!
            </button>
          </div>
        </section>
      </div>
    );
  };
  
  export default HomePage;
  