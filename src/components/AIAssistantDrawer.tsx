import React, { useState } from 'react';
import { X, Sparkles, Send } from 'lucide-react';
import type { Task, Assignment, AICommandResult } from '../types';
import { parseNaturalLanguageInput } from '../services/aiEngine';

interface AIAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: string;
  tasks: Task[];
  assignments: Assignment[];
  onAddTask: (task: Omit<Task, 'id' | 'created'>) => Task;
  onAddAssignment: (assignment: Omit<Assignment, 'id'>) => Assignment;
  onUpdateTask: (id: string, updates: Partial<Task>) => void;
  onDeleteTask: (id: string) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  details?: string;
  actionTaken?: AICommandResult['actionTaken'];
  timestamp: string;
}

export const AIAssistantDrawer: React.FC<AIAssistantDrawerProps> = ({
  isOpen,
  onClose,
  selectedDate,
  tasks,
  assignments,
  onAddTask,
  onAddAssignment,
  onUpdateTask,
  onDeleteTask
}) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: "⚡ Hello Prateek! I am your AI Time Protection Assistant. Ask me if you have time today, generate an optimized study plan, or type natural commands like 'Physics assignment due Friday 4 hours'.",
      timestamp: 'Just now'
    }
  ]);

  if (!isOpen) return null;

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');

    // Execute AI Natural Language Parser
    setTimeout(() => {
      const res = parseNaturalLanguageInput(
        query,
        selectedDate,
        tasks,
        assignments,
        onAddTask,
        onAddAssignment,
        onUpdateTask,
        onDeleteTask
      );

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: res.message,
        details: res.details,
        actionTaken: res.actionTaken,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
    }, 200);
  };

  const samplePrompts = [
    "Movie tonight?",
    "Generate today's study plan",
    "Physics assignment due Friday 4 hours",
    "Gym after class",
    "Shift gym to tomorrow",
    "Book 3 hours for DSA before Friday"
  ];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        backgroundColor: 'rgba(0,0,0,0.4)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        justifyContent: 'flex-end'
      }}
      onClick={onClose}
    >
      <div
        className="animate-slide-up"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '440px',
          height: '100vh',
          backgroundColor: 'var(--card-light)',
          display: 'flex',
          flexDirection: 'column',
          color: 'var(--text-dark)',
          boxShadow: '-10px 0 40px rgba(0,0,0,0.15)'
        }}
      >
        {/* Drawer Header */}
        <div style={{
          padding: '18px 20px',
          borderBottom: '1px solid #EBEBEF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'var(--card-light)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sparkles size={20} color="var(--mint-dark)" />
            <div style={{
              fontSize: '15px',
              fontWeight: 800,
              color: 'var(--text-dark)'
            }}>
              AI Time Assistant
            </div>
          </div>

          <button onClick={onClose} style={{ color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Quick Sample Prompt Chips */}
        <div style={{
          padding: '12px 16px',
          backgroundColor: '#F7F7F9',
          borderBottom: '1px solid #EBEBEF',
          display: 'flex',
          gap: '8px',
          overflowX: 'auto'
        }}>
          {samplePrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt)}
              className="trantor-pill trantor-pill-mint"
              style={{
                fontSize: '11px',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                border: 'none'
              }}
            >
              + {prompt}
            </button>
          ))}
        </div>

        {/* Chat Messages List */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          {messages.map((m) => {
            const isUser = m.sender === 'user';
            return (
              <div
                key={m.id}
                style={{
                  alignSelf: isUser ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  backgroundColor: isUser ? 'var(--card-dark)' : '#F0F0F3',
                  color: isUser ? 'var(--card-light)' : 'var(--text-dark)',
                  borderRadius: isUser ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                  padding: '12px 16px'
                }}
              >
                <div style={{ fontSize: '13px', lineHeight: 1.4, fontWeight: 500 }}>
                  {m.text}
                </div>

                {m.details && (
                  <div style={{
                    marginTop: '8px',
                    paddingTop: '8px',
                    borderTop: `1px solid ${isUser ? 'rgba(255,255,255,0.15)' : '#E0E0E5'}`,
                    fontSize: '11px',
                    fontWeight: 700,
                    color: isUser ? 'var(--mint)' : 'var(--mint-dark)'
                  }}>
                    {m.details}
                  </div>
                )}

                <div style={{
                  fontSize: '10px',
                  color: isUser ? 'var(--text-muted-dark)' : 'var(--text-muted)',
                  marginTop: '4px',
                  textAlign: 'right'
                }}>
                  {m.timestamp}
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          style={{
            padding: '16px 20px',
            borderTop: '1px solid #EBEBEF',
            backgroundColor: 'var(--card-light)',
            display: 'flex',
            gap: '10px'
          }}
        >
          <input
            type="text"
            placeholder="Type natural command e.g. Physics assignment due Friday..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              flex: 1,
              backgroundColor: '#F5F5F7',
              borderRadius: 'var(--radius-pill)',
              padding: '10px 18px',
              color: 'var(--text-dark)',
              fontSize: '13px',
              fontWeight: 500
            }}
          />
          <button
            type="submit"
            disabled={!input.trim()}
            style={{
              backgroundColor: input.trim() ? 'var(--card-dark)' : '#E0E0E5',
              color: input.trim() ? 'var(--card-light)' : 'var(--text-muted)',
              borderRadius: '50%',
              width: '38px',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};
