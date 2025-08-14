import React from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { 
  Clock, 
  DollarSign, 
  TrendingUp, 
  Award,
  ArrowRight,
  PlayCircle,
  FileText,
  Users
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const todayTasks = [
    { id: 1, title: 'テック系チュートリアル動画', reward: '$15.00', deadline: '今日' },
    { id: 2, title: 'ライフスタイル記事執筆', reward: '$8.50', deadline: '明日' },
    { id: 3, title: 'プロダクトレビュー', reward: '$22.00', deadline: '3日後' }
  ];

  const stats = [
    { label: '今月の売上', value: '$1,247', icon: DollarSign, change: '+12%' },
    { label: '進行中案件', value: '8', icon: Clock, change: '+2' },
    { label: 'ランキング', value: '#7', icon: Award, change: '↑3位' },
    { label: '完了率', value: '94%', icon: TrendingUp, change: '+5%' }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">おはようございます、田中さん</h2>
          <p className="text-gray-600 mt-2">今日も素晴らしいコンテンツを作成しましょう</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} hover>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center">
                    <Icon className="h-6 w-6 text-teal-500" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <div className="flex items-center">
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <span className="ml-2 text-sm text-green-600 font-medium">{stat.change}</span>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Today's Tasks */}
      <div className="grid grid-cols-1 gap-8">
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">今日のタスク</h3>
            <Button variant="ghost" size="sm">すべて見る</Button>
          </div>
          <div className="space-y-4">
            {todayTasks.map((task) => (
              <div key={task.id} className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <PlayCircle className="h-10 w-10 text-teal-500 mr-4" />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{task.title}</h4>
                  <p className="text-sm text-gray-600">期限: {task.deadline}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-teal-600">{task.reward}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};