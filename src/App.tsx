import React, { useState, useEffect } from 'react';
import type { Task, TabType } from './types';
import { INITIAL_TASKS } from './data/academic';
import type { DayOfWeek } from './data/timetable';
import { CountdownStrip } from './components/CountdownStrip';
import { BottomTabBar } from './components/BottomTabBar';
import { TodayView } from './components/TodayView';
import { HourlyTimelineView } from './components/HourlyTimelineView';
import { WeekView } from './components/WeekView';
import { CalendarView } from './components/CalendarView';
import { StructuredForm } from './components/StructuredForm';
import { QuickAddSheet } from './components/QuickAddSheet';
import { TimetableModal } from './components/TimetableModal';
import { Calendar as CalendarIcon } from 'lucide-react';

export const App: React.FC = () => {
  // Load tasks from localStorage or initialize with preloaded JKLU academic tasks
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('prateek_tasks');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse prateek_tasks from localStorage", e);
      }
    }
    return INITIAL_TASKS;
  });

  // Active Date & View state
  const [selectedDate, setSelectedDate] = useState<string>('2026-07-24');
  const [activeTab, setActiveTab] = useState<TabType>('today');

  // Modal / Form state
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isQuickAddOpen, setIsQuickAddOpen] = useState<boolean>(false);
  const [quickAddSlot, setQuickAddSlot] = useState<string | undefined>(undefined);
  const [isTimetableModalOpen, setIsTimetableModalOpen] = useState<boolean>(false);
  const [timetableInitialDay, setTimetableInitialDay] = useState<DayOfWeek>('MON');

  const handleOpenTimetable = (day?: DayOfWeek) => {
    if (day) setTimetableInitialDay(day);
    setIsTimetableModalOpen(true);
  };

  const handleOpenQuickAddForSlot = (dateStr: string, slotStr: string) => {
    setSelectedDate(dateStr);
    setQuickAddSlot(slotStr);
    setIsQuickAddOpen(true);
  };

  // Sync tasks to localStorage
  useEffect(() => {
    localStorage.setItem('prateek_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Handlers for task mutation
  const handleToggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const handleSaveTask = (taskData: Omit<Task, 'id' | 'created'> & { id?: string }) => {
    if (taskData.id) {
      // Edit existing task
      setTasks(prev => prev.map(t => t.id === taskData.id ? { ...t, ...taskData } as Task : t));
    } else {
      // Create new task
      const newTask: Task = {
        id: `task-${Date.now()}`,
        title: taskData.title,
        date: taskData.date,
        timeSlot: taskData.timeSlot,
        category: taskData.category,
        priority: taskData.priority,
        note: taskData.note,
        done: false,
        created: Date.now()
      };
      setTasks(prev => [newTask, ...prev]);
    }
    setIsFormOpen(false);
    setEditingTask(null);
  };

  const handleQuickAdd = (title: string, date: string, timeSlot?: string) => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      title,
      date,
      timeSlot: timeSlot || quickAddSlot || '18:00',
      category: 'study',
      priority: 'high',
      done: false,
      created: Date.now()
    };
    setTasks(prev => [newTask, ...prev]);
    setQuickAddSlot(undefined);
  };

  const handleOpenStructuredForm = (task?: Task) => {
    if (task) {
      setEditingTask(task);
    } else {
      setEditingTask(null);
    }
    setIsFormOpen(true);
  };

  // If structured form is open, render form as full-screen layer
  if (isFormOpen) {
    return (
      <StructuredForm
        initialTask={editingTask}
        defaultDate={selectedDate}
        defaultTimeSlot={quickAddSlot}
        onSave={handleSaveTask}
        onCancel={() => {
          setIsFormOpen(false);
          setEditingTask(null);
          setQuickAddSlot(undefined);
        }}
      />
    );
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: 'var(--black)',
      position: 'relative'
    }}>
      {/* Top Header Bar */}
      <header style={{
        padding: '14px 20px 10px 20px',
        backgroundColor: 'var(--black)',
        borderBottom: 'var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '15px',
            fontWeight: 800,
            color: 'var(--white)',
            letterSpacing: '0.04em',
            lineHeight: 1.1
          }}>
            PRATEEK'S COMMAND CENTER
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '9px',
            color: 'var(--lime)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginTop: '2px'
          }}>
            JKLU ODD SEM 2026-27 /// BRUTALIST SPORT
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => handleOpenTimetable()}
            style={{
              backgroundColor: 'var(--grey2)',
              color: 'var(--lime)',
              fontFamily: 'var(--font-mono)',
              fontWeight: 800,
              fontSize: '10px',
              padding: '6px 10px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              border: 'var(--border-subtle)'
            }}
          >
            <CalendarIcon size={12} /> TIMETABLE
          </button>
          <div style={{
            backgroundColor: 'var(--lime)',
            color: 'var(--black)',
            fontFamily: 'var(--font-mono)',
            fontWeight: 800,
            fontSize: '10px',
            padding: '6px 8px',
            borderRadius: '4px',
            lineHeight: 1
          }}>
            390PX
          </div>
        </div>
      </header>

      {/* 1. Countdown Strip (top, sticky) */}
      <CountdownStrip currentDateStr={selectedDate} />

      {/* Main View Body */}
      <main style={{ flex: 1 }}>
        {activeTab === 'today' && (
          <TodayView
            tasks={tasks}
            selectedDate={selectedDate}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
            onOpenStructuredForm={handleOpenStructuredForm}
            onDateChange={setSelectedDate}
            onOpenTimetableModal={handleOpenTimetable}
          />
        )}

        {activeTab === 'timeline' && (
          <HourlyTimelineView
            tasks={tasks}
            selectedDate={selectedDate}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
            onOpenQuickAddForSlot={handleOpenQuickAddForSlot}
            onOpenStructuredForm={handleOpenStructuredForm}
          />
        )}

        {activeTab === 'week' && (
          <WeekView
            tasks={tasks}
            selectedDate={selectedDate}
            onSelectDate={(d) => {
              setSelectedDate(d);
            }}
          />
        )}

        {activeTab === 'calendar' && (
          <CalendarView
            tasks={tasks}
            selectedDate={selectedDate}
            onSelectDate={(d) => {
              setSelectedDate(d);
              setActiveTab('today'); // Switch to day view on day selection
            }}
            onOpenQuickAddForDate={(d) => {
              setSelectedDate(d);
              setIsQuickAddOpen(true);
            }}
          />
        )}
      </main>

      {/* Bottom Tab Bar with Lime Quick Add FAB */}
      <BottomTabBar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenQuickAdd={() => setIsQuickAddOpen(true)}
      />

      {/* Quick Add Bottom Sheet Modal */}
      <QuickAddSheet
        isOpen={isQuickAddOpen}
        onClose={() => {
          setIsQuickAddOpen(false);
          setQuickAddSlot(undefined);
        }}
        onQuickAdd={handleQuickAdd}
        onOpenStructuredForm={() => handleOpenStructuredForm()}
        selectedDate={selectedDate}
        initialTimeSlot={quickAddSlot}
      />

      {/* Full Weekly Timetable Modal */}
      <TimetableModal
        isOpen={isTimetableModalOpen}
        onClose={() => setIsTimetableModalOpen(false)}
        initialDay={timetableInitialDay}
      />
    </div>
  );
};

export default App;
