import React, { useState, useEffect, useRef, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaMicrosoft, FaVideo, FaBell } from "react-icons/fa";
import { Dialog, Transition } from "@headlessui/react";
import { useGlobalContext } from "./GlobalContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loadingNotif, setLoadingNotif] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { isLoggedIn, user, setIsLoggedIn, setUser, loading } = useGlobalContext();

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("jwtToken");
    navigate("/login");
  };

  const handleProfileClick = () => navigate("/profile");

  const fetchNotifications = async () => {
    try {
      setLoadingNotif(true);
      const token = localStorage.getItem("jwtToken");

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/notifications`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data && result.data.notifications) {
          setNotifications(result.data.notifications);
        } else {
          setNotifications([]);
        }
      } else {
        setNotifications([]);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setNotifications([]);
    } finally {
      setLoadingNotif(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) fetchNotifications();
  }, [isLoggedIn]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setIsNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const hasUnreadNotifications = notifications.some((n) => !n.isRead);
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <nav className="bg-white shadow-sm p-4 relative">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <img src="/hired.png" alt="Hired" className="h-14" />

        {/* Nav Links */}
        <div className={`flex space-x-6 lg:flex ${isMenuOpen ? "block" : "hidden"} lg:block`}>
          <Link to="/home" className="text-gray-700 text-sm hover:text-blue-500">Home</Link>
          <Link to="/overview" className="text-gray-700 text-sm hover:text-blue-500">Overview</Link>
          {isLoggedIn && <Link to="/interviews" className="text-gray-700 text-sm hover:text-blue-500">Interviews</Link>}
          {isLoggedIn && <Link to="/postjob" className="text-gray-700 text-sm hover:text-blue-500">Add Job</Link>}
          {isLoggedIn && <Link to="/jobs" className="text-gray-700 text-sm hover:text-blue-500">Jobs</Link>}
          {isLoggedIn && <Link to="/AdminDashboard" className="text-gray-700 text-sm hover:text-blue-500">Admin</Link>}
        </div>

        {/* Right Section */}
        <div className="hidden lg:flex items-center space-x-4 relative">
          {isLoggedIn ? (
            <>
              {/* Notification Bell */}
              <div className="relative">
                <button
                  onClick={() => setIsNotifOpen(!isNotifOpen)}
                  className="bg-blue-100 text-blue-500 text-sm font-medium px-4 py-2 rounded-full hover:bg-blue-200 flex items-center space-x-2"
                >
                  <FaBell className="w-4 h-4" />
                  <span>Notifications</span>
                  {hasUnreadNotifications && (
                    <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {isNotifOpen && (
                  <div className="absolute right-0 mt-3 w-80 bg-white rounded-lg shadow-lg border z-50">
                    <div className="bg-red-500 text-white px-4 py-2 rounded-t-lg flex justify-between items-center">
                      <span className="font-semibold">Notifications</span>
                      <button
                        onClick={fetchNotifications}
                        className="text-white hover:text-gray-200 text-xs"
                      >
                        {loadingNotif ? "Loading..." : "Refresh"}
                      </button>
                    </div>
                    <ul className="max-h-96 overflow-y-auto">
                      {loadingNotif ? (
                        <li className="p-4 text-center text-gray-500">Loading notifications...</li>
                      ) : notifications.length === 0 ? (
                        <li className="p-4 text-center text-gray-500">No notifications yet</li>
                      ) : (
                        notifications.map((notif, index) => (
                          <li key={notif._id || index} className="p-3 border-b border-gray-100">
                            {notif.title || "Notification"}
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                )}
              </div>

              {/* Avatar + Dropdown */}
              <div className="relative">
                {loading ? (
                  <div className="h-12 w-12 rounded-full border-2 border-gray-300 bg-gray-200 animate-pulse" />
                ) : (
                  <img
                    src={user?.picture || "/default-avatar.png"}
                    alt="User Avatar"
                    className="h-12 w-12 min-w-[3rem] min-h-[3rem] rounded-full cursor-pointer border-2 border-gray-300 bg-white object-cover"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  />
                )}

                {isDropdownOpen && !loading && (
                  <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md py-2">
                    <button onClick={handleProfileClick} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left">
                      View Profile
                    </button>
                    <button onClick={handleSignOut} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left">
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <button
                className="bg-blue-100 text-blue-500 text-sm font-medium px-4 py-2 rounded-full hover:bg-blue-200"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="bg-green-100 text-green-500 text-sm font-medium px-4 py-2 rounded-full hover:bg-green-200"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
