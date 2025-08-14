import React from 'react';
import { PLATFORM_CONFIGS } from '../../constants/project';

interface PlatformIconsProps {
  platforms: string[];
}

export const PlatformIcons: React.FC<PlatformIconsProps> = ({ platforms }) => {
  return (
    <div className="flex space-x-1">
      {platforms.map((platform, index) => {
        const config = PLATFORM_CONFIGS[platform as keyof typeof PLATFORM_CONFIGS];
        if (!config) return null;
        
        return (
          <div key={index} className="w-5 h-5 rounded bg-gray-200 flex items-center justify-center">
            <div className={`w-3 h-3 rounded ${config.bgColor}`}></div>
          </div>
        );
      })}
    </div>
  );
};