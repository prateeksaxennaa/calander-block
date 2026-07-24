import React, { useState } from 'react';
import type { Task } from '../types';
import { ACADEMIC } from '../data/academic';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

interface CalendarViewProps {
  tasks: Task[];
  selectedDate: string;
  onSelectDate: (dateStr: string) => void;
  onOpenQuickAddForDate: (dateStr: string) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  tasks,
  selectedDate,
  onSelectDate,
  onOpenQuickAddForDate
}) => {
  // Store displayed year and month (0-indexed)
  const initialDate = new Date(selectedDate + "T00:00:00");
  const [currentYear, setCurrentYear] = useState<number>(initialDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState<number>(initialDate.getMonth());

  const monthNames = [
    "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
    "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
  ];

  const currentMonthName = monthNames[currentMonth];

  // Calculate calendar grid days
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay(); // 0 is Sun
  const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  // Helper to format date string YYYY-MM-DD
  const getDateStr = (dayNum: number) => {
    const m = String(currentMonth + 1).padStart(2, '0');
    const d = String(dayNum).padStart(2, '0');
    return `${currentYear}-${m}-${d}`;
  };

  return (
    <div style={{
      padding: '20px 20px 80px 20px',
      backgroundColor: 'var(--black)',
      minHeight: 'calc(100vh - 140px)',
      color: 'var(--white)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Month Navigation & Controls Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '10px',
        zIndex: 10,
        position: 'relative'
      }}>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          fontWeight: 800,
          color: 'var(--text-dim)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em'
        }}>
          YEAR {currentYear} /// MONTH MATRIX
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={handlePrevMonth}
            style={{
              backgroundColor: 'var(--grey)',
              border: 'var(--border-subtle)',
              borderRadius: '8px',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--white)'
            }}
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={handleNextMonth}
            style={{
              backgroundColor: 'var(--grey)',
              border: 'var(--border-subtle)',
              borderRadius: '8px',
              width: '32px',
              height: '32px',
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

      {/* HUGE Clash Display Month Label with Partial Bleed off Right Edge */}
      <div style={{
        position: 'relative',
        height: '72px',
        marginBottom: '20px',
        overflow: 'hidden',
        borderBottom: 'var(--border-subtle)'
      }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '68px',
          fontWeight: 800,
          lineHeight: 0.9,
          color: 'var(--lime)',
          textTransform: 'uppercase',
          letterSpacing: '-0.04em',
          position: 'absolute',
          left: 0,
          whiteSpace: 'nowrap',
          userSelect: 'none',
          pointerEvents: 'none'
        }}>
          {currentMonthName}
        </div>
      </div>

      {/* Day Header Row: Sun - Sat, small caps, grey */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        textAlign: 'center',
        marginBottom: '12px',
        gap: '4px'
      }}>
        {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((d) => (
          <div
            key={d}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              fontWeight: 700,
              color: 'var(--text-dim)',
              letterSpacing: '0.04em'
            }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Calendar Grid Cells */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '6px'
      }}>
        {/* Blank Padding Cells */}
        {Array.from({ length: firstDayIndex }).map((_, idx) => (
          <div key={`blank-${idx}`} style={{ minHeight: '48px' }} />
        ))}

        {/* Day Cells 1..totalDaysInMonth */}
        {Array.from({ length: totalDaysInMonth }).map((_, idx) => {
          const dayNum = idx + 1;
          const dateStr = getDateStr(dayNum);
          const isToday = dateStr === '2026-07-24';
          const isSelected = dateStr === selectedDate;

          const dayTaskList = tasks.filter(t => t.date === dateStr);
          const dayEvents = ACADEMIC.filter(e => e.date === dateStr);
          const totalCount = dayTaskList.length;

          // Categorized count badges
          const studyCount = dayTaskList.filter(t => t.category === 'study').length;
          const assignmentCount = dayTaskList.filter(t => t.category === 'assignment').length;
          const examCount = dayTaskList.filter(t => t.category === 'exam' || t.category === 'other').length;

          return (
            <div
              key={dateStr}
              onClick={() => onSelectDate(dateStr)}
              style={{
                minHeight: '52px',
                borderRadius: '8px',
                padding: '6px 4px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
                // Today cell: --blue filled, white text
                backgroundColor: isToday
                  ? 'var(--blue)'
                  : isSelected
                  ? 'var(--grey2)'
                  : 'var(--grey)',
                color: isToday ? 'var(--white)' : 'var(--white)',
                border: isSelected ? '1px solid var(--lime)' : 'var(--border-subtle)',
                position: 'relative'
              }}
            >
              {/* Day Number + Academic Event Star indicator */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  fontWeight: 800,
                  color: isToday ? 'var(--white)' : isSelected ? 'var(--lime)' : 'var(--white)'
                }}>
                  {dayNum}
                </span>

                {dayEvents.length > 0 && (
                  <span
                    title={dayEvents.map(e => e.name).join(', ')}
                    style={{
                      color: 'var(--lime)',
                      fontSize: '10px',
                      fontWeight: 800
                    }}
                  >
                    ★
                  </span>
                )}
              </div>

              {/* Task Cells: small colored rounded square badges with count 2X style label */}
              {totalCount > 0 ? (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px',
                  marginTop: '4px',
                  flexWrap: 'wrap'
                }}>
                  {studyCount > 0 && (
                    <span style={{
                      backgroundColor: 'var(--lime)',
                      color: 'var(--black)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '8px',
                      fontWeight: 800,
                      padding: '1px 4px',
                      borderRadius: '4px',
                      lineHeight: 1
                    }}>
                      {studyCount}X
                    </span>
                  )}
                  {assignmentCount > 0 && (
                    <span style={{
                      backgroundColor: isToday ? 'var(--white)' : 'var(--blue)',
                      color: isToday ? 'var(--blue)' : 'var(--white)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '8px',
                      fontWeight: 800,
                      padding: '1px 4px',
                      borderRadius: '4px',
                      lineHeight: 1
                    }}>
                      {assignmentCount}X
                    </span>
                  )}
                  {examCount > 0 && (
                    <span style={{
                      backgroundColor: '#FF3B30',
                      color: 'var(--white)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '8px',
                      fontWeight: 800,
                      padding: '1px 4px',
                      borderRadius: '4px',
                      lineHeight: 1
                    }}>
                      {examCount}X
                    </span>
                  )}
                </div>
              ) : (
                /* Empty Cells: + icon in grey */
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenQuickAddForDate(dateStr);
                  }}
                  title="Add task for this day"
                  style={{
                    alignSelf: 'flex-end',
                    color: 'var(--text-dim)',
                    opacity: 0.6,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 0
                  }}
                >
                  <Plus size={12} />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
