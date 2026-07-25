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
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(8px)',
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
          maxWidth: '460px',
          height: '85vh',
          backgroundColor: 'var(--card-light)',
          borderTopLeftRadius: '28px',
          borderTopRightRadius: '28px',
          display: 'flex',
          flexDirection: 'column',
          color: 'var(--text-dark)',
          overflow: 'hidden',
          boxShadow: '0 -15px 50px rgba(0,0,0,0.15)'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '18px 20px',
          borderBottom: '1px solid #EBEBEF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-dark)' }}>
              Sec B (CSE) Timetable
            </div>
            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>
              JKLU Odd Semester 2026-27
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              color: 'var(--text-muted)',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Day Switcher Tabs */}
        <div style={{
          display: 'flex',
          backgroundColor: '#F5F5F7',
          padding: '8px 12px',
          gap: '6px',
          borderBottom: '1px solid #EBEBEF'
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
                  fontSize: '12px',
                  fontWeight: 800,
                  borderRadius: 'var(--radius-pill)',
                  backgroundColor: isActive ? 'var(--card-dark)' : 'transparent',
                  color: isActive ? 'var(--card-light)' : 'var(--text-muted)',
                  textAlign: 'center',
                  transition: 'all 0.15s ease',
                  cursor: 'pointer'
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
                backgroundColor: '#F7F7F9',
                borderRadius: '20px',
                padding: '16px 18px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              {/* Slot Time & Type Badge */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 800, color: 'var(--text-dark)' }}>
                  <Clock size={14} color="var(--mint-dark)" /> {slot.time}
                </div>

                <span className="trantor-pill trantor-pill-mint" style={{ fontSize: '10px' }}>
                  {slot.type}
                </span>
              </div>

              {/* Subject Title */}
              <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-dark)', lineHeight: 1.2 }}>
                {slot.subject}
              </div>

              {/* Faculty & Room Row */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--text-muted)',
                marginTop: '2px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <User size={13} color="var(--text-muted)" />
                  <span>{slot.faculty}</span>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  backgroundColor: '#EBEBEF',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-pill)',
                  color: 'var(--text-dark)',
                  fontWeight: 700
                }}>
                  <MapPin size={12} color="var(--mint-dark)" />
                  <span>{slot.room}</span>
                </div>
              </div>
            </div>
          ))}

          {/* Lunch Notice */}
          <div style={{
            backgroundColor: 'var(--mint-light)',
            borderRadius: '16px',
            padding: '14px',
            textAlign: 'center',
            fontSize: '12px',
            fontWeight: 800,
            color: 'var(--mint-dark)'
          }}>
            ⏰ 12:50 PM - 2:00 PM — LUNCH BREAK & RECHARGE
          </div>
        </div>
      </div>
    </div>
  );
};
