import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronDown, Users, Crown, ChevronRight, UserCheck, Settings, User, Menu, X } from 'lucide-react';
import { navigation } from '../constants/navigation';
import { mockGroups } from '../data/mockData';
import { Group } from '../types';

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = () => {
  const location = useLocation();
  const [showGroupDropdown, setShowGroupDropdown] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('sidebar');
      const menuButton = document.getElementById('menu-button');
      
      if (isSidebarOpen && sidebar && menuButton && 
          !sidebar.contains(event.target as Node) && 
          !menuButton.contains(event.target as Node)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSidebarOpen]);

  // Close sidebar when route changes
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);
  const getActiveTab = () => {
    const path = location.pathname;
    if (path.startsWith('/projects')) return 'projects';
    if (path === '/video-dashboard') return 'video-dashboard';
    if (path === '/dashboard') return 'dashboard';
    if (path === '/groups' || path === '/groups/member' || path.startsWith('/groups/')) return 'groups';
    if (path === '/analytics') return 'analytics';
    if (path === '/profile') return 'profile';
    if (path === '/notifications') return 'notifications';
    return 'dashboard';
  };
  
  const getSelectedGroup = (): Group | null => {
    const path = location.pathname;
    const groupIdMatch = path.match(/\/groups\/([^\/]+)\/details/);
    const groupId = groupIdMatch ? groupIdMatch[1] : null;
    
    if (groupId) {
      return mockGroups.find(group => group.id === groupId) || null;
    }
    return null;
  };
  
  const activeTab = getActiveTab();
  const selectedGroup = getSelectedGroup();

  // Filter groups by role
  const participantGroups = mockGroups.filter(group => group.role === 'participant');
  const creatorGroups = mockGroups.filter(group => group.role === 'creator');

  const handleGroupClick = (type: 'member' | 'client') => {
    setShowGroupDropdown(false);
    // Navigate to groups with the selected type
    window.location.href = `/groups?type=${type}`;
  };

  const isGroupSelected = (groupId: string): boolean => {
    return selectedGroup?.id === groupId;
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        id="menu-button"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-teal-500 text-white rounded-lg shadow-lg hover:bg-teal-600 transition-colors"
      >
        {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300" />
      )}

      {/* Sidebar */}
      <div 
        id="sidebar"
        className={`
          h-screen bg-teal-500 w-64 fixed left-0 top-0 z-40 transform transition-transform duration-300 ease-in-out flex flex-col
          lg:translate-x-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="p-6">
          <h1 className="text-white text-xl font-semibold">Content Rewards</h1>
        </div>
      
        <nav className="px-3 space-y-1 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-teal-300 scrollbar-track-teal-100">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            // Special handling for groups menu
            if (item.id === 'groups') {
              
              return (
                <div key={item.id} className="relative">
                  <button
                    onClick={() => setShowGroupDropdown(!showGroupDropdown)}
                    className={`
                      w-full flex items-center justify-between px-3 py-3 rounded-lg transition-all duration-200
                      ${isActive 
                        ? 'bg-white text-gray-900 shadow-sm' 
                        : 'text-teal-50 hover:bg-teal-400/50 hover:text-white'
                      }
                    `}
                  >
                    <div className="flex items-center">
                      <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-teal-500' : ''}`} />
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                      showGroupDropdown ? 'rotate-180' : ''
                    }`} />
                    {isActive && (
                      <div className="absolute left-0 w-1 h-8 bg-teal-600 rounded-r-full"></div>
                    )}
                  </button>
                  
                  {showGroupDropdown && (
                    <div className="mt-1 ml-6 space-y-1">
                      {/* 参加者として参加しているグループ */}
                      {participantGroups.length > 0 && (
                        <>
                          <div className="px-3 py-2 text-xs font-semibold text-teal-200 uppercase tracking-wide flex items-center">
                            <UserCheck className="h-3 w-3 mr-2" />
                            参加者として
                          </div>
                          {participantGroups.map((group) => (
                            <Link
                              key={group.id}
                              to={`/groups/${group.id}/details`}
                              className={`w-full flex items-center px-3 py-2 rounded-lg transition-all duration-200 ${
                                isGroupSelected(group.id)
                                  ? 'bg-white/20 text-white shadow-sm border border-white/30'
                                  : 'text-teal-50 hover:bg-teal-400/50 hover:text-white'
                              }`}
                            >
                              <div className="w-6 h-6 bg-teal-400/30 rounded mr-3 flex items-center justify-center">
                                <Users className="h-3 w-3" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <span className="text-sm font-medium truncate block">{group.name}</span>
                                <span className="text-xs text-teal-200">{group.memberCount}人</span>
                              </div>
                              {isGroupSelected(group.id) && (
                                <div className="w-2 h-2 bg-white rounded-full ml-2 shadow-sm"></div>
                              )}
                            </Link>
                          ))}
                        </>
                      )}

                      {/* 作成者として管理しているグループ */}
                      {creatorGroups.length > 0 && (
                        <>
                          <div className="px-3 py-2 text-xs font-semibold text-teal-200 uppercase tracking-wide flex items-center mt-3">
                            <Crown className="h-3 w-3 mr-2" />
                            クライアントとして
                          </div>
                          {creatorGroups.map((group) => (
                            <Link
                              key={group.id}
                              to={`/groups/${group.id}/details`}
                              className={`w-full flex items-center px-3 py-2 rounded-lg transition-all duration-200 ${
                                isGroupSelected(group.id)
                                  ? 'bg-white/20 text-white shadow-sm border border-white/30'
                                  : 'text-teal-50 hover:bg-teal-400/50 hover:text-white'
                              }`}
                            >
                              <div className={`w-6 h-6 rounded mr-3 flex items-center justify-center ${
                                isGroupSelected(group.id) ? 'bg-white/30' : 'bg-orange-400/30'
                              }`}>
                                <Crown className="h-3 w-3" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <span className="text-sm font-medium truncate block">{group.name}</span>
                                <span className="text-xs text-teal-200">{group.memberCount}人</span>
                              </div>
                              {isGroupSelected(group.id) && (
                                <div className="w-2 h-2 bg-white rounded-full ml-2 shadow-sm"></div>
                              )}
                            </Link>
                          ))}
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            }
            
            const getPath = (id: string) => {
              if (id === 'dashboard') return '/dashboard';
              if (id === 'projects') return '/projects';
              if (id === 'video-dashboard') return '/video-dashboard';
              if (id === 'analytics') return '/analytics';
              if (id === 'profile') return '/profile';
              if (id === 'notifications') return '/notifications';
              if (id === 'ai-support') return '/ai-support';
              return '/dashboard';
            };
            
            return (
              <Link
                key={item.id}
                to={getPath(item.id)}
                className={`
                  w-full flex items-center px-3 py-3 rounded-lg transition-all duration-200
                  ${isActive 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-teal-50 hover:bg-teal-400/50 hover:text-white'
                  }
                `}
              >
                <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-teal-500' : ''}`} />
                <span className="font-medium">{item.name}</span>
                {isActive && (
                  <div className="absolute left-0 w-1 h-8 bg-teal-600 rounded-r-full"></div>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
};