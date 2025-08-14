import React from 'react';

interface ProjectProgressProps {
  currentPayout: number;
  totalPayout: number;
  progress: number;
}

export const ProjectProgress: React.FC<ProjectProgressProps> = ({
  currentPayout,
  totalPayout,
  progress
}) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">
          ￥{currentPayout.toLocaleString()} / ￥{totalPayout.toLocaleString()} 支払済み
        </span>
        <span className="font-medium text-gray-900">{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-orange-400 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};