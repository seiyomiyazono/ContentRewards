import React, { useState } from 'react';
import { Bell, User, ChevronDown, Search, Plus } from 'lucide-react';
import { Button } from '../ui/Button';
import { Notification } from '../../types/video';

interface VideoTopNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  notifications: Notification[];
  onNotificationClick: (notification: Notification) => void;
}

export const VideoTopNavigation: React.FC<VideoTopNavigationProps> = ({
  activeTab,
  onTabChange,
  notifications,
  onNotificationClick
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'projects', label: 'Projects' },
    { id: 'messages', label: 'Messages' },
    { id: 'payments', label: 'Payments' },
    { id: 'settings', label: 'Settings' }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo and Tabs */}
        <div className="flex items-center space-x-8">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-blue-500 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">VE</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">VideoEdit Pro</h1>
          </div>

          <div className="hidden md:flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-teal-100 text-teal-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* New Project Button */}
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>

          {/* Search */}
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-64 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.slice(0, 5).map((notification) => (
                    <button
                      key={notification.id}
                      onClick={() => {
                        onNotificationClick(notification);
                        setShowNotifications(false);
                      }}
                      className={`w-full text-left p-4 hover:bg-gray-50 border-b border-gray-100 ${
                        !notification.read ? 'bg-teal-50' : ''
                      }`}
                    >
                      <div className="flex items-start">
                        <div className={`w-2 h-2 rounded-full mt-2 mr-3 ${
                          !notification.read ? 'bg-teal-500' : 'bg-transparent'
                        }`} />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 text-sm">{notification.title}</p>
                          <p className="text-gray-600 text-sm">{notification.message}</p>
                          <p className="text-gray-500 text-xs mt-1">
                            {new Date(notification.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="p-4 border-t border-gray-200">
                  <button className="text-teal-600 text-sm font-medium hover:text-teal-700">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <span className="hidden md:block font-medium">John Doe</span>
              <ChevronDown className="h-4 w-4" />
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-2">
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                    Profile Settings
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                    Billing
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                    Help & Support
                  </button>
                  <hr className="my-2" />
                  <button className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded">
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};