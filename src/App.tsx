import React, { useState, useEffect } from 'react';
import type { Task, Assignment, HourlyLogItem, TabType, DailyRoutine } from './types';
import { INITIAL_TASKS } from './data/academic';
import { INITIAL_ASSIGNMENTS, INITIAL_HOURLY_LOGS, DEFAULT_ROUTINE } from './data/initialData';
import { UNIVERSITY_ACADEMIC_CALENDAR } from './data/universityCalendar';
import { calculateBufferMetrics } from './services/bufferEngine';
import type { DayOfWeek } from './data/timetable';

// Components
import { Header } from './components/Header';
import { SidebarNav } from './components/SidebarNav';
import { HomeView } from './components/HomeView';
import { HourlyTimelineView } from './components/HourlyTimelineView';
import { AssignmentsView } from './components/AssignmentsView';
import { UniversityCalendarView } from './components/UniversityCalendarView';
import { HourlyLogView } from './components/HourlyLogView';
import { AnalyticsView } from './components/AnalyticsView';
import { UniversalSearchModal } from './components/UniversalSearchModal';
import { AIAssistantDrawer } from './components/AIAssistantDrawer';
import { StructuredForm } from './components/StructuredForm';
import { QuickAddSheet } from './components/QuickAddSheet';
import { TimetableModal } from './components/TimetableModal';

