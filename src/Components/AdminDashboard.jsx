import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineReload,
  AiOutlineDashboard,
  AiOutlineUser,
  AiOutlineSetting,
  AiOutlineLogout,
  AiOutlineBarChart,
  AiOutlineFolder,
  AiOutlineTeam,
  AiOutlineMenu,
} from "react-icons/ai";
import { MdOutlineRequestPage } from "react-icons/md";
import { FaBell, FaRegCalendarAlt } from "react-icons/fa";
import { BiSupport, BiMessageDetail } from "react-icons/bi";

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const [activeTab, setActiveTab] = useState("requests");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // =====================
  // Fetch pending requests
  // =====================
  const fetchRequests = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/pending-requests`
      );

      if (data.success) {
        const formattedRequests = [];

        data.users.forEach((user) => {
          // If mentor request is pending
          if (user.mentorStatus === "Pending") {
            formattedRequests.push({
              _id: `${user._id}-mentor`, // unique per role
              userId: user,
              requestedRole: "mentor",
            });
          }

          // If recruiter request is pending
          if (user.recruiterStatus === "Pending") {
            formattedRequests.push({
              _id: `${user._id}-recruiter`, // unique per role
              userId: user,
              requestedRole: "recruiter",
            });
          }
        });

        setRequests(formattedRequests);
      } else {
        toast.error("Failed to fetch pending requests");
      }
    } catch (err) {
      console.error("Error fetching pending requests:", err);
      toast.error("Failed to fetch pending requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // =====================
  // Handle accept/decline
  // =====================
  const handleAction = async (id, action) => {
    try {
      setProcessingId(id);

      const request = requests.find((req) => req._id === id);
      if (!request) return;

      const role = request.requestedRole;

      toast.loading(
        `${action === "accept" ? "Accepting" : "Declining"} request...`
      );

      await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/requests/${request.userId._id}/${role}/${action}`
      );

      toast.dismiss();
      toast.success(`✅ Request ${action}ed successfully!`);

      // Remove only the processed row
      setRequests((prev) => prev.filter((req) => req._id !== id));
    } catch (err) {
      toast.dismiss();
      console.error("Request action error:", err);
      toast.error(`❌ Failed to ${action} request`);
    } finally {
      setProcessingId(null);
    }
  };

  // =====================
  // Filter & search
  // =====================
  const filteredRequests = useMemo(() => {
    return requests.filter((req) => {
      const matchesFilter =
        filter === "all" ? true : req.requestedRole === filter;
      const matchesSearch =
        (req.userId?.name?.toLowerCase().includes(search.toLowerCase()) ||
          false) ||
        (req.userId?.email?.toLowerCase().includes(search.toLowerCase()) ||
          false);

      return matchesFilter && matchesSearch;
    });
  }, [requests, filter, search]);

  // =====================
  // Sidebar items
  // =====================
  const menuItems = [
    { id: "dashboard", name: "Dashboard", icon: AiOutlineDashboard },
    { id: "analytics", name: "Analytics", icon: AiOutlineBarChart },
    { id: "requests", name: "Requests", icon: MdOutlineRequestPage },
    { id: "users", name: "Users", icon: AiOutlineUser },
    { id: "teams", name: "Teams", icon: AiOutlineTeam },
    { id: "projects", name: "Projects", icon: AiOutlineFolder },
    { id: "notifications", name: "Notifications", icon: FaBell },
    { id: "calendar", name: "Calendar", icon: FaRegCalendarAlt },
    { id: "messages", name: "Messages", icon: BiMessageDetail },
    { id: "account", name: "Account", icon: AiOutlineSetting },
    { id: "support", name: "Support", icon: BiSupport },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans text-gray-800">
      <Toaster position="top-right" />

      {/* Sidebar */}
      <aside
        className={`bg-gray-900 text-gray-100 flex flex-col transition-all duration-300 ${
          sidebarOpen ? "w-72" : "w-20"
        }`}
      >
        <div className="px-6 py-6 border-b border-gray-700 flex items-center justify-between">
          {sidebarOpen && (
            <div>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                HireddAdmin
              </h2>
              <p className="text-sm text-gray-400 mt-1">Control Panel</p>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-300 hover:text-white text-2xl"
          >
            <AiOutlineMenu />
          </button>
        </div>

        <nav className="flex-1 px-2 py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors ${
                activeTab === item.id
                  ? "bg-blue-600 text-white shadow-md"
                  : "hover:bg-gray-800 text-gray-200"
              }`}
            >
              <item.icon className="text-lg" />
              {sidebarOpen && item.name}
            </button>
          ))}
        </nav>

        <div className="px-4 py-6 border-t border-gray-700">
          <button className="w-full flex items-center gap-3 px-4 py-2 text-red-500 hover:text-red-600 transition">
            <AiOutlineLogout className="text-lg" />
            {sidebarOpen && "Logout"}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-auto">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight capitalize">
            {activeTab}
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={fetchRequests}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 shadow"
            >
              <AiOutlineReload className="animate-spin-slow" />
              Refresh
            </button>

            <div className="flex items-center gap-3 bg-gray-200 px-4 py-2 rounded-full border border-gray-300">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                A
              </div>
              <span className="text-gray-900">Admin</span>
            </div>
          </div>
        </div>

        {/* Filters & Content */}
        {activeTab === "requests" && (
          <>
            <div className="flex flex-wrap gap-3 mb-6">
              <input
                type="text"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-white border border-gray-300 p-2 rounded w-64 focus:ring-2 focus:ring-blue-400 outline-none"
              />

              <select
                onChange={(e) => setFilter(e.target.value)}
                className="bg-white border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-400"
              >
                <option value="all">All Roles</option>
                <option value="mentor">Mentor</option>
                <option value="recruiter">Recruiter</option>
              </select>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-x-auto rounded-xl bg-white shadow-lg border border-gray-200"
            >
              <table className="w-full text-left">
                <thead className="bg-gray-100 text-gray-800 uppercase text-sm">
                  <tr>
                    <th className="p-4">Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Requested Role</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td
                        colSpan="4"
                        className="p-6 text-center text-gray-500"
                      >
                        <div className="animate-pulse">Loading requests...</div>
                      </td>
                    </tr>
                  ) : filteredRequests.length === 0 ? (
                    <tr>
                      <td
                        colSpan="4"
                        className="p-6 text-center text-gray-500"
                      >
                        No matching requests found.
                      </td>
                    </tr>
                  ) : (
                    filteredRequests.map((req, index) => (
                      <motion.tr
                        key={req._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        <td className="p-4">{req.userId.name}</td>
                        <td className="p-4 text-gray-700">{req.userId.email}</td>
                        <td className="p-4 capitalize text-gray-900">
                          {req.requestedRole}
                        </td>
                        <td className="p-4 text-center space-x-3">
                          <button
                            disabled={processingId === req._id}
                            onClick={() => handleAction(req._id, "accept")}
                            className={`px-4 py-1 rounded flex items-center gap-2 justify-center inline-block ${
                              processingId === req._id
                                ? "bg-green-300 opacity-50 cursor-not-allowed"
                                : "bg-green-500 hover:bg-green-600 text-white"
                            }`}
                          >
                            <AiOutlineCheck /> Accept
                          </button>
                          <button
                            disabled={processingId === req._id}
                            onClick={() => handleAction(req._id, "decline")}
                            className={`px-4 py-1 rounded flex items-center gap-2 justify-center inline-block ${
                              processingId === req._id
                                ? "bg-red-300 opacity-50 cursor-not-allowed"
                                : "bg-red-500 hover:bg-red-600 text-white"
                            }`}
                          >
                            <AiOutlineClose /> Decline
                          </button>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </motion.div>
          </>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
