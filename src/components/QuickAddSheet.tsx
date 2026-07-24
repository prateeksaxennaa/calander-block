import React, { useState, useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';

interface QuickAddSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onQuickAdd: (title: string, date: string, timeSlot?: string) => void;
  onOpenStructuredForm: () => void;
  selectedDate: string;
  initialTimeSlot?: string;
}

export const QuickAddSheet: React.FC<QuickAddSheetProps> = ({
  isOpen,
  onClose,
  onQuickAdd,
  onOpenStructuredForm,
  selectedDate,
  initialTimeSlot
}) => {
  const [inputTitle, setInputTitle] = useState('');
  const [timeSlot, setTimeSlot] = useState<string>(initialTimeSlot || '18:00');

  useEffect(() => {
    if (initialTimeSlot) {
      setTimeSlot(initialTimeSlot);
    }
  }, [initialTimeSlot, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputTitle.trim()) return;
    onQuickAdd(inputTitle.trim(), selectedDate, timeSlot);
    setInputTitle('');
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center'
      }}
      onClick={onClose}
    >
      {/* Bottom Sheet Card */}
      <div
        className="animate-slide-up"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '390px',
          backgroundColor: 'var(--black)',
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          borderTop: '2px solid var(--lime)',
          padding: '20px 20px 32px 20px',
          color: 'var(--white)'
        }}
      >
        {/* Header bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px'
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            fontWeight: 800,
            color: 'var(--lime)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase'
          }}>
            /// QUICK TASK ADD ({selectedDate})
          </div>

          <button
            onClick={onClose}
            style={{
              color: 'var(--text-dim)',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Input Line + Add Lime Pill */}
        <form onSubmit={handleSubmit} style={{ marginBottom: '14px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'var(--grey)',
              borderRadius: '30px',
              padding: '6px 8px 6px 16px',
              border: 'var(--border-subtle)'
            }}>
              <input
                type="text"
                placeholder="Type engagement / task title here..."
                value={inputTitle}
                onChange={(e) => setInputTitle(e.target.value)}
                autoFocus
                style={{
                  flex: 1,
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  color: 'var(--white)'
                }}
              />

              <button
                type="submit"
                disabled={!inputTitle.trim()}
                style={{
                  backgroundColor: inputTitle.trim() ? 'var(--lime)' : 'var(--grey2)',
                  color: inputTitle.trim() ? 'var(--black)' : 'var(--text-dim)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  fontWeight: 800,
                  padding: '8px 18px',
                  borderRadius: '20px',
                  textTransform: 'uppercase',
                  transition: 'all 0.15s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                ADD <ArrowRight size={14} />
              </button>
            </div>

            {/* Time Slot Picker in Quick Sheet */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 8px'
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: 'var(--text-dim)',
                textTransform: 'uppercase'
              }}>
                TARGET HOUR SLOT:
              </span>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                style={{
                  backgroundColor: 'var(--grey2)',
                  color: 'var(--lime)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '4px 8px',
                  borderRadius: '6px',
                  border: 'var(--border-subtle)'
                }}
              >
                {Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`).map(ts => {
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
          </div>
        </form>

        {/* Toggle link to structured form */}
        <div style={{ textAlign: 'center' }}>
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenStructuredForm();
            }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--text-dim)',
              textDecoration: 'underline',
              cursor: 'pointer'
            }}
          >
            Switch to structured form ›
          </button>
        </div>
      </div>
    </div>
  );
};
