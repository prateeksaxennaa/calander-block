import React, { useState } from 'react';
import { UNIVERSITY_ACADEMIC_CALENDAR } from '../data/universityCalendar';
import { Lock } from 'lucide-react';

export const UniversityCalendarView: React.FC = () => {
  const [filterCategory, setFilterCategory] = useState<string>('ALL');

  const categories = ['ALL', 'exam', 'holiday', 'fest', 'registration', 'convocation'];

  const filteredEvents = UNIVERSITY_ACADEMIC_CALENDAR.filter(e => {
    if (filterCategory === 'ALL') return true;
    return e.category === filterCategory;
  });

  return (
    <div style={{ color: 'var(--text-dark)', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
          INSTITUTIONAL SOURCE OF TRUTH
        </div>
        <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-dark)', letterSpacing: '-0.02em' }}>
          University Academic Calendar
        </div>
        <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-muted)', marginTop: '4px' }}>
          JKLU Official Odd Semester Schedule 2026-27 • Automatically synced to Master Timeline
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        marginBottom: '24px',
        paddingBottom: '4px'
      }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            style={{
              backgroundColor: filterCategory === cat ? 'var(--card-dark)' : '#EBEBEF',
              color: filterCategory === cat ? 'var(--card-light)' : 'var(--text-dark)',
              border: 'none',
              borderRadius: 'var(--radius-pill)',
              padding: '8px 18px',
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              cursor: 'pointer',
              boxShadow: filterCategory === cat ? '0 4px 12px rgba(0,0,0,0.12)' : 'none'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Event List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredEvents.map(e => (
          <div key={e.id} className="trantor-card-light" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span className="trantor-pill trantor-pill-mint" style={{ fontSize: '10px', padding: '3px 8px' }}>
                  <Lock size={10} /> OFFICIAL RECORD
                </span>

                <span className="trantor-pill trantor-pill-lavender" style={{ fontSize: '10px', padding: '3px 8px' }}>
                  {e.category}
                </span>
              </div>

              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '4px' }}>
                {e.title}
              </div>

              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                {e.description}
              </div>
            </div>

            <div style={{
              backgroundColor: 'var(--card-dark)',
              borderRadius: '16px',
              padding: '12px 16px',
              fontSize: '13px',
              fontWeight: 800,
              color: 'var(--mint)',
              textAlign: 'center',
              whiteSpace: 'nowrap'
            }}>
              <div>{e.date}</div>
              {e.endDate && <div style={{ fontSize: '10px', color: 'var(--text-muted-dark)' }}>to {e.endDate}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
