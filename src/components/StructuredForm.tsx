import React, { useState } from 'react';
import type { Task, CategoryType, PriorityType } from '../types';
import { ArrowLeft, Check } from 'lucide-react';
import { getTodayDateString } from '../services/bufferEngine';

interface StructuredFormProps {
  initialTask?: Task | null;
  defaultDate?: string;
  defaultTimeSlot?: string;
  onSave: (taskData: Omit<Task, 'id' | 'created'> & { id?: string }) => void;
  onCancel: () => void;
}

export const StructuredForm: React.FC<StructuredFormProps> = ({
  initialTask,
  defaultDate,
  defaultTimeSlot,
  onSave,
  onCancel
}) => {
  const [title, setTitle] = useState(initialTask?.title || '');
  const [date, setDate] = useState(initialTask?.date || defaultDate || getTodayDateString());
  const [timeSlot, setTimeSlot] = useState<string>(initialTask?.timeSlot || defaultTimeSlot || '18:00');
  const [category, setCategory] = useState<CategoryType>(initialTask?.category || 'study');
  const [priority, setPriority] = useState<PriorityType>(initialTask?.priority || 'high');
  const [note, setNote] = useState(initialTask?.note || '');

  const categories: { id: CategoryType; label: string }[] = [
    { id: 'study', label: 'STUDY' },
    { id: 'assignment', label: 'ASSIGNMENT' },
    { id: 'exam', label: 'EXAM' },
    { id: 'fitness', label: 'FITNESS / GYM' },
    { id: 'buffer', label: 'BUFFER TIME' },
    { id: 'personal', label: 'PERSONAL' },
    { id: 'other', label: 'OTHER' }
  ];

  const priorities: { id: PriorityType; label: string; pillClass: string }[] = [
    { id: 'high', label: 'HIGH', pillClass: 'trantor-pill-amber' },
    { id: 'med', label: 'MED', pillClass: 'trantor-pill-lavender' },
    { id: 'low', label: 'LOW', pillClass: 'trantor-pill-mint' }
  ];

  const timeSlots = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      id: initialTask?.id,
      title: title.trim(),
      date,
      timeSlot,
      category,
      priority,
      note: note.trim(),
      done: initialTask?.done || false
    });
  };

  return (
    <div style={{
      backgroundColor: 'var(--canvas-bg)',
      color: 'var(--text-dark)',
      minHeight: '100vh',
      padding: '24px 20px',
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '720px',
      margin: '0 auto',
      position: 'relative',
      zIndex: 100
    }}>
      {/* Top Nav: Full-width Dark Pill with Back Arrow + Title */}
      <div style={{
        backgroundColor: 'var(--card-dark)',
        color: 'var(--card-light)',
        borderRadius: 'var(--radius-pill)',
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '24px'
      }}>
        <button
          onClick={onCancel}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: 'var(--mint)',
            fontSize: '13px',
            fontWeight: 800,
            cursor: 'pointer'
          }}
        >
          <ArrowLeft size={18} /> BACK
        </button>

        <div style={{
          fontSize: '15px',
          fontWeight: 800,
          letterSpacing: '0.04em'
        }}>
          {initialTask ? 'Edit Task Specifications' : 'New Task Specifications'}
        </div>

        <div style={{ width: '40px' }} />
      </div>

      <form onSubmit={handleSubmit} className="trantor-card-light" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Task Title */}
        <div>
          <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>
            TASK NAME
          </label>

          <input
            type="text"
            placeholder="e.g. Algorithms HW 4 Solution..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{
              width: '100%',
              fontSize: '20px',
              fontWeight: 800,
              color: 'var(--text-dark)',
              backgroundColor: '#F5F5F7',
              borderRadius: '16px',
              padding: '14px 18px',
              marginTop: '6px'
            }}
          />
        </div>

        {/* Sub-row three columns layout (Date, Time Slot, Priority) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '14px'
        }}>
          <div>
            <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>
              DATE
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: 'var(--text-dark)',
                backgroundColor: '#F5F5F7',
                padding: '12px 14px',
                borderRadius: '14px',
                width: '100%',
                marginTop: '4px'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>
              HOUR SLOT
            </label>
            <select
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: 'var(--text-dark)',
                backgroundColor: '#F5F5F7',
                padding: '12px 14px',
                borderRadius: '14px',
                width: '100%',
                marginTop: '4px',
                cursor: 'pointer'
              }}
            >
              {timeSlots.map(ts => {
                const h = parseInt(ts.split(':')[0], 10);
                const display12h = h === 0 ? '12 AM' : h < 12 ? `${h} AM` : h === 12 ? '12 PM' : `${h - 12} PM`;
                return (
                  <option key={ts} value={ts}>
                    {ts} ({display12h})
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>
              PRIORITY
            </label>
            <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
              {priorities.map((p) => (
                <button
                  type="button"
                  key={p.id}
                  onClick={() => setPriority(p.id)}
                  style={{
                    flex: 1,
                    padding: '10px 4px',
                    fontSize: '11px',
                    fontWeight: 800,
                    borderRadius: 'var(--radius-pill)',
                    backgroundColor: priority === p.id ? 'var(--card-dark)' : '#F0F0F2',
                    color: priority === p.id ? 'var(--card-light)' : 'var(--text-dark)',
                    textAlign: 'center',
                    cursor: 'pointer'
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Category Selection */}
        <div>
          <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px', display: 'block' }}>
            CATEGORY TAG
          </label>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {categories.map((cat) => {
              const isSelected = category === cat.id;
              return (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-pill)',
                    backgroundColor: isSelected ? 'var(--card-dark)' : '#F0F0F2',
                    color: isSelected ? 'var(--mint)' : 'var(--text-dark)',
                    cursor: 'pointer'
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Note / Description Field */}
        <div>
          <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>
            SPECIFICATION NOTES
          </label>
          <textarea
            rows={3}
            placeholder="Add detailed instructions, textbook pages, links..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            style={{
              width: '100%',
              fontSize: '13px',
              color: 'var(--text-dark)',
              backgroundColor: '#F5F5F7',
              padding: '14px 18px',
              borderRadius: '16px',
              marginTop: '4px',
              resize: 'none'
            }}
          />
        </div>

        {/* Form Action Submit Button */}
        <button
          type="submit"
          style={{
            backgroundColor: 'var(--card-dark)',
            color: 'var(--card-light)',
            fontSize: '15px',
            fontWeight: 800,
            padding: '16px',
            borderRadius: 'var(--radius-pill)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '10px',
            boxShadow: '0 6px 20px rgba(0,0,0,0.12)'
          }}
        >
          <Check size={20} strokeWidth={3} color="var(--mint)" />
          {initialTask ? 'SAVE SPECIFICATIONS' : 'CREATE TASK SPECIFICATION'}
        </button>
      </form>
    </div>
  );
};
