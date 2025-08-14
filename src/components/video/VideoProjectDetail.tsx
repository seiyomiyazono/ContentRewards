import React, { useState } from 'react';
import { VideoProject, ChatMessage } from '../../types/video';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { 
  ArrowLeft,
  Star,
  Calendar,
  DollarSign,
  Upload,
  Download,
  Send,
  Paperclip,
  CheckCircle,
  Clock,
  AlertTriangle,
  User,
  MessageCircle,
  FileText
} from 'lucide-react';
import { formatDate, formatCurrency, formatTimeAgo } from '../../utils/formatters';

interface VideoProjectDetailProps {
  project: VideoProject;
  onBack: () => void;
  onApprove: (projectId: string) => void;
  onRequestRevision: (projectId: string, reason: string) => void;
  onSendMessage: (projectId: string, message: string) => void;
}

export const VideoProjectDetail: React.FC<VideoProjectDetailProps> = ({
  project,
  onBack,
  onApprove,
  onRequestRevision,
  onSendMessage
}) => {
  const [newMessage, setNewMessage] = useState('');
  const [revisionReason, setRevisionReason] = useState('');
  const [showRevisionForm, setShowRevisionForm] = useState(false);

  const getTimelineStepIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'in-progress': return Clock;
      case 'pending': return Clock;
      default: return Clock;
    }
  };

  const getTimelineStepColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-gray-400 bg-gray-100';
      default: return 'text-gray-400 bg-gray-100';
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(project.id, newMessage);
      setNewMessage('');
    }
  };

  const handleRequestRevision = () => {
    if (revisionReason.trim()) {
      onRequestRevision(project.id, revisionReason);
      setRevisionReason('');
      setShowRevisionForm(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        プロジェクト一覧に戻る
      </button>

      {/* Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{project.title}</h1>
                  <p className="text-gray-600">{project.description}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  project.status === 'completed' ? 'bg-green-100 text-green-800' :
                  project.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                  project.status === 'awaiting-feedback' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {project.status === 'completed' ? '完了' :
                   project.status === 'in-progress' ? '進行中' :
                   project.status === 'awaiting-feedback' ? 'フィードバック待ち' :
                   project.status === 'revision-requested' ? '修正依頼中' :
                   project.status === 'material-uploaded' ? '素材アップロード済み' : '不明'}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div className="text-center">
                  <p className="text-2xl font-bold text-teal-600">{project.progress}%</p>
                  <p className="text-sm text-gray-600">進捗</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(project.budget)}</p>
                  <p className="text-sm text-gray-600">予算</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{formatDate(project.deliveryDate)}</p>
                  <p className="text-sm text-gray-600">納期</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Editor Profile */}
        <Card>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center mx-auto">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">{project.editorName}</h3>
              <div className="flex items-center justify-center mt-1">
                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                <span className="font-medium">{project.editorRating}</span>
                <span className="text-gray-500 ml-1">({project.editorCompletedProjects} projects)</span>
              </div>
            </div>
            <Button variant="secondary" className="w-full">
              <MessageCircle className="h-4 w-4 mr-2" />
              プロフィールを見る
            </Button>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Timeline */}
        <Card>
          <h3 className="text-xl font-bold text-gray-900 mb-6">進捗タイムライン</h3>
          <div className="space-y-4">
            {project.timeline.map((step, index) => {
              const Icon = getTimelineStepIcon(step.status);
              const colorClass = getTimelineStepColor(step.status);
              
              return (
                <div key={step.id} className="flex items-start">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${colorClass}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="ml-4 flex-1">
                    <h4 className="font-medium text-gray-900">{step.title}</h4>
                    <p className="text-sm text-gray-600">{step.description}</p>
                    {step.completedAt && (
                      <p className="text-xs text-gray-500 mt-1">
                        {formatTimeAgo(step.completedAt)}に完了
                      </p>
                    )}
                  </div>
                  {index < project.timeline.length - 1 && (
                    <div className="absolute left-4 mt-8 w-px h-6 bg-gray-200" />
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        {/* Files */}
        <Card>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">ファイル・素材</h3>
              <Button size="sm">
                <Upload className="h-4 w-4 mr-2" />
                アップロード
              </Button>
            </div>

            {/* Upload Area */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-teal-400 transition-colors cursor-pointer">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">ファイルをドラッグ&ドロップまたはクリックして選択</p>
              <p className="text-sm text-gray-500 mt-1">最大ファイルサイズ: 5GB</p>
            </div>

            {/* File List */}
            <div className="space-y-2">
              {project.files.map((file) => (
                <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">{file.name}</p>
                      <p className="text-sm text-gray-600">
                        {file.size} • {file.uploadedBy} • {formatTimeAgo(file.uploadedAt)}
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Chat and Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chat */}
        <Card>
          <h3 className="text-xl font-bold text-gray-900 mb-6">メッセージ</h3>
          
          {/* Messages */}
          <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
            {project.messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === 'client' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs px-4 py-2 rounded-lg ${
                  message.sender === 'client' 
                    ? 'bg-teal-500 text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="text-sm">{message.message}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'client' ? 'text-teal-100' : 'text-gray-500'
                  }`}>
                    {formatTimeAgo(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="メッセージを入力..."
              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button size="sm" variant="secondary">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button size="sm" onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </Card>

        {/* Actions */}
        <Card>
          <h3 className="text-xl font-bold text-gray-900 mb-6">アクション</h3>
          
          <div className="space-y-4">
            {project.status === 'awaiting-feedback' && (
              <>
                <Button 
                  className="w-full"
                  onClick={() => onApprove(project.id)}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  最終納品を承認
                </Button>
                
                <Button 
                  variant="secondary" 
                  className="w-full"
                  onClick={() => setShowRevisionForm(!showRevisionForm)}
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  修正を依頼
                </Button>

                {showRevisionForm && (
                  <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                    <textarea
                      value={revisionReason}
                      onChange={(e) => setRevisionReason(e.target.value)}
                      placeholder="修正が必要な内容を記載してください..."
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      rows={3}
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={handleRequestRevision}>
                        修正依頼を送信
                      </Button>
                      <Button size="sm" variant="secondary" onClick={() => setShowRevisionForm(false)}>
                        キャンセル
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}

            {project.status === 'completed' && (
              <div className="text-center py-4">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                <p className="text-green-600 font-medium">プロジェクト完了！</p>
                <p className="text-sm text-gray-600">ご利用ありがとうございました。</p>
              </div>
            )}

            {project.status === 'in-progress' && (
              <div className="text-center py-4">
                <Clock className="h-12 w-12 text-blue-500 mx-auto mb-2" />
                <p className="text-blue-600 font-medium">作業進行中</p>
                <p className="text-sm text-gray-600">エディターがプロジェクトに取り組んでいます。</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};