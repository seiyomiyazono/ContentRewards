import React from 'react';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Search, Filter, ArrowUpDown } from 'lucide-react';

interface ProjectFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filterCategory: string;
  onFilterChange: (category: string) => void;
  onFilterClick: () => void;
  onSortClick: () => void;
}

export const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  searchTerm,
  onSearchChange,
  filterCategory,
  onFilterChange,
  onFilterClick,
  onSortClick
}) => {
  return (
    <Card>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="案件を検索..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
        <select 
          value={filterCategory}
          onChange={(e) => onFilterChange(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        >
          <option value="all">すべてのカテゴリ</option>
          <option value="video">動画</option>
          <option value="article">記事</option>
          <option value="review">レビュー</option>
        </select>
        <Button variant="secondary" onClick={onFilterClick}>
          <Filter className="h-4 w-4 mr-2" />
          フィルター
        </Button>
        <Button variant="secondary" onClick={onSortClick}>
          <ArrowUpDown className="h-4 w-4 mr-2" />
          並び替え
        </Button>
      </div>
    </Card>
  );
};