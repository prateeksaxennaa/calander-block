import React, { useState } from 'react';
import { WEEKLY_TIMETABLE } from '../data/timetable';
import type { DayOfWeek } from '../data/timetable';
import { X, Clock, MapPin, User } from 'lucide-react';

interface TimetableModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDay?: DayOfWeek;
}

export const TimetableModal: React.FC<TimetableModalProps> = ({
  isOpen,
  onClose,
  initialDay = 'MON'
}) => {
  const [activeDay, setActiveDay] = useState<DayOfWeek>(initialDay);

  if (!isOpen) return null;

  const days: DayOfWeek[] = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
  const daySchedule = WEEKLY_TIMETABLE[activeDay] || [];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center'
      }}
      onClick={onClose}
    >
      <div
        className="animate-slide-up"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '390px',
          height: '90vh',
          backgroundColor: 'var(--black)',
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          borderTop: '3px solid var(--lime)',
          display: 'flex',
          flexDirection: 'column',
          color: 'var(--white)',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: 'var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '16px',
              fontWeight: 800,
              color: 'var(--lime)',
              letterSpacing: '0.04em'
            }}>
              SEC B (CSE) TIMETABLE
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              color: 'var(--text-dim)',
              textTransform: 'uppercase'
            }}>
              JKLU ODD SEMESTER 2026-27
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              color: 'var(--white)',
              padding: '6px',
              borderRadius: '50%',
              backgroundColor: 'var(--grey2)'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Day Switcher Tabs */}
        <div style={{
          display: 'flex',
          backgroundColor: 'var(--grey)',
          padding: '6px 12px',
          gap: '6px',
          borderBottom: 'var(--border-subtle)'
        }}>
          {days.map((day) => {
            const isActive = activeDay === day;
            return (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                style={{
                  flex: 1,
                  padding: '8px 0',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  fontWeight: 800,
                  borderRadius: '8px',
                  backgroundColor: isActive ? 'var(--lime)' : 'transparent',
                  color: isActive ? 'var(--black)' : 'var(--text-dim)',
                  textAlign: 'center',
                  transition: 'all 0.15s ease'
                }}
              >
                {day}
              </button>
            );
          })}
        </div>

        {/* Classes List */}
        <div className="no-scrollbar" style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {daySchedule.map((slot) => (
            <div
              key={slot.id}
              style={{
                backgroundColor: 'var(--grey)',
                borderRadius: '14px',
                padding: '14px 16px',
                borderLeft: `4px solid ${slot.color}`,
                border: 'var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              {/* Slot Time & Type Badge */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  fontWeight: 800,
                  color: 'var(--lime)'
                }}>
                  <Clock size={13} /> {slot.time}
                </div>

                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  fontWeight: 800,
                  padding: '3px 8px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  color: slot.color,
                  textTransform: 'uppercase'
                }}>
                  {slot.type}
                </span>
              </div>

              {/* Subject Title */}
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '15px',
                fontWeight: 800,
                color: 'var(--white)',
                lineHeight: 1.2
              }}>
                {slot.subject}
              </div>

              {/* Faculty & Room Row */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-dim)',
                marginTop: '2px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <User size={12} color="var(--text-dim)" />
                  <span>{slot.faculty}</span>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  backgroundColor: 'var(--grey2)',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  color: 'var(--white)',
                  fontWeight: 700
                }}>
                  <MapPin size={11} color="var(--lime)" />
                  <span>{slot.room}</span>
                </div>
              </div>
            </div>
          ))}

          {/* Lunch Notice */}
          <div style={{
            backgroundColor: 'rgba(202, 255, 0, 0.05)',
            border: '1px stroke var(--lime)',
            borderRadius: '12px',
            padding: '12px',
            textAlign: 'center',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--lime)'
          }}>
            /// 12:50 PM - 2:00 PM — LUNCH BREAK & RECHARGE
          </div>
        </div>
      </div>
    </div>
  );
};