export const App: React.FC = () => {
  // Tasks Persistence
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('prateek_tasks_os');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_TASKS;
  });

  // Assignments Persistence
  const [assignments, setAssignments] = useState<Assignment[]>(() => {
    const saved = localStorage.getItem('prateek_assignments_os');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_ASSIGNMENTS;
  });

  // Hourly Logs Persistence
  const [logs, setLogs] = useState<HourlyLogItem[]>(() => {
    const saved = localStorage.getItem('prateek_logs_os');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_HOURLY_LOGS;
  });

  // Routine Persistence
  const [routine] = useState<DailyRoutine>(DEFAULT_ROUTINE);

  // App Navigation & Date State
  const [selectedDate, setSelectedDate] = useState<string>('2026-07-24');
  const [activeTab, setActiveTab] = useState<TabType>('home');

  // Modals State
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isAIDrawerOpen, setIsAIDrawerOpen] = useState<boolean>(false);
  const [isQuickAddOpen, setIsQuickAddOpen] = useState<boolean>(false);
  const [quickAddSlot, setQuickAddSlot] = useState<string | undefined>(undefined);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isTimetableModalOpen, setIsTimetableModalOpen] = useState<boolean>(false);
  const [timetableInitialDay, setTimetableInitialDay] = useState<DayOfWeek>('MON');

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem('prateek_tasks_os', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('prateek_assignments_os', JSON.stringify(assignments));
  }, [assignments]);

  useEffect(() => {
    localStorage.setItem('prateek_logs_os', JSON.stringify(logs));
  }, [logs]);

  // Recalculate Buffer Engine Metrics
  const bufferMetrics = calculateBufferMetrics(selectedDate, tasks, assignments, routine);

  // Handlers for Tasks
  const handleToggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const handleUpdateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const handleAddTask = (taskData: Omit<Task, 'id' | 'created'>): Task => {
    const newTask: Task = {
      ...taskData,
      id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      created: Date.now()
    };
    setTasks(prev => [newTask, ...prev]);
    return newTask;
  };

  const handleSaveTaskForm = (taskData: Omit<Task, 'id' | 'created'> & { id?: string }) => {
    if (taskData.id) {
      handleUpdateTask(taskData.id, taskData);
    } else {
      handleAddTask(taskData);
    }
    setIsFormOpen(false);
    setEditingTask(null);
  };

  // Handlers for Assignments
  const handleAddAssignment = (asgnData: Omit<Assignment, 'id'>): Assignment => {
    const newAsgn: Assignment = {
      ...asgnData,
      id: `asgn-${Date.now()}`
    };
    setAssignments(prev => [newAsgn, ...prev]);
    return newAsgn;
  };

  const handleUpdateAssignment = (id: string, updates: Partial<Assignment>) => {
    setAssignments(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
  };

  // Handlers for Hourly Logs
  const handleAddHourlyLog = (logData: Omit<HourlyLogItem, 'id' | 'timestamp'>) => {
    const newLog: HourlyLogItem = {
      ...logData,
      id: `log-${Date.now()}`,
      timestamp: Date.now()
    };
    setLogs(prev => [newLog, ...prev]);
  };

  const handleOpenTimetable = (day?: DayOfWeek) => {
    if (day) setTimetableInitialDay(day);
    setIsTimetableModalOpen(true);
  };

  const handleOpenQuickAddForSlot = (dateStr: string, slotStr: string) => {
    setSelectedDate(dateStr);
    setQuickAddSlot(slotStr);
    setIsQuickAddOpen(true);
  };

  const handleQuickAdd = (title: string, date: string, timeSlot?: string) => {
    handleAddTask({
      title,
      date,
      timeSlot: timeSlot || quickAddSlot || '18:00',
      category: 'study',
      priority: 'high',
      done: false
    });
    setQuickAddSlot(undefined);
  };

  // Full Screen Structured Form Mode
  if (isFormOpen) {
    return (
      <StructuredForm
        initialTask={editingTask}
        defaultDate={selectedDate}
        defaultTimeSlot={quickAddSlot}
        onSave={handleSaveTaskForm}
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
      color: 'var(--white)'
    }}>
      {/* Top Standard Header */}
      <Header
        metrics={bufferMetrics}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAIDrawer={() => setIsAIDrawerOpen(true)}
        onOpenTimetable={() => handleOpenTimetable()}
      />

      {/* Main Layout Area with Pure CSS Responsiveness */}
      <div style={{
        display: 'flex',
        flex: 1,
        width: '100%',
        minHeight: 'calc(100vh - 58px)'
      }}>
        {/* Navigation Component (Sidebar on Desktop, Bottom Bar on Mobile via CSS) */}
        <SidebarNav
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          onOpenQuickAdd={() => setIsQuickAddOpen(true)}
          onOpenAIDrawer={() => setIsAIDrawerOpen(true)}
        />

        {/* Primary Viewport Area */}
        <main className="main-content-viewport" style={{
          flex: 1,
          overflowY: 'auto',
          margin: '0 auto',
          width: '100%'
        }}>
          {activeTab === 'home' && (
            <HomeView
              selectedDate={selectedDate}
              tasks={tasks}
              assignments={assignments}
              logs={logs}
              metrics={bufferMetrics}
              onOpenAIDrawer={() => setIsAIDrawerOpen(true)}
              onOpenQuickAdd={() => setIsQuickAddOpen(true)}
              onNavigateTab={(tab) => {
                if (tab === 'timetable') handleOpenTimetable();
                else setActiveTab(tab);
              }}
              onAddHourlyLog={handleAddHourlyLog}
              onToggleTask={handleToggleTask}
            />
          )}

          {activeTab === 'timeline' && (
            <HourlyTimelineView
              tasks={tasks}
              selectedDate={selectedDate}
              onToggleTask={handleToggleTask}
              onDeleteTask={handleDeleteTask}
              onOpenQuickAddForSlot={handleOpenQuickAddForSlot}
              onOpenStructuredForm={(task) => {
                setEditingTask(task || null);
                setIsFormOpen(true);
              }}
            />
          )}

          {activeTab === 'assignments' && (
            <AssignmentsView
              assignments={assignments}
              tasks={tasks}
              selectedDate={selectedDate}
              onAddAssignment={handleAddAssignment}
              onUpdateAssignment={handleUpdateAssignment}
              onAddTask={handleAddTask}
            />
          )}

          {activeTab === 'academic_calendar' && (
            <UniversityCalendarView />
          )}

          {activeTab === 'journal' && (
            <HourlyLogView
              logs={logs}
              selectedDate={selectedDate}
              onAddLog={handleAddHourlyLog}
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsView
              logs={logs}
              assignments={assignments}
              tasks={tasks}
            />
          )}
        </main>
      </div>

      {/* Universal Cmd+K Search Modal */}
      <UniversalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        tasks={tasks}
        assignments={assignments}
        logs={logs}
        academicEvents={UNIVERSITY_ACADEMIC_CALENDAR}
      />

      {/* AI Assistant Chat Drawer */}
      <AIAssistantDrawer
        isOpen={isAIDrawerOpen}
        onClose={() => setIsAIDrawerOpen(false)}
        selectedDate={selectedDate}
        tasks={tasks}
        assignments={assignments}
        onAddTask={handleAddTask}
        onAddAssignment={handleAddAssignment}
        onUpdateTask={handleUpdateTask}
        onDeleteTask={handleDeleteTask}
      />

      {/* Quick Add Bottom Sheet */}
      <QuickAddSheet
        isOpen={isQuickAddOpen}
        onClose={() => {
          setIsQuickAddOpen(false);
          setQuickAddSlot(undefined);
        }}
        onQuickAdd={handleQuickAdd}
        onOpenStructuredForm={() => {
          setIsQuickAddOpen(false);
          setIsFormOpen(true);
        }}
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
