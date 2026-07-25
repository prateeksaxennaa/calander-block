import React from 'react';
import type { TabType } from '../types';
import { Plus } from 'lucide-react';

interface BottomTabBarProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  onOpenQuickAdd: () => void;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  activeTab,
  onSelectTab,
  onOpenQuickAdd
}) => {
  const tabs: { id: TabType; label: string }[] = [
    { id: 'home', label: 'HOME' },
    { id: 'timeline', label: 'MATRIX' },
    { id: 'timetable', label: 'TIMETABLE' },
    { id: 'assignments', label: 'ASSIGNMENTS' }
  ];

  return (
    <div style={{
      position: 'sticky',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      backgroundColor: 'var(--black)',
      borderTop: 'var(--border-subtle)',
      paddingLeft: '16px',
      paddingRight: '16px',
      paddingTop: '10px',
      paddingBottom: '14px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      maxWidth: '390px',
      margin: '0 auto'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '11px',
                letterSpacing: '0.04em',
                color: isActive ? 'var(--white)' : 'var(--text-dim)',
                paddingBottom: '4px',
                position: 'relative',
                transition: 'color 0.15s ease',
                textTransform: 'uppercase',
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer'
              }}
            >
              {tab.label}
              {isActive && (
                <div style={{
                  position: 'absolute',
                  bottom: '-2px',
                  left: 0,
                  right: 0,
                  height: '3px',
                  backgroundColor: 'var(--lime)',
                  borderRadius: '1px'
                }} />
              )}
            </button>
          );
        })}
      </div>

      <button
        onClick={onOpenQuickAdd}
        title="Quick Add Task"
        style={{
          width: '40px',
          height: '40px',
          backgroundColor: 'var(--lime)',
          color: 'var(--black)',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        <Plus size={20} strokeWidth={3} />
      </button>
    </div>
  );
};
