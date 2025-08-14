import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProjectDetail } from '../../hooks/useProjectDetail';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { 
  ArrowLeft, 
  Star, 
  Users, 
  Check,
  CreditCard
} from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { project, loading } = useProjectDetail(id);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : i < rating 
            ? 'text-yellow-400 fill-current opacity-50'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const renderReviewStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < rating 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-gray-200 rounded"></div>
          <div className="h-6 bg-gray-200 rounded w-32"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-80 bg-gray-200 rounded-2xl"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="h-64 bg-gray-200 rounded-2xl"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/projects')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        案件一覧に戻る
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hero Image */}
          <div className="relative">
            <img
              src={project.heroImage}
              alt={project.title}
              className="w-full h-80 object-cover rounded-2xl"
            />
            <div className="absolute bottom-4 left-4">
              <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                <h3 className="font-bold text-gray-900">{project.title}</h3>
              </div>
            </div>
          </div>

          {/* Project Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-900 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">BM</span>
              </div>
              <span className="text-gray-600">{project.companyName}</span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900">
              {project.title}
            </h1>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {renderStars(project.rating)}
                <span className="ml-2 font-medium">{project.rating.toFixed(1)} ({project.totalReviews}件のレビュー)</span>
              </div>
              <span className="text-gray-600">•</span>
              <span className="text-gray-600">ソーシャルメディア</span>
            </div>

            <p className="text-gray-600 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Features */}
          <Card>
            <h3 className="text-xl font-bold text-gray-900 mb-4">機能・特典</h3>
            <div className="space-y-3">
              {project.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-gray-900">{feature}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Reviews */}
          <Card>
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900">レビュー</h3>
              
              {/* Rating Summary */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  {renderStars(project.rating)}
                  <span className="text-2xl font-bold">5段階中 {project.rating}</span>
                </div>
                <span className="text-gray-600">全{project.totalReviews}件のレビュー</span>
              </div>

              {/* Rating Breakdown */}
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const count = project.reviews.filter(r => r.rating === stars).length;
                  const percentage = project.totalReviews > 0 ? (count / project.totalReviews) * 100 : 0;
                  
                  return (
                    <div key={stars} className="flex items-center gap-3">
                      <span className="text-sm text-gray-600 w-12">{stars}つ星</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-yellow-400 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Individual Reviews */}
              <div className="space-y-4">
                {project.reviews.map((review) => (
                  <div key={review.id} className="border-t border-gray-100 pt-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                          <span className="text-sm">{review.avatar}</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{review.userName}</h4>
                          <div className="flex items-center gap-1">
                            {renderReviewStars(review.rating)}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{review.timestamp}</span>
                    </div>
                    <p className="text-gray-700 mb-2">{review.comment}</p>
                    <p className="text-xs text-gray-500">{review.purchaseTime}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <div className="space-y-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">
                  {formatCurrency(project.price)}
                </div>
                <div className="text-sm text-gray-600">買い切り価格</div>
              </div>

              <div className="space-y-3">
                <Button className="w-full bg-black text-white hover:bg-gray-800">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Google Pay
                </Button>
                <Button className="w-full">
                  今すぐ申し込む
                </Button>
              </div>

              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <Users className="h-4 w-4" />
                {project.memberCount}人のメンバーと参加
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};