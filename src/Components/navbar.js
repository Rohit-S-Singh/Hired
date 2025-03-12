import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import profile from "../assets/profile.png";
import { FaGoogle, FaMicrosoft, FaVideo } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null); // Reference for the dropdown

  // Function to handle sign out
  const handleSignOut = () => {
    console.log("Signing out...");
    navigate("/logout");
  };

  // Function to handle profile click
  const handleProfileClick = () => {
    navigate("/profile");
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  // Close the dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false); // Close the dropdown if clicked outside
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <nav className="bg-white shadow-sm p-4 relative">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <img
            src="/path-to-your-logo.png"
            alt="Job Buddy Logo"
            className="h-8"
          />
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="lg:hidden">
          <button
            className="text-gray-700 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>

        {/* Nav Links */}
        <div className={`flex space-x-6 lg:flex ${isMenuOpen ? "block" : "hidden"} lg:block`}>
          <Link to="/overview" className="text-gray-700 text-sm hover:text-blue-500">
            Overview
          </Link>
          <Link to="/application-status" className="text-gray-700 text-sm hover:text-blue-500">
            Application Status
          </Link>
          <Link to="/interviews" className="text-gray-700 text-sm hover:text-blue-500">
           Interviews
          </Link>
          <Link to="/upskill" className="text-gray-700 text-sm hover:text-blue-500">
            Upskill
          </Link>
          <Link to="/tools" className="text-gray-700 text-sm hover:text-blue-500">
            Tools
          </Link>
          <Link to="/blog" className="text-gray-700 text-sm hover:text-blue-500">
            Blog
          </Link>
        </div>

        {/* Post Job and Profile Section */}
        <div className="hidden lg:flex items-center space-x-4">
          <button
            className="bg-blue-100 text-blue-500 text-sm font-medium px-4 py-2 rounded-full hover:bg-blue-200"
            onClick={() => setIsModalOpen(true)}
          >
            + Schedule a mock Interview
          </button>
          <div className="relative">
            <img
              src={profile}
              alt="User Avatar"
              className="h-8 w-8 rounded-full cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            />
            <span
              className="ml-2 text-gray-700 text-sm cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              
            </span>

            {/* Dropdown */}
            {isDropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md py-2"
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
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4">
            <Link
              to="/overview"
              className="block px-4 py-2 text-gray-700 text-sm hover:bg-gray-200"
            >
              Overview
            </Link>
            <Link
              to="/application-status"
              className="block px-4 py-2 text-gray-700 text-sm hover:bg-gray-200"
            >
              Application Status
            </Link>
            <Link
              to="/interviews"
              className="block px-4 py-2 text-gray-700 text-sm hover:bg-gray-200"
            >
              Interviews
            </Link>
            <Link
              to="/upskill"
              className="block px-4 py-2 text-gray-700 text-sm hover:bg-gray-200"
            >
              Upskill
            </Link>
            <Link
              to="/tools"
              className="block px-4 py-2 text-gray-700 text-sm hover:bg-gray-200"
            >
              Tools
            </Link>
            <Link
              to="/blog"
              className="block px-4 py-2 text-gray-700 text-sm hover:bg-gray-200"
            >
              Blog
            </Link>
            <button
              className="block bg-blue-100 text-blue-500 text-sm font-medium w-full text-left px-4 py-2 rounded-full hover:bg-blue-200 mt-2"
              onClick={() => setIsModalOpen(true)}
            >
              + Schedule a mock Interview
            </button>
            <div className="relative flex items-center mt-4">
              <img
                src={profile}
                alt="User Avatar"
                className="h-8 w-8 rounded-full"
              />
              <span className="ml-2 text-gray-700 text-sm">User</span>
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md py-2">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  View Profile
                </Link>
                <Link
                  to="/logout"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsModalOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Schedule New Interview
                  </Dialog.Title>
                  <div className="mt-2">
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Choose a person
                        </label>
                        <input
                          type="text"
                          className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Interview Type
                        </label>
                        <select className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                          <option>Paid</option>
                          <option>Unpaid</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Select Time & Duration
                        </label>
                        <input
                          type="datetime-local"
                          className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Select Channel
                        </label>
                        <div className="mt-2 flex items-center space-x-4">
                          <button className="flex items-center bg-gray-100 p-2 rounded-lg">
                            <FaGoogle className="mr-2 text-green-500" /> Google Meet
                          </button>
                          <button className="flex items-center bg-gray-100 p-2 rounded-lg">
                            <FaMicrosoft className="mr-2 text-blue-500" /> Teams
                          </button>
                          <button className="flex items-center bg-gray-100 p-2 rounded-lg">
                            <FaVideo className="mr-2 text-red-500" /> Zoom
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Your Name
                        </label>
                        <input
                          type="text"
                          className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Your Email
                        </label>
                        <input
                          type="email"
                          className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Upload Attachments
                        </label>
                        <input
                          type="file"
                          className="mt-1 block w-full text-sm text-gray-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-md file:border-0
                          file:text-sm file:font-semibold
                          file:bg-blue-50 file:text-blue-700
                          hover:file:bg-blue-100"
                        />
                      </div>
                    </form>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Schedule Interview
                    </button>
                    <button
                      type="button"
                      className="ml-2 inline-flex justify-center rounded-md border border-transparent bg-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </button>
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
