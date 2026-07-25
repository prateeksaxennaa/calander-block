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
    <header style={{
      backgroundColor: 'var(--canvas-bg)',
      padding: '16px 28px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      width: '100%'
    }}>
      {/* Brand & Greeting with User Avatar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* User Profile Avatar Circle */}
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '50%',
          backgroundColor: 'var(--card-dark)',
          color: 'var(--card-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 800,
          fontSize: '14px',
          border: '2px solid var(--card-light)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
        }}>
          PS
        </div>

        <div>
          <div style={{
            fontSize: '17px',
            fontWeight: 800,
            color: 'var(--text-dark)',
            letterSpacing: '-0.02em',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span>Hey, Prateek!</span>
            <span style={{ fontSize: '16px' }}>👋</span>
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--text-muted)',
            fontWeight: 500
          }}>
            Academic Operating System /// JKLU 2026
          </div>
        </div>

        {/* Live Buffer Status Pill */}
        <div
          className="desktop-only trantor-pill trantor-pill-mint"
          style={{ marginLeft: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}
        >
          <span>🛡️</span>
          <span>{Math.floor(metrics.freeBufferHours)}h {Math.round((metrics.freeBufferHours % 1) * 60)}m Buffer Free</span>
        </div>
      </div>

      {/* Center Search Pill Bar */}
      <div style={{ flex: 1, maxWidth: '400px', margin: '0 24px' }}>
        <button
          onClick={onOpenSearch}
          style={{
            width: '100%',
            backgroundColor: 'var(--card-light)',
            border: 'none',
            borderRadius: 'var(--radius-pill)',
            padding: '10px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: 'var(--text-muted)',
            boxShadow: '0 4px 14px rgba(0,0,0,0.04)',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Search size={16} color="var(--text-dark)" />
            <span>Search assignments, classes, logs...</span>
          </div>
          <span style={{
            backgroundColor: '#F0F0F2',
            color: 'var(--text-dark)',
            fontSize: '10px',
            fontWeight: 700,
            padding: '2px 8px',
            borderRadius: '10px'
          }}>
            ⌘K
          </span>
        </button>
      </div>

      {/* Right Action Icons & Triggers */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          onClick={onOpenTimetable}
          title="Weekly Timetable"
          style={{
            backgroundColor: 'var(--card-light)',
            color: 'var(--text-dark)',
            borderRadius: 'var(--radius-pill)',
            padding: '10px 18px',
            fontSize: '12px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 14px rgba(0,0,0,0.04)',
            cursor: 'pointer'
          }}
        >
          <CalendarIcon size={16} color="var(--mint-dark)" />
          <span className="desktop-only">TIMETABLE</span>
        </button>

        <button
          onClick={onOpenAIDrawer}
          style={{
            backgroundColor: 'var(--card-dark)',
            color: 'var(--card-light)',
            borderRadius: 'var(--radius-pill)',
            padding: '10px 20px',
            fontSize: '12px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
            cursor: 'pointer'
          }}
        >
          <Sparkles size={16} color="var(--mint)" />
          <span>AI ASSISTANT</span>
        </button>

        <button
          title="Notifications"
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            backgroundColor: 'var(--card-light)',
            color: 'var(--text-dark)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(0,0,0,0.04)'
          }}
        >
          <Bell size={18} />
        </button>
      </div>
    </header>
  );
};
