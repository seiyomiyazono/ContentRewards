import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Project } from '../../types';
import { CategoryIcon } from './CategoryIcon';
import { ProjectBadge } from './ProjectBadge';
import { ProjectProgress } from './ProjectProgress';
import { PlatformIcons } from './PlatformIcons';
import { getPlatformsByCategory, calculateCurrentPayout } from '../../utils/project';

interface ProjectCardProps {
  project: Project;
  onViewDetails?: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onViewDetails }) => {
  const platforms = getPlatformsByCategory(project.category);
  const currentPayout = calculateCurrentPayout(project.totalPayout, project.progress);
  
  return (
    <Link to={`/projects/${project.id}`} className="block h-full">
      <Card hover className="cursor-pointer h-full">
        <div className="space-y-4">
          {/* Header with logo and reward */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CategoryIcon category={project.category} />
              <div>
                <h3 className="font-bold text-gray-900 text-sm">
                  {project.title.split(' ')[0]}
                </h3>
              </div>
            </div>
            <ProjectBadge reward={project.reward} />
          </div>

          {/* Project title */}
          <div>
            <h4 className="font-medium text-gray-900 text-sm leading-tight">
              {project.title}
            </h4>
          </div>

          {/* Progress and payout */}
          <ProjectProgress 
            currentPayout={currentPayout}
            totalPayout={project.totalPayout}
            progress={project.progress}
          />

          {/* Details grid */}
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-500 font-medium mb-1">種類</p>
              <p className="text-gray-900 capitalize">{project.category}</p>
            </div>
            <div>
              <p className="text-gray-500 font-medium mb-1">プラットフォーム</p>
              <PlatformIcons platforms={platforms} />
            </div>
            <div>
              <p className="text-gray-500 font-medium mb-1">再生数</p>
              <p className="text-gray-900 font-medium">{project.viewsRequired.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};