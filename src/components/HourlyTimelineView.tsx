import React, { useState } from 'react';
import type { Task } from '../types';
import { WEEKLY_TIMETABLE } from '../data/timetable';
import type { DayOfWeek } from '../data/timetable';
import { Check, AlertCircle, Coffee } from 'lucide-react';

interface HourlyTimelineViewProps {
  tasks: Task[];
  selectedDate: string;
  onToggleTask: (id: string) => void;
  onDeleteTask?: (id: string) => void;
  onOpenQuickAddForSlot: (dateStr: string, timeSlot: string) => void;
  onOpenStructuredForm: (task?: Task) => void;
}

export const HourlyTimelineView: React.FC<HourlyTimelineViewProps> = ({
  tasks,
  selectedDate,
  onToggleTask,
  onOpenQuickAddForSlot,
  onOpenStructuredForm
}) => {
  const [showFull24H, setShowFull24H] = useState<boolean>(false);

  // Compute day of week for timetable integration
  const dateObj = new Date(selectedDate + "T00:00:00");
  const dayIndex = dateObj.getDay();
  const dayOfWeekMap: Record<number, DayOfWeek> = { 1: 'MON', 2: 'TUE', 3: 'WED', 4: 'THU', 5: 'FRI' };
  const currentDayOfWeek = dayOfWeekMap[dayIndex];
  const academicClasses = currentDayOfWeek ? WEEKLY_TIMETABLE[currentDayOfWeek] : [];

  const startHour = showFull24H ? 0 : 6;
  const endHour = 23;
  const hours = Array.from({ length: endHour - startHour + 1 }, (_, i) => startHour + i);

  const formatHourString = (h: number) => `${String(h).padStart(2, '0')}:00`;

  const getClassForHour = (h: number) => {
    return academicClasses.filter(c => {
      const parts = c.time.split('-');
      const startPart = parts[0].trim();
      const endPart = parts[1] ? parts[1].trim() : '';

      let startHour = parseInt(startPart.split(':')[0], 10);
      const isExplicitPm = startPart.toUpperCase().includes('PM');
      const endIsPm = endPart.toUpperCase().includes('PM');

      const isPm = isExplicitPm || (endIsPm && startHour < 11);

      if (isPm && startHour !== 12) {
        startHour += 12;
      }
      return startHour === h;
    });
  };

  const getTasksForHour = (h: number) => {
    const slotStr = formatHourString(h);
    return tasks.filter(t => t.date === selectedDate && t.timeSlot === slotStr);
  };

  const unscheduledTasks = tasks.filter(t => t.date === selectedDate && !t.timeSlot);

  const dayTasks = tasks.filter(t => t.date === selectedDate);
  const scheduledCount = dayTasks.filter(t => t.timeSlot).length;
  const classCount = academicClasses.length;
  const freeSlotsCount = hours.filter(h => getClassForHour(h).length === 0 && getTasksForHour(h).length === 0).length;

  return (
    <div style={{ color: 'var(--text-dark)', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Header Banner */}
      <div className="trantor-card-light" style={{ marginBottom: '24px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px'
        }}>
          <div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-dark)' }}>
              24-Hour Timeline Matrix
            </div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>
              Scheduled for {selectedDate} ({currentDayOfWeek || 'WEEKEND'})
            </div>
          </div>

          <button
            onClick={() => setShowFull24H(!showFull24H)}
            style={{
              backgroundColor: '#F0F0F2',
              color: 'var(--text-dark)',
              fontSize: '12px',
              fontWeight: 700,
              padding: '8px 14px',
              borderRadius: 'var(--radius-pill)'
            }}
          >
            {showFull24H ? 'Show 6 AM - 11 PM' : 'Full 24H View'}
          </button>
        </div>

        {/* Stats Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
          fontSize: '12px',
          textAlign: 'center'
        }}>
          <div className="trantor-pill trantor-pill-mint" style={{ justifyContent: 'center', padding: '10px' }}>
            <span style={{ fontWeight: 800 }}>{classCount}</span> Classes Today
          </div>

          <div className="trantor-pill trantor-pill-lavender" style={{ justifyContent: 'center', padding: '10px' }}>
            <span style={{ fontWeight: 800 }}>{scheduledCount}</span> Focus Blocks
          </div>

          <div className="trantor-pill trantor-pill-amber" style={{ justifyContent: 'center', padding: '10px' }}>
            <span style={{ fontWeight: 800 }}>{freeSlotsCount} Hours</span> Free Buffer
          </div>
        </div>
      </div>

      {/* Unscheduled Tasks Alert Banner */}
      {unscheduledTasks.length > 0 && (
        <div className="trantor-card-light" style={{ marginBottom: '24px', backgroundColor: 'var(--amber-light)' }}>
          <div style={{
            fontSize: '13px',
            fontWeight: 800,
            color: 'var(--amber-dark)',
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <AlertCircle size={16} /> UNSCHEDULED TASKS ({unscheduledTasks.length})
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {unscheduledTasks.map(t => (
              <button
                key={t.id}
                onClick={() => onOpenStructuredForm(t)}
                style={{
                  backgroundColor: 'var(--card-light)',
                  color: 'var(--text-dark)',
                  fontSize: '12px',
                  fontWeight: 700,
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-pill)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                }}
              >
                + Assign Slot: {t.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Vertical Hourly Timeline Matrix */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {hours.map((h) => {
          const hourStr = formatHourString(h);
          const classesInHour = getClassForHour(h);
          const tasksInHour = getTasksForHour(h);
          const hasContent = classesInHour.length > 0 || tasksInHour.length > 0;
          const display12h = h === 0 ? '12 AM' : h < 12 ? `${h} AM` : h === 12 ? '12 PM' : `${h - 12} PM`;

          return (
            <div key={h} style={{ display: 'flex', gap: '16px', alignItems: 'stretch' }}>
              {/* Hour Label */}
              <div style={{ width: '64px', flexShrink: 0, textAlign: 'right', paddingTop: '8px' }}>
                <div style={{ fontSize: '13px', fontWeight: 800, color: hasContent ? 'var(--text-dark)' : 'var(--text-muted)' }}>
                  {display12h}
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{hourStr}</div>
              </div>

              {/* Center Line */}
              <div style={{
                width: '3px',
                backgroundColor: hasContent ? 'var(--card-dark)' : '#E0E0E5',
                borderRadius: '2px',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  left: '-4px',
                  width: '11px',
                  height: '11px',
                  borderRadius: '50%',
                  backgroundColor: hasContent ? 'var(--mint-dark)' : '#CCCCCC'
                }} />
              </div>

              {/* Slot Content */}
              <div style={{ flex: 1 }}>
                {hasContent ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {classesInHour.map(cls => (
                      <div key={cls.id} className="trantor-card-dark" style={{ padding: '14px 18px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span className="trantor-pill trantor-pill-mint" style={{ fontSize: '10px', padding: '3px 8px' }}>
                            CLASS /// {cls.time}
                          </span>
                          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted-dark)' }}>
                            {cls.room}
                          </span>
                        </div>
                        <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-light)' }}>
                          {cls.subject}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted-dark)', marginTop: '2px' }}>
                          Faculty: {cls.faculty}
                        </div>
                      </div>
                    ))}

                    {tasksInHour.map(t => (
                      <div key={t.id} className="trantor-card-light" style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <span className="trantor-pill trantor-pill-lavender" style={{ fontSize: '10px', padding: '2px 8px' }}>
                              {t.category}
                            </span>
                            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>{t.timeSlot}</span>
                          </div>
                          <div style={{ fontSize: '15px', fontWeight: 700, textDecoration: t.done ? 'line-through' : 'none', color: t.done ? 'var(--text-muted)' : 'var(--text-dark)' }}>
                            {t.title}
                          </div>
                        </div>

                        <button
                          onClick={() => onToggleTask(t.id)}
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            backgroundColor: t.done ? 'var(--mint-dark)' : '#E0E0E5',
                            color: 'var(--card-light)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          {t.done && <Check size={14} />}
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{
                    backgroundColor: '#F5F5F7',
                    borderRadius: '16px',
                    padding: '10px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Coffee size={14} /> [Buffer / Free Time]
                    </div>
                    <button
                      onClick={() => onOpenQuickAddForSlot(selectedDate, hourStr)}
                      style={{
                        backgroundColor: 'var(--card-light)',
                        color: 'var(--text-dark)',
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-pill)',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
                      }}
                    >
                      + Add Block
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
