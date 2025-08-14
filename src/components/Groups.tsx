import React from 'react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Users, Crown, TrendingUp, Plus, Eye } from 'lucide-react';
import { GroupCard } from './groups/GroupCard';
import { mockGroups } from '../data/mockData';
import { Group } from '../types';

export const Groups: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'member' | 'client'>('member');
  const [activeSubTab, setActiveSubTab] = useState<'all' | 'active' | 'completed'>('all');
  const [searchParams] = useSearchParams();

  // Handle URL parameter for tab selection
  useEffect(() => {
    const type = searchParams.get('type');
    if (type === 'member' || type === 'client') {
      setActiveTab(type);
      setActiveSubTab('all');
    }
  }, [searchParams]);
  const handleViewDetails = (group: Group) => {
    console.log('View details for group:', group.id);
  };

  const handleAcceptInvitation = (group: Group) => {
    console.log('Accept invitation for group:', group.id);
  };

  const handleDeclineInvitation = (group: Group) => {
    console.log('Decline invitation for group:', group.id);
  };

  // Filter groups based on active tab
  const filteredGroups = mockGroups.filter(group => {
    if (activeTab === 'member') {
      return group.status === 'member';
    } else {
      // For client tab, we'll show groups where user is the client
      return group.status === 'member'; // For now, using same data
    }
  });

  // Further filter by sub-tab
  const finalFilteredGroups = filteredGroups.filter(group => {
    if (activeSubTab === 'all') return true;
    if (activeSubTab === 'active') return group.activeProjects > 0;
    if (activeSubTab === 'completed') return group.activeProjects === 0;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">グループ</h2>
          <p className="text-gray-600 mt-1">所属グループと参加状況</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          新しいグループを探す
        </Button>
      </div>

      {/* Sub Navigation */}
      <Card>
        <div className="flex space-x-1">
          <button
            onClick={() => {
              setActiveTab('member');
              setActiveSubTab('all');
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'member'
                ? 'bg-teal-500 text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            参加グループ
          </button>
          <button
            onClick={() => {
              setActiveTab('client');
              setActiveSubTab('all');
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'client'
                ? 'bg-teal-500 text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            クライアントグループ
          </button>
        </div>
      </Card>

      {/* Sub-Sub Navigation */}
      <Card>
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveSubTab('all')}
            className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
              activeSubTab === 'all'
                ? 'bg-gray-900 text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            すべて
          </button>
          <button
            onClick={() => setActiveSubTab('active')}
            className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
              activeSubTab === 'active'
                ? 'bg-gray-900 text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            アクティブ
          </button>
          <button
            onClick={() => setActiveSubTab('completed')}
            className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
              activeSubTab === 'completed'
                ? 'bg-gray-900 text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            完了済み
          </button>
        </div>
      </Card>

      {/* My Groups Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-teal-500" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                {activeTab === 'member' ? '参加グループ' : 'クライアントグループ'}
              </p>
              <p className="text-2xl font-bold text-gray-900">{filteredGroups.length}</p>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-blue-500" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">総売上</p>
              <p className="text-2xl font-bold text-gray-900">
                ${filteredGroups.reduce((sum, group) => sum + group.totalEarnings, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
                <Crown className="h-6 w-6 text-yellow-500" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                {activeTab === 'member' ? 'トップランク' : 'アクティブ案件'}
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {activeTab === 'member' ? '#3' : filteredGroups.reduce((sum, group) => sum + group.activeProjects, 0)}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Groups List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {finalFilteredGroups.length === 0 ? (
          <div className="lg:col-span-2">
            <Card className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {activeTab === 'member' ? '参加しているグループがありません' : 'クライアントグループがありません'}
              </h3>
              <p className="text-gray-600 mb-4">
                {activeTab === 'member' 
                  ? '新しいグループに参加して、より多くの案件にアクセスしましょう。'
                  : 'クライアントとしてグループを作成し、クリエイターを募集しましょう。'
                }
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                {activeTab === 'member' ? 'グループを探す' : 'グループを作成'}
              </Button>
            </Card>
          </div>
        ) : (
          finalFilteredGroups.map((group) => (
            <GroupCard 
              key={group.id} 
              group={group}
              onViewDetails={handleViewDetails}
              onAcceptInvitation={handleAcceptInvitation}
              onDeclineInvitation={handleDeclineInvitation}
            />
          ))
        )}
      </div>

      {/* Member Groups Section - Show additional member groups */}
      {activeTab === 'member' && (
        <Card>
          <h3 className="text-xl font-bold text-gray-900 mb-6">参加中のグループ一覧</h3>
          <div className="space-y-4">
            {mockGroups.filter(group => group.status === 'member').map((group) => (
              <div key={group.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-blue-500 rounded-lg flex items-center justify-center mr-4">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{group.name}</h4>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <span className="mr-4">{group.memberCount}人のメンバー</span>
                      <span className="mr-4">{group.activeProjects}件のアクティブ案件</span>
                      <span className="text-teal-600 font-medium">${group.totalEarnings.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="secondary">
                    <Eye className="h-4 w-4 mr-1" />
                    詳細
                  </Button>
                  <Button size="sm">
                    案件を見る
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Tab-specific content */}
      {activeTab === 'member' && (
        <Card>
          <h3 className="text-xl font-bold text-gray-900 mb-6">おすすめのグループ</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">AIコンテンツクリエイターズ</h4>
                  <p className="text-sm text-gray-600">15メンバー • 高額案件多数</p>
                </div>
              </div>
              <Button size="sm">参加申請</Button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">ゲーミング＆エンタメ</h4>
                  <p className="text-sm text-gray-600">28メンバー • 週10件の新着案件</p>
                </div>
              </div>
              <Button size="sm">参加申請</Button>
            </div>
          </div>
        </Card>
      )}

      {activeTab === 'client' && (
        <Card>
          <h3 className="text-xl font-bold text-gray-900 mb-6">グループ管理ツール</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="secondary" className="flex items-center justify-center">
              <Users className="h-4 w-4 mr-2" />
              メンバー管理
            </Button>
            <Button variant="secondary" className="flex items-center justify-center">
              <Plus className="h-4 w-4 mr-2" />
              案件を投稿
            </Button>
            <Button variant="secondary" className="flex items-center justify-center">
              <TrendingUp className="h-4 w-4 mr-2" />
              分析レポート
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};