import React from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { 
  User, 
  Edit3, 
  Award, 
  Star, 
  Calendar,
  Eye,
  DollarSign,
  TrendingUp,
  Camera
} from 'lucide-react';

export const Profile: React.FC = () => {
  const achievements = [
    { title: '初回案件完了', date: '2024-01-15', earned: 25.00 },
    { title: 'ライタランク達成', date: '2024-02-20', earned: 150.00 },
    { title: '月間MVP', date: '2024-03-01', earned: 500.00 },
    { title: '高評価連続10件', date: '2024-03-15', earned: 100.00 }
  ];

  const recentProjects = [
    {
      title: 'AIツール完全ガイド',
      category: '記事執筆',
      views: 25000,
      earned: 125.00,
      rating: 4.9,
      completedAt: '2024-03-20'
    },
    {
      title: 'プロダクティビティアプリレビュー',
      category: 'レビュー',
      views: 15000,
      earned: 75.00,
      rating: 4.8,
      completedAt: '2024-03-18'
    },
    {
      title: 'フィットネステック解説動画',
      category: '動画制作',
      views: 48000,
      earned: 240.00,
      rating: 5.0,
      completedAt: '2024-03-15'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">プロフィール</h2>
          <p className="text-gray-600 mt-1">あなたの実績とパフォーマンス</p>
        </div>
        <Button>
          <Edit3 className="h-4 w-4 mr-2" />
          プロフィールを編集
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <Card>
            <div className="text-center">
              <div className="relative inline-block">
                <div className="w-24 h-24 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-12 w-12 text-white" />
                </div>
                <button className="absolute bottom-0 right-0 bg-white border-2 border-gray-200 rounded-full p-1.5 hover:bg-gray-50 transition-colors">
                  <Camera className="h-4 w-4 text-gray-600" />
                </button>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900">田中太郎</h3>
              <p className="text-gray-600 mb-2">@tanaka_tarou</p>
              <div className="flex items-center justify-center mb-4">
                <Award className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="text-sm font-medium text-gray-700">プロライター</span>
              </div>
              
              <div className="flex justify-center space-x-4 text-center mb-6">
                <div>
                  <p className="text-lg font-bold text-gray-900">4.9</p>
                  <p className="text-xs text-gray-600">平均評価</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">47</p>
                  <p className="text-xs text-gray-600">完了案件</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">94%</p>
                  <p className="text-xs text-gray-600">成功率</p>
                </div>
              </div>

              <Button variant="secondary" className="w-full mb-4">
                ポートフォリオを見る
              </Button>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <h4 className="font-semibold text-gray-900 mb-3">専門分野</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-teal-100 text-teal-800 text-xs font-medium rounded">テクノロジー</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">AI・機械学習</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">プロダクトレビュー</span>
                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded">動画制作</span>
              </div>
            </div>
          </Card>

          {/* Stats Card */}
          <Card className="mt-6">
            <h4 className="font-semibold text-gray-900 mb-4">統計情報</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm text-gray-600">総売上</span>
                </div>
                <span className="font-medium text-gray-900">$12,450</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Eye className="h-4 w-4 text-blue-500 mr-2" />
                  <span className="text-sm text-gray-600">総ビュー数</span>
                </div>
                <span className="font-medium text-gray-900">1.2M</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 text-purple-500 mr-2" />
                  <span className="text-sm text-gray-600">今月の成長率</span>
                </div>
                <span className="font-medium text-green-600">+24%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-orange-500 mr-2" />
                  <span className="text-sm text-gray-600">登録日</span>
                </div>
                <span className="font-medium text-gray-900">2024年1月</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* About */}
          <Card>
            <h4 className="font-semibold text-gray-900 mb-4">自己紹介</h4>
            <p className="text-gray-600 leading-relaxed">
              テクノロジー分野を専門とするコンテンツクリエイターです。AI・機械学習、プロダクトレビュー、動画制作に特化し、
              わかりやすく実用的なコンテンツの提供を心がけています。過去3年間で47の案件を成功に導き、
              平均評価4.9を維持しています。常に最新のトレンドを追いかけ、質の高いコンテンツを制作することをモットーとしています。
            </p>
          </Card>

          {/* Recent Projects */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-semibold text-gray-900">最近の案件</h4>
              <Button variant="ghost" size="sm">すべて見る</Button>
            </div>
            
            <div className="space-y-4">
              {recentProjects.map((project, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-900">{project.title}</h5>
                    <div className="flex items-center mt-1 space-x-4">
                      <span className="text-sm text-gray-600">{project.category}</span>
                      <div className="flex items-center">
                        <Eye className="h-3 w-3 text-gray-400 mr-1" />
                        <span className="text-xs text-gray-600">{project.views.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-400 mr-1" />
                        <span className="text-xs text-gray-600">{project.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-teal-600">${project.earned.toFixed(2)}</p>
                    <p className="text-xs text-gray-600">{new Date(project.completedAt).toLocaleDateString('ja-JP')}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Achievements */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-semibold text-gray-900">実績・アチーブメント</h4>
              <Button variant="ghost" size="sm">すべて見る</Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <Award className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h5 className="font-medium text-gray-900">{achievement.title}</h5>
                    <p className="text-sm text-gray-600">{new Date(achievement.date).toLocaleDateString('ja-JP')}</p>
                    <p className="text-sm font-medium text-green-600">+${achievement.earned.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};