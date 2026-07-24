import type { AcademicEvent, Task } from '../types';

export const ACADEMIC: AcademicEvent[] = [
  { name: "Independence Day",        date: "2026-08-15", type: "holiday" },
  { name: "PS-I Presentations",      date: "2026-08-13", type: "event"   },
  { name: "Engineers Day",           date: "2026-09-14", type: "event"   },
  { name: "Mid-term Exams begin",    date: "2026-09-21", type: "exam"    },
  { name: "Mid-term Exams end",      date: "2026-09-24", type: "exam"    },
  { name: "Gandhi Jayanti",          date: "2026-10-02", type: "holiday" },
  { name: "Sabrang",                 date: "2026-10-23", type: "event"   },
  { name: "Convocation & Founders",  date: "2026-11-23", type: "event"   },
  { name: "End of Classes",          date: "2026-11-27", type: "exam"    },
  { name: "End-term Exams begin",    date: "2026-11-30", type: "exam"    },
  { name: "End-term Exams end",      date: "2026-12-17", type: "exam"    },
];

export const COUNTDOWN_TARGETS = [
  { name: "Mid-term Exams", date: "2026-09-21" },
  { name: "End of Classes", date: "2026-11-27" },
  { name: "End-term Exams", date: "2026-11-30" },
  { name: "Convocation",    date: "2026-11-23" },
  { name: "Gandhi Jayanti", date: "2026-10-02" },
  { name: "Sabrang",        date: "2026-10-23" },
];

export const INITIAL_TASKS: Task[] = [
  {
    id: "task-0",
    title: "Morning Gym & Strength Workout",
    date: "2026-07-24",
    timeSlot: "07:00",
    category: "fitness",
    priority: "high",
    blockType: "engagement",
    note: "Heavy squat day + mobility work.",
    done: true,
    created: Date.now() - 86400000 * 3
  },
  {
    id: "task-0b",
    title: "Breakfast & Campus Travel Buffer",
    date: "2026-07-24",
    timeSlot: "08:00",
    category: "buffer",
    priority: "low",
    blockType: "buffer",
    note: "High protein meal + transit to classroom block.",
    done: true,
    created: Date.now() - 86400000 * 3
  },
  {
    id: "task-1",
    title: "Algorithms & Data Structures Problem Set 4",
    date: "2026-07-24",
    timeSlot: "18:00",
    category: "assignment",
    priority: "high",
    blockType: "task",
    note: "Focus on Dynamic Programming and Graph shortest path algorithms.",
    done: false,
    created: Date.now() - 86400000 * 2
  },
  {
    id: "task-2",
    title: "Operating Systems Memory Management Deep Dive",
    date: "2026-07-24",
    timeSlot: "21:00",
    category: "study",
    priority: "high",
    blockType: "task",
    note: "Review Paging, Virtual Memory, and TLB cache invalidation.",
    done: false,
    created: Date.now() - 86400000
  },
  {
    id: "task-3",
    title: "Database Systems Lab - Indexing & Query Tuning",
    date: "2026-07-24",
    timeSlot: "17:00",
    category: "assignment",
    priority: "med",
    blockType: "task",
    note: "B+ Tree indexes vs Hash indexes benchmark report.",
    done: true,
    created: Date.now() - 43200000
  },
  {
    id: "task-3b",
    title: "Dinner & Evening Recovery Buffer",
    date: "2026-07-24",
    timeSlot: "20:00",
    category: "buffer",
    priority: "low",
    blockType: "buffer",
    note: "Nutrition + rest before night coding sprint.",
    done: false,
    created: Date.now()
  },
  {
    id: "task-4",
    title: "PS-I Internship Final Deck Review",
    date: "2026-08-10",
    timeSlot: "11:00",
    category: "exam",
    priority: "high",
    blockType: "task",
    note: "Prepare slides for project achievements and metrics.",
    done: false,
    created: Date.now()
  },
  {
    id: "task-5",
    title: "Software Engineering System Architecture Design",
    date: "2026-07-26",
    timeSlot: "15:00",
    category: "assignment",
    priority: "high",
    blockType: "task",
    note: "Microservices design diagram and API contracts.",
    done: false,
    created: Date.now()
  },
  {
    id: "task-6",
    title: "Mid-Term Preparation Sprint: Calculus & Linear Algebra",
    date: "2026-09-18",
    timeSlot: "10:00",
    category: "study",
    priority: "high",
    blockType: "task",
    note: "Solve past 3 years semester question papers.",
    done: false,
    created: Date.now()
  }
];
