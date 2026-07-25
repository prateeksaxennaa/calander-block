export type CategoryType = 'study' | 'assignment' | 'exam' | 'class' | 'fitness' | 'personal' | 'routine' | 'event' | 'buffer' | 'other';
export type PriorityType = 'high' | 'med' | 'low';
export type BlockType = 'class' | 'task' | 'engagement' | 'buffer' | 'assignment_chunk' | 'routine';
export type WorkloadStatus = 'HEALTHY' | 'BUSY' | 'OVERBOOKED' | 'IMPOSSIBLE';

export interface Task {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  timeSlot?: string; // HH:MM e.g. "07:00", "18:00"
  duration?: number; // duration in minutes, default 60
  category: CategoryType;
  priority: PriorityType;
  blockType?: BlockType;
  assignmentId?: string; // linked assignment if split
  location?: string;
  note?: string;
  done: boolean;
  created: number;
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string; // YYYY-MM-DD
  dueTime?: string; // HH:MM
  estimatedHours: number;
  completedHours: number;
  priority: PriorityType;
  status: 'pending' | 'in_progress' | 'completed';
  notes?: string;
  splitSessions?: {
    id: string;
    date: string;
    timeSlot: string;
    durationHours: number;
    completed: boolean;
  }[];
}

export interface UniversityCalendarEvent {
  id: string;
  name: string;
  title: string;
  date: string; // YYYY-MM-DD
  endDate?: string;
  type: 'exam' | 'registration' | 'holiday' | 'fest' | 'milestone' | 'convocation' | 'event';
  category: 'exam' | 'registration' | 'holiday' | 'fest' | 'milestone' | 'convocation';
  isOfficial: boolean; // cannot be deleted
  description?: string;
}

export type AcademicEvent = UniversityCalendarEvent;

export interface HourlyLogItem {
  id: string;
  date: string; // YYYY-MM-DD
  hour: number; // 0-23
  activity: string;
  category: CategoryType;
  mood: 'fired_up' | 'focused' | 'neutral' | 'tired' | 'chill';
  energy: number; // 1-5
  focusScore: number; // 1-5
  notes?: string;
  timestamp: number;
}

export interface DailyRoutine {
  sleepHours: number;
  mealHours: number;
  travelHours: number;
  gymHours: number;
  fixedClassHours: number;
}

export interface BufferEngineMetrics {
  totalHours: number;
  sleepHours: number;
  classHours: number;
  habitHours: number;
  taskAssignmentHours: number;
  usedHours: number;
  freeBufferHours: number;
  status: WorkloadStatus;
  statusMessage: string;
}

export type TabType = 'home' | 'timeline' | 'timetable' | 'assignments' | 'academic_calendar' | 'journal' | 'analytics';

export interface AICommandResult {
  message: string;
  actionTaken?: 'created_event' | 'created_assignment' | 'moved_event' | 'deleted_event' | 'scheduled_study' | 'buffer_query' | 'auto_planned';
  details?: string;
}
