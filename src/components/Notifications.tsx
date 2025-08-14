import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Bell, Filter } from 'lucide-react';
import { Card } from './ui/Card';
import { NotificationCard } from './notifications/NotificationCard';
import { mockNotifications } from '../data/mockData';
import { Notification } from '../types';

export const Notifications: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'unread' | 'approval' | 'revision' | 'invitation'>('all');

  const handleMarkAsRead = (id: string) => {
    console.log('Mark as read:', id);
  };

  const handleAcceptInvitation = (id: string) => {
    console.log('Accept invitation:', id);
  };

  const handleDeclineInvitation = (id: string) => {
    console.log('Decline invitation:', id);
  };

  const handleViewRevision = (id: string) => {
    console.log('View revision:', id);
  };

  const filteredNotifications = mockNotifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter;
  });

  const unreadCount = mockNotifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold text-gray-900">通知センター</h2>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          <p className="text-gray-600 mt-1">重要なお知らせと更新情報</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary">
            すべて既読にする
          </Button>
          <Button variant="secondary">
            <Filter className="h-4 w-4 mr-2" />
            フィルター
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <Card>
        <div className="flex flex-wrap gap-2">
          {[
            { key: 'all', label: 'すべて', count: mockNotifications.length },
            { key: 'unread', label: '未読', count: unreadCount },
            { key: 'approval', label: '承認', count: mockNotifications.filter(n => n.type === 'approval').length },
            { key: 'revision', label: '修正', count: mockNotifications.filter(n => n.type === 'revision').length },
            { key: 'invitation', label: '招待', count: mockNotifications.filter(n => n.type === 'invitation').length },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as typeof filter)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                filter === tab.key
                  ? 'bg-teal-500 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className={`ml-2 px-1.5 py-0.5 rounded text-xs ${
                  filter === tab.key
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </Card>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <Card className="text-center py-12">
            <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">通知がありません</h3>
            <p className="text-gray-600">新しい通知があればここに表示されます。</p>
          </Card>
        ) : (
          filteredNotifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              onMarkAsRead={handleMarkAsRead}
              onAcceptInvitation={handleAcceptInvitation}
              onDeclineInvitation={handleDeclineInvitation}
              onViewRevision={handleViewRevision}
            />
          ))
        )}
      </div>

      {/* Load More */}
      {filteredNotifications.length > 0 && (
        <div className="flex justify-center">
          <Button variant="secondary">
            さらに読み込む
          </Button>
        </div>
      )}
    </div>
  );
};