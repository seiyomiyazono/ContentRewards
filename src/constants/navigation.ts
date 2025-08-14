import { Home, FileText, Users, BarChart3, User, Bell, Briefcase, Bot, DivideIcon as LucideIcon } from 'lucide-react';

export interface NavigationItem {
  id: string;
  name: string;
  icon: LucideIcon;
}

export const navigation: NavigationItem[] = [
  { id: 'dashboard', name: 'ダッシュボード', icon: Home },
  { id: 'projects', name: '案件一覧', icon: FileText },
  { id: 'video-dashboard', name: '案件管理', icon: Briefcase },
  { id: 'groups', name: 'グループ', icon: Users },
  { id: 'analytics', name: '売上・ランキング', icon: BarChart3 },
  { id: 'profile', name: 'プロフィール', icon: User },
  { id: 'ai-support', name: 'AIサポート', icon: Bot },
  { id: 'notifications', name: '通知センター', icon: Bell },
];