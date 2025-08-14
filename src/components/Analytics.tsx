import React, { useState } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { 
  TrendingUp, 
  Award, 
  DollarSign,
  Target,
  Users,
  BarChart3
} from 'lucide-react';
import { mockEarningsData, mockTopPerformers } from '../data/mockData';
import { formatCurrency, formatNumber } from '../utils/formatters';

export const Analytics: React.FC = () => {
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('month');

  const maxAmount = Math.max(...mockEarningsData[period].map(d => d.amount));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">売上・ランキング</h2>
          <p className="text-gray-600 mt-1">パフォーマンスの詳細分析</p>
        </div>
        <div className="flex gap-2">
          {(['week', 'month', 'year'] as const).map((p) => (
            <Button
              key={p}
              variant={period === p ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setPeriod(p)}
            >
              {p === 'week' ? '週' : p === 'month' ? '月' : '年'}
            </Button>
          ))}
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-500" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">今月の売上</p>
              <p className="text-2xl font-bold text-gray-900">$3,420</p>
              <p className="text-sm text-green-600">+12% 先月比</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <Award className="h-6 w-6 text-blue-500" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">現在のランク</p>
              <p className="text-2xl font-bold text-gray-900">#3</p>
              <p className="text-sm text-blue-600">↑ 2位上昇</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <Target className="h-6 w-6 text-purple-500" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">完了案件数</p>
              <p className="text-2xl font-bold text-gray-900">11</p>
              <p className="text-sm text-purple-600">94% 完了率</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-teal-500" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">平均評価</p>
              <p className="text-2xl font-bold text-gray-900">4.8</p>
              <p className="text-sm text-teal-600">★★★★★</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Earnings Chart */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">売上推移</h3>
          <div className="flex items-center text-sm text-gray-600">
            <BarChart3 className="h-4 w-4 mr-1" />
            {period === 'week' ? '過去7日間' : period === 'month' ? '今月の週次' : '過去6ヶ月'}
          </div>
        </div>
        
        <div className="space-y-4">
          {mockEarningsData[period].map((data, index) => (
            <div key={index} className="flex items-center">
              <div className="w-8 text-sm text-gray-600">{data.period}</div>
              <div className="flex-1 mx-4">
                <div className="flex items-center">
                  <div 
                    className="bg-teal-500 h-8 rounded transition-all duration-500 flex items-center justify-end pr-2"
                    style={{ width: `${(data.amount / maxAmount) * 100}%`, minWidth: '60px' }}
                  >
                    <span className="text-white text-sm font-medium">${data.amount}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leaderboard */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">全体ランキング</h3>
            <Button variant="ghost" size="sm">全体を見る</Button>
          </div>
          
          <div className="space-y-3">
            {mockTopPerformers.map((performer) => (
              <div 
                key={performer.rank} 
                className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                  performer.isCurrentUser 
                    ? 'bg-teal-50 border-2 border-teal-200' 
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    performer.rank === 1 ? 'bg-yellow-100 text-yellow-800' :
                    performer.rank === 2 ? 'bg-gray-100 text-gray-800' :
                    performer.rank === 3 ? 'bg-orange-100 text-orange-800' :
                    'bg-gray-50 text-gray-600'
                  }`}>
                    #{performer.rank}
                  </div>
                  <div className="ml-3">
                    <p className={`font-medium ${performer.isCurrentUser ? 'text-teal-900' : 'text-gray-900'}`}>
                      {performer.name}
                    </p>
                    <p className="text-sm text-gray-600">{performer.projects} 案件完了</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${performer.isCurrentUser ? 'text-teal-600' : 'text-gray-900'}`}>
                    {formatCurrency(performer.earnings)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Next Rank Progress */}
        <Card>
          <h3 className="text-xl font-bold text-gray-900 mb-6">次のランクまで</h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">ランク #2 まで</span>
                <span className="font-medium">$470 不足</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-teal-400 to-teal-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: '78%' }}
                ></div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <Target className="h-5 w-5 text-blue-500 mr-3" />
                  <span className="text-sm font-medium text-gray-900">高額案件を完了</span>
                </div>
                <span className="text-sm text-blue-600">+$200-500</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-sm font-medium text-gray-900">新しいグループに参加</span>
                </div>
                <span className="text-sm text-green-600">+$100-300</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-purple-500 mr-3" />
                  <span className="text-sm font-medium text-gray-900">連続完了ボーナス</span>
                </div>
                <span className="text-sm text-purple-600">+$50-150</span>
              </div>
            </div>

            <Button className="w-full">
              新しい案件を探す
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};