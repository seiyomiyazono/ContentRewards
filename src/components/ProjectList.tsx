import React, { useState } from 'react';
import { Button } from './ui/Button';
import { ProjectCard } from './projects/ProjectCard';
import { ProjectFilters } from './projects/filters/ProjectFilters';
import { mockProjects } from '../data/mockData';
import { Project } from '../types';

export const ProjectList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const handleViewDetails = (project: Project) => {
    console.log('View details for project:', project.id);
  };

  const handleFilterClick = () => {
    console.log('Filter clicked');
  };

  const handleSortClick = () => {
    console.log('Sort clicked');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">案件一覧</h2>
          <p className="text-gray-600 mt-1">利用可能な案件とあなたの進行状況</p>
        </div>
      </div>

      {/* Filters and Search */}
      <ProjectFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterCategory={filterCategory}
        onFilterChange={setFilterCategory}
        onFilterClick={handleFilterClick}
        onSortClick={handleSortClick}
      />

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProjects.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center">
        <Button variant="secondary">
          さらに読み込む
        </Button>
      </div>
    </div>
  );
};