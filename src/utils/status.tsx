import { Project, Group, Notification } from '../types';
import { colors } from '../constants/colors';

export const getProjectStatusColor = (status: Project['status']): string => {
  switch (status) {
    case 'completed': return colors.status.completed;
    case 'in-progress': return colors.status.inProgress;
    case 'pending': return colors.status.pending;
    case 'requires-revision': return colors.status.requiresRevision;
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const getProjectStatusText = (status: Project['status']): string => {
  switch (status) {
    case 'completed': return '完了';
    case 'in-progress': return '進行中';
    case 'pending': return '保留中';
    case 'requires-revision': return '要修正';
    default: return '不明';
  }
};

export const getGroupStatusBadge = (status: Group['status']): JSX.Element => {
  switch (status) {
    case 'member':
      return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">メンバー</span>;
    case 'invited':
      return <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">招待中</span>;
    case 'pending':
      return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">申請中</span>;
  }
};

export const getNotificationColor = (type: Notification['type']): string => {
  switch (type) {
    case 'approval': return colors.notification.approval;
    case 'revision': return colors.notification.revision;
    case 'invitation': return colors.notification.invitation;
    case 'info': return colors.notification.info;
    default: return colors.notification.info;
  }
};