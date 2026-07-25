import React from 'react';
import type { BufferEngineMetrics } from '../types';
import { Zap, ShieldCheck, AlertTriangle, AlertOctagon, RefreshCw } from 'lucide-react';

interface BufferGaugeProps {
  metrics: BufferEngineMetrics;
  onOptimizeClick?: () => void;
}

export const BufferGauge: React.FC<BufferGaugeProps> = ({ metrics, onOptimizeClick }) => {
  // Allocation percentages for visual 24h bar
  const sleepPct = (metrics.sleepHours / 24) * 100;
  const classPct = (metrics.classHours / 24) * 100;
  const habitPct = (metrics.habitHours / 24) * 100;
  const taskPct = (metrics.taskAssignmentHours / 24) * 100;
  const bufferPct = (metrics.freeBufferHours / 24) * 100;

  return (
    <div className="trantor-card-light" style={{ marginBottom: '24px', position: 'relative' }}>
      {/* Subtitle Label */}
      <div style={{
        fontSize: '12px',
        fontWeight: 700,
        color: 'var(--text-muted)',
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        marginBottom: '6px'
      }}>
        FREE AVAILABLE BUFFER TODAY
      </div>

      {/* Main Metric Callout (Trantor Balance Callout Style) */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        marginBottom: '20px',
        flexWrap: 'wrap'
      }}>
        <div style={{
          fontSize: '44px',
          fontWeight: 800,
          color: 'var(--text-dark)',
          letterSpacing: '-0.03em',
          lineHeight: 1
        }}>
          {Math.floor(metrics.freeBufferHours)}h {Math.round((metrics.freeBufferHours % 1) * 60)}m
        </div>

        {/* Status Badge Pill */}
        <div className={`trantor-pill ${metrics.status === 'HEALTHY' ? 'trantor-pill-mint' : 'trantor-pill-amber'}`}>
          {metrics.status === 'HEALTHY' && <ShieldCheck size={14} />}
          {metrics.status === 'OVERBOOKED' && <AlertTriangle size={14} />}
          {metrics.status === 'IMPOSSIBLE' && <AlertOctagon size={14} />}
          <span>{metrics.status} STATUS</span>
        </div>
      </div>

      {/* Interlocking Dual Pill Control Bar (Trantor Transfer/Receive Pill) */}
      <div className="interlocking-pill-group" style={{ marginBottom: '24px' }}>
        <button className="interlocking-pill-btn active">
          <span>🛡️ Time Protection Engine</span>
        </button>

        <div className="interlocking-center-icon">
          <RefreshCw size={18} />
        </div>

        <button
          className="interlocking-pill-btn"
          onClick={onOptimizeClick}
          style={{ backgroundColor: 'var(--mint-light)', color: 'var(--mint-dark)' }}
        >
          <Zap size={16} fill="var(--mint-dark)" />
          <span>AI Rebalance</span>
        </button>
      </div>

      {/* Visual Allocation Stack Bar */}
      <div>
        <div style={{
          display: 'flex',
          height: '16px',
          width: '100%',
          backgroundColor: '#EBEBEF',
          borderRadius: 'var(--radius-pill)',
          overflow: 'hidden',
          marginBottom: '12px'
        }}>
          <div style={{ width: `${sleepPct}%`, backgroundColor: '#A0A0A5' }} title={`Sleep: ${metrics.sleepHours}h`} />
          <div style={{ width: `${classPct}%`, backgroundColor: 'var(--card-dark)' }} title={`Classes: ${metrics.classHours}h`} />
          <div style={{ width: `${taskPct}%`, backgroundColor: 'var(--lavender)' }} title={`Tasks: ${metrics.taskAssignmentHours}h`} />
          <div style={{ width: `${habitPct}%`, backgroundColor: '#D0D0D5' }} title={`Habits: ${metrics.habitHours}h`} />
          <div style={{ width: `${bufferPct}%`, backgroundColor: 'var(--mint)' }} title={`Buffer: ${metrics.freeBufferHours}h`} />
        </div>

        {/* Legend Pills */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          fontSize: '11px',
          fontWeight: 700,
          color: 'var(--text-muted)'
        }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#A0A0A5' }} />
            Sleep ({metrics.sleepHours}h)
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--card-dark)' }} />
            Classes ({metrics.classHours}h)
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--lavender)' }} />
            Tasks ({metrics.taskAssignmentHours}h)
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--mint)' }} />
            Buffer ({metrics.freeBufferHours}h)
          </span>
        </div>
      </div>
    </div>
  );
};
