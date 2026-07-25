import React from 'react';
import type { TabType } from '../types';
import { Home, Clock, Calendar, BookOpen, FileText, BarChart2, Plus, Sparkles, ShieldCheck } from 'lucide-react';

interface SidebarNavProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  onOpenQuickAdd: () => void;
  onOpenAIDrawer: () => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  activeTab,
  onSelectTab,
  onOpenQuickAdd,
  onOpenAIDrawer
}) => {
  const navItems: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home OS', icon: <Home size={18} /> },
    { id: 'timeline', label: 'Master Matrix', icon: <Clock size={18} /> },
    { id: 'timetable', label: 'Class Timetable', icon: <Calendar size={18} /> },
    { id: 'assignments', label: 'Assignments', icon: <BookOpen size={18} /> },
    { id: 'academic_calendar', label: 'Uni Calendar', icon: <ShieldCheck size={18} /> },
    { id: 'journal', label: 'Hourly Log', icon: <FileText size={18} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart2 size={18} /> }
  ];

  const mobileNavItems: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Home size={20} /> },
    { id: 'timeline', label: 'Matrix', icon: <Clock size={20} /> },
    { id: 'assignments', label: 'Tasks', icon: <BookOpen size={20} /> },
    { id: 'journal', label: 'Logs', icon: <FileText size={20} /> }
  ];

  return (
    <>
      {/* Desktop Left Navigation Sidebar */}
      <aside className="desktop-sidebar" style={{
        width: '260px',
        flexShrink: 0,
        backgroundColor: 'transparent',
        padding: '16px 0 24px 24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 'calc(100vh - 74px)',
        position: 'sticky',
        top: '74px'
      }}>
        {/* Navigation Card */}
        <div style={{
          backgroundColor: 'var(--card-light)',
          borderRadius: 'var(--radius-card)',
          padding: '20px 14px',
          boxShadow: 'var(--shadow-soft)',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px'
        }}>
          <div style={{
            fontSize: '11px',
            fontWeight: 800,
            color: 'var(--text-muted)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '10px',
            paddingLeft: '12px'
          }}>
            SYSTEM MODULES
          </div>

          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                style={{
                  fontWeight: 700,
                  fontSize: '13px',
                  color: isActive ? 'var(--card-light)' : 'var(--text-dark)',
                  backgroundColor: isActive ? 'var(--card-dark)' : 'transparent',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-pill)',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: isActive ? '0 6px 16px rgba(0,0,0,0.12)' : 'none'
                }}
              >
                <span style={{ color: isActive ? 'var(--mint)' : 'var(--text-muted)' }}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Action Triggers */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
            onClick={onOpenAIDrawer}
            style={{
              backgroundColor: 'var(--mint)',
              color: 'var(--mint-dark)',
              borderRadius: 'var(--radius-pill)',
              padding: '14px',
              fontWeight: 800,
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 14px rgba(0,0,0,0.04)',
              cursor: 'pointer'
            }}
          >
            <Sparkles size={18} /> ASK AI OS
          </button>

          <button
            onClick={onOpenQuickAdd}
            style={{
              backgroundColor: 'var(--card-dark)',
              color: 'var(--card-light)',
              borderRadius: 'var(--radius-pill)',
              padding: '14px',
              fontWeight: 800,
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
              cursor: 'pointer'
            }}
          >
            <Plus size={18} strokeWidth={3} color="var(--mint)" /> QUICK TASK
          </button>
        </div>
      </aside>

      {/* Trantor Curved Floating Bottom Bar (Matching Reference Screenshot) */}
      <nav className="mobile-bottom-bar" style={{
        position: 'fixed',
        bottom: '16px',
        left: '16px',
        right: '16px',
        zIndex: 100,
        backgroundColor: 'var(--card-dark)',
        borderRadius: '36px',
        padding: '10px 20px',
        boxShadow: '0 16px 40px rgba(0,0,0,0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {mobileNavItems.slice(0, 2).map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              style={{
                color: isActive ? 'var(--mint)' : 'var(--text-muted-dark)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2px',
                padding: '6px 12px',
                fontSize: '10px',
                fontWeight: 700
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          );
        })}

        {/* Central Prominent Floating Action Icon (Trantor Center Circle Button) */}
        <button
          onClick={onOpenQuickAdd}
          title="Quick Add Task"
          style={{
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            backgroundColor: 'var(--card-light)',
            color: 'var(--card-dark)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '4px solid var(--card-dark)',
            margin: '-26px 0 0 0',
            boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
            cursor: 'pointer'
          }}
        >
          <Plus size={24} strokeWidth={3} color="var(--card-dark)" />
        </button>

        {mobileNavItems.slice(2, 4).map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              style={{
                color: isActive ? 'var(--mint)' : 'var(--text-muted-dark)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2px',
                padding: '6px 12px',
                fontSize: '10px',
                fontWeight: 700
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
