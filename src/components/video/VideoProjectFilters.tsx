import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Search, Filter, Calendar, User } from 'lucide-react';

interface VideoProjectFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  editorFilter: string;
  onEditorFilterChange: (editor: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export const VideoProjectFilters: React.FC<VideoProjectFiltersProps> = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  editorFilter,
  onEditorFilterChange,
  sortBy,
  onSortChange
}) => {
  return (
    <Card>
      <div className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="プロジェクトを検索..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select 
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="all">すべてのステータス</option>
            <option value="in-progress">進行中</option>
            <option value="awaiting-feedback">フィードバック待ち</option>
            <option value="completed">完了</option>
            <option value="revision-requested">修正依頼中</option>
          </select>

          <select 
            value={editorFilter}
            onChange={(e) => onEditorFilterChange(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="all">すべてのエディター</option>
            <option value="Alex Chen">Alex Chen</option>
            <option value="Sarah Johnson">Sarah Johnson</option>
            <option value="Mike Rodriguez">Mike Rodriguez</option>
          </select>

          <select 
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="newest">新しい順</option>
            <option value="oldest">古い順</option>
            <option value="deadline">期限順</option>
            <option value="progress">進捗順</option>
          </select>

          <Button variant="secondary" className="flex items-center justify-center">
            <Filter className="h-4 w-4 mr-2" />
            詳細フィルター
          </Button>
        </div>
      </div>
    </Card>
  );
};