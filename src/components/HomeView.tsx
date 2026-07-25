import React, { useState } from 'react';
import type { Task, Assignment, BufferEngineMetrics, HourlyLogItem } from '../types';
import { BufferGauge } from './BufferGauge';
import { ArrowRight, MapPin, CheckCircle, Activity, TrendingUp } from 'lucide-react';
import { WEEKLY_TIMETABLE } from '../data/timetable';
import { getDayOfWeekFromDateStr } from '../services/bufferEngine';

interface HomeViewProps {
  selectedDate: string;
  tasks: Task[];
  assignments: Assignment[];
  logs: HourlyLogItem[];
  metrics: BufferEngineMetrics;
  onOpenAIDrawer: () => void;
  onOpenQuickAdd: () => void;
  onNavigateTab: (tab: 'timeline' | 'timetable' | 'assignments' | 'journal') => void;
  onAddHourlyLog: (log: Omit<HourlyLogItem, 'id' | 'timestamp'>) => void;
  onToggleTask: (id: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  selectedDate,
  tasks,
  assignments,
  logs: _logs,
  metrics,
  onOpenAIDrawer,
  onOpenQuickAdd: _onOpenQuickAdd,
  onNavigateTab,
  onAddHourlyLog,
  onToggleTask
}) => {
  const [currentActivityInput, setCurrentActivityInput] = useState('');

  const dayOfWeek = getDayOfWeekFromDateStr(selectedDate);
  const classesToday = WEEKLY_TIMETABLE[dayOfWeek] || [];
  const todayTasks = tasks.filter(t => t.date === selectedDate);
  const pendingAssignments = assignments.filter(a => a.status !== 'completed');

  const nextClass = classesToday.length > 0 ? classesToday[0] : null;
  const nextDeadline = pendingAssignments.length > 0 ? pendingAssignments[0] : null;

  const handleQuickLog = (activityText: string) => {
    if (!activityText.trim()) return;
    const currentHour = new Date().getHours();
    onAddHourlyLog({
      date: selectedDate,
      hour: currentHour,
      activity: activityText.trim(),
      category: 'study',
      mood: 'focused',
      energy: 4,
      focusScore: 4,
      notes: 'Logged from Home Command Center prompt'
    });
    setCurrentActivityInput('');
  };

  // Mock weekly buffer chart data (matching Trantor bar chart style)
  const weeklyChartData = [
    { day: 'MON', buffer: 4.5, load: 7.5 },
    { day: 'TUE', buffer: 2.0, load: 9.0 },
    { day: 'WED', buffer: 5.0, load: 6.0 },
    { day: 'THU', buffer: 3.5, load: 8.0 },
    { day: 'FRI', buffer: 3.25, load: 7.5 },
    { day: 'SAT', buffer: 6.5, load: 4.0 },
    { day: 'SUN', buffer: 7.0, load: 3.0 }
  ];

  return (
    <div style={{ color: 'var(--text-dark)', maxWidth: '1000px', margin: '0 auto' }}>
      {/* 1. Primary Hero Card: Trantor Buffer Time Gauge */}
      <BufferGauge metrics={metrics} onOptimizeClick={onOpenAIDrawer} />

      {/* 2. Trantor Weekly Focus & Buffer Bar Chart Card (Matching reference image) */}
      <div className="trantor-card-light" style={{ marginBottom: '24px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px'
        }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              WEEKLY TIME HEALTH TREND
            </div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-dark)' }}>
              7-Day Buffer Capacity
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <span className="trantor-pill trantor-pill-mint">
              <TrendingUp size={14} />
              +1.5h vs Last Week
            </span>
          </div>
        </div>

        {/* Rounded Bar Chart Grid */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          height: '140px',
          padding: '16px 20px',
          backgroundColor: '#F5F5F7',
          borderRadius: 'var(--radius-inner)'
        }}>
          {weeklyChartData.map((item, index) => {
            const isToday = item.day === 'FRI';
            const barHeight = (item.buffer / 8) * 100;
            return (
              <div key={index} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                flex: 1
              }}>
                <div style={{
                  width: '28px',
                  height: '100px',
                  backgroundColor: '#E0E0E5',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'flex-end',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: '100%',
                    height: `${barHeight}%`,
                    backgroundColor: isToday ? 'var(--card-dark)' : 'var(--mint)',
                    borderRadius: '14px',
                    transition: 'height 0.3s ease'
                  }} />
                </div>

                <span style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: isToday ? 'var(--text-dark)' : 'var(--text-muted)'
                }}>
                  {item.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Dark Tactical Card (Matching Trantor's dark bitcoin/ethereum card container) */}
      <div className="trantor-card-dark" style={{ marginBottom: '24px' }}>
        <div style={{
          fontSize: '12px',
          fontWeight: 700,
          color: 'var(--text-muted-dark)',
          textTransform: 'uppercase',
          marginBottom: '16px'
        }}>
          UPCOMING ACADEMIC ENGAGEMENTS
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px'
        }}>
          {/* Next Class Item */}
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            borderRadius: '20px',
            padding: '18px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span className="trantor-pill trantor-pill-mint" style={{ fontSize: '10px', padding: '4px 10px' }}>
                  NEXT SESSION
                </span>
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted-dark)' }}>
                  TODAY
                </span>
              </div>

              {nextClass ? (
                <>
                  <div style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-light)', marginBottom: '4px' }}>
                    {nextClass.subject}
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-muted-dark)', display: 'flex', gap: '10px' }}>
                    <span>⏰ {nextClass.time}</span>
                    <span><MapPin size={12} style={{ display: 'inline' }} /> {nextClass.room}</span>
                  </div>
                </>
              ) : (
                <div style={{ color: 'var(--text-muted-dark)', fontSize: '13px' }}>
                  No more scheduled classes today!
                </div>
              )}
            </div>

            <button
              onClick={() => onNavigateTab('timetable')}
              style={{
                marginTop: '16px',
                color: 'var(--mint)',
                fontSize: '12px',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              Full Timetable <ArrowRight size={14} />
            </button>
          </div>

          {/* Next Deadline Item */}
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            borderRadius: '20px',
            padding: '18px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span className="trantor-pill trantor-pill-lavender" style={{ fontSize: '10px', padding: '4px 10px' }}>
                  DEADLINE ALERT
                </span>
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted-dark)' }}>
                  HIGH PRIORITY
                </span>
              </div>

              {nextDeadline ? (
                <>
                  <div style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-light)', marginBottom: '4px' }}>
                    {nextDeadline.title}
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-muted-dark)', display: 'flex', gap: '10px' }}>
                    <span>📅 Due {nextDeadline.dueDate}</span>
                    <span>⏱️ {nextDeadline.estimatedHours}h Work</span>
                  </div>
                </>
              ) : (
                <div style={{ color: 'var(--text-muted-dark)', fontSize: '13px' }}>
                  All pending assignment deadlines complete!
                </div>
              )}
            </div>

            <button
              onClick={() => onNavigateTab('assignments')}
              style={{
                marginTop: '16px',
                color: 'var(--lavender)',
                fontSize: '12px',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              AI Workload Splitter <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Hourly Reflection Quick Logger Prompt */}
      <div className="trantor-card-light" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <Activity size={18} color="var(--mint-dark)" />
          <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-dark)' }}>
            HOURLY ACTIVITY LOGGER /// WHAT ARE YOU WORKING ON RIGHT NOW?
          </span>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleQuickLog(currentActivityInput);
          }}
          style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}
        >
          <input
            type="text"
            placeholder="e.g. Studying DSA Shortest Path / Gym Session..."
            value={currentActivityInput}
            onChange={(e) => setCurrentActivityInput(e.target.value)}
            style={{
              flex: 1,
              backgroundColor: '#F5F5F7',
              borderRadius: 'var(--radius-pill)',
              padding: '12px 20px',
              color: 'var(--text-dark)',
              fontSize: '13px',
              fontWeight: 500
            }}
          />
          <button
            type="submit"
            disabled={!currentActivityInput.trim()}
            style={{
              backgroundColor: currentActivityInput.trim() ? 'var(--card-dark)' : '#E0E0E5',
              color: currentActivityInput.trim() ? 'var(--card-light)' : 'var(--text-muted)',
              borderRadius: 'var(--radius-pill)',
              padding: '0 22px',
              fontWeight: 800,
              fontSize: '13px'
            }}
          >
            LOG HOUR
          </button>
        </form>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {['📖 Studying DSA', '🏋️ Gym Workout', '☕ Meal Break', '💻 OS Kernel Code', '💤 Rest'].map((pill, i) => (
            <button
              key={i}
              onClick={() => handleQuickLog(pill)}
              style={{
                backgroundColor: '#F0F0F3',
                color: 'var(--text-dark)',
                borderRadius: 'var(--radius-pill)',
                padding: '6px 14px',
                fontSize: '12px',
                fontWeight: 600
              }}
            >
              + {pill}
            </button>
          ))}
        </div>
      </div>

      {/* 5. Today's Timeline Block Matrix */}
      <div className="trantor-card-light">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px'
        }}>
          <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-dark)' }}>
            TODAY'S TIMELINE SLOTS
          </div>
          <button
            onClick={() => onNavigateTab('timeline')}
            style={{
              color: 'var(--text-muted)',
              fontSize: '12px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            Full 24H Matrix <ArrowRight size={14} />
          </button>
        </div>

        {todayTasks.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '24px',
            color: 'var(--text-muted)',
            fontSize: '13px',
            fontWeight: 500
          }}>
            No custom task blocks scheduled for today yet. Use Quick Task or AI Assistant to add!
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {todayTasks.map((t) => (
              <div
                key={t.id}
                style={{
                  backgroundColor: '#F7F7F9',
                  borderRadius: '16px',
                  padding: '14px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <button
                    onClick={() => onToggleTask(t.id)}
                    style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      border: t.done ? 'none' : '2px solid var(--text-dark)',
                      backgroundColor: t.done ? 'var(--mint-dark)' : 'transparent',
                      color: 'var(--card-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {t.done && <CheckCircle size={14} color="var(--mint)" />}
                  </button>

                  <div>
                    <div style={{
                      fontWeight: 700,
                      fontSize: '14px',
                      textDecoration: t.done ? 'line-through' : 'none',
                      color: t.done ? 'var(--text-muted)' : 'var(--text-dark)'
                    }}>
                      {t.title}
                    </div>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>
                      ⏰ {t.timeSlot || 'Anytime'} • {t.duration || 60}m duration
                    </div>
                  </div>
                </div>

                <span className={`trantor-pill ${t.category === 'fitness' ? 'trantor-pill-mint' : 'trantor-pill-lavender'}`}>
                  {t.category}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
