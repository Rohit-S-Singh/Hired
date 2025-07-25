import React, { useState, useEffect, useRef, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import profile from "../assets/profile.png";
import { FaGoogle, FaMicrosoft, FaVideo, FaBell } from "react-icons/fa";
import { Dialog, Transition } from "@headlessui/react";
import { useGlobalContext } from "./GlobalContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { isLoggedIn, user, setIsLoggedIn, setUser } = useGlobalContext();

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setUser(null);
    navigate("/login");
  };

  console.log("Userr̥",user)

  const handleProfileClick = () => {
    navigate("/profile");
  };

  // Dummy notifications
  const notifications = [
    {
      id: 1,
      name: "Brigid Dawson",
      message: "followed you",
      time: "4 hours ago",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
      id: 2,
      name: "John Dwyer",
      message: "liked your post",
      time: "Yesterday",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    },
  ];

  const hasUnreadNotifications = notifications.length > 0;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
        setIsNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-sm p-4 relative">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <img src="/hired.png" alt="Hired" className="h-14" />

        {/* Nav Links */}
        <div className={`flex space-x-6 lg:flex ${isMenuOpen ? "block" : "hidden"} lg:block`}>
          <Link to="/home" className="text-gray-700 text-sm hover:text-blue-500">Home</Link>
          <Link to="/overview" className="text-gray-700 text-sm hover:text-blue-500">Overview</Link>
          {isLoggedIn && <Link to="/postjob" className="text-gray-700 text-sm hover:text-blue-500">Add Job</Link>}
          {isLoggedIn && <Link to="/jobs" className="text-gray-700 text-sm hover:text-blue-500">Jobs</Link>}
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
                      {notifications.length}
                    </span>
                  )}
                </button>

                {isNotifOpen && (
                  <div className="absolute right-0 mt-3 w-80 bg-white rounded-lg shadow-lg border z-50">
                    <div className="bg-red-500 text-white px-4 py-2 rounded-t-lg flex justify-between items-center">
                      <span className="font-semibold">Notifications</span>
                    </div>
                    <ul className="max-h-96 overflow-y-auto">
                      {notifications.map((notif) => (
                        <li key={notif.id} className="flex items-start gap-3 p-3 hover:bg-gray-100">
                          <img
                            src={notif.avatar}
                            alt={notif.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div className="text-sm text-gray-700">
                            <span className="font-semibold">{notif.name}</span> {notif.message}
                            <div className="text-xs text-gray-500">{notif.time}</div>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="text-center text-teal-500 text-sm font-medium py-2 border-t hover:underline cursor-pointer">
                      See all recent activity
                    </div>
                  </div>
                )}
              </div>

              {/* Avatar + Dropdown */}
              <div className="relative">
                <img
                  src={user?.picture && typeof user.picture === 'string' && user.picture.trim() !== '' ? user.picture : 'https://ui-avatars.com/api/?name=User&background=random'}
                  alt="User Avatar"
                  className="h-12 w-12 min-w-[3rem] min-h-[3rem] rounded-full cursor-pointer border-2 border-gray-300 bg-white object-cover"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                />
                {isDropdownOpen && (
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

      {/* Schedule Modal */}
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsModalOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
            leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100"
                leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Schedule New Interview
                  </Dialog.Title>
                  <form className="mt-4 space-y-4">
                    <input type="text" placeholder="Choose a person" className="w-full p-2 border rounded" />
                    <select className="w-full p-2 border rounded">
                      <option>Paid</option>
                      <option>Unpaid</option>
                    </select>
                    <input type="datetime-local" className="w-full p-2 border rounded" />
                    <div className="flex space-x-4">
                      <button className="bg-gray-100 p-2 rounded flex items-center"><FaGoogle className="mr-2" /> Google Meet</button>
                      <button className="bg-gray-100 p-2 rounded flex items-center"><FaMicrosoft className="mr-2" /> Teams</button>
                      <button className="bg-gray-100 p-2 rounded flex items-center"><FaVideo className="mr-2" /> Zoom</button>
                    </div>
                    <input type="text" placeholder="Your Name" className="w-full p-2 border rounded" />
                    <input type="email" placeholder="Your Email" className="w-full p-2 border rounded" />
                    <input type="file" className="w-full p-2 border rounded" />
                  </form>
                  <div className="mt-4 flex justify-end space-x-2">
                    <button onClick={() => setIsModalOpen(false)} className="bg-blue-600 text-white px-4 py-2 rounded">Schedule Interview</button>
                    <button onClick={() => setIsModalOpen(false)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded">Cancel</button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </nav>
  );
};

export default Navbar;
