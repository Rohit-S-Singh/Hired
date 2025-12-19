import { Menu, X } from "lucide-react";

const MobileHeader = ({ darkMode, sidebarOpen, setSidebarOpen }) => {
  return (
    <div
      className={`lg:hidden fixed top-0 left-0 right-0 z-50 px-4 py-3 flex justify-between items-center border-b
      ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
    >
      <h1 className={`text-xl font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
        Resume Dashboard
      </h1>

      <button onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  );
};

export default MobileHeader;
