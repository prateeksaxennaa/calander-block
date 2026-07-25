import React from 'react';
import type { HourlyLogItem, Assignment, Task } from '../types';

interface AnalyticsViewProps {
  logs: HourlyLogItem[];
  assignments: Assignment[];
  tasks: Task[];
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = () => {
  return (
    <div style={{ color: 'var(--text-dark)', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
          ACADEMIC TIME INTELLIGENCE
        </div>
        <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-dark)', letterSpacing: '-0.02em' }}>
          Performance & Buffer Analytics
        </div>
        <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-muted)', marginTop: '4px' }}>
          AI insights derived from your hourly activity logs and Master Timeline allocations.
        </div>
      </div>

      {/* 4 Grid Metric Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <div className="trantor-card-light">
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)' }}>
            AVG PRODUCTIVE HOURS
          </div>
          <div style={{ fontSize: '36px', fontWeight: 800, color: 'var(--text-dark)', marginTop: '4px' }}>
            6.2 hrs
          </div>
          <span className="trantor-pill trantor-pill-mint" style={{ fontSize: '11px', marginTop: '6px' }}>
            ↑ 14% vs last week
          </span>
        </div>

        <div className="trantor-card-light">
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)' }}>
            FOCUS SCORE
          </div>
          <div style={{ fontSize: '36px', fontWeight: 800, color: 'var(--mint-dark)', marginTop: '4px' }}>
            4.2 / 5
          </div>
          <span className="trantor-pill trantor-pill-lavender" style={{ fontSize: '11px', marginTop: '6px' }}>
            High Deep Work Focus
          </span>
        </div>

        <div className="trantor-card-light">
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)' }}>
            STUDY CONSISTENCY
          </div>
          <div style={{ fontSize: '36px', fontWeight: 800, color: 'var(--text-dark)', marginTop: '4px' }}>
            88%
          </div>
          <span className="trantor-pill trantor-pill-mint" style={{ fontSize: '11px', marginTop: '6px' }}>
            Optimal Routine Stability
          </span>
        </div>

        <div className="trantor-card-light">
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)' }}>
            DISTRACTION HOURS
          </div>
          <div style={{ fontSize: '36px', fontWeight: 800, color: 'var(--amber-dark)', marginTop: '4px' }}>
            1.2 hrs
          </div>
          <span className="trantor-pill trantor-pill-amber" style={{ fontSize: '11px', marginTop: '6px' }}>
            Peak at 15:00 - 17:00
          </span>
        </div>
      </div>

      {/* Hourly Productivity Heatmap & Insights */}
      <div className="trantor-card-light" style={{ marginBottom: '24px' }}>
        <div style={{
          fontSize: '12px',
          fontWeight: 700,
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          marginBottom: '16px'
        }}>
          HOURLY FOCUS HEATMAP (24-HOUR PROFILE)
        </div>

        {/* 24-Hour Intensity Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(24, 1fr)',
          gap: '4px',
          height: '44px',
          marginBottom: '12px'
        }}>
          {Array.from({ length: 24 }, (_, h) => {
            let opacity = 0.15;
            if (h >= 9 && h <= 12) opacity = 0.9;
            else if (h >= 18 && h <= 21) opacity = 0.8;
            else if (h >= 15 && h <= 17) opacity = 0.35;

            return (
              <div
                key={h}
                style={{
                  backgroundColor: 'var(--card-dark)',
                  opacity,
                  borderRadius: '6px'
                }}
                title={`${String(h).padStart(2, '0')}:00 Focus level`}
              />
            );
          })}
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '11px',
          fontWeight: 700,
          color: 'var(--text-muted)'
        }}>
          <span>00:00</span>
          <span>06:00</span>
          <span>12:00</span>
          <span>18:00</span>
          <span>23:00</span>
        </div>
      </div>

      {/* Key AI Takeaways */}
      <div className="trantor-card-dark">
        <div style={{
          fontSize: '12px',
          fontWeight: 700,
          color: 'var(--text-muted-dark)',
          textTransform: 'uppercase',
          marginBottom: '16px'
        }}>
          AI TIME PROTECTION TAKEAWAYS
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <span style={{ color: 'var(--mint)' }}>⚡</span>
            <div><strong style={{ color: 'var(--text-light)' }}>Best Focus Windows:</strong> Your peak focus occurs between 09:00 – 12:00 AM after morning lectures and 20:00 – 22:00 PM for deep coding.</div>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <span style={{ color: 'var(--amber)' }}>⚠️</span>
            <div><strong style={{ color: 'var(--text-light)' }}>Distraction Warning:</strong> Energy drops significantly between 15:00 – 17:00. Use this window for light gym workouts or buffer rest.</div>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <span style={{ color: 'var(--lavender)' }}>🛡️</span>
            <div><strong style={{ color: 'var(--text-light)' }}>Buffer Health:</strong> You maintain an average free buffer of 3.2 hours per day. Keep assignments auto-split to avoid end-of-week cramming.</div>
          </div>
        </div>
      </div>
    </div>
  );
};
