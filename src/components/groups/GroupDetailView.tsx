import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { 
  ArrowLeft, 
  Users, 
  Calendar,
  DollarSign,
  Eye,
  Send,
  Paperclip,
  User,
  MessageCircle,
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  Award,
  Target,
  FileText,
  Download,
  Upload,
  Settings,
  MoreVertical,
  Star,
  Play,
  Pause,
  Edit,
  FolderOpen,
  HelpCircle,
  Video,
  ThumbsUp,
  ThumbsDown,
  Plus,
  Lightbulb,
  Zap,
  X,
  Link as LinkIcon
} from 'lucide-react';
import { mockGroups } from '../../data/mockData';
import { formatCurrency, formatDate, formatTimeAgo } from '../../utils/formatters';

export default function GroupDetailView() {
  const { groupId } = useParams<{ groupId: string }>();
  const [activeTab, setActiveTab] = useState<'overview' | 'chat' | 'inquiry' | 'materials' | 'upload' | 'review' | 'member-management' | 'project-management'>('overview');
  const [newMessage, setNewMessage] = useState('');
  const [showOnlineMembers, setShowOnlineMembers] = useState(false);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showVideoSubmission, setShowVideoSubmission] = useState(false);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [submissionUrl, setSubmissionUrl] = useState('');

  // Mock data for the single project
  const currentProject = {
    id: 'p1',
    title: 'AIツール完全解説動画シリーズ',
    description: '最新のAIツールを分かりやすく解説する動画シリーズを制作します。初心者から上級者まで対応できる包括的な内容を目指します。',
    status: 'in-progress' as const,
    progress: 65,
    budget: 250000,
    deadline: '2025-03-15',
    category: 'video',
    assignedMembers: 8,
    totalViews: 125000,
    currentEarnings: 162500,
    targetViews: 200000,
    createdAt: '2025-01-15',
    milestones: [
      { id: 1, title: '企画・構成', status: 'completed', completedAt: '2025-01-20' },
      { id: 2, title: '撮影・収録', status: 'completed', completedAt: '2025-02-05' },
      { id: 3, title: '編集・制作', status: 'in-progress', completedAt: null },
      { id: 4, title: 'レビュー・修正', status: 'pending', completedAt: null },
      { id: 5, title: '最終納品', status: 'pending', completedAt: null }
    ]
  };

  const group = mockGroups.find(g => g.id === groupId);
  
  if (!group) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">グループが見つかりません</h2>
      </div>
    );
  }

  // Mock data - role determines available features
  const isClient = group?.role === 'creator'; // Client = Creator of the group
  const isParticipant = group?.role === 'participant';

  // Mock data for group members (for creator view)
  const groupMembers = [
    {
      id: '1',
      name: '田中太郎',
      email: 'tanaka@example.com',
      role: 'video-editor',
      status: 'active',
      joinedAt: '2025-01-15',
      completedTasks: 8,
      rating: 4.9,
      avatar: '👨‍💻',
      skills: ['動画編集', 'After Effects', 'Premiere Pro'],
      currentTask: 'メイン動画の編集作業中'
    },
    {
      id: '2',
      name: '佐藤花子',
      email: 'sato@example.com',
      role: 'designer',
      status: 'active',
      joinedAt: '2025-01-18',
      completedTasks: 5,
      rating: 4.8,
      avatar: '👩‍🎨',
      skills: ['グラフィックデザイン', 'Photoshop', 'Illustrator'],
      currentTask: 'サムネイル制作中'
    },
    {
      id: '3',
      name: '山田次郎',
      email: 'yamada@example.com',
      role: 'content-writer',
      status: 'pending',
      joinedAt: '2025-01-25',
      completedTasks: 2,
      rating: 4.6,
      avatar: '✍️',
      skills: ['コンテンツライティング', 'SEO', 'マーケティング'],
      currentTask: '企画書レビュー待ち'
    }
  ];

  const mockMessages = [
    {
      id: '1',
      sender: 'client',
      senderName: 'プロジェクトマネージャー',
      message: 'AIツール解説動画の企画書を確認しました。とても良い構成ですね！',
      timestamp: '2025-01-28T10:30:00Z',
      avatar: '👨‍💼'
    },
    {
      id: '2',
      sender: 'member',
      senderName: '田中太郎',
      message: 'ありがとうございます！撮影も順調に進んでいます。来週には編集に入れそうです。',
      timestamp: '2025-01-28T10:35:00Z',
      avatar: '👨‍💻'
    },
    {
      id: '3',
      sender: 'member',
      senderName: '佐藤花子',
      message: 'テロップのデザインサンプルを作成しました。確認をお願いします。',
      timestamp: '2025-01-28T11:00:00Z',
      avatar: '👩‍🎨'
    },
    {
      id: '4',
      sender: 'client',
      senderName: 'プロジェクトマネージャー',
      message: 'デザインサンプル、とても良いですね！このクオリティで進めてください。',
      timestamp: '2025-01-28T11:15:00Z',
      avatar: '👨‍💼'
    }
  ];

  const onlineMembers = [
    { id: '1', name: '田中太郎', status: '作業中', avatar: '👨‍💻', lastSeen: 'オンライン' },
    { id: '2', name: '佐藤花子', status: '編集中', avatar: '👩‍🎨', lastSeen: 'オンライン' },
    { id: '3', name: '山田花子', status: 'オンライン', avatar: '🌸', lastSeen: 'オンライン' },
    { id: '4', name: '鈴木一郎', status: 'オンライン', avatar: '👨‍🔧', lastSeen: 'オンライン' }
  ];

  const clientTabs = [
    { id: 'overview', label: '案件概要', icon: FileText },
    { id: 'project-management', label: 'プロジェクト管理', icon: Settings },
    { id: 'member-management', label: 'メンバー管理', icon: Users },
    { id: 'chat', label: 'チャット', icon: MessageCircle },
    { id: 'video-materials', label: '動画素材', icon: Video },
    { id: 'reviews', label: 'レビュー', icon: Star }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Send message:', newMessage);
      setNewMessage('');
    }
  };

  const handleSubmitVideo = () => {
    if (submissionUrl.trim()) {
      console.log('Submitting video URL:', submissionUrl);
      setSubmissionUrl('');
      setShowSubmissionModal(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'in-progress': return Clock;
      case 'pending': return AlertTriangle;
      default: return Clock;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => window.history.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            戻る
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{group.name}</h1>
            <p className="text-gray-600 mt-1">{group.memberCount}人のメンバー</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary">
            <Settings className="h-4 w-4 mr-2" />
            設定
          </Button>
          <Button variant="secondary">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <Card>
        <div className="flex space-x-1">
          {/* 参加者専用タブ */}
          {isParticipant && (
            <>
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'overview'
                    ? 'bg-teal-500 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Target className="h-4 w-4 mr-2 inline" />
                案件概要
              </button>
              <button
                onClick={() => setActiveTab('client-inquiry')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'client-inquiry'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <HelpCircle className="h-4 w-4 mr-2 inline" />
                クライアントへの問い合わせ
              </button>
              <button
                onClick={() => setActiveTab('video-upload')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'video-upload'
                    ? 'bg-purple-500 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Video className="h-4 w-4 mr-2 inline" />
                動画投稿
              </button>
            </>
          )}

          {/* クライアント専用タブ */}
          {isClient && (
            <>
              <button
                onClick={() => setActiveTab('project-management')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'project-management'
                    ? 'bg-teal-500 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Settings className="h-4 w-4 mr-2 inline" />
                プロジェクト管理
              </button>
              <button
                onClick={() => setActiveTab('member-management')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'member-management'
                    ? 'bg-green-500 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Users className="h-4 w-4 mr-2 inline" />
                メンバー管理
              </button>
            </>
          )}

          {/* 共通タブ */}
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'chat'
                ? 'bg-teal-500 text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <MessageCircle className="h-4 w-4 mr-2 inline" />
            チャット
          </button>
          <button
            onClick={() => setActiveTab('video-materials')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'video-materials'
                ? 'bg-orange-500 text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <FolderOpen className="h-4 w-4 mr-2 inline" />
            動画素材
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'reviews'
                ? 'bg-yellow-500 text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Star className="h-4 w-4 mr-2 inline" />
            レビュー
          </button>
        </div>
      </Card>

      {/* Overview Tab - Combined with Project Details */}
      {activeTab === 'overview' && isParticipant && (
        <div className="space-y-6">
          {/* Project Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-green-500" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">現在の売上</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(currentProject.currentEarnings)}</p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Eye className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">総再生数</p>
                  <p className="text-2xl font-bold text-gray-900">{currentProject.totalViews.toLocaleString()}</p>
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
                  <p className="text-sm font-medium text-gray-600">進捗</p>
                  <p className="text-2xl font-bold text-gray-900">{currentProject.progress}%</p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center">
                    <Users className="h-6 w-6 text-teal-500" />
                  </div>
                </div>
                <div className="ml-6">
                  <p className="text-sm font-medium text-gray-600">参加メンバー</p>
                  <p className="text-2xl font-bold text-gray-900">{currentProject.assignedMembers}人</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Project Overview and Details */}
          <Card>
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{currentProject.title}</h3>
                  <p className="text-gray-600 mt-2 leading-relaxed">{currentProject.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(currentProject.status)}`}>
                    進行中
                  </span>
                  <Button size="sm" variant="secondary">
                    <Edit className="h-4 w-4 mr-2" />
                    編集
                  </Button>
                  <Button size="sm" variant="secondary">
                    <Pause className="h-4 w-4 mr-2" />
                    一時停止
                  </Button>
                </div>
              </div>

              {/* Detailed Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-teal-600">{formatCurrency(currentProject.budget)}</p>
                  <p className="text-sm text-gray-600">総予算</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{currentProject.totalViews.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">現在の再生数</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(currentProject.currentEarnings)}</p>
                  <p className="text-sm text-gray-600">現在の売上</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">{currentProject.assignedMembers}人</p>
                  <p className="text-sm text-gray-600">参加メンバー</p>
                </div>
              </div>

              {/* Project Details */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="font-semibold text-gray-900 mb-4">プロジェクト詳細</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">カテゴリ</p>
                    <p className="font-medium text-gray-900 capitalize">{currentProject.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">作成日</p>
                    <p className="font-medium text-gray-900">{formatDate(currentProject.createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">期限</p>
                    <p className="font-medium text-gray-900">{formatDate(currentProject.deadline)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">目標再生数</p>
                    <p className="font-medium text-gray-900">{currentProject.targetViews.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Additional Project Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-600">予算</p>
                  <p className="text-lg font-bold text-gray-900">{formatCurrency(currentProject.budget)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">期限</p>
                  <p className="text-lg font-bold text-gray-900">{formatDate(currentProject.deadline)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">目標再生数</p>
                  <p className="text-lg font-bold text-gray-900">{currentProject.targetViews.toLocaleString()}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">プロジェクト進捗</span>
                  <span className="font-medium">{currentProject.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-teal-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${currentProject.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Video Upload Conditions */}
          <Card>
            <h3 className="text-xl font-bold text-gray-900 mb-6">動画投稿条件</h3>
            
            <div className="space-y-6">
              {/* Basic Requirements */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Target className="h-5 w-5 text-blue-500 mr-2" />
                  基本要件
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">最低動画時間</p>
                    <p className="font-bold text-blue-600">5分以上</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">目標再生数</p>
                    <p className="font-bold text-green-600">{currentProject.targetViews.toLocaleString()}回</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">動画品質</p>
                    <p className="font-bold text-purple-600">1080p以上</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">投稿期限</p>
                    <p className="font-bold text-orange-600">{formatDate(currentProject.deadline)}</p>
                  </div>
                </div>
              </div>

              {/* Content Requirements */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <FileText className="h-5 w-5 text-green-500 mr-2" />
                  コンテンツ要件
                </h4>
                <div className="space-y-3">
                  {[
                    { icon: '✅', text: 'AIツールの実際の操作画面を含むこと', status: 'required' },
                    { icon: '✅', text: '初心者にも分かりやすい解説を含むこと', status: 'required' },
                    { icon: '✅', text: '日本語の字幕・テロップを付けること', status: 'required' },
                    { icon: '⭐', text: 'オープニング・エンディングを含むこと', status: 'recommended' },
                    { icon: '⭐', text: 'BGMや効果音を適切に使用すること', status: 'recommended' }
                  ].map((requirement, index) => (
                    <div key={index} className={`flex items-center p-3 rounded-lg ${
                      requirement.status === 'required' ? 'bg-red-50 border border-red-200' : 'bg-yellow-50 border border-yellow-200'
                    }`}>
                      <span className="text-lg mr-3">{requirement.icon}</span>
                      <span className={`text-sm ${
                        requirement.status === 'required' ? 'text-red-800' : 'text-yellow-800'
                      }`}>
                        {requirement.text}
                      </span>
                      <span className={`ml-auto px-2 py-1 text-xs font-medium rounded-full ${
                        requirement.status === 'required' 
                          ? 'bg-red-100 text-red-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {requirement.status === 'required' ? '必須' : '推奨'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Requirements */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Settings className="h-5 w-5 text-purple-500 mr-2" />
                  技術要件
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">対応形式</p>
                    <div className="space-y-1">
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">MP4</span>
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded ml-1">MOV</span>
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded ml-1">AVI</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">解像度</p>
                    <p className="font-medium text-gray-900">1920×1080 (Full HD)</p>
                    <p className="text-xs text-gray-500">最低要件</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">ファイルサイズ</p>
                    <p className="font-medium text-gray-900">最大 5GB</p>
                    <p className="text-xs text-gray-500">1ファイルあたり</p>
                  </div>
                </div>
              </div>

              {/* Reward Structure */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <DollarSign className="h-5 w-5 text-green-500 mr-2" />
                  報酬体系
                </h4>
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">￥5.00</p>
                      <p className="text-sm text-gray-600">1,000再生あたり</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">￥50,000</p>
                      <p className="text-sm text-gray-600">完了ボーナス</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">￥{formatCurrency(currentProject.budget).replace('$', '')}</p>
                      <p className="text-sm text-gray-600">最大獲得可能額</p>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-white rounded border border-green-300">
                    <p className="text-sm text-green-800">
                      <strong>💡 ボーナス条件:</strong> 目標再生数達成 + 高評価（4.5以上） + 期限内完了
                    </p>
                  </div>
                </div>
              </div>

              {/* Important Notes */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2 flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  重要な注意事項
                </h4>
                <ul className="space-y-1 text-sm text-yellow-700">
                  <li>• 著作権に違反するコンテンツは使用禁止</li>
                  <li>• 投稿前にクライアントの承認が必要</li>
                  <li>• 修正依頼には48時間以内に対応</li>
                  <li>• 不適切なコンテンツは報酬対象外</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Files Section */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">プロジェクトファイル</h3>
              <Button size="sm">
                <Upload className="h-4 w-4 mr-2" />
                ファイルアップロード
              </Button>
            </div>
            
            <div className="space-y-3">
              {[
                { name: '企画書_v2.pdf', size: '2.4 MB', uploadedBy: '田中太郎', uploadedAt: '2025-01-20' },
                { name: '撮影素材.zip', size: '1.2 GB', uploadedBy: '佐藤花子', uploadedAt: '2025-02-05' },
                { name: 'テロップデザイン.psd', size: '45 MB', uploadedBy: '佐藤花子', uploadedAt: '2025-02-10' }
              ].map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">{file.name}</p>
                      <p className="text-sm text-gray-600">
                        {file.size} • {file.uploadedBy} • {file.uploadedAt}
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Milestones */}
          <Card>
            <h3 className="text-xl font-bold text-gray-900 mb-6">マイルストーン</h3>
            <div className="space-y-4">
              {currentProject.milestones.map((milestone, index) => {
                const Icon = getStatusIcon(milestone.status);
                return (
                  <div key={milestone.id} className="flex items-center">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(milestone.status)}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="ml-4 flex-1">
                      <h4 className="font-medium text-gray-900">{milestone.title}</h4>
                      {milestone.completedAt && (
                        <p className="text-sm text-gray-600">
                          {formatDate(milestone.completedAt)}に完了
                        </p>
                      )}
                    </div>
                    {index < currentProject.milestones.length - 1 && (
                      <div className="absolute left-4 mt-8 w-px h-6 bg-gray-200" />
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'project-management' && isClient && (
        <div className="space-y-6">
          {/* Project Management Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center">
                    <Target className="h-6 w-6 text-teal-500" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">プロジェクト進捗</p>
                  <p className="text-2xl font-bold text-gray-900">65%</p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-green-500" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">予算使用率</p>
                  <p className="text-2xl font-bold text-gray-900">45%</p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">アクティブメンバー</p>
                  <p className="text-2xl font-bold text-gray-900">8/12</p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-purple-500" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">残り日数</p>
                  <p className="text-2xl font-bold text-gray-900">23日</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Project Settings */}
          <Card>
            <h3 className="text-xl font-bold text-gray-900 mb-6">プロジェクト設定</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    プロジェクト名
                  </label>
                  <input
                    type="text"
                    defaultValue="AIツール紹介動画制作"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    予算
                  </label>
                  <input
                    type="text"
                    defaultValue="￥150,000"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  プロジェクト説明
                </label>
                <textarea
                  rows={4}
                  defaultValue="最新のAIツールの使い方を分かりやすく解説する動画を制作してください。初心者向けの内容で、実際の操作画面を含めた構成をお願いします。"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-4">
                <Button>
                  設定を保存
                </Button>
                <Button variant="secondary">
                  <Pause className="h-4 w-4 mr-2" />
                  プロジェクトを一時停止
                </Button>
              </div>
            </div>
          </Card>

          {/* Danger Zone */}
          <Card>
            <h3 className="text-xl font-bold text-red-600 mb-4">危険な操作</h3>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700 mb-4">
                以下の操作は取り消すことができません。慎重に実行してください。
              </p>
              <div className="flex gap-4">
                <Button variant="secondary" className="text-red-600 border-red-300 hover:bg-red-50">
                  プロジェクトを削除
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'member-management' && isClient && (
        <div className="space-y-6">
          {/* Member Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">総メンバー数</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
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
                  <p className="text-sm font-medium text-gray-600">アクティブメンバー</p>
                  <p className="text-2xl font-bold text-gray-900">8</p>
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
                  <p className="text-sm font-medium text-gray-600">承認待ち</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                    <Star className="h-6 w-6 text-purple-500" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">平均評価</p>
                  <p className="text-2xl font-bold text-gray-900">4.8</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Member List */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">メンバー一覧</h3>
              <Button onClick={() => setShowInviteModal(true)}>
                <Plus className="h-4 w-4 mr-2" />
                メンバーを招待
              </Button>
            </div>
            
            <div className="space-y-4">
              {mockMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-bold">{member.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{member.name}</h4>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <span className="mr-4">{member.role}</span>
                        <div className="flex items-center mr-4">
                          <Star className="h-3 w-3 text-yellow-400 mr-1" />
                          <span>{member.rating}</span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          member.status === 'active' ? 'bg-green-100 text-green-800' :
                          member.status === 'working' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {member.status === 'active' ? 'アクティブ' :
                           member.status === 'working' ? '作業中' : 'オフライン'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="secondary" onClick={() => {
                      setSelectedMember(member);
                      setShowMemberModal(true);
                    }}>
                      <Eye className="h-4 w-4 mr-1" />
                      詳細
                    </Button>
                    <Button size="sm" variant="secondary">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      メッセージ
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'chat' && (
        <Card>
          <div className="h-96 flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {mockMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'client' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start max-w-xs lg:max-w-md ${
                    message.sender === 'client' ? 'flex-row-reverse' : 'flex-row'
                  }`}>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                      message.sender === 'client' 
                        ? 'bg-blue-500 ml-2' 
                        : 'bg-teal-500 mr-2'
                    }`}>
                      {message.avatar}
                    </div>
                    <div className={`px-4 py-2 rounded-lg ${
                      message.sender === 'client'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className={`text-xs font-medium mb-1 ${
                        message.sender === 'client' ? 'text-blue-100' : 'text-gray-600'
                      }`}>
                        {message.senderName}
                      </p>
                      <p className="text-sm">{message.message}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'client' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {formatTimeAgo(message.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex gap-2">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="メッセージを入力..."
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                  rows={1}
                />
                <Button size="sm" variant="secondary">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button size="sm" onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {activeTab === 'client-inquiry' && isParticipant && (
        <div className="space-y-6">
          {/* Quick Questions */}
          <Card>
            <h3 className="text-lg font-bold text-gray-900 mb-4">よくある質問</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { icon: HelpCircle, text: '支払いスケジュールについて', question: '支払いスケジュールについて教えて' },
                { icon: MessageCircle, text: '追加要件の相談', question: '追加要件について相談したい' },
                { icon: Lightbulb, text: 'プロジェクトの進捗確認', question: 'プロジェクトの進捗を確認したい' },
                { icon: Zap, text: '納期の調整', question: '納期の調整について相談したい' }
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={index}
                    onClick={() => setNewMessage(item.question)}
                    className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
                  >
                    <Icon className="h-5 w-5 text-blue-500 mr-3" />
                    <span className="text-sm font-medium text-gray-900">{item.text}</span>
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Chat Interface */}
          <Card>
            <div className="h-96 flex flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {[
                  {
                    id: '1',
                    sender: 'client',
                    senderName: 'プロジェクトマネージャー',
                    message: 'プロジェクトの進捗はいかがですか？何かサポートが必要でしたらお知らせください。',
                    timestamp: '2025-01-28T10:30:00Z',
                    avatar: '👨‍💼'
                  },
                  {
                    id: '2',
                    sender: 'user',
                    senderName: 'あなた',
                    message: '順調に進んでいます。編集作業が完了次第、レビュー用の動画をお送りします。',
                    timestamp: '2025-01-28T10:35:00Z',
                    avatar: '👤'
                  }
                ].map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start max-w-xs lg:max-w-md ${
                      message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}>
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                        message.sender === 'user' 
                          ? 'bg-teal-500 ml-2' 
                          : 'bg-blue-500 mr-2'
                      }`}>
                        {message.avatar}
                      </div>
                      <div className={`px-4 py-2 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-teal-500 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        <p className={`text-xs font-medium mb-1 ${
                          message.sender === 'user' ? 'text-teal-100' : 'text-gray-600'
                        }`}>
                          {message.senderName}
                        </p>
                        <p className="text-sm">{message.message}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'user' ? 'text-teal-100' : 'text-gray-500'
                        }`}>
                          {formatTimeAgo(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex gap-2">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="クライアントへのメッセージを入力..."
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={1}
                  />
                  <Button size="sm" variant="secondary">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button size="sm" onClick={handleSendMessage} className="bg-blue-500 hover:bg-blue-600">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Enterで送信、Shift+Enterで改行
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'video-materials' && (
        <Card>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">動画素材</h3>
              {isClient && (
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  素材をアップロード
                </Button>
              )}
              {isParticipant && (
                <Button onClick={() => setShowVideoSubmission(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  動画を投稿
                </Button>
              )}
            </div>

            {/* Upload Area - Only for creators */}
            {isClient && (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-teal-400 transition-colors cursor-pointer">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">動画素材をドラッグ&ドロップまたはクリックして選択</p>
                <p className="text-sm text-gray-500 mt-1">対応形式: MP4, MOV, AVI, PNG, JPG (最大2GB)</p>
              </div>
            )}

            {/* Participant message */}
            {isParticipant && (
              <>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <FolderOpen className="h-5 w-5 text-blue-500 mr-2" />
                    <p className="text-blue-800 font-medium">素材ダウンロード専用</p>
                  </div>
                  <p className="text-blue-600 text-sm mt-1">
                    参加者として、プロジェクトに必要な素材をダウンロードできます。
                  </p>
                </div>

                {/* Video Submissions List */}
                <div className="space-y-4">
                  <Card>
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Instagram Reel - AIツール解説</h4>
                          <p className="text-sm text-gray-600">承認済み • 2024年1月20日投稿</p>
                          <p className="text-sm text-teal-600 font-medium">15,420 再生 • ¥77.10 獲得</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                          承認済み
                        </span>
                        <Button size="sm" variant="secondary">
                          <Eye className="h-4 w-4 mr-1" />
                          詳細
                        </Button>
                      </div>
                    </div>
                  </Card>

                  <Card>
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                          <Clock className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">TikTok動画 - プロダクトレビュー</h4>
                          <p className="text-sm text-gray-600">審査中 • 2024年1月22日投稿</p>
                          <p className="text-sm text-gray-500">審査完了まで24-48時間</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                          審査中
                        </span>
                        <Button size="sm" variant="secondary">
                          <Eye className="h-4 w-4 mr-1" />
                          詳細
                        </Button>
                      </div>
                    </div>
                  </Card>

                  <Card className="border-2 border-dashed border-gray-300 hover:border-teal-400 transition-colors">
                    <div className="text-center py-8">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                      <h4 className="font-medium text-gray-900 mb-2">新しい動画を投稿</h4>
                      <p className="text-sm text-gray-600 mb-4">
                        ソーシャルメディアの投稿をアップロードして報酬を獲得
                      </p>
                      <Button onClick={() => setShowVideoSubmission(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        動画を投稿
                      </Button>
                    </div>
                  </Card>
                </div>
              </>
            )}

            {/* Materials Categories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">📹 動画素材</h4>
                <p className="text-sm text-blue-700">撮影済みの動画ファイル</p>
                <p className="text-xs text-blue-600 mt-1">12ファイル</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">🎵 音声素材</h4>
                <p className="text-sm text-green-700">BGM、効果音、ナレーション</p>
                <p className="text-xs text-green-600 mt-1">8ファイル</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2">🖼️ 画像素材</h4>
                <p className="text-sm text-purple-700">サムネイル、テロップ用画像</p>
                <p className="text-xs text-purple-600 mt-1">15ファイル</p>
              </div>
            </div>

            {/* Materials List */}
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">アップロード済み素材</h4>
              {[
                { name: 'オープニング映像.mp4', type: '動画', size: '245 MB', uploadedBy: '田中太郎', uploadedAt: '2025-01-20', category: 'video' },
                { name: 'BGM_メイン.mp3', type: '音声', size: '8.2 MB', uploadedBy: '佐藤花子', uploadedAt: '2025-01-22', category: 'audio' },
                { name: 'ロゴ素材.png', type: '画像', size: '2.1 MB', uploadedBy: '山田太郎', uploadedAt: '2025-01-25', category: 'image' },
                { name: 'メイン撮影_Part1.mov', type: '動画', size: '1.2 GB', uploadedBy: '田中太郎', uploadedAt: '2025-01-28', category: 'video' },
                { name: 'テロップ用フォント.ttf', type: 'フォント', size: '1.5 MB', uploadedBy: '佐藤花子', uploadedAt: '2025-01-30', category: 'font' }
              ].map((file, index) => {
                const getCategoryColor = (category: string) => {
                  switch (category) {
                    case 'video': return 'bg-blue-100 text-blue-800';
                    case 'audio': return 'bg-green-100 text-green-800';
                    case 'image': return 'bg-purple-100 text-purple-800';
                    case 'font': return 'bg-orange-100 text-orange-800';
                    default: return 'bg-gray-100 text-gray-800';
                  }
                };
                
                return (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-gray-900">{file.name}</p>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(file.category)}`}>
                            {file.type}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {file.size} • {file.uploadedBy} • {file.uploadedAt}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="ghost">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      )}

      {activeTab === 'video-upload' && isParticipant && (
        <Card>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">動画投稿</h3>
            </div>
            
            {/* Upload Area */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-teal-400 transition-colors cursor-pointer">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">動画をアップロード</h4>
              <p className="text-gray-600 mb-4">ファイルをドラッグ&ドロップまたはクリックして選択</p>
              <Button>
                ファイルを選択
              </Button>
              <p className="text-sm text-gray-500 mt-2">対応形式: MP4, MOV, AVI (最大5GB)</p>
            </div>

            {/* Upload Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">動画タイトル</label>
                <input
                  type="text"
                  placeholder="動画のタイトルを入力..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">説明</label>
                <textarea
                  placeholder="動画の説明を入力..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">カテゴリ</label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                    <option>教育・チュートリアル</option>
                    <option>エンターテイメント</option>
                    <option>レビュー・解説</option>
                    <option>その他</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">公開設定</label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                    <option>公開</option>
                    <option>限定公開</option>
                    <option>非公開</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button variant="secondary">
                  下書き保存
                </Button>
                <Button>
                  動画を投稿
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {activeTab === 'reviews' && (
        <div className="space-y-6">
          <Card>
            <h3 className="text-xl font-bold text-gray-900 mb-6">プロジェクトレビュー</h3>
            
            {/* Review Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <ThumbsUp className="h-6 w-6 text-green-500" />
                </div>
                <p className="text-2xl font-bold text-green-600">4.8</p>
                <p className="text-sm text-gray-600">平均評価</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <Star className="h-6 w-6 text-blue-500" />
                </div>
                <p className="text-2xl font-bold text-blue-600">12</p>
                <p className="text-sm text-gray-600">レビュー数</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <Award className="h-6 w-6 text-purple-500" />
                </div>
                <p className="text-2xl font-bold text-purple-600">95%</p>
                <p className="text-sm text-gray-600">満足度</p>
              </div>
            </div>

            {/* Rating Breakdown */}
            <div className="mb-8">
              <h4 className="font-semibold text-gray-900 mb-4">評価の内訳</h4>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const count = stars === 5 ? 8 : stars === 4 ? 3 : stars === 3 ? 1 : 0;
                  const percentage = count > 0 ? (count / 12) * 100 : 0;
                  
                  return (
                    <div key={stars} className="flex items-center gap-3">
                      <span className="text-sm text-gray-600 w-12">{stars}つ星</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-yellow-400 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 w-8">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">レビュー一覧</h4>
              {[
                {
                  id: '1',
                  userName: 'クライアントA',
                  rating: 5,
                  comment: '素晴らしい動画を制作していただきました。期待以上の仕上がりで、チーム全体のクオリティの高さに感動しました。',
                  timestamp: '2025-01-25T10:00:00Z',
                  projectType: 'AIツール解説動画'
                },
                {
                  id: '2',
                  userName: 'クライアントB',
                  avatar: '👩‍💼',
                  rating: 5,
                  comment: 'コミュニケーションが非常にスムーズで、修正依頼にも迅速に対応していただけました。また依頼したいと思います。',
                  timestamp: '2025-01-20T14:30:00Z',
                  projectType: 'プロダクト紹介動画'
                },
                {
                  id: '3',
                  userName: 'クライアントC',
                  avatar: '🏢',
                  rating: 4,
                  comment: '技術的なクオリティは高く、納期も守っていただけました。次回はもう少し創造性のある提案も期待しています。',
                  timestamp: '2025-01-15T09:15:00Z',
                  projectType: 'チュートリアル動画'
                }
              ].map((review) => (
                <div key={review.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-sm font-bold">
                          {review.avatar || review.userName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900">{review.userName}</h5>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? 'text-yellow-400 fill-current' 
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-500">{formatTimeAgo(review.timestamp)}</span>
                      <p className="text-xs text-blue-600 mt-1">{review.projectType}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm">{review.comment}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Invite Member Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">メンバーを招待</h3>
              <button
                onClick={() => setShowInviteModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  メールアドレス
                </label>
                <input
                  type="email"
                  placeholder="example@email.com"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  役割
                </label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                  <option value="participant">参加者</option>
                  <option value="editor">編集者</option>
                  <option value="reviewer">レビュアー</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  招待メッセージ（任意）
                </label>
                <textarea
                  rows={3}
                  placeholder="プロジェクトについての説明や期待することを記載してください..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <Button className="flex-1" onClick={() => setShowInviteModal(false)}>
                招待を送信
              </Button>
              <Button variant="secondary" onClick={() => setShowInviteModal(false)}>
                キャンセル
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Online Members Modal */}
      {showOnlineMembers && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-96 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">オンラインメンバー</h3>
                <button
                  onClick={() => setShowOnlineMembers(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
              {onlineMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center mr-3 text-sm">
                      {member.avatar}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{member.name}</p>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                        <span className="text-sm text-gray-600">{member.status}</span>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="secondary">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Member Detail Modal */}
      {showMemberModal && selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center mr-4 text-2xl">
                    {selectedMember.avatar}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{selectedMember.name}</h3>
                    <p className="text-gray-600">{selectedMember.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowMemberModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="p-6 max-h-64 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">基本情報</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-gray-600">役割:</span> {selectedMember.role}</p>
                    <p><span className="text-gray-600">参加日:</span> {formatDate(selectedMember.joinedAt)}</p>
                    <p><span className="text-gray-600">完了タスク:</span> {selectedMember.completedTasks}件</p>
                    <p><span className="text-gray-600">評価:</span> ⭐ {selectedMember.rating}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">スキル</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.skills.map((skill: string, index: number) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="font-semibold text-gray-900 mb-2">現在のタスク</h4>
                <p className="text-sm text-gray-600">{selectedMember.currentTask}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Submission Modal */}
      {showVideoSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="w-full p-6 pb-0">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Create submission</h2>
                  <button
                    onClick={() => setShowVideoSubmission(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>

            <div className="px-6 pb-6 space-y-6">
              {/* Warning Notice */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-yellow-800 leading-relaxed">
                    Only views after you submit count towards payout. Submit as soon as you post to get paid for all of your views.
                  </p>
                </div>
              </div>

              {/* Form Content */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Submit your social media post</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Share your post link or upload your original image or video below. Once approved, you'll start earning rewards based on the views your content generates.
                  </p>
                </div>

                {/* Link Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Provide link *
                  </label>
                  <div className="relative">
                    <LinkIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="url"
                      value={submissionUrl}
                      onChange={(e) => setSubmissionUrl(e.target.value)}
                      placeholder="https://www.instagram.com/reel/1234567890"
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                {/* Media Upload */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Media *
                  </label>
                  
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-gray-300 transition-colors">
                    <div className="space-y-4">
                      <div className="text-gray-500 text-sm leading-relaxed">
                        Upload the original media file you posted (not a screenshot). For videos, upload the video file. For posts with multiple files, upload the first file.
                      </div>
                      
                      <Button variant="secondary" className="mx-auto">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload media
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button className="w-full py-3 text-base font-medium">
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Mock data for members
const mockMembers = [
  {
    id: '1',
    name: '田中太郎',
    email: 'tanaka@example.com',
    role: '動画編集者',
    rating: 4.9,
    status: 'active',
    joinedAt: '2024-01-15',
    completedTasks: 15,
    skills: ['動画編集', 'After Effects', 'Premiere Pro'],
    currentTask: '動画編集中'
  },
  {
    id: '2',
    name: '佐藤花子',
    email: 'sato@example.com',
    role: 'ライター',
    rating: 4.7,
    status: 'working',
    joinedAt: '2024-01-20',
    completedTasks: 12,
    skills: ['コピーライティング', 'SEO', 'マーケティング'],
    currentTask: '企画書作成中'
  },
  {
    id: '3',
    name: '山田次郎',
    email: 'yamada@example.com',
    role: 'デザイナー',
    rating: 4.8,
    status: 'offline',
    joinedAt: '2024-02-01',
    completedTasks: 8,
    skills: ['Photoshop', 'Illustrator', 'UI/UX'],
    currentTask: 'サムネイル制作完了'
  }
];

export { GroupDetailView };