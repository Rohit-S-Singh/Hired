import React, { useState } from "react";
import { FaGoogle, FaMicrosoft, FaVideo } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const Interview = () => {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">Annette Black</h1>
          <p className="text-gray-600">annette@gmail.com</p>
        </div>
        <button
          className="bg-blue-600 text-white p-2 rounded-md flex items-center"
          onClick={openModal}
        >
          <FiPlus className="mr-2" /> Schedule New Interview
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-green-100 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-bold">4.6</h2>
          <p className="text-gray-700">Current score</p>
          <p className="text-sm text-gray-500 mt-2">Average score is 3.9</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-2">Top Evaluated Skills</h2>
          <div className="flex flex-wrap">
            <span className="bg-gray-200 p-2 rounded-full mr-2 mb-2">Product development 4.0</span>
            <span className="bg-gray-200 p-2 rounded-full mr-2 mb-2">Management 4.2</span>
            <span className="bg-gray-200 p-2 rounded-full mr-2 mb-2">Web tools 4.9</span>
            {/* Add more skills as needed */}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-bold mb-4">Interviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-md font-bold">Welcome Interview</h3>
            <p className="text-gray-700">Wade Warren</p>
            <p className="text-sm text-gray-500">23 December, 2021</p>
            <p className="text-green-600 mt-2 font-bold">4.5</p>
            <button className="bg-gray-200 p-2 rounded-md mt-2">View Full Results</button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-md font-bold">Technical Assessment</h3>
            <p className="text-gray-700">Joaquin Doyen</p>
            <p className="text-sm text-gray-500">28 December, 2021</p>
            <p className="text-green-600 mt-2 font-bold">4.7</p>
            <button className="bg-gray-200 p-2 rounded-md mt-2">View Full Results</button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-md font-bold">Social Skill Assessment</h3>
            <p className="text-gray-700">60 minutes, 8 questions</p>
            <button className="bg-blue-600 text-white p-2 rounded-md mt-2">Start Interview</button>
          </div>
        </div>
      </div>
 
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                      onClick={closeModal}
                    >
                      Schedule Interview
                    </button>
                    <button
                      type="button"
                      className="ml-2 inline-flex justify-center rounded-md border border-transparent bg-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
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
    </div>
  );
};

export default Interview;
