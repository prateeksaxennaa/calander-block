import React from 'react';
import { Search, Sparkles, Calendar as CalendarIcon, Bell } from 'lucide-react';
import type { BufferEngineMetrics } from '../types';

interface HeaderProps {
  metrics: BufferEngineMetrics;
  onOpenSearch: () => void;
  onOpenAIDrawer: () => void;
  onOpenTimetable: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  metrics,
  onOpenSearch,
  onOpenAIDrawer,
  onOpenTimetable
}) => {
  return (
    <header className="app-header">
      <div className="header-container">
        {/* Brand & Greeting with User Avatar */}
        <div className="header-user-section">
          {/* User Profile Avatar Circle */}
          <div className="user-avatar-circle">
            PS
          </div>

          <div className="user-greeting-box">
            <div className="user-greeting-title">
              <span>Hey, Prateek!</span>
              <span>👋</span>
            </div>
            <div className="user-greeting-subtitle">
              Academic Operating System <span className="subtitle-divider">///</span> JKLU 2026
            </div>
          </div>

          {/* Live Buffer Status Pill */}
          <div className="trantor-pill trantor-pill-mint buffer-status-pill">
            <span>🛡️</span>
            <span>{Math.floor(metrics.freeBufferHours)}h {Math.round((metrics.freeBufferHours % 1) * 60)}m Free</span>
          </div>
        </div>

        {/* Center Search Pill Bar */}
        <div className="header-search-section">
          <button
            onClick={onOpenSearch}
            className="header-search-btn"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Search size={16} color="var(--text-dark)" />
              <span className="search-placeholder">Search assignments, classes, logs...</span>
            </div>
            <span className="kbd-shortcut-tag">
              ⌘K
            </span>
          </button>
        </div>

        {/* Right Action Icons & Triggers */}
        <div className="header-actions-section">
          <button
            onClick={onOpenTimetable}
            title="Weekly Timetable"
            className="header-action-btn desktop-only"
          >
            <CalendarIcon size={16} color="var(--mint-dark)" />
            <span>TIMETABLE</span>
          </button>

          <button
            onClick={onOpenAIDrawer}
            className="header-ai-btn"
          >
            <Sparkles size={16} color="var(--mint)" />
            <span className="desktop-only">AI ASSISTANT</span>
          </button>

          <button
            title="Notifications"
            className="header-icon-btn desktop-only"
          >
            <Bell size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};
