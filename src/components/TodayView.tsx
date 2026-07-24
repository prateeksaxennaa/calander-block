import React, { useState } from 'react';
import type { Task, CategoryType } from '../types';
import { WEEKLY_TIMETABLE } from '../data/timetable';
import type { DayOfWeek } from '../data/timetable';
import { ChevronDown, Check, Trash2, Calendar, AlertCircle, Clock, MapPin, BookOpen } from 'lucide-react';

interface TodayViewProps {
  tasks: Task[];
  selectedDate: string;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onOpenStructuredForm: (task?: Task) => void;
  onDateChange: (date: string) => void;
  onOpenTimetableModal: (day?: DayOfWeek) => void;
}

export const TodayView: React.FC<TodayViewProps> = ({
  tasks,
  selectedDate,
  onToggleTask,
  onDeleteTask,
  onOpenStructuredForm,
  onDateChange,
  onOpenTimetableModal
}) => {
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  // Format date display
  const dateObj = new Date(selectedDate + "T00:00:00");
  const formattedDay = dateObj.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
  const formattedMonthDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase();
  const fullDateHeading = `${formattedDay}, ${formattedMonthDate}`;

  // Filter tasks for the selected date
  const dayTasks = tasks.filter(t => t.date === selectedDate);

  const getCategoryBg = (cat: CategoryType, isLimeCard: boolean) => {
    if (isLimeCard) {
      return 'var(--black)';
    }
    switch (cat) {
      case 'study': return 'var(--lime)';
      case 'assignment': return 'var(--blue)';
      case 'exam': return '#FF3B30'; // red
      case 'personal': return 'var(--grey2)';
      default: return 'var(--grey)';
    }
  };

  const getCategoryTextColor = (cat: CategoryType, isLimeCard: boolean) => {
    if (isLimeCard) return 'var(--lime)';
    if (cat === 'assignment' || cat === 'personal' || cat === 'exam') return 'var(--white)';
    return 'var(--black)';
  };

  const getPriorityColor = (priority: string, isLimeCard: boolean) => {
    if (isLimeCard) {
      if (priority === 'high') return '#D00000';
      if (priority === 'med') return 'var(--black)';
      return '#444';
    }
    if (priority === 'high') return '#FF3B30';
    if (priority === 'med') return '#007AFF';
    return 'var(--text-dim)';
  };

  // Determine day of week for timetable lookup
  const dayIndex = dateObj.getDay(); // 0 is Sun, 1 is Mon...
  const dayOfWeekMap: Record<number, DayOfWeek> = { 1: 'MON', 2: 'TUE', 3: 'WED', 4: 'THU', 5: 'FRI' };
  const currentDayOfWeek = dayOfWeekMap[dayIndex];
  const todayClasses = currentDayOfWeek ? WEEKLY_TIMETABLE[currentDayOfWeek] : [];
  const [isTimetableExpanded, setIsTimetableExpanded] = useState<boolean>(true);

  return (
    <div style={{
      padding: '20px 20px 80px 20px',
      backgroundColor: 'var(--black)',
      minHeight: 'calc(100vh - 140px)',
      color: 'var(--white)'
    }}>
      {/* Top Date Header inside SVG Cloud / Blob with white outline */}
      <div style={{
        marginBottom: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}>
        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: '350px',
          height: '76px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* Cloud / Organic Blob SVG shape outline */}
          <svg
            viewBox="0 0 320 80"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              overflow: 'visible'
            }}
          >
            <path
              d="M 30,40 
                 C 25,18 55,10 85,15 
                 C 105,5 145,2 175,10 
                 C 205,2 245,5 265,18 
                 C 295,12 315,30 305,50 
                 C 315,68 285,78 255,72 
                 C 225,79 175,80 145,74 
                 C 115,80 65,77 45,68 
                 C 15,75 5,55 30,40 Z"
              fill="var(--black)"
              stroke="var(--white)"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
          </svg>

          <div style={{
            position: 'relative',
            zIndex: 2,
            fontFamily: 'var(--font-mono)',
            fontWeight: 800,
            fontSize: '15px',
            color: 'var(--white)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Calendar size={16} color="var(--lime)" />
            {fullDateHeading}
          </div>
        </div>

        {/* Date Selector Quick Bar */}
        <div style={{
          marginTop: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => e.target.value && onDateChange(e.target.value)}
            style={{
              backgroundColor: 'var(--grey)',
              color: 'var(--lime)',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              padding: '6px 12px',
              borderRadius: '20px',
              border: 'var(--border-subtle)',
              cursor: 'pointer'
            }}
          />
          {selectedDate !== '2026-07-24' && (
            <button
              onClick={() => onDateChange('2026-07-24')}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: 'var(--text-dim)',
                textDecoration: 'underline',
                textTransform: 'uppercase'
              }}
            >
              RESET TO TODAY
            </button>
          )}
        </div>
      </div>

      {/* DAILY CLASS TIMETABLE WIDGET */}
      <div style={{
        backgroundColor: 'var(--grey)',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '16px',
        marginBottom: '24px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: isTimetableExpanded ? '12px' : '0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BookOpen size={16} color="var(--lime)" />
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '15px',
              fontWeight: 800,
              color: 'var(--white)',
              letterSpacing: '0.04em'
            }}>
              DAILY TIMETABLE {currentDayOfWeek ? `[${currentDayOfWeek}]` : '[WEEKEND]'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => onOpenTimetableModal(currentDayOfWeek)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                fontWeight: 800,
                color: 'var(--lime)',
                textDecoration: 'underline',
                textTransform: 'uppercase'
              }}
            >
              FULL MATRIX ›
            </button>
            <button
              onClick={() => setIsTimetableExpanded(!isTimetableExpanded)}
              style={{
                color: 'var(--text-dim)',
                transform: isTimetableExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease',
                padding: '2px'
              }}
            >
              <ChevronDown size={18} />
            </button>
          </div>
        </div>

        {isTimetableExpanded && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
            {todayClasses.length > 0 ? (
              todayClasses.map((cls) => (
                <div
                  key={cls.id}
                  style={{
                    backgroundColor: 'var(--grey2)',
                    borderRadius: '10px',
                    padding: '10px 12px',
                    borderLeft: `3px solid ${cls.color}`,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)'
                  }}>
                    <span style={{ color: 'var(--lime)', fontWeight: 800 }}>
                      <Clock size={11} style={{ display: 'inline', marginRight: '4px' }} />
                      {cls.time}
                    </span>
                    <span style={{
                      backgroundColor: 'rgba(255,255,255,0.08)',
                      color: cls.color,
                      fontSize: '8px',
                      padding: '2px 6px',
                      borderRadius: '8px',
                      fontWeight: 800,
                      textTransform: 'uppercase'
                    }}>
                      {cls.type}
                    </span>
                  </div>

                  <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: 'var(--white)'
                  }}>
                    {cls.subject}
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '10px',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-dim)',
                    marginTop: '2px'
                  }}>
                    <span>{cls.faculty}</span>
                    <span style={{ color: 'var(--white)', fontWeight: 700 }}>
                      <MapPin size={10} color="var(--lime)" style={{ display: 'inline', marginRight: '2px' }} />
                      {cls.room}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '14px',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--text-dim)'
              }}>
                NO CLASSES SCHEDULED FOR THIS DAY
              </div>
            )}
          </div>
        )}
      </div>

      {/* Task Cards Section Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: '16px',
        borderBottom: 'var(--border-subtle)',
        paddingBottom: '8px'
      }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '18px',
          fontWeight: 800,
          color: 'var(--white)',
          letterSpacing: '0.04em'
        }}>
          TASKS FOR THE DAY
        </div>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '12px',
          fontWeight: 700,
          color: 'var(--lime)'
        }}>
          [{dayTasks.length} {dayTasks.length === 1 ? 'ITEM' : 'ITEMS'}]
        </div>
      </div>

      {/* Empty State */}
      {dayTasks.length === 0 && (
        <div style={{
          backgroundColor: 'var(--grey)',
          borderRadius: '16px',
          padding: '36px 20px',
          textAlign: 'center',
          border: 'var(--border-subtle)',
          marginTop: '16px'
        }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '18px',
            fontWeight: 700,
            color: 'var(--white)',
            marginBottom: '6px'
          }}>
            NO TASKS SCHEDULED
          </div>
          <div style={{
            fontSize: '12px',
            color: 'var(--text-dim)',
            fontFamily: 'var(--font-mono)',
            marginBottom: '16px'
          }}>
            SYSTEM CLEAR FOR {selectedDate}
          </div>
          <button
            onClick={() => onOpenStructuredForm()}
            style={{
              backgroundColor: 'var(--lime)',
              color: 'var(--black)',
              fontFamily: 'var(--font-mono)',
              fontWeight: 800,
              fontSize: '12px',
              padding: '10px 18px',
              borderRadius: '20px',
              textTransform: 'uppercase'
            }}
          >
            + ADD NEW TASK
          </button>
        </div>
      )}

      {/* Task Cards Stack */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {dayTasks.map((task) => {
          const isSelected = selectedCardId === task.id;
          const isExpanded = expandedCardId === task.id;

          // Card select -> background flips to --lime, text -> black (instant, no animation)
          const cardBg = isSelected ? 'var(--lime)' : 'var(--white)';
          const textColor = isSelected ? 'var(--black)' : 'var(--black)';

          return (
            <div
              key={task.id}
              onClick={() => setSelectedCardId(task.id)}
              style={{
                backgroundColor: cardBg,
                color: textColor,
                borderRadius: '16px',
                padding: '16px 18px',
                position: 'relative',
                transition: 'background-color 0s', // Instant flip per prompt spec
                border: isSelected ? '2px solid var(--lime)' : '1px solid rgba(255,255,255,0.1)',
                cursor: 'pointer'
              }}
            >
              {/* Card Top Row: Category tag + Priority + Expand Chevron */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '10px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {/* Category Tag */}
                  <span style={{
                    backgroundColor: getCategoryBg(task.category, isSelected),
                    color: getCategoryTextColor(task.category, isSelected),
                    fontSize: '9px',
                    fontWeight: 800,
                    fontFamily: 'var(--font-mono)',
                    padding: '4px 10px',
                    borderRadius: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em'
                  }}>
                    {task.category}
                  </span>

                  {/* Priority Tag */}
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    fontWeight: 800,
                    color: getPriorityColor(task.priority, isSelected),
                    textTransform: 'uppercase',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3px'
                  }}>
                    {task.priority === 'high' && <AlertCircle size={10} />}
                    {task.priority} PRIORITY
                  </span>
                </div>

                {/* Chevron > to expand card detail (rotates 180deg on expand) */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedCardId(isExpanded ? null : task.id);
                  }}
                  style={{
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease',
                    color: isSelected ? 'var(--black)' : '#333'
                  }}
                >
                  <ChevronDown size={18} strokeWidth={2.5} />
                </button>
              </div>

              {/* Card Title Row + Checkbox */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                marginBottom: '12px'
              }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleTask(task.id);
                  }}
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '6px',
                    border: isSelected ? '2px solid var(--black)' : '2px solid #333',
                    backgroundColor: task.done ? (isSelected ? 'var(--black)' : '#1A1A1A') : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}
                >
                  {task.done && <Check size={14} color={isSelected ? 'var(--lime)' : 'var(--white)'} strokeWidth={3} />}
                </button>

                <div style={{ flex: 1 }}>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '16px',
                    fontWeight: 700,
                    lineHeight: 1.25,
                    textDecoration: task.done ? 'line-through' : 'none',
                    opacity: task.done ? 0.4 : 1,
                    color: isSelected ? 'var(--black)' : '#0A0A0A'
                  }}>
                    {task.title}
                  </div>
                </div>
              </div>

              {/* Expanded Details Section */}
              {isExpanded && (
                <div style={{
                  marginTop: '12px',
                  paddingTop: '12px',
                  borderTop: isSelected ? '1px solid rgba(0,0,0,0.15)' : '1px solid rgba(0,0,0,0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}>
                  {task.note && (
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: isSelected ? '#111' : '#444',
                      backgroundColor: isSelected ? 'rgba(0,0,0,0.06)' : '#F7F7F5',
                      padding: '8px 10px',
                      borderRadius: '8px'
                    }}>
                      NOTE: {task.note}
                    </div>
                  )}

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '4px'
                  }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenStructuredForm(task);
                      }}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        color: isSelected ? 'var(--black)' : 'var(--blue)',
                        textDecoration: 'underline'
                      }}
                    >
                      EDIT SPECIFICATIONS ›
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteTask(task.id);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10px',
                        fontWeight: 700,
                        color: '#D00000',
                        textTransform: 'uppercase'
                      }}
                    >
                      <Trash2 size={12} /> DELETE
                    </button>
                  </div>
                </div>
              )}

              {/* Bottom CTA for card state */}
              <div style={{
                marginTop: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '10px',
                fontFamily: 'var(--font-mono)'
              }}>
                <div style={{
                  color: isSelected ? 'var(--black)' : 'var(--text-dim)',
                  fontWeight: 700
                }}>
                  {isSelected ? 'SELECTED CARD' : 'CHOOSE'}
                </div>

                <div style={{ color: isSelected ? 'var(--black)' : 'var(--text-dim)' }}>
                  {task.done ? 'STATUS: COMPLETED' : 'STATUS: PENDING'}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
