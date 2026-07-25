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
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(6px)',
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
          maxWidth: '440px',
          backgroundColor: 'var(--card-light)',
          borderTopLeftRadius: '28px',
          borderTopRightRadius: '28px',
          padding: '24px 24px 36px 24px',
          color: 'var(--text-dark)',
          boxShadow: '0 -10px 40px rgba(0,0,0,0.15)'
        }}
      >
        {/* Header bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px'
        }}>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-dark)' }}>
              Quick Task Entry
            </div>
            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>
              Targeting {selectedDate}
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

        {/* Form Input Line */}
        <form onSubmit={handleSubmit} style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#F5F5F7',
              borderRadius: 'var(--radius-pill)',
              padding: '6px 8px 6px 18px'
            }}>
              <input
                type="text"
                placeholder="Type engagement / task title..."
                value={inputTitle}
                onChange={(e) => setInputTitle(e.target.value)}
                autoFocus
                style={{
                  flex: 1,
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'var(--text-dark)',
                  backgroundColor: 'transparent',
                  border: 'none',
                  outline: 'none'
                }}
              />

              <button
                type="submit"
                disabled={!inputTitle.trim()}
                style={{
                  backgroundColor: inputTitle.trim() ? 'var(--card-dark)' : '#E0E0E5',
                  color: inputTitle.trim() ? 'var(--card-light)' : 'var(--text-muted)',
                  fontSize: '12px',
                  fontWeight: 800,
                  padding: '10px 20px',
                  borderRadius: 'var(--radius-pill)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  cursor: 'pointer'
                }}
              >
                Add <ArrowRight size={14} />
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
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--text-muted)'
              }}>
                TARGET HOUR SLOT:
              </span>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                style={{
                  backgroundColor: '#F0F0F2',
                  color: 'var(--text-dark)',
                  fontSize: '12px',
                  fontWeight: 700,
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-pill)',
                  border: 'none'
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
              fontSize: '12px',
              fontWeight: 700,
              color: 'var(--text-muted)',
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
