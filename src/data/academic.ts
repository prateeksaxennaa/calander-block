import type { AcademicEvent, Task } from '../types';

export const ACADEMIC: AcademicEvent[] = [
  { id: 'ac-1', name: "Independence Day", title: "Independence Day", date: "2026-08-15", type: "holiday", category: "holiday", isOfficial: true },
  { id: 'ac-2', name: "PS-I Presentations", title: "PS-I Presentations", date: "2026-08-13", type: "event", category: "milestone", isOfficial: true },
  { id: 'ac-3', name: "Engineers Day", title: "Engineers Day", date: "2026-09-14", type: "event", category: "fest", isOfficial: true },
  { id: 'ac-4', name: "Mid-term Exams begin", title: "Mid-term Exams begin", date: "2026-09-21", type: "exam", category: "exam", isOfficial: true },
  { id: 'ac-5', name: "Mid-term Exams end", title: "Mid-term Exams end", date: "2026-09-24", type: "exam", category: "exam", isOfficial: true },
  { id: 'ac-6', name: "Gandhi Jayanti", title: "Gandhi Jayanti", date: "2026-10-02", type: "holiday", category: "holiday", isOfficial: true },
  { id: 'ac-7', name: "Sabrang", title: "Sabrang", date: "2026-10-23", type: "event", category: "fest", isOfficial: true },
  { id: 'ac-8', name: "Convocation & Founders", title: "Convocation & Founders", date: "2026-11-23", type: "event", category: "convocation", isOfficial: true },
  { id: 'ac-9', name: "End of Classes", title: "End of Classes", date: "2026-11-27", type: "exam", category: "milestone", isOfficial: true },
  { id: 'ac-10', name: "End-term Exams begin", title: "End-term Exams begin", date: "2026-11-30", type: "exam", category: "exam", isOfficial: true },
  { id: 'ac-11', name: "End-term Exams end", title: "End-term Exams end", date: "2026-12-17", type: "exam", category: "exam", isOfficial: true },
];

export const COUNTDOWN_TARGETS = [
  { name: "Mid-term Exams", date: "2026-09-21" },
  { name: "End of Classes", date: "2026-11-27" },
  { name: "End-term Exams", date: "2026-11-30" },
  { name: "Convocation",    date: "2026-11-23" },
  { name: "Gandhi Jayanti", date: "2026-10-02" },
  { name: "Sabrang",        date: "2026-10-23" },
];

export const INITIAL_TASKS: Task[] = [];
