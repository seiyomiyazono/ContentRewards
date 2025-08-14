import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Users } from 'lucide-react';
import { Group } from '../../types';
import { getGroupStatusBadge } from '../../utils/status.tsx';
import { formatNumber, formatCurrency } from '../../utils/formatters';

interface GroupCardProps {
  group: Group;
  onViewDetails?: (group: Group) => void;
  onAcceptInvitation?: (group: Group) => void;
  onDeclineInvitation?: (group: Group) => void;
}

export const GroupCard: React.FC<GroupCardProps> = ({ 
  group, 
  onViewDetails,
  onAcceptInvitation,
  onDeclineInvitation 
}) => {
  return (
    <Card hover className="cursor-pointer">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-bold text-gray-900">
                {group.name}
              </h3>
              {getGroupStatusBadge(group.status)}
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {formatNumber(group.memberCount)} メンバー
            </p>
          </div>
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-blue-500 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-lg font-bold text-gray-900">{group.activeProjects}</p>
            <p className="text-xs text-gray-600">アクティブ案件</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-lg font-bold text-teal-600">{formatCurrency(group.totalEarnings)}</p>
            <p className="text-xs text-gray-600">総売上</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          {group.status === 'member' && (
            <>
              <Button className="flex-1" size="sm" onClick={() => onViewDetails?.(group)}>
                詳細を見る
              </Button>
              <Button variant="secondary" size="sm">案件を見る</Button>
            </>
          )}
          {group.status === 'invited' && (
            <>
              <Button className="flex-1" size="sm" onClick={() => onAcceptInvitation?.(group)}>
                招待を承認
              </Button>
              <Button variant="secondary" size="sm" onClick={() => onDeclineInvitation?.(group)}>
                辞退
              </Button>
            </>
          )}
          {group.status === 'pending' && (
            <Button variant="secondary" className="w-full" size="sm" disabled>
              申請中...
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};