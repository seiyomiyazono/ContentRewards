import React from 'react';
import { VideoProject } from '../../types/video';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { 
  Calendar, 
  User, 
  Star, 
  Eye, 
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  PlayCircle
} from 'lucide-react';
import { formatDate, formatCurrency } from '../../utils/formatters';

interface VideoProjectCardProps {
  project: VideoProject;
  onViewDetails: (project: VideoProject) => void;
}

export const VideoProjectCard: React.FC<VideoProjectCardProps> = ({ 
  project, 
  onViewDetails 
}) => {
  const getStatusColor = (status: VideoProject['status']): string => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'awaiting-feedback': return 'bg-yellow-100 text-yellow-800';
      case 'revision-requested': return 'bg-orange-100 text-orange-800';
      case 'material-uploaded': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: VideoProject['status']): string => {
    switch (status) {
      case 'completed': return '完了';
      case 'in-progress': return '進行中';
      case 'awaiting-feedback': return 'フィードバック待ち';
      case 'revision-requested': return '修正依頼中';
      case 'material-uploaded': return '素材アップロード済み';
      default: return '不明';
    }
  };

  const getStatusIcon = (status: VideoProject['status']) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'in-progress': return PlayCircle;
      case 'awaiting-feedback': return Clock;
      case 'revision-requested': return AlertCircle;
      case 'material-uploaded': return PlayCircle;
      default: return Clock;
    }
  };

  const getPaymentStatusColor = (status: VideoProject['paymentStatus']): string => {
    switch (status) {
      case 'paid': return 'text-green-600';
      case 'pending': return 'text-yellow-600';
      case 'overdue': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const StatusIcon = getStatusIcon(project.status);

  return (
    <Card hover className="overflow-hidden">
      <div className="space-y-4">
        {/* Thumbnail and Status */}
        <div className="relative">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-32 object-cover rounded-lg"
          />
          <div className="absolute top-2 right-2">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
              <StatusIcon className="h-3 w-3 mr-1" />
              {getStatusText(project.status)}
            </span>
          </div>
          <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
            {project.progress}% Complete
          </div>
        </div>

        {/* Project Info */}
        <div className="space-y-3">
          <div>
            <h3 className="font-bold text-gray-900 text-lg mb-1">{project.title}</h3>
            <div className="flex items-center text-sm text-gray-600">
              <User className="h-4 w-4 mr-1" />
              <span className="mr-3">{project.editorName}</span>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                <span>{project.editorRating}</span>
                <span className="ml-1 text-gray-500">({project.editorCompletedProjects})</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">進捗</span>
              <span className="font-medium">{project.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-teal-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center text-gray-600">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{formatDate(project.deliveryDate)}</span>
            </div>
            <div className={`flex items-center ${getPaymentStatusColor(project.paymentStatus)}`}>
              <DollarSign className="h-4 w-4 mr-2" />
              <span>{formatCurrency(project.budget)}</span>
            </div>
          </div>

          {/* Action Button */}
          <Button 
            className="w-full" 
            onClick={() => onViewDetails(project)}
          >
            <Eye className="h-4 w-4 mr-2" />
            詳細を見る
          </Button>
        </div>
      </div>
    </Card>
  );
};