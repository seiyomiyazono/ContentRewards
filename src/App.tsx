import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { ProjectList } from './components/ProjectList';
import { ProjectDetail } from './components/projects/ProjectDetail';
import { Groups } from './components/Groups';
import { Analytics } from './components/Analytics';
import { Profile } from './components/Profile';
import { Notifications } from './components/Notifications';
import { AISupport } from './components/AISupport';
import { VideoDashboard } from './components/video/VideoDashboard';
import { MemberGroupsView } from './components/groups/MemberGroupsView';
import { GroupDetailView } from './components/groups/GroupDetailView';
import { NotFound } from './components/NotFound';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
        <main className="lg:ml-64 min-h-screen">
          <div className="p-8">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/projects" element={<ProjectList />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />
              <Route path="/video-dashboard" element={<VideoDashboard />} />
              <Route path="/groups" element={<Groups />} />
              <Route path="/groups/member" element={<MemberGroupsView />} />
              <Route path="/groups/:groupId/details" element={<GroupDetailView />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/ai-support" element={<AISupport />} />
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </div>
        </main>
        
        {/* Mobile overlay for sidebar */}
        <div className="lg:hidden">
          {/* This would be for mobile responsive behavior */}
        </div>
      </div>
    </Router>
  );
}

export default App;