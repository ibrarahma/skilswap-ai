import React from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { AuthModal } from './components/auth/AuthModal';
import { ProfileView } from './components/profile/ProfileView';

import { DashboardView } from './components/dashboard/DashboardView';
import { SkillsExchange } from './components/skills/SkillsExchange';
import { AITeamFinder } from './components/team/AITeamFinder';
import { ProjectHub } from './components/projects/ProjectHub';
import { HackathonSection } from './components/hackathons/HackathonSection';
import { StartupHub } from './components/startups/StartupHub';
import { CommunityForum } from './components/community/CommunityForum';
import { AICareerSuite } from './components/ai/AICareerSuite';
import { ChatView } from './components/chat/ChatView';
import { AdminPanel } from './components/admin/AdminPanel';

export function App() {
  const { activeTab, selectedUserProfile, authModalOpen } = useApp();

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'skills':
        return <SkillsExchange />;
      case 'ai-team':
        return <AITeamFinder />;
      case 'projects':
        return <ProjectHub />;
      case 'hackathons':
        return <HackathonSection />;
      case 'startups':
        return <StartupHub />;
      case 'community':
        return <CommunityForum />;
      case 'ai-career':
        return <AICareerSuite />;
      case 'chat':
        return <ChatView />;
      case 'admin':
        return <AdminPanel />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200">
      
      {/* Top Fixed Header */}
      <Navbar />

      {/* Main Layout Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          
          {/* Collapsible / Responsive Navigation Sidebar */}
          <Sidebar />

          {/* Core Content Viewstage */}
          <main className="flex-1 w-full min-w-0">
            {renderActiveTab()}
          </main>

        </div>
      </div>

      {/* Global Modals */}
      {selectedUserProfile && <ProfileView />}
      {authModalOpen && <AuthModal />}

    </div>
  );
}

export default App;
