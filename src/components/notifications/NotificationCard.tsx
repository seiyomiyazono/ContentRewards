import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { 
  Check, 
  X, 
  AlertTriangle, 
  Info, 
  UserPlus,
  DollarSign,
  Bell
} from 'lucide-react';
import { Notification } from '../../types';
import { getNotificationColor } from '../../utils/status.tsx';
import { formatTimeAgo } from '../../utils/formatters';

interface NotificationCardProps {
  notification: Notification;
  onMarkAsRead?: (id: string) => void;
  onAcceptInvitation?: (id: string) => void;
  onDeclineInvitation?: (id: string) => void;
  onViewRevision?: (id: string) => void;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  onMarkAsRead,
  onAcceptInvitation,
  onDeclineInvitation,
  onViewRevision
}) => {
  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'approval': return DollarSign;
      case 'revision': return AlertTriangle;
      case 'invitation': return UserPlus;
      case 'info': return Info;
      default: return Bell;
    }
  };

  const Icon = getNotificationIcon(notification.type);

  return (
    <Card 
      className={`transition-all duration-200 ${
        !notification.read ? 'border-l-4 border-l-teal-500 bg-teal-50/30' : ''
      }`}
      hover
    >
      <div className="flex items-start">
        <div className={`flex-shrink-0 w-10 h-10 rounded-lg border flex items-center justify-center ${getNotificationColor(notification.type)}`}>
          <Icon className="h-5 w-5" />
        </div>
        
        <div className="flex-1 ml-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className={`font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                {notification.title}
              </h4>
              <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                {notification.message}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                {formatTimeAgo(notification.timestamp)}
              </p>
            </div>
            
            <div className="flex items-center gap-2 ml-4">
              {!notification.read && (
                <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
              )}
              
              {notification.type === 'revision' && (
                <div className="flex gap-2">
                  <Button size="sm" className="text-xs" onClick={() => onViewRevision?.(notification.id)}>
                    修正する
                  </Button>
                  <Button variant="secondary" size="sm" className="text-xs">
                    詳細
                  </Button>
                </div>
              )}
              
              {notification.type === 'invitation' && (
                <div className="flex gap-2">
                  <Button size="sm" className="text-xs" onClick={() => onAcceptInvitation?.(notification.id)}>
                    <Check className="h-3 w-3" />
                  </Button>
                  <Button variant="secondary" size="sm" className="text-xs" onClick={() => onDeclineInvitation?.(notification.id)}>
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};