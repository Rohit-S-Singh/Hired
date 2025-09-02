import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotificationsList = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get the token from localStorage or wherever you store it
      const token = localStorage.getItem('token') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NzNiZDdhM2NlZDM1YWQxMmViMzIxNSIsImVtYWlsIjoicm9oaXRzaGVrcnNpbmdoQGdtYWlsLmNvbSIsImlhdCI6MTc1NjY2NzAwOSwiZXhwIjoxNzU2NzUzNDA5fQ.IHegQJKrmB9Mu44NyJBqoxPxDmF0HFKnOkSGd5TgcOw';
      
      const response = await fetch('https://system-backend-hprl.onrender.com/api/notifications', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setNotifications(data.notifications || data || []);
    } catch (err) {
      console.error('Error fetching notifications:', err);
      setError('Failed to load notifications. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getNotificationIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'email':
        return '📧';
      case 'application':
        return '📝';
      case 'interview':
        return '🎯';
      case 'referral':
        return '🤝';
      case 'job':
        return '💼';
      case 'success':
        return '✅';
      case 'warning':
        return '⚠️';
      case 'error':
        return '❌';
      default:
        return '🔔';
    }
  };

  const getNotificationColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'success':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'info':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading notifications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Notifications</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchNotifications}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
              <p className="text-gray-600 mt-2">
                Stay updated with your latest activities and opportunities
              </p>
            </div>
            <button
              onClick={fetchNotifications}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🔔</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications yet</h3>
              <p className="text-gray-600">
                You're all caught up! New notifications will appear here.
              </p>
            </div>
          ) : (
            notifications.map((notification, index) => (
              <div
                key={notification._id || notification.id || index}
                className={`bg-white rounded-lg border p-6 shadow-sm transition-all duration-200 hover:shadow-md ${getNotificationColor(notification.type)}`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <span className="text-2xl">
                      {getNotificationIcon(notification.type)}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {notification.title || notification.message || 'Notification'}
                        </h3>
                        <p className="text-gray-700 mb-2">
                          {notification.message || notification.description || notification.content || 'No message content'}
                        </p>
                        
                        {/* Additional details */}
                        {notification.details && (
                          <div className="text-sm text-gray-600 mb-2">
                            {notification.details}
                          </div>
                        )}

                        {/* Metadata */}
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          {notification.createdAt && (
                            <span>📅 {formatDate(notification.createdAt)}</span>
                          )}
                          {notification.type && (
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getNotificationColor(notification.type)}`}>
                              {notification.type}
                            </span>
                          )}
                          {notification.read !== undefined && (
                            <span className={notification.read ? 'text-green-600' : 'text-blue-600'}>
                              {notification.read ? '✓ Read' : '● Unread'}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action buttons if available */}
                    {notification.actionUrl && (
                      <div className="mt-4 flex gap-2">
                        <button
                          onClick={() => window.open(notification.actionUrl, '_blank')}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                        >
                          View Details
                        </button>
                        {notification.secondaryAction && (
                          <button
                            onClick={() => {
                              // Handle secondary action
                              console.log('Secondary action:', notification.secondaryAction);
                            }}
                            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                          >
                            {notification.secondaryAction}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              Showing {notifications.length} notification{notifications.length !== 1 ? 's' : ''}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsList;
