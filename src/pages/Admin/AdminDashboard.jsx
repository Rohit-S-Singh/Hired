import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineReload,
  AiOutlineBarChart,
  AiOutlineUser,
  AiOutlineLogout,
} from "react-icons/ai";
import { MdOutlineRequestPage } from "react-icons/md";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  // =====================
  // Fetch pending requests
  // =====================
  const fetchRequests = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/Admin/pending-request`
      );

      if (data.success) {
        const formattedRequests = data.requests.map((request) => ({
          _id: request._id,
          userId: request.userId,
          requestedRole: "mentor",
          status: request.status,
          createdAt: request.createdAt,
          mentorId: request.mentorId,
        }));

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
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/Admin/requests/${request.userId._id}/${role}/${action}`
      );

      toast.dismiss();
      toast.success(`✅ Request ${action}ed successfully!`);

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
  // Format date helper
  // =====================
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Toaster position="top-right" />

      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo & Title */}
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 w-10 h-10 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                  HireddAdmin
                </h1>
                <p className="text-xs text-gray-500">Control Panel</p>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/AnalyticsDashboard")}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-lg shadow-md transition-all duration-200 font-medium"
              >
                <AiOutlineBarChart className="text-lg" />
                <span>Analytics</span>
              </button>

              <button
                onClick={() => navigate("/AllUsers")}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg shadow-md transition-all duration-200 font-medium"
              >
                <AiOutlineUser className="text-lg" />
                <span>Users</span>
              </button>

              <button
                onClick={fetchRequests}
                className="flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-lg shadow-sm transition-all duration-200 font-medium"
              >
                <AiOutlineReload className="text-lg" />
                <span>Refresh</span>
              </button>

              {/* Admin Profile */}
              <div className="flex items-center gap-3 bg-gray-100 px-4 py-2.5 rounded-lg border border-gray-200">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-md">
                  A
                </div>
                <span className="text-gray-900 font-medium">Admin</span>
              </div>

              <button className="flex items-center gap-2 px-4 py-2.5 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200">
                <AiOutlineLogout className="text-lg" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-100 p-2 rounded-lg">
              <MdOutlineRequestPage className="text-2xl text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Pending Requests
            </h2>
          </div>
          <p className="text-gray-600 ml-14">
            Review and manage user role requests
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-md border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Total Requests
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {requests.length}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <MdOutlineRequestPage className="text-2xl text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-md border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Mentor Requests
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {requests.filter((r) => r.requestedRole === "mentor").length}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <AiOutlineUser className="text-2xl text-green-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-md border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Filtered Results
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {filteredRequests.length}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <AiOutlineBarChart className="text-2xl text-purple-600" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 mb-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[250px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <input
                type="text"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div className="min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Role
              </label>
              <select
                onChange={(e) => setFilter(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all"
              >
                <option value="all">All Roles</option>
                <option value="mentor">Mentor</option>
                <option value="recruiter">Recruiter</option>
              </select>
            </div>
          </div>
        </div>

        {/* Requests Table */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Requested Role
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Request Date
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                        <p className="text-gray-500 font-medium">
                          Loading requests...
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : filteredRequests.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="bg-gray-100 rounded-full p-4 mb-4">
                          <MdOutlineRequestPage className="text-4xl text-gray-400" />
                        </div>
                        <p className="text-gray-500 font-medium text-lg">
                          No matching requests found
                        </p>
                        <p className="text-gray-400 text-sm mt-1">
                          Try adjusting your filters or search criteria
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredRequests.map((req, index) => (
                    <motion.tr
                      key={req._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold shadow-md">
                            {req.userId.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-medium text-gray-900">
                            {req.userId.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {req.userId.email}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                          {req.requestedRole}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {formatDate(req.createdAt)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            disabled={processingId === req._id}
                            onClick={() => handleAction(req._id, "accept")}
                            className={`px-4 py-2 rounded-lg inline-flex items-center gap-2 font-medium transition-all ${
                              processingId === req._id
                                ? "bg-green-200 opacity-50 cursor-not-allowed"
                                : "bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg"
                            }`}
                          >
                            <AiOutlineCheck className="text-lg" /> Accept
                          </button>
                          <button
                            disabled={processingId === req._id}
                            onClick={() => handleAction(req._id, "decline")}
                            className={`px-4 py-2 rounded-lg inline-flex items-center gap-2 font-medium transition-all ${
                              processingId === req._id
                                ? "bg-red-200 opacity-50 cursor-not-allowed"
                                : "bg-red-500 hover:bg-red-600 text-white shadow-md hover:shadow-lg"
                            }`}
                          >
                            <AiOutlineClose className="text-lg" /> Decline
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default AdminDashboard;