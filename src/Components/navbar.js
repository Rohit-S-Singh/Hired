import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBell, FaCoins } from "react-icons/fa";
import { useGlobalContext } from "../pages/AUTH/GlobalContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [coins, setCoins] = useState(0);
  const [loadingNotif, setLoadingNotif] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { isLoggedIn, user, setIsLoggedIn, setUser, loading } = useGlobalContext();

  // Role and status checks
  const isAdmin = user?.role === "admin";
  const isUser = user?.role === "user";
  const isMentorApproved = user?.mentorStatus === "approved";
  const isRecruiterApproved = user?.recruiterStatus === "Approved";

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

  const fetchCoins = async () => {
    try {
      setLoadingNotif(true);
      const token = localStorage.getItem("jwtToken");

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/coins/balance`,
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
        if (result.success && result.data) {
          setCoins(result.data.balance);
        } else {
          setCoins(0);
        }
      } else {
        setCoins(0);
      }
    } catch (error) {
      console.error("Error fetching coins:", error);
      setCoins(0);
    } finally {
      setLoadingNotif(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchNotifications();
      fetchCoins();
    }
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
        <Link to="/home" className="flex items-center gap-2">
          <img src="/hired.png" alt="Hired" className="h-14 cursor-pointer" />

          {user?.isPremium && (
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
              PREMIUM
            </span>
          )}
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Nav Links */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } lg:flex lg:space-x-6 absolute lg:relative top-full left-0 right-0 lg:top-auto bg-white lg:bg-transparent shadow-lg lg:shadow-none p-4 lg:p-0 z-40`}
        >
          {isLoggedIn && (
            <>
              {/* Common links for all logged-in users */}
              <Link
                to="/home"
                className="block lg:inline-block text-gray-700 text-sm hover:text-blue-500 py-2 lg:py-0"
              >
                Home
              </Link>
              <Link
                to="/overview"
                className="block lg:inline-block text-gray-700 text-sm hover:text-blue-500 py-2 lg:py-0"
              >
                Overview
              </Link>
              <Link
                to="/interviews"
                className="block lg:inline-block text-gray-700 text-sm hover:text-blue-500 py-2 lg:py-0"
              >
                Interviews
              </Link>
              <Link
                to="/jobs"
                className="block lg:inline-block text-gray-700 text-sm hover:text-blue-500 py-2 lg:py-0"
              >
                Jobs
              </Link>
              <Link
                to="/resume-upload"
                className="block lg:inline-block text-gray-700 text-sm hover:text-blue-500 py-2 lg:py-0"
              >
                Resume
              </Link>

            <Link
                  to="/AdminDashboard"
                  className="block lg:inline-block text-gray-700 text-sm hover:text-blue-500 py-2 lg:py-0"
                >
                  Admin
                </Link>

              {/* Admin Dashboard - Only for admin role */}
              {isAdmin && (
                <Link
                  to="/AdminDashboard"
                  className="block lg:inline-block text-gray-700 text-sm hover:text-blue-500 py-2 lg:py-0"
                >
                  Admin
                </Link>
              )}

              {/* Mentor Dashboard & Add Job - Only for approved mentors */}
              {isMentorApproved && (
                <>
                  <Link
                    to="/MentorDashboard-interview"
                    className="block lg:inline-block text-gray-700 text-sm hover:text-blue-500 py-2 lg:py-0"
                  >
                    Mentor Dashboard
                  </Link>
                  <Link
                    to="/post-job"
                    className="block lg:inline-block text-gray-700 text-sm hover:text-blue-500 py-2 lg:py-0"
                  >
                    Add Job
                  </Link>
                </>
              )}
            </>
          )}
        </div>

        {/* Right Section */}
        <div className="hidden lg:flex items-center space-x-4 relative">
          {isLoggedIn ? (
            <>
              {/* ================= NOTIFICATION ================= */}
              <div className="relative">
                <button
                  onClick={() => setIsNotifOpen(!isNotifOpen)}
                  className="h-12 w-12 flex items-center justify-center rounded-full border bg-white hover:bg-gray-100 relative"
                >
                  <FaBell className="w-6 h-6 text-blue-500" />

                  {/* Number Badge */}
                  {hasUnreadNotifications && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notification Dropdown */}
                {isNotifOpen && (
                  <div
                    className="absolute right-0 mt-3 w-96 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 
               animate-[fadeIn_0.15s_ease-out]"
                    style={{ animationFillMode: "forwards" }}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between px-5 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-t-xl">
                      <h3 className="text-sm font-semibold tracking-wide">
                        Notifications
                      </h3>
                      <button
                        onClick={fetchNotifications}
                        className="text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded transition"
                      >
                        {loadingNotif ? "Loading..." : "Refresh"}
                      </button>
                    </div>

                    {/* List */}
                    <div className="max-h-96 overflow-y-auto divide-y divide-gray-100 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                      {loadingNotif ? (
                        <div className="p-6 text-center text-gray-500">
                          Loading...
                        </div>
                      ) : notifications.length === 0 ? (
                        <div className="p-6 text-center text-gray-400">
                          <img
                            src="/empty-bell.png"
                            alt=""
                            className="h-16 mx-auto mb-3 opacity-70"
                          />
                          No notifications yet
                        </div>
                      ) : (
                        notifications.map((notif, i) => (
                          <div
                            key={notif._id || i}
                            className={`px-5 py-4 transition group hover:bg-gray-50 cursor-pointer
                        ${!notif.isRead ? "bg-blue-50" : "bg-white"}`}
                          >
                            <div className="flex items-start space-x-3">
                              {/* Unread dot */}
                              {!notif.isRead && (
                                <span className="h-2.5 w-2.5 bg-blue-500 rounded-full mt-1.5"></span>
                              )}

                              <div className="flex-1">
                                <p className="text-sm text-gray-700 group-hover:text-gray-900">
                                  {notif.message || "Notification"}
                                </p>

                                {notif.timestamp && (
                                  <p className="text-xs text-gray-400 mt-1">
                                    {new Date(notif.timestamp).toLocaleString()}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* ================= COINS ================= */}
              <div className="h-12 w-12 flex flex-col items-center justify-center rounded-full border bg-white select-none cursor-default">
                <FaCoins className="w-5 h-5 text-yellow-500" />
                <span className="text-xs font-semibold">{coins}</span>
              </div>

              {/* ================= PROFILE AVATAR ================= */}
              <div className="relative">
                {loading ? (
                  <div className="h-12 w-12 rounded-full border bg-gray-200 animate-pulse" />
                ) : (
                  <img
                    src={user?.picture || "/default-avatar.png"}
                    alt="User Avatar"
                    className="h-12 w-12 rounded-full border object-cover cursor-pointer bg-white"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  />
                )}

                {isDropdownOpen && !loading && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md py-2 z-50"
                  >
                    <button
                      onClick={handleProfileClick}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={handleSignOut}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
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
