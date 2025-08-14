import React from 'react';
import { Video, FileText, Star, Play } from 'lucide-react';
import { PROJECT_CATEGORIES } from '../../constants/project';

interface CategoryIconProps {
  category: string;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case PROJECT_CATEGORIES.video: return Video;
    case PROJECT_CATEGORIES.article: return FileText;
    case PROJECT_CATEGORIES.review: return Star;
    default: return Play;
  }
};

export const CategoryIcon: React.FC<CategoryIconProps> = ({ category }) => {
  const Icon = getCategoryIcon(category);
  
  return (
    <div 
      className="w-12 h-12 rounded-lg flex items-center justify-center" 
      style={{ background: 'linear-gradient(45deg, #48c9ba, #6fe7dd)' }}
    >
      <Icon className="h-6 w-6 text-white" />
    </div>
  );
};