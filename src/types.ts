export type CategoryType = 'study' | 'assignment' | 'exam' | 'personal' | 'other' | 'buffer' | 'fitness';
export type PriorityType = 'high' | 'med' | 'low';
export type BlockType = 'class' | 'task' | 'engagement' | 'buffer';

export interface Task {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  timeSlot?: string; // HH:MM e.g. "07:00", "18:00"
  duration?: number; // duration in minutes, default 60
  category: CategoryType;
  priority: PriorityType;
  blockType?: BlockType;
  note?: string;
  done: boolean;
  created: number;
}

export interface AcademicEvent {
  name: string;
  date: string; // YYYY-MM-DD
  type: 'holiday' | 'event' | 'exam';
}

export type TabType = 'today' | 'timeline' | 'week' | 'calendar';
