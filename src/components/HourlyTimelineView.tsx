import React, { useState } from 'react';
import type { Task } from '../types';
import { WEEKLY_TIMETABLE } from '../data/timetable';
import type { DayOfWeek } from '../data/timetable';
import { Plus, Check, AlertCircle, Coffee } from 'lucide-react';

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

  // Generate hour slots array (06:00 to 23:00 by default, or 00:00 to 23:00 if full 24H)
  const startHour = showFull24H ? 0 : 6;
  const endHour = 23;
  const hours = Array.from({ length: endHour - startHour + 1 }, (_, i) => startHour + i);

  // Helper to format hour string HH:00
  const formatHourString = (h: number) => `${String(h).padStart(2, '0')}:00`;

  // Get academic classes matching an hour slot (e.g. 9 AM class matching 09:00 slot)
  const getClassForHour = (h: number) => {
    return academicClasses.filter(c => {
      const parts = c.time.split('-');
      const startPart = parts[0].trim();
      const endPart = parts[1] ? parts[1].trim() : '';

      let startHour = parseInt(startPart.split(':')[0], 10);
      const isExplicitPm = startPart.toUpperCase().includes('PM');
      const endIsPm = endPart.toUpperCase().includes('PM');
      
      // If startPart explicitly specifies PM, or if endPart is PM AND startHour is < 11 (e.g., 2:00 - 2:50 PM)
      const isPm = isExplicitPm || (endIsPm && startHour < 11);

      if (isPm && startHour !== 12) {
        startHour += 12;
      }
      return startHour === h;
    });
  };

  // Get tasks/engagements matching an hour slot
  const getTasksForHour = (h: number) => {
    const slotStr = formatHourString(h);
    return tasks.filter(t => t.date === selectedDate && t.timeSlot === slotStr);
  };

  // Unscheduled tasks for selected date (tasks without a specific timeSlot)
  const unscheduledTasks = tasks.filter(t => t.date === selectedDate && !t.timeSlot);

  // Calculate statistics
  const dayTasks = tasks.filter(t => t.date === selectedDate);
  const scheduledCount = dayTasks.filter(t => t.timeSlot).length;
  const classCount = academicClasses.length;
  const freeSlotsCount = hours.filter(h => getClassForHour(h).length === 0 && getTasksForHour(h).length === 0).length;

  return (
    <div style={{
      padding: '20px 16px 90px 16px',
      backgroundColor: 'var(--black)',
      color: 'var(--white)',
      minHeight: 'calc(100vh - 140px)'
    }}>
      {/* Header Banner */}
      <div style={{
        backgroundColor: 'var(--grey)',
        borderRadius: '16px',
        padding: '16px',
        marginBottom: '20px',
        border: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '17px',
              fontWeight: 800,
              color: 'var(--lime)',
              letterSpacing: '0.04em'
            }}>
              24-HOUR BLOCK TIMELINE & BUFFER MATRIX
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'var(--text-dim)',
              textTransform: 'uppercase',
              marginTop: '2px'
            }}>
              SCHEDULED FOR {selectedDate} ({currentDayOfWeek || 'WEEKEND'})
            </div>
          </div>

          <button
            onClick={() => setShowFull24H(!showFull24H)}
            style={{
              backgroundColor: 'var(--grey2)',
              color: 'var(--lime)',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              fontWeight: 800,
              padding: '6px 10px',
              borderRadius: '8px',
              border: 'var(--border-subtle)'
            }}
          >
            {showFull24H ? 'SHOW 6 AM - 11 PM' : 'FULL 24H VIEW'}
          </button>
        </div>

        {/* Stats Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '8px',
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          textAlign: 'center'
        }}>
          <div style={{
            backgroundColor: 'rgba(43, 43, 255, 0.15)',
            border: '1px solid var(--blue)',
            padding: '6px 4px',
            borderRadius: '8px',
            color: 'var(--white)'
          }}>
            <span style={{ fontWeight: 800, color: 'var(--blue)' }}>{classCount}</span> CLASSES
          </div>

          <div style={{
            backgroundColor: 'rgba(202, 255, 0, 0.1)',
            border: '1px solid var(--lime)',
            padding: '6px 4px',
            borderRadius: '8px',
            color: 'var(--white)'
          }}>
            <span style={{ fontWeight: 800, color: 'var(--lime)' }}>{scheduledCount}</span> BLOCKS
          </div>

          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: 'var(--border-subtle)',
            padding: '6px 4px',
            borderRadius: '8px',
            color: 'var(--text-dim)'
          }}>
            <span style={{ fontWeight: 800, color: 'var(--white)' }}>{freeSlotsCount} HRS</span> BUFFER
          </div>
        </div>
      </div>

      {/* Unscheduled Tasks Alert Banner */}
      {unscheduledTasks.length > 0 && (
        <div style={{
          backgroundColor: 'var(--grey2)',
          borderRadius: '12px',
          padding: '12px 14px',
          marginBottom: '20px',
          borderLeft: '4px solid var(--lime)'
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            fontWeight: 800,
            color: 'var(--lime)',
            marginBottom: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <AlertCircle size={14} /> UNSCHEDULED TASKS ({unscheduledTasks.length})
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {unscheduledTasks.map(t => (
              <button
                key={t.id}
                onClick={() => onOpenStructuredForm(t)}
                style={{
                  backgroundColor: 'var(--black)',
                  color: 'var(--white)',
                  fontSize: '10px',
                  fontFamily: 'var(--font-mono)',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  border: 'var(--border-subtle)'
                }}
              >
                + ASSIGN SLOT: {t.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Vertical Hourly Timeline Matrix */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {hours.map((h) => {
          const hourStr = formatHourString(h);
          const classesInHour = getClassForHour(h);
          const tasksInHour = getTasksForHour(h);
          const hasContent = classesInHour.length > 0 || tasksInHour.length > 0;
          const display12h = h === 0 ? '12 AM' : h < 12 ? `${h} AM` : h === 12 ? '12 PM' : `${h - 12} PM`;

          return (
            <div
              key={h}
              style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'stretch'
              }}
            >
              {/* Left Hour Label Column */}
              <div style={{
                width: '60px',
                flexShrink: 0,
                textAlign: 'right',
                paddingTop: '6px'
              }}>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  fontWeight: 800,
                  color: hasContent ? 'var(--lime)' : 'var(--text-dim)',
                  lineHeight: 1
                }}>
                  {display12h}
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  color: 'rgba(255,255,255,0.25)'
                }}>
                  {hourStr}
                </div>
              </div>

              {/* Timeline Center Marker Line */}
              <div style={{
                width: '2px',
                backgroundColor: hasContent ? 'var(--lime)' : 'var(--grey2)',
                position: 'relative',
                borderRadius: '1px'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  left: '-4px',
                  width: '10px',
                  height: '10px',
                  borderRadius: '5px',
                  backgroundColor: hasContent ? 'var(--lime)' : 'var(--grey2)',
                  border: '2px solid var(--black)'
                }} />
              </div>

              {/* Slot Right Content Column */}
              <div style={{ flex: 1, paddingBottom: '4px' }}>
                {hasContent ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {/* Academic Classes in this hour slot */}
                    {classesInHour.map(cls => (
                      <div
                        key={cls.id}
                        style={{
                          backgroundColor: 'var(--grey)',
                          borderRadius: '10px',
                          padding: '10px 12px',
                          borderLeft: `4px solid ${cls.color}`,
                          border: 'var(--border-subtle)'
                        }}
                      >
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginBottom: '2px'
                        }}>
                          <span style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '9px',
                            fontWeight: 800,
                            color: 'var(--lime)',
                            textTransform: 'uppercase'
                          }}>
                            ACADEMIC CLASS /// {cls.time}
                          </span>
                          <span style={{
                            fontSize: '8px',
                            fontFamily: 'var(--font-mono)',
                            padding: '2px 6px',
                            borderRadius: '6px',
                            backgroundColor: 'rgba(255,255,255,0.08)',
                            color: cls.color,
                            fontWeight: 800
                          }}>
                            {cls.room}
                          </span>
                        </div>

                        <div style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '14px',
                          fontWeight: 700,
                          color: 'var(--white)'
                        }}>
                          {cls.subject}
                        </div>
                        <div style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '10px',
                          color: 'var(--text-dim)',
                          marginTop: '2px'
                        }}>
                          Faculty: {cls.faculty}
                        </div>
                      </div>
                    ))}

                    {/* Tasks / Custom Engagements in this hour slot */}
                    {tasksInHour.map(t => {
                      const isBuffer = t.category === 'buffer';

                      return (
                        <div
                          key={t.id}
                          style={{
                            backgroundColor: isBuffer ? 'rgba(202, 255, 0, 0.08)' : 'var(--white)',
                            color: isBuffer ? 'var(--white)' : 'var(--black)',
                            borderRadius: '10px',
                            padding: '10px 12px',
                            border: isBuffer ? '1px dashed var(--lime)' : 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                          }}
                        >
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                              <span style={{
                                backgroundColor: isBuffer ? 'var(--lime)' : 'var(--black)',
                                color: isBuffer ? 'var(--black)' : 'var(--lime)',
                                fontSize: '8px',
                                fontFamily: 'var(--font-mono)',
                                fontWeight: 800,
                                padding: '2px 6px',
                                borderRadius: '6px',
                                textTransform: 'uppercase'
                              }}>
                                {t.category}
                              </span>

                              <span style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '10px',
                                fontWeight: 800,
                                color: isBuffer ? 'var(--lime)' : 'var(--black)'
                              }}>
                                {t.timeSlot}
                              </span>
                            </div>

                            <div style={{
                              fontFamily: 'var(--font-display)',
                              fontSize: '14px',
                              fontWeight: 700,
                              textDecoration: t.done ? 'line-through' : 'none',
                              opacity: t.done ? 0.5 : 1
                            }}>
                              {t.title}
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <button
                              onClick={() => onToggleTask(t.id)}
                              style={{
                                width: '22px',
                                height: '22px',
                                borderRadius: '6px',
                                backgroundColor: t.done ? 'var(--lime)' : 'rgba(0,0,0,0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              {t.done && <Check size={14} color="var(--black)" strokeWidth={3} />}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* Empty Slot -> BUFFER / FREE TIME Block with Quick Add button */
                  <div style={{
                    backgroundColor: 'var(--grey)',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    border: 'var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      color: 'var(--text-dim)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <Coffee size={12} color="var(--text-dim)" />
                      <span>[BUFFER / FREE TIME]</span>
                    </div>

                    <button
                      onClick={() => onOpenQuickAddForSlot(selectedDate, hourStr)}
                      style={{
                        backgroundColor: 'var(--grey2)',
                        color: 'var(--lime)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '9px',
                        fontWeight: 800,
                        padding: '4px 8px',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '2px',
                        textTransform: 'uppercase'
                      }}
                    >
                      <Plus size={10} /> ADD BLOCK
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
