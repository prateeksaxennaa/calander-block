import React, { useState } from 'react';
import type { Task, CategoryType, PriorityType } from '../types';
import { ArrowLeft, Plus, Check } from 'lucide-react';

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
  const [date, setDate] = useState(initialTask?.date || defaultDate || '2026-07-24');
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

  const priorities: { id: PriorityType; label: string; color: string }[] = [
    { id: 'high', label: 'HIGH', color: '#FF3B30' },
    { id: 'med', label: 'MED', color: 'var(--blue)' },
    { id: 'low', label: 'LOW', color: 'var(--grey2)' }
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
      backgroundColor: 'var(--white)',
      color: 'var(--black)',
      minHeight: '100vh',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      zIndex: 100
    }}>
      {/* Top Nav: Full-width Black Pill with Back Arrow + Title */}
      <div style={{
        backgroundColor: 'var(--black)',
        color: 'var(--white)',
        borderRadius: '30px',
        padding: '12px 18px',
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
            color: 'var(--lime)',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            fontWeight: 800
          }}
        >
          <ArrowLeft size={18} /> BACK
        </button>

        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '15px',
          fontWeight: 800,
          letterSpacing: '0.06em',
          textTransform: 'uppercase'
        }}>
          {initialTask ? 'EDIT SPECIFICATIONS' : 'NEW TASK SPECIFICATIONS'}
        </div>

        <div style={{ width: '40px' }} />
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Row 1: Task Title & Header Label */}
        <div style={{
          borderBottom: '1px solid #D0D0CE',
          paddingBottom: '16px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '8px'
          }}>
            <span style={{
              backgroundColor: 'var(--blue)',
              color: 'var(--white)',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              fontWeight: 800,
              padding: '4px 10px',
              borderRadius: '12px',
              textTransform: 'uppercase'
            }}>
              TASK NAME
            </span>
            <Plus size={16} color="var(--blue)" />
          </div>

          <input
            type="text"
            placeholder="e.g. Algorithms HW 4 Solution..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{
              width: '100%',
              fontFamily: 'var(--font-display)',
              fontSize: '20px',
              fontWeight: 800,
              color: 'var(--black)',
              padding: '8px 0',
              borderBottom: '2px solid var(--black)'
            }}
          />
        </div>

        {/* Row 2: Sub-row three columns layout (Date, Time Slot, Priority) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '12px',
          borderBottom: '1px solid #D0D0CE',
          paddingBottom: '16px'
        }}>
          <div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              fontWeight: 700,
              color: 'var(--text-dim)',
              textTransform: 'uppercase',
              marginBottom: '6px'
            }}>
              DATE
            </div>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                fontWeight: 800,
                color: 'var(--black)',
                backgroundColor: 'rgba(0,0,0,0.05)',
                padding: '8px 6px',
                borderRadius: '8px',
                width: '100%'
              }}
            />
          </div>

          <div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              fontWeight: 700,
              color: 'var(--text-dim)',
              textTransform: 'uppercase',
              marginBottom: '6px'
            }}>
              HOUR SLOT
            </div>
            <select
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                fontWeight: 800,
                color: 'var(--black)',
                backgroundColor: 'rgba(0,0,0,0.05)',
                padding: '8px 6px',
                borderRadius: '8px',
                width: '100%',
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
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              fontWeight: 700,
              color: 'var(--text-dim)',
              textTransform: 'uppercase',
              marginBottom: '6px'
            }}>
              PRIORITY
            </div>
            <div style={{ display: 'flex', gap: '2px' }}>
              {priorities.map((p) => (
                <button
                  type="button"
                  key={p.id}
                  onClick={() => setPriority(p.id)}
                  style={{
                    flex: 1,
                    padding: '8px 2px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    fontWeight: 800,
                    borderRadius: '6px',
                    backgroundColor: priority === p.id ? p.color : 'rgba(0,0,0,0.05)',
                    color: priority === p.id ? 'var(--white)' : 'var(--black)',
                    textTransform: 'uppercase',
                    textAlign: 'center'
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Row 3: Category Selection */}
        <div style={{
          borderBottom: '1px solid #D0D0CE',
          paddingBottom: '16px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '10px'
          }}>
            <span style={{
              backgroundColor: 'var(--blue)',
              color: 'var(--white)',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              fontWeight: 800,
              padding: '4px 10px',
              borderRadius: '12px',
              textTransform: 'uppercase'
            }}>
              CATEGORY TAG
            </span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {categories.map((cat) => {
              const isSelected = category === cat.id;
              return (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    fontWeight: 800,
                    padding: '8px 14px',
                    borderRadius: '16px',
                    backgroundColor: isSelected ? 'var(--black)' : 'rgba(0,0,0,0.06)',
                    color: isSelected ? 'var(--lime)' : 'var(--black)',
                    textTransform: 'uppercase'
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 4: Note / Description Field */}
        <div style={{
          borderBottom: '1px solid #D0D0CE',
          paddingBottom: '16px'
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            fontWeight: 700,
            color: 'var(--text-dim)',
            textTransform: 'uppercase',
            marginBottom: '6px'
          }}>
            SPECIFICATION NOTES
          </div>
          <textarea
            rows={3}
            placeholder="Add detailed instructions, textbook pages, links..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            style={{
              width: '100%',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: 'var(--black)',
              backgroundColor: 'rgba(0,0,0,0.04)',
              padding: '10px',
              borderRadius: '8px',
              resize: 'none'
            }}
          />
        </div>

        {/* Form Action Submit Button */}
        <button
          type="submit"
          style={{
            backgroundColor: 'var(--black)',
            color: 'var(--lime)',
            fontFamily: 'var(--font-display)',
            fontSize: '16px',
            fontWeight: 800,
            padding: '16px',
            borderRadius: '14px',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '10px'
          }}
        >
          <Check size={20} strokeWidth={3} />
          {initialTask ? 'SAVE SPECIFICATIONS' : 'CREATE TASK SPECIFICATION'}
        </button>
      </form>
    </div>
  );
};
