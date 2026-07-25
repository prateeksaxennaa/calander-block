import type { Assignment, HourlyLogItem, DailyRoutine } from '../types';

export const DEFAULT_ROUTINE: DailyRoutine = {
  sleepHours: 7.5,
  mealHours: 2.0,
  travelHours: 1.0,
  gymHours: 1.0,
  fixedClassHours: 4.5
};

export const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: 'asgn-1',
    title: 'Operating Systems Kernel Scheduler Project',
    subject: 'Operating Systems (CSE301)',
    dueDate: '2026-07-28',
    dueTime: '23:59',
    estimatedHours: 4,
    completedHours: 1.5,
    priority: 'high',
    status: 'in_progress',
    notes: 'Implement round-robin and priority preemption in C/C++.'
  },
  {
    id: 'asgn-2',
    title: 'Full Stack Dev - Next.js & Neon DB Integration',
    subject: 'Full Stack Web Dev (CSE305)',
    dueDate: '2026-07-31',
    dueTime: '17:00',
    estimatedHours: 6,
    completedHours: 2,
    priority: 'high',
    status: 'in_progress',
    notes: 'Build REST APIs and connect Neon PostgreSQL pool.'
  },
  {
    id: 'asgn-3',
    title: 'Discrete Mathematics Proofs Problem Set #4',
    subject: 'Discrete Math (MATH202)',
    dueDate: '2026-08-03',
    dueTime: '12:00',
    estimatedHours: 3,
    completedHours: 0,
    priority: 'med',
    status: 'pending',
    notes: 'Graph theory & recurrence relation proofs.'
  },
  {
    id: 'asgn-4',
    title: 'Artificial Intelligence Search Algorithms Notebook',
    subject: 'Artificial Intelligence (CSE309)',
    dueDate: '2026-08-05',
    dueTime: '23:59',
    estimatedHours: 5,
    completedHours: 0,
    priority: 'med',
    status: 'pending',
    notes: 'A* search and minimax implementation in Jupyter.'
  }
];

export const INITIAL_HOURLY_LOGS: HourlyLogItem[] = [
  {
    id: 'log-1',
    date: '2026-07-24',
    hour: 7,
    activity: 'Morning Gym Workout & Hydration',
    category: 'fitness',
    mood: 'fired_up',
    energy: 5,
    focusScore: 4,
    notes: 'Leg day + 20min cardio. Feeling energized.',
    timestamp: Date.now() - 86400000 + 7 * 3600000
  },
  {
    id: 'log-2',
    date: '2026-07-24',
    hour: 9,
    activity: 'Full Stack Web Dev Lecture & Lab Notes',
    category: 'class',
    mood: 'focused',
    energy: 4,
    focusScore: 5,
    notes: 'Covered React Server Components and SSR hydration.',
    timestamp: Date.now() - 86400000 + 9 * 3600000
  },
  {
    id: 'log-3',
    date: '2026-07-24',
    hour: 14,
    activity: 'Discrete Mathematics Practice Problems',
    category: 'study',
    mood: 'focused',
    energy: 4,
    focusScore: 4,
    notes: 'Solved 8 induction problems from Rosen textbook.',
    timestamp: Date.now() - 86400000 + 14 * 3600000
  },
  {
    id: 'log-4',
    date: '2026-07-24',
    hour: 18,
    activity: 'OS Scheduler Coding Session',
    category: 'assignment',
    mood: 'tired',
    energy: 3,
    focusScore: 3,
    notes: 'Debugged context switching segfault.',
    timestamp: Date.now() - 86400000 + 18 * 3600000
  }
];
