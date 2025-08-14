import React from 'react';

interface ProjectBadgeProps {
  reward: string;
}

export const ProjectBadge: React.FC<ProjectBadgeProps> = ({ reward }) => {
  return (
    <div className="bg-[#48c9ba] text-white rounded-full max-w-[110px] h-6 flex items-center justify-center px-1.5 py-0.5">
      <span 
        className="whitespace-nowrap"
        style={{
          fontSize: '11px',
          lineHeight: '1'
        }}
      >
        {reward}
      </span>
    </div>
  );
};