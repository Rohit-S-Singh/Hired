import React, { useState } from "react";

import Sidebar from "./Sidebar";
import MobileHeader from "./MobileHeader";

import MyResume from "./MyResume";
import UploadResume from "./UploadResume";
import EditResume from "./EditResume";
import LaTeXEditor from "./LaTeXEditor";
import ATSScore from "./ATSScore";
import JobMatching from "./JobMatching";
import JobSpecificCheck from "./JobSpecificCheck";
import DownloadResume from "./DownloadResume";

const ResumeDashboard = () => {
  const [activePage, setActivePage] = useState("my-resume");
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activePage) {
      case "upload": return <UploadResume darkMode={darkMode} />;
      case "edit": return <EditResume darkMode={darkMode} />;
      case "latex": return <LaTeXEditor darkMode={darkMode} />;
      case "ats-score": return <ATSScore darkMode={darkMode} />;
      case "job-matching": return <JobMatching darkMode={darkMode} />;
      case "job-check": return <JobSpecificCheck darkMode={darkMode} />;
      case "download": return <DownloadResume darkMode={darkMode} />;
      default: return <MyResume darkMode={darkMode} />;
    }
  };

  return (
    <div className={`${darkMode ? "bg-gray-900" : "bg-gray-50"} min-h-screen`}>
      <MobileHeader
        darkMode={darkMode}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <Sidebar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        activePage={activePage}
        setActivePage={setActivePage}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0 p-6">
        {renderContent()}
      </main>
    </div>
  );
};

export default ResumeDashboard;
