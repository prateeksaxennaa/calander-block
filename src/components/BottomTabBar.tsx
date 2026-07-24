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
    { id: 'today', label: 'TODAY' },
    { id: 'timeline', label: '24H MATRIX' },
    { id: 'week', label: 'WEEK' },
    { id: 'calendar', label: 'CALENDAR' }
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
      paddingLeft: '20px',
      paddingRight: '20px',
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
        gap: '12px'
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
                fontSize: '12px',
                letterSpacing: '0.04em',
                color: isActive ? 'var(--white)' : 'var(--text-dim)',
                paddingBottom: '4px',
                position: 'relative',
                transition: 'color 0.15s ease',
                textTransform: 'uppercase'
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

      {/* Quick Add FAB Button (Lime background, black icon) */}
      <button
        onClick={onOpenQuickAdd}
        title="Quick Add Task"
        style={{
          width: '44px',
          height: '44px',
          backgroundColor: 'var(--lime)',
          color: 'var(--black)',
          borderRadius: '22px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: 'none',
          transition: 'transform 0.15s ease',
          boxSizing: 'border-box'
        }}
        onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.92)')}
        onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        <Plus size={24} strokeWidth={3} />
      </button>
    </div>
  );
};
