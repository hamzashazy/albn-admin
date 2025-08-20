// components/notification/NotificationManagement.jsx
import React, { useState, useEffect } from "react";
import {
  RefreshCcw,
  Search,
  Users,
  CheckCircle,
  AlertCircle,
  X,
} from "lucide-react";
const API_BASE_URL = "https://albn-backend.vercel.app/api/notification";

const NotificationManagement = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [stats, setStats] = useState({ total: 0, active: 0 });
  
  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/active`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch notifications");
      const data = await res.json();
      setNotifications(data);
      const total = data.length;
      const active = data.filter((g) => !g.isDeleted).length;
      setStats({ total, active });
    } catch {
      setError("Failed to fetch notifications. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Notification Skeleton - Made responsive
  const NotificationSkeleton = () => (
    <div className="bg-white rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-200 animate-pulse h-40 sm:h-44 lg:h-48">
      <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-5">
        <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gray-300 rounded-full"></div>
        <div className="flex-1">
          <div className="w-3/4 h-4 sm:h-5 lg:h-6 bg-gray-300 rounded mb-2"></div>
          <div className="w-1/2 h-3 sm:h-4 bg-gray-300 rounded"></div>
        </div>
      </div>
      <div className="space-y-2 sm:space-y-3">
        <div className="w-full h-3 sm:h-4 bg-gray-300 rounded"></div>
        <div className="w-2/3 h-3 sm:h-4 bg-gray-300 rounded"></div>
      </div>
    </div>
  );

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && !notification.isDeleted)

    return matchesSearch && matchesStatus;
  });

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Stats Card - Made responsive
  const StatsCard = ({ icon: Icon, label, value, color }) => (
    <div className="bg-white rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-200 hover:shadow-xl transition">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm sm:text-base lg:text-lg text-gray-500">{label}</p>
          <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">{value}</p>
        </div>
        <Icon className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 ${color}`} />
      </div>
    </div>
  );

  // Notification Card - Improved mobile layout
  const NotificationCard = ({ notification }) => (
    <div
      className={`bg-white rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-200 relative transition transform hover:shadow-2xl hover:-translate-y-1 ${
        notification.isDeleted ? "opacity-70" : ""
      }`}
    >
      <div className="flex justify-between items-start mb-4 sm:mb-5">
        <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
          <div
            className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl lg:text-2xl shadow-md flex-shrink-0 ${
              notification.isDeleted
                ? "bg-gradient-to-br from-red-400 to-red-600"
                : "bg-gradient-to-br from-indigo-500 to-indigo-700"
            }`}
          >
            {notification.title?.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
              {notification.title}
            </h3>
          </div>
        </div>
      </div>

      {/* Message info */}
      {notification.message && (
        <div className="text-sm sm:text-base lg:text-lg text-gray-700">
          <p className="truncate">
            <span className="font-medium">Message:</span> {notification.message}
          </p>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-gray-100">
      {/* Header - Improved mobile layout */}
      <div className="bg-white border-b shadow-sm md:sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-indigo-700">
                Notification Management
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 mt-1">
                Manage notifications and their status
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        {/* Stats - Better mobile grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 lg:mb-10">
          <StatsCard
            icon={Users}
            label="Total Notifications"
            value={stats.total}
            color="text-indigo-600"
          />
          <StatsCard
            icon={CheckCircle}
            label="Active Notifications"
            value={stats.active}
            color="text-blue-600"
          />
        </div>

        {/* Search + Filter - Stacked on mobile */}
        <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 mb-8 lg:mb-10">
          <div className="flex flex-col gap-4 sm:gap-5">
            <div className="flex-1 relative">
              <Search className="absolute left-3 sm:left-4 top-3 sm:top-4 text-gray-400 w-5 h-5 sm:w-6 sm:h-6" />
              <input
                type="text"
                placeholder="Search by title or message..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-4 sm:pr-5 py-3 sm:py-4 rounded-lg border border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-base sm:text-lg lg:text-xl shadow-sm"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={fetchNotifications}
                className="px-4 sm:px-5 py-3 sm:py-4 rounded-lg border border-gray-300 hover:bg-gray-100 shadow-sm flex items-center justify-center"
              >
                <RefreshCcw className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Error - Better mobile layout */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 sm:p-5 mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-sm">
            <div className="flex items-center gap-3 text-base sm:text-lg lg:text-xl text-red-700">
              <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
              <span className="break-words">{error}</span>
            </div>
            <button 
              onClick={() => setError(null)}
              className="self-end sm:self-center p-1 hover:bg-red-100 rounded"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
            </button>
          </div>
        )}

        {/* Loading / Empty / Notifications - Better mobile grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[...Array(6)].map((_, i) => (
              <NotificationSkeleton key={i} />
            ))}
          </div>
        ) : filteredNotifications.length === 0 ? (
          <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg p-8 sm:p-12 lg:p-20 text-center">
            <Users className="w-16 h-16 sm:w-20 sm:h-20 text-gray-300 mx-auto mb-4 sm:mb-6" />
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-700 mb-2 sm:mb-3">
              No Notifications Found
            </h3>
            <p className="text-base sm:text-lg lg:text-xl text-gray-500 max-w-md mx-auto">
              {searchTerm || filterStatus !== "all"
                ? "Try adjusting your search or filter"
                : "Click 'Create Notification' to add one"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {filteredNotifications.map((notification) => (
              <NotificationCard key={notification._id} notification={notification} />
            ))}
          </div>
        )}
      </div>



    </div>
  );
};

export default NotificationManagement;