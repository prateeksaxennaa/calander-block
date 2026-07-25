import React, { useState } from 'react';
import type { Assignment, Task } from '../types';
import { Plus, Zap, CheckCircle2 } from 'lucide-react';
import { autoSplitAssignmentWorkload } from '../services/aiEngine';

interface AssignmentsViewProps {
  assignments: Assignment[];
  tasks: Task[];
  selectedDate: string;
  onAddAssignment: (assignment: Omit<Assignment, 'id'>) => Assignment;
  onUpdateAssignment: (id: string, updates: Partial<Assignment>) => void;
  onAddTask: (task: Omit<Task, 'id' | 'created'>) => Task;
}

export const AssignmentsView: React.FC<AssignmentsViewProps> = ({
  assignments,
  tasks,
  selectedDate,
  onAddAssignment,
  onUpdateAssignment,
  onAddTask
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [dueDate, setDueDate] = useState('2026-07-30');
  const [estimatedHours, setEstimatedHours] = useState('4');

  const pendingAssignments = assignments.filter(a => a.status !== 'completed');
  const totalEstHours = pendingAssignments.reduce((acc, a) => acc + (a.estimatedHours - a.completedHours), 0);

  const handleAutoSplit = (asgn: Assignment) => {
    autoSplitAssignmentWorkload(asgn, selectedDate, tasks, onAddTask);
    alert(`⚡ AI has auto-split "${asgn.title}" (${asgn.estimatedHours}h) into optimal focus sessions on your Master Timeline!`);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !subject.trim()) return;

    onAddAssignment({
      title: title.trim(),
      subject: subject.trim(),
      dueDate,
      dueTime: '23:59',
      estimatedHours: parseFloat(estimatedHours) || 3,
      completedHours: 0,
      priority: 'high',
      status: 'pending'
    });

    setTitle('');
    setSubject('');
    setIsModalOpen(false);
  };

  return (
    <div style={{ color: 'var(--text-dark)', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '24px'
      }}>
        <div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            WORKLOAD ENGINE
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-dark)', letterSpacing: '-0.02em' }}>
            Assignments & Deadlines
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
          <Plus size={18} strokeWidth={3} color="var(--mint)" /> NEW ASSIGNMENT
        </button>
      </div>

      {/* Summary Metric Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <div className="trantor-card-light">
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)' }}>
            PENDING ASSIGNMENTS
          </div>
          <div style={{ fontSize: '38px', fontWeight: 800, color: 'var(--text-dark)', marginTop: '4px' }}>
            {pendingAssignments.length}
          </div>
        </div>

        <div className="trantor-card-light">
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)' }}>
            ESTIMATED WORKLOAD REMAINING
          </div>
          <div style={{ fontSize: '38px', fontWeight: 800, color: 'var(--mint-dark)', marginTop: '4px' }}>
            {totalEstHours} Hours
          </div>
        </div>
      </div>

      {/* Assignment List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {assignments.map(a => {
          const isDone = a.status === 'completed';
          const pct = Math.min(100, (a.completedHours / a.estimatedHours) * 100);

          return (
            <div key={a.id} className="trantor-card-light" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '12px'
              }}>
                <div>
                  <span className="trantor-pill trantor-pill-lavender" style={{ fontSize: '10px', padding: '3px 8px', marginBottom: '6px' }}>
                    {a.subject}
                  </span>
                  <div style={{
                    fontSize: '20px',
                    fontWeight: 800,
                    color: isDone ? 'var(--text-muted)' : 'var(--text-dark)',
                    textDecoration: isDone ? 'line-through' : 'none'
                  }}>
                    {a.title}
                  </div>
                </div>

                <span className={`trantor-pill ${isDone ? 'trantor-pill-mint' : 'trantor-pill-amber'}`}>
                  DUE {a.dueDate}
                </span>
              </div>

              {/* Progress Bar & Workload hours */}
              <div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  marginBottom: '6px'
                }}>
                  <span>Workload Progress</span>
                  <span>{a.completedHours} / {a.estimatedHours} Hours</span>
                </div>
                <div style={{
                  height: '10px',
                  backgroundColor: '#EBEBEF',
                  borderRadius: 'var(--radius-pill)',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${pct}%`,
                    height: '100%',
                    backgroundColor: isDone ? 'var(--mint-dark)' : 'var(--card-dark)',
                    borderRadius: 'var(--radius-pill)'
                  }} />
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '12px',
                borderTop: '1px solid #EBEBEF'
              }}>
                <button
                  onClick={() => onUpdateAssignment(a.id, { status: isDone ? 'pending' : 'completed' })}
                  style={{
                    backgroundColor: 'transparent',
                    color: isDone ? 'var(--mint-dark)' : 'var(--text-muted)',
                    fontSize: '13px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <CheckCircle2 size={16} /> {isDone ? 'COMPLETED' : 'MARK COMPLETE'}
                </button>

                {!isDone && (
                  <button
                    onClick={() => handleAutoSplit(a)}
                    className="trantor-pill trantor-pill-mint"
                    style={{ cursor: 'pointer', border: 'none', padding: '8px 16px' }}
                  >
                    <Zap size={14} fill="var(--mint-dark)" /> AI AUTO-SPLIT INTO TIMELINE
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Modal */}
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
            style={{
              width: '100%',
              maxWidth: '460px'
            }}
          >
            <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '16px' }}>
              Create Assignment Specification
            </div>

            <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>TITLE</label>
                <input
                  type="text"
                  placeholder="e.g. Operating Systems Lab Assignment 3"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
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
                <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>SUBJECT</label>
                <input
                  type="text"
                  placeholder="e.g. Operating Systems (CSE301)"
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>DUE DATE</label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={e => setDueDate(e.target.value)}
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
                  <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>ESTIMATED HOURS</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={estimatedHours}
                    onChange={e => setEstimatedHours(e.target.value)}
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
                  Create Spec
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
