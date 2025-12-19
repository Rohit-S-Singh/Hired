import {
  FileText,
  Upload,
  Edit3,
  Code,
  BarChart3,
  Briefcase,
  CheckCircle,
  Download,
  Sun,
  Moon
} from "lucide-react";

const Sidebar = ({
  darkMode,
  setDarkMode,
  activePage,
  setActivePage,
  sidebarOpen,
  setSidebarOpen
}) => {
  const menuItems = [
    { id: "my-resume", label: "My Resume", icon: FileText },
    { id: "upload", label: "Upload Resume", icon: Upload },
    { id: "edit", label: "Edit Resume", icon: Edit3 },
    { id: "latex", label: "LaTeX Editor", icon: Code },
    { id: "ats-score", label: "ATS Score", icon: BarChart3 },
    { id: "job-matching", label: "Job Matching", icon: Briefcase },
    { id: "job-check", label: "Job Specific Check", icon: CheckCircle },
    { id: "download", label: "Download Resume", icon: Download }
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-full w-64 border-r z-40
        ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
        transition-transform duration-300`}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6 border-b">
          <h1 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
            ResumeHub
          </h1>
          <p className="text-sm text-gray-500">Career & Placement</p>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map(item => {
            const Icon = item.icon;
            const active = activePage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActivePage(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition
                  ${
                    active
                      ? "bg-blue-600 text-white"
                      : darkMode
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
              >
                <Icon size={20} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Theme Toggle */}
        <div className="p-4 border-t">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`w-full flex justify-center gap-2 px-4 py-3 rounded-lg
              ${darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-700"}`}
          >
            {darkMode ? <Sun /> : <Moon />}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
