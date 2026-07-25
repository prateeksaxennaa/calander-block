import React, { useState } from 'react';
import type { HourlyLogItem, CategoryType } from '../types';
import { Plus } from 'lucide-react';

interface HourlyLogViewProps {
  logs: HourlyLogItem[];
  selectedDate: string;
  onAddLog: (log: Omit<HourlyLogItem, 'id' | 'timestamp'>) => void;
}

export const HourlyLogView: React.FC<HourlyLogViewProps> = ({ logs, selectedDate, onAddLog }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activity, setActivity] = useState('');
  const [category, _setCategory] = useState<CategoryType>('study');
  const [mood, setMood] = useState<HourlyLogItem['mood']>('focused');
  const [energy, setEnergy] = useState<number>(4);
  const [focusScore, setFocusScore] = useState<number>(4);
  const [notes, setNotes] = useState('');

  const todayLogs = logs.filter(l => l.date === selectedDate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activity.trim()) return;

    onAddLog({
      date: selectedDate,
      hour: new Date().getHours(),
      activity: activity.trim(),
      category,
      mood,
      energy,
      focusScore,
      notes: notes.trim()
    });

    setActivity('');
    setNotes('');
    setIsModalOpen(false);
  };

  const moodBadges: Record<HourlyLogItem['mood'], { label: string; icon: string; pillClass: string }> = {
    fired_up: { label: 'FIRED UP', icon: '🔥', pillClass: 'trantor-pill-amber' },
    focused: { label: 'FOCUSED', icon: '⚡', pillClass: 'trantor-pill-mint' },
    neutral: { label: 'NEUTRAL', icon: '😐', pillClass: 'trantor-pill-lavender' },
    tired: { label: 'TIRED', icon: '😴', pillClass: 'trantor-pill-amber' },
    chill: { label: 'CHILL', icon: '🧘', pillClass: 'trantor-pill-mint' }
  };

  return (
    <div style={{ color: 'var(--text-dark)', maxWidth: '900px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '24px'
      }}>
        <div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            REFLECTION & JOURNAL ENGINE
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-dark)', letterSpacing: '-0.02em' }}>
            Hourly Activity Log
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            backgroundColor: 'var(--card-dark)',
            color: 'var(--card-light)',
            borderRadius: 'var(--radius-pill)',
            padding: '12px 20px',
            fontSize: '13px',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 6px 18px rgba(0,0,0,0.12)'
          }}
        >
          <Plus size={18} strokeWidth={3} color="var(--mint)" /> LOG HOUR
        </button>
      </div>

      {/* Today Logs List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {todayLogs.length === 0 ? (
          <div className="trantor-card-light" style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
            No hourly activity logs recorded for {selectedDate} yet. Use "+ LOG HOUR" to log what you did!
          </div>
        ) : (
          todayLogs.map(l => {
            const m = moodBadges[l.mood];
            return (
              <div key={l.id} className="trantor-card-light" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <span className="trantor-pill" style={{ backgroundColor: 'var(--card-dark)', color: 'var(--card-light)', fontSize: '11px' }}>
                      {String(l.hour).padStart(2, '0')}:00 SLOT
                    </span>

                    <span className={`trantor-pill ${m.pillClass}`} style={{ fontSize: '11px' }}>
                      {m.icon} {m.label}
                    </span>
                  </div>

                  <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '4px' }}>
                    {l.activity}
                  </div>

                  {l.notes && (
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
                      "{l.notes}"
                    </div>
                  )}
                </div>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  gap: '4px',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: 'var(--text-muted)'
                }}>
                  <div>Focus: <span style={{ color: 'var(--mint-dark)', fontWeight: 800 }}>{l.focusScore} / 5</span></div>
                  <div>Energy: <span style={{ color: 'var(--text-dark)', fontWeight: 800 }}>{l.energy} / 5</span></div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Log Modal */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            onClick={e => e.stopPropagation()}
            className="trantor-card-light"
            style={{ width: '100%', maxWidth: '460px' }}
          >
            <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '16px' }}>
              Log Current Hourly Activity
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>WHAT DID YOU DO THIS HOUR?</label>
                <input
                  type="text"
                  placeholder="e.g. Solved OS Kernel scheduling bugs..."
                  value={activity}
                  onChange={e => setActivity(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    backgroundColor: '#F5F5F7',
                    borderRadius: '14px',
                    padding: '12px 16px',
                    fontSize: '13px',
                    color: 'var(--text-dark)',
                    marginTop: '4px'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>MOOD & VIBE</label>
                <div style={{ display: 'flex', gap: '8px', marginTop: '6px', flexWrap: 'wrap' }}>
                  {(['fired_up', 'focused', 'neutral', 'tired', 'chill'] as const).map(m => (
                    <button
                      type="button"
                      key={m}
                      onClick={() => setMood(m)}
                      style={{
                        backgroundColor: mood === m ? 'var(--card-dark)' : '#F0F0F2',
                        color: mood === m ? 'var(--card-light)' : 'var(--text-dark)',
                        borderRadius: 'var(--radius-pill)',
                        padding: '8px 14px',
                        fontSize: '12px',
                        fontWeight: 700
                      }}
                    >
                      {moodBadges[m].icon} {moodBadges[m].label}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>FOCUS SCORE (1-5)</label>
                  <select
                    value={focusScore}
                    onChange={e => setFocusScore(parseInt(e.target.value, 10))}
                    style={{
                      width: '100%',
                      backgroundColor: '#F5F5F7',
                      borderRadius: '14px',
                      padding: '12px 16px',
                      fontSize: '13px',
                      color: 'var(--text-dark)',
                      marginTop: '4px'
                    }}
                  >
                    {[1, 2, 3, 4, 5].map(n => (
                      <option key={n} value={n}>{n} / 5</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>ENERGY SCORE (1-5)</label>
                  <select
                    value={energy}
                    onChange={e => setEnergy(parseInt(e.target.value, 10))}
                    style={{
                      width: '100%',
                      backgroundColor: '#F5F5F7',
                      borderRadius: '14px',
                      padding: '12px 16px',
                      fontSize: '13px',
                      color: 'var(--text-dark)',
                      marginTop: '4px'
                    }}
                  >
                    {[1, 2, 3, 4, 5].map(n => (
                      <option key={n} value={n}>{n} / 5</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>REFLECTION NOTES</label>
                <textarea
                  rows={2}
                  placeholder="Any insights or notes for this hour..."
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  style={{
                    width: '100%',
                    backgroundColor: '#F5F5F7',
                    borderRadius: '14px',
                    padding: '12px 16px',
                    fontSize: '13px',
                    color: 'var(--text-dark)',
                    marginTop: '4px',
                    resize: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    flex: 1,
                    backgroundColor: '#F0F0F2',
                    color: 'var(--text-dark)',
                    borderRadius: 'var(--radius-pill)',
                    padding: '12px',
                    fontWeight: 700
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    backgroundColor: 'var(--card-dark)',
                    color: 'var(--card-light)',
                    borderRadius: 'var(--radius-pill)',
                    padding: '12px',
                    fontWeight: 700
                  }}
                >
                  Save Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
