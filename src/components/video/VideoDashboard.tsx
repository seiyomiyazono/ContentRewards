import React, { useState } from 'react';
import { VideoProjectCard } from './VideoProjectCard';
import { VideoProjectDetail } from './VideoProjectDetail';
import { VideoProjectFilters } from './VideoProjectFilters';
import { VideoSubmissionModal } from './VideoSubmissionModal';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { 
  BarChart3, 
  Clock, 
  CheckCircle, 
  DollarSign,
  TrendingUp,
  Calendar,
  Users,
  Plus,
  Search,
  Filter,
  Edit,
  Pause,
  Play,
  Eye
} from 'lucide-react';
import { mockVideoProjects, mockNotifications, mockClientProjects } from '../../data/videoMockData';
import { VideoProject, Notification } from '../../types/video';
import { formatCurrency, formatDate, formatNumber } from '../../utils/formatters';

export const VideoDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('video-projects');
  const [selectedProject, setSelectedProject] = useState<VideoProject | null>(null);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editorFilter, setEditorFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [clientSearchTerm, setClientSearchTerm] = useState('');
  const [clientStatusFilter, setClientStatusFilter] = useState<'all' | 'active' | 'draft' | 'paused' | 'completed' | 'cancelled'>('all');

  const handleViewDetails = (project: VideoProject) => {
    setSelectedProject(project);
  };

  const handleBackToList = () => {
    setSelectedProject(null);
  };

  const handleApprove = (projectId: string) => {
    console.log('Approve project:', projectId);
    // Handle approval logic
  };

  const handleRequestRevision = (projectId: string, reason: string) => {
    console.log('Request revision:', projectId, reason);
    // Handle revision request logic
  };

  const handleSendMessage = (projectId: string, message: string) => {
    console.log('Send message:', projectId, message);
    // Handle message sending logic
  };

  const handleSubmissionSubmit = (data: any) => {
    console.log('Submission data:', data);
    // Handle submission logic
  };

  const filteredProjects = mockVideoProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.editorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    const matchesEditor = editorFilter === 'all' || project.editorName === editorFilter;
    
    return matchesSearch && matchesStatus && matchesEditor;
  });

  const filteredClientProjects = mockClientProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(clientSearchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(clientSearchTerm.toLowerCase());
    const matchesStatus = clientStatusFilter === 'all' || project.status === clientStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string): string => {
    switch (status) {
      case 'active': return '募集中';
      case 'draft': return '下書き';
      case 'paused': return '一時停止';
      case 'completed': return '完了';
      case 'cancelled': return 'キャンセル';
      default: return '不明';
    }
  };
  const stats = {
    totalProjects: mockVideoProjects.length,
    inProgress: mockVideoProjects.filter(p => p.status === 'in-progress').length,
    completed: mockVideoProjects.filter(p => p.status === 'completed').length,
    totalBudget: mockVideoProjects.reduce((sum, p) => sum + p.budget, 0),
    avgProgress: Math.round(mockVideoProjects.reduce((sum, p) => sum + p.progress, 0) / mockVideoProjects.length)
  };

  const clientStats = {
    total: mockClientProjects.length,
    active: mockClientProjects.filter(p => p.status === 'active').length,
    totalBudget: mockClientProjects.reduce((sum, p) => sum + p.budget, 0),
    totalViews: mockClientProjects.reduce((sum, p) => sum + p.totalViews, 0)
  };

  if (selectedProject) {
    return (
      <VideoProjectDetail
        project={selectedProject}
        onBack={handleBackToList}
        onApprove={handleApprove}
        onRequestRevision={handleRequestRevision}
        onSendMessage={handleSendMessage}
      />
    );
  }

  return (
    <>
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">案件管理</h2>
          <p className="text-gray-600 mt-2">プロジェクトの管理と進捗確認</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          動画を投稿
        </Button>
      </div>

      {/* Tab Navigation */}
      <Card>
        <div className="flex space-x-1">
          {[
            { id: 'video-projects', label: '動画プロジェクト' },
            { id: 'client-projects', label: '投稿案件管理' },
            { id: 'messages', label: 'メッセージ' },
            { id: 'submissions', label: '投稿管理' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-teal-500 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </Card>

      {activeTab === 'submissions' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">投稿管理</h3>
            <Button onClick={() => setShowSubmissionModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              新しい投稿
            </Button>
          </div>
          
          <Card className="text-center py-12">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">投稿を開始</h3>
            <p className="text-gray-600 mb-4">
              ソーシャルメディアの投稿をアップロードして報酬を獲得しましょう
            </p>
            <Button onClick={() => setShowSubmissionModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              投稿をアップロード
            </Button>
          </Card>
        </div>
      )}

      {activeTab === 'video-projects' && (
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">総プロジェクト数</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalProjects}</p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
                    <Clock className="h-6 w-6 text-yellow-500" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">進行中</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.inProgress}</p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">完了</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-purple-500" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">総予算</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalBudget)}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Filters */}
          <VideoProjectFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            editorFilter={editorFilter}
            onEditorFilterChange={setEditorFilter}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <VideoProjectCard
                key={project.id}
                project={project}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <Card className="text-center py-12">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">プロジェクトが見つかりません</h3>
              <p className="text-gray-600 mb-4">検索条件やフィルターを調整してください</p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                新しいプロジェクトを作成
              </Button>
            </Card>
          )}
        </div>
      )}

      {activeTab === 'client-projects' && (
        <div className="space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">総案件数</p>
                  <p className="text-2xl font-bold text-gray-900">{clientStats.total}</p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                    <Play className="h-6 w-6 text-green-500" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">募集中</p>
                  <p className="text-2xl font-bold text-gray-900">{clientStats.active}</p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-purple-500" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">総予算</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(clientStats.totalBudget)}</p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center">
                    <Eye className="h-6 w-6 text-teal-500" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">総再生数</p>
                  <p className="text-2xl font-bold text-gray-900">{formatNumber(clientStats.totalViews)}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Filters and Search */}
          <Card>
            <>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="案件を検索..."
                  value={clientSearchTerm}
                  onChange={(e) => setClientSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {[
                  { key: 'all', label: 'すべて' },
                  { key: 'active', label: '募集中' },
                  { key: 'draft', label: '下書き' },
                  { key: 'paused', label: '一時停止' },
                  { key: 'completed', label: '完了' },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setClientStatusFilter(tab.key as typeof clientStatusFilter)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      clientStatusFilter === tab.key
                        ? 'bg-teal-500 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            </>
          </Card>

          {/* Projects List */}
          <div className="space-y-4">
            {filteredClientProjects.length === 0 ? (
              <Card className="text-center py-12">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">案件がありません</h3>
                <p className="text-gray-600 mb-4">新しい案件を投稿して、クリエイターを募集しましょう。</p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  案件を投稿する
                </Button>
              </Card>
            ) : (
              filteredClientProjects.map((project) => (
                <Card key={project.id} hover>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{project.title}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                          {getStatusText(project.status)}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">報酬</p>
                          <p className="font-medium text-teal-600">{project.reward}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">予算</p>
                          <p className="font-medium">{formatCurrency(project.budget)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">応募者</p>
                          <p className="font-medium">{project.applicants}人</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">採用者</p>
                          <p className="font-medium">{project.acceptedWorkers}人</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          期限: {formatDate(project.deadline)}
                        </div>
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {formatNumber(project.totalViews)} 再生
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <Button size="sm" variant="secondary">
                        <Eye className="h-4 w-4 mr-1" />
                        詳細
                      </Button>
                      <Button size="sm" variant="secondary">
                        <Edit className="h-4 w-4 mr-1" />
                        編集
                      </Button>
                      {project.status === 'active' && (
                        <Button size="sm" variant="secondary">
                          <Pause className="h-4 w-4 mr-1" />
                          停止
                        </Button>
                      )}
                      {project.status === 'paused' && (
                        <Button size="sm" variant="secondary">
                          <Play className="h-4 w-4 mr-1" />
                          再開
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === 'messages' && (
        <Card className="text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">メッセージ</h3>
          <p className="text-gray-600">エディターとのコミュニケーションがここに表示されます</p>
        </Card>
      )}

      {activeTab === 'payments' && (
        <Card className="text-center py-12">
          <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">支払い</h3>
          <p className="text-gray-600">支払い履歴と請求情報</p>
        </Card>
      )}
    </div>

    <VideoSubmissionModal
      isOpen={showSubmissionModal}
      onClose={() => setShowSubmissionModal(false)}
      onSubmit={handleSubmissionSubmit}
    />
    </>
  );
};