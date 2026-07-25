import React, { useState, useEffect } from 'react';
import { Search, X, Calendar, BookOpen, Clock, FileText } from 'lucide-react';
import type { Task, Assignment, HourlyLogItem, UniversityCalendarEvent } from '../types';

interface UniversalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  tasks: Task[];
  assignments: Assignment[];
  logs: HourlyLogItem[];
  academicEvents: UniversityCalendarEvent[];
  onSelectTask?: (task: Task) => void;
  onSelectAssignment?: (asgn: Assignment) => void;
}

export const UniversalSearchModal: React.FC<UniversalSearchModalProps> = ({
  isOpen,
  onClose,
  tasks,
  assignments,
  logs,
  academicEvents
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  const filteredTasks = q ? tasks.filter(t => t.title.toLowerCase().includes(q) || t.note?.toLowerCase().includes(q)) : [];
  const filteredAssignments = q ? assignments.filter(a => a.title.toLowerCase().includes(q) || a.subject.toLowerCase().includes(q)) : [];
  const filteredLogs = q ? logs.filter(l => l.activity.toLowerCase().includes(q) || l.notes?.toLowerCase().includes(q)) : [];
  const filteredCalendar = q ? academicEvents.filter(e => e.title.toLowerCase().includes(q) || e.description?.toLowerCase().includes(q)) : [];

  const totalResults = filteredTasks.length + filteredAssignments.length + filteredLogs.length + filteredCalendar.length;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '80px'
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="trantor-card-light"
        style={{
          width: '100%',
          maxWidth: '580px',
          overflow: 'hidden',
          padding: '0',
          boxShadow: '0 25px 60px rgba(0,0,0,0.15)'
        }}
      >
        {/* Search Header Input */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '16px 20px',
          borderBottom: '1px solid #EBEBEF',
          gap: '12px'
        }}>
          <Search size={20} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Search assignments, classes, notes, logs... (⌘K)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            style={{
              flex: 1,
              fontSize: '15px',
              fontWeight: 500,
              color: 'var(--text-dark)',
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none'
            }}
          />
          <button onClick={onClose} style={{ color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Search Results List */}
        <div style={{ maxHeight: '420px', overflowY: 'auto', padding: '16px 20px' }}>
          {!q && (
            <div style={{
              textAlign: 'center',
              padding: '30px 10px',
              color: 'var(--text-muted)',
              fontSize: '13px',
              fontWeight: 500
            }}>
              Search across your entire Academic Operating System (Assignments, Tasks, Logs, Exams).
            </div>
          )}

          {q && totalResults === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '30px 10px',
              color: 'var(--text-muted)',
              fontSize: '13px',
              fontWeight: 500
            }}>
              No matching records found for "{query}".
            </div>
          )}

          {/* Assignments Results */}
          {filteredAssignments.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <div style={{
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--text-muted)',
                letterSpacing: '0.04em',
                marginBottom: '8px',
                textTransform: 'uppercase'
              }}>
                ASSIGNMENTS ({filteredAssignments.length})
              </div>
              {filteredAssignments.map(asgn => (
                <div key={asgn.id} style={{
                  backgroundColor: '#F5F5F7',
                  borderRadius: '16px',
                  padding: '12px 16px',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <BookOpen size={18} color="var(--mint-dark)" />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-dark)' }}>{asgn.title}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        {asgn.subject} • Due {asgn.dueDate}
                      </div>
                    </div>
                  </div>
                  <span className="trantor-pill trantor-pill-mint" style={{ fontSize: '10px' }}>
                    {asgn.estimatedHours}h Est
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Tasks Results */}
          {filteredTasks.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <div style={{
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--text-muted)',
                letterSpacing: '0.04em',
                marginBottom: '8px',
                textTransform: 'uppercase'
              }}>
                MASTER TIMELINE TASKS ({filteredTasks.length})
              </div>
              {filteredTasks.map(t => (
                <div key={t.id} style={{
                  backgroundColor: '#F5F5F7',
                  borderRadius: '16px',
                  padding: '12px 16px',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Clock size={18} color="var(--card-dark)" />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-dark)' }}>{t.title}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        {t.date} {t.timeSlot ? `• ${t.timeSlot}` : ''}
                      </div>
                    </div>
                  </div>
                  <span className="trantor-pill trantor-pill-lavender" style={{ fontSize: '10px' }}>
                    {t.category}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Academic Calendar Results */}
          {filteredCalendar.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <div style={{
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--text-muted)',
                letterSpacing: '0.04em',
                marginBottom: '8px',
                textTransform: 'uppercase'
              }}>
                UNIVERSITY CALENDAR ({filteredCalendar.length})
              </div>
              {filteredCalendar.map(e => (
                <div key={e.id} style={{
                  backgroundColor: '#F5F5F7',
                  borderRadius: '16px',
                  padding: '12px 16px',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Calendar size={18} color="var(--amber-dark)" />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-dark)' }}>{e.title}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        {e.date} {e.endDate ? `to ${e.endDate}` : ''}
                      </div>
                    </div>
                  </div>
                  <span className="trantor-pill trantor-pill-amber" style={{ fontSize: '10px' }}>
                    {e.category}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Hourly Logs Results */}
          {filteredLogs.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <div style={{
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--text-muted)',
                letterSpacing: '0.04em',
                marginBottom: '8px',
                textTransform: 'uppercase'
              }}>
                JOURNAL & HOURLY LOGS ({filteredLogs.length})
              </div>
              {filteredLogs.map(l => (
                <div key={l.id} style={{
                  backgroundColor: '#F5F5F7',
                  borderRadius: '16px',
                  padding: '12px 16px',
                  marginBottom: '8px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <FileText size={16} color="var(--text-dark)" />
                    <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-dark)' }}>{l.activity}</div>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    {l.date} @ {l.hour}:00 — Mood: {l.mood} | Focus: {l.focusScore}/5
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
