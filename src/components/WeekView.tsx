import React from 'react';
import type { Task } from '../types';
import { ACADEMIC } from '../data/academic';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getTodayDateString } from '../services/bufferEngine';

interface WeekViewProps {
  tasks: Task[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

export const WeekView: React.FC<WeekViewProps> = ({
  tasks,
  selectedDate,
  onSelectDate
}) => {
  // Compute Monday of the week containing selectedDate
  const getWeekDays = (baseDateStr: string) => {
    const base = new Date(baseDateStr + "T00:00:00");
    const dayOfWeek = base.getDay(); // 0 is Sun, 1 is Mon, ... 6 is Sat
    // We want Monday as index 0
    const distanceToMon = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const monDate = new Date(base);
    monDate.setDate(base.getDate() + distanceToMon);

    const weekDays: { dateStr: string; dayName: string; dayNum: string; isToday: boolean }[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(monDate);
      d.setDate(monDate.getDate() + i);
      const dateStr = d.toISOString().split('T')[0];
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
      const dayNum = String(d.getDate()).padStart(2, '0');
      const isToday = dateStr === getTodayDateString();

      weekDays.push({ dateStr, dayName, dayNum, isToday });
    }
    return weekDays;
  };

  const days = getWeekDays(selectedDate);

  const getTaskChipBg = (category: string) => {
    switch (category) {
      case 'study': return 'var(--lime)';
      case 'assignment': return 'var(--blue)';
      case 'exam': return '#FF3B30';
      default: return 'var(--grey2)';
    }
  };

  const getTaskChipColor = (category: string) => {
    if (category === 'assignment' || category === 'exam' || category === 'personal') return 'var(--white)';
    return 'var(--black)';
  };

  const changeWeek = (offsetDays: number) => {
    const current = new Date(selectedDate + "T00:00:00");
    current.setDate(current.getDate() + offsetDays);
    onSelectDate(current.toISOString().split('T')[0]);
  };

  return (
    <div style={{
      padding: '20px 10px 80px 10px',
      backgroundColor: 'var(--black)',
      minHeight: 'calc(100vh - 140px)',
      color: 'var(--white)'
    }}>
      {/* Header Controls */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: '10px',
        paddingRight: '10px',
        marginBottom: '16px',
        borderBottom: 'var(--border-subtle)',
        paddingBottom: '12px'
      }}>
        <div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '18px',
            fontWeight: 800,
            color: 'var(--lime)',
            textTransform: 'uppercase',
            letterSpacing: '0.04em'
          }}>
            WEEK MATRIX
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'var(--text-dim)',
            textTransform: 'uppercase'
          }}>
            MON {days[0]?.dateStr} — SUN {days[6]?.dateStr}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            onClick={() => changeWeek(-7)}
            style={{
              width: '32px',
              height: '32px',
              backgroundColor: 'var(--grey)',
              border: 'var(--border-subtle)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--white)'
            }}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => changeWeek(7)}
            style={{
              width: '32px',
              height: '32px',
              backgroundColor: 'var(--grey)',
              border: 'var(--border-subtle)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--white)'
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* 7 Column Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '4px',
        overflowX: 'auto'
      }}>
        {days.map((day) => {
          const isSelected = day.dateStr === selectedDate;
          const dayTaskList = tasks.filter(t => t.date === day.dateStr);
          const dayAcademicEvents = ACADEMIC.filter(e => e.date === day.dateStr);

          return (
            <div
              key={day.dateStr}
              onClick={() => onSelectDate(day.dateStr)}
              style={{
                backgroundColor: isSelected ? 'var(--grey2)' : 'var(--grey)',
                borderRadius: '10px',
                padding: '8px 4px',
                minHeight: '260px',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                // Today col = blue border highlight
                border: day.isToday
                  ? 'var(--border-blue)'
                  : isSelected
                  ? '1px solid var(--lime)'
                  : 'var(--border-subtle)',
                position: 'relative'
              }}
            >
              {/* Day Header */}
              <div style={{
                textAlign: 'center',
                paddingBottom: '8px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                marginBottom: '8px'
              }}>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '9px',
                  fontWeight: 700,
                  color: day.isToday ? 'var(--blue)' : 'var(--text-dim)',
                  textTransform: 'uppercase'
                }}>
                  {day.dayName}
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '15px',
                  fontWeight: 800,
                  color: day.isToday ? 'var(--lime)' : 'var(--white)'
                }}>
                  {day.dayNum}
                </div>
              </div>

              {/* Items Container */}
              <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '6px'
              }}>
                {/* Academic Events Chips (Outlined, not filled) */}
                {dayAcademicEvents.map((evt, idx) => (
                  <div
                    key={`evt-${idx}`}
                    title={`${evt.name} (${evt.type})`}
                    style={{
                      border: '1px solid var(--lime)',
                      backgroundColor: 'transparent',
                      color: 'var(--lime)',
                      borderRadius: '4px',
                      padding: '4px 3px',
                      fontSize: '8px',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                      lineHeight: 1.1,
                      textTransform: 'uppercase',
                      wordBreak: 'break-word',
                      overflow: 'hidden'
                    }}
                  >
                    ★ {evt.name}
                  </div>
                ))}

                {/* Task Chips (Lime/Blue/Red small rounded squares, text truncated) */}
                {dayTaskList.map((task) => (
                  <div
                    key={task.id}
                    title={task.title}
                    style={{
                      backgroundColor: getTaskChipBg(task.category),
                      color: getTaskChipColor(task.category),
                      borderRadius: '4px',
                      padding: '5px 4px',
                      fontSize: '8px',
                      fontFamily: 'var(--font-body)',
                      fontWeight: 700,
                      lineHeight: 1.15,
                      textDecoration: task.done ? 'line-through' : 'none',
                      opacity: task.done ? 0.5 : 1,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {task.title}
                  </div>
                ))}

                {dayTaskList.length === 0 && dayAcademicEvents.length === 0 && (
                  <div style={{
                    fontSize: '9px',
                    fontFamily: 'var(--font-mono)',
                    color: 'rgba(255,255,255,0.15)',
                    textAlign: 'center',
                    marginTop: '20px'
                  }}>
                    —
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
