import React, { useState, useEffect, useRef, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import profile from "../assets/profile.png";
import { FaGoogle, FaMicrosoft, FaVideo } from "react-icons/fa";
import { Dialog, Transition } from "@headlessui/react";
import { useGlobalContext } from "./GlobalContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const { isLoggedIn, user, setIsLoggedIn, setUser } = useGlobalContext();

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setUser(null);
    navigate("/login");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-sm p-4 relative">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src="/hired.png" alt={process.env.APP_NAME} className="h-14" />
        </div>

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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

        <div className={`flex space-x-6 lg:flex ${isMenuOpen ? "block" : "hidden"} lg:block`}>
          <Link to="/home" className="text-gray-700 text-sm hover:text-blue-500">Home</Link>
          <Link to="/overview" className="text-gray-700 text-sm hover:text-blue-500">Overview</Link>
          <Link to="/application-status" className="text-gray-700 text-sm hover:text-blue-500">Application Status</Link>
          <Link to="/interviews" className="text-gray-700 text-sm hover:text-blue-500">Interviews</Link>
          <Link to="/upskill" className="text-gray-700 text-sm hover:text-blue-500">Upskill</Link>
          <Link to="/tools" className="text-gray-700 text-sm hover:text-blue-500">Tools</Link>
          <Link to="/blog" className="text-gray-700 text-sm hover:text-blue-500">Blog</Link>
        </div>

        <div className="hidden lg:flex items-center space-x-4">
          {isLoggedIn ? (
            <>
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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4">
            <Link to="/overview" className="block px-4 py-2 text-gray-700 text-sm hover:bg-gray-200">Overview</Link>
            <Link to="/application-status" className="block px-4 py-2 text-gray-700 text-sm hover:bg-gray-200">Application Status</Link>
            <Link to="/interviews" className="block px-4 py-2 text-gray-700 text-sm hover:bg-gray-200">Interviews</Link>
            <Link to="/upskill" className="block px-4 py-2 text-gray-700 text-sm hover:bg-gray-200">Upskill</Link>
            <Link to="/tools" className="block px-4 py-2 text-gray-700 text-sm hover:bg-gray-200">Tools</Link>
            <Link to="/blog" className="block px-4 py-2 text-gray-700 text-sm hover:bg-gray-200">Blog</Link>

            {isLoggedIn && (
              <>
                <button
                  className="block bg-blue-100 text-blue-500 text-sm font-medium w-full text-left px-4 py-2 rounded-full hover:bg-blue-200 mt-2"
                  onClick={() => setIsModalOpen(true)}
                >
                  + Schedule a mock Interview
                </button>
                <div className="relative flex items-center mt-4">
                  <img src={profile} alt="User Avatar" className="h-8 w-8 rounded-full" />
                  <span className="ml-2 text-gray-700 text-sm">{user?.username || "User"}</span>
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md py-2">
                    <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">View Profile</Link>
                    <button onClick={handleSignOut} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Logout</button>
                  </div>
                </div>
              </>
            )}
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
