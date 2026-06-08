"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Bell,
  Check,
  CheckCheck,
  Info,
  Calendar,
  Loader2,
  Inbox
} from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "system" | "application_update" | "event";
  isRead: boolean;
  createdAt: string;
}

export default function NotificationsInbox() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await fetch("/api/portal/notifications");
      if (res.ok) {
        const data = await res.json();
        setNotifications(data || []);
      }
    } catch (err) {
      console.error("Error loading notifications:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchNotifications();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchNotifications]);

  const handleMarkAsRead = async (id: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch("/api/portal/notifications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isRead: true })
      });

      if (res.ok) {
        setNotifications((prev) =>
          prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
        );
      }
    } catch (err) {
      console.error("Failed to update notification read status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleMarkAllAsRead = async () => {
    const unreadIds = notifications.filter((n) => !n.isRead).map((n) => n.id);
    if (unreadIds.length === 0) return;

    try {
      const res = await fetch("/api/portal/notifications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ all: true })
      });

      if (res.ok) {
        setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      }
    } catch (err) {
      console.error("Failed to mark all as read:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const getTypeIcon = (type: Notification["type"]) => {
    switch (type) {
      case "application_update":
        return <Info className="h-4 w-4 text-blue-600" />;
      case "event":
        return <Calendar className="h-4 w-4 text-purple-600" />;
      case "system":
      default:
        return <Bell className="h-4 w-4 text-amber-600" />;
    }
  };

  const getTypeBg = (type: Notification["type"]) => {
    switch (type) {
      case "application_update":
        return "bg-blue-50 border-blue-100";
      case "event":
        return "bg-purple-50 border-purple-100";
      case "system":
      default:
        return "bg-amber-50 border-amber-100";
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-stroke dark:border-dark-3 pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-dark dark:text-white">Notification Inbox</h1>
          <p className="text-sm text-dark-5 dark:text-dark-6">Read communications from Miss Somali admins and event coordinators.</p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllAsRead}
            className="flex items-center px-4 py-2 text-xs font-bold border border-primary/20 rounded-full text-primary bg-white hover:bg-gray-50 transition-colors self-start"
          >
            <CheckCheck className="h-4 w-4 mr-2" /> Mark All as Read
          </button>
        )}
      </div>

      {/* Inbox Panel */}
      <div className="bg-white border border-stroke dark:border-dark-3 rounded-[10px] overflow-hidden shadow-1 divide-y divide-stroke dark:divide-dark-3">
        
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-5 flex gap-4 transition-colors ${
                notification.isRead ? "bg-white" : "bg-blue-50/10"
              }`}
            >
              {/* Type Icon Indicator */}
              <div className={`h-9 w-9 rounded-lg border flex items-center justify-center flex-shrink-0 ${getTypeBg(notification.type)}`}>
                {getTypeIcon(notification.type)}
              </div>

              {/* Message Content */}
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between gap-4">
                  <h3 className={`text-sm font-bold truncate ${notification.isRead ? "text-dark-5 dark:text-dark-6" : "text-dark dark:text-white"}`}>
                    {notification.title}
                  </h3>
                  <span className="text-[10px] font-bold text-gray-400 whitespace-nowrap">
                    {new Date(notification.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className={`text-xs sm:text-sm leading-relaxed ${notification.isRead ? "text-dark-5 dark:text-dark-6" : "text-dark-5 dark:text-dark-6"}`}>
                  {notification.message}
                </p>
              </div>

              {/* Action Button */}
              {!notification.isRead && (
                <div className="self-center">
                  <button
                    disabled={updatingId === notification.id}
                    onClick={() => handleMarkAsRead(notification.id)}
                    className="p-1.5 rounded-full border border-gray-200 text-gray-400 hover:text-primary hover:border-primary hover:bg-gray-50 transition-all"
                    title="Mark as Read"
                  >
                    {updatingId === notification.id ? (
                      <Loader2 className="animate-spin h-3.5 w-3.5" />
                    ) : (
                      <Check className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="p-16 text-center text-gray-400">
            <Inbox className="h-10 w-10 mx-auto mb-3 text-gray-300" />
            <p className="text-sm font-bold text-dark-5 dark:text-dark-6">No Notifications Received</p>
            <p className="text-xs text-dark-6 mt-1">Your notification center inbox is currently empty.</p>
          </div>
        )}

      </div>
    </div>
  );
}
