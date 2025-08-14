import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { 
  Users, 
  Crown, 
  TrendingUp, 
  Plus, 
  Eye,
  Search,
  Filter,
  Star,
  Calendar,
  DollarSign
} from 'lucide-react';
import { mockGroups } from '../../data/mockData';
import { Group } from '../../types';
import { getGroupStatusBadge } from '../../utils/status.tsx';
import { formatNumber, formatCurrency, formatDate } from '../../utils/formatters';

export const MemberGroupsView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter to show only groups where user is a member
  const memberGroups = mockGroups.filter(group => group.status === 'member');

  const filteredGroups = memberGroups.filter(group => 
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (group: Group) => {
    console.log('View details for group:', group.id);
  };

  const handleViewProjects = (group: Group) => {
    console.log('View projects for group:', group.id);
  };

  const totalEarnings = memberGroups.reduce((sum, group) => sum + group.totalEarnings, 0);
  const totalActiveProjects = memberGroups.reduce((sum, group) => sum + group.activeProjects, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">参加グループ</h2>
          <p className="text-gray-600 mt-2">あなたが参加しているグループ一覧</p>
        </div>
      </div>

      {/* Search and Filter */}
      <Card>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-teal-500" />
            </div>
            <div>
              <p className="text-sm text-gray-600">参加グループ数</p>
              <p className="text-lg font-bold text-gray-900">{memberGroups.length}グループ</p>
            </div>
          </div>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="グループを検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <Button variant="secondary">
            <Filter className="h-4 w-4 mr-2" />
            フィルター
          </Button>
        </div>
      </Card>

      {/* Groups List */}
      {filteredGroups.length === 0 ? (
        <Card className="text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm ? '該当するグループがありません' : '参加しているグループがありません'}
          </h3>
          <p className="text-gray-600 mb-4">
            {searchTerm 
              ? '検索条件を変更してお試しください。'
              : '参加しているグループがありません。'
            }
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredGroups.map((group) => (
            <Card key={group.id} hover>
              <div className="flex items-start justify-between">
                <div className="flex items-start">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-blue-500 rounded-lg flex items-center justify-center mr-4">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{group.name}</h3>
                      {getGroupStatusBadge(group.status)}
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">メンバー数</p>
                        <p className="font-medium text-gray-900">{formatNumber(group.memberCount)}人</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">アクティブ案件</p>
                        <p className="font-medium text-blue-600">{group.activeProjects}件</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">総売上</p>
                        <p className="font-medium text-teal-600">{formatCurrency(group.totalEarnings)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">参加日</p>
                        <p className="font-medium text-gray-900">2024年1月</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span>4.8 グループ評価</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>週3-5件の新着案件</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <Button size="sm" variant="secondary" onClick={() => handleViewDetails(group)}>
                    <Eye className="h-4 w-4 mr-1" />
                    詳細
                  </Button>
                  <Button size="sm" onClick={() => handleViewProjects(group)}>
                    案件を見る
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <Card>
        <h3 className="text-xl font-bold text-gray-900 mb-6">クイックアクション</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="secondary" className="flex items-center justify-center">
            <TrendingUp className="h-4 w-4 mr-2" />
            売上レポートを見る
          </Button>
          <Button variant="secondary" className="flex items-center justify-center">
            <Users className="h-4 w-4 mr-2" />
            招待を確認する
          </Button>
        </div>
      </Card>
    </div>
  );
};