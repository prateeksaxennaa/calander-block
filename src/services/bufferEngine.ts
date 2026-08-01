import type { Task, Assignment, BufferEngineMetrics, DailyRoutine, WorkloadStatus } from '../types';
import { WEEKLY_TIMETABLE, type DayOfWeek } from '../data/timetable';
import { DEFAULT_ROUTINE } from '../data/initialData';

export function getTodayDateString(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getDayOfWeekFromDateStr(dateStr: string): DayOfWeek | 'MON' {
  const dateObj = new Date(dateStr + 'T00:00:00');
  const dayIndex = dateObj.getDay(); // 0 = Sun, 1 = Mon ...
  const map: Record<number, DayOfWeek> = {
    1: 'MON',
    2: 'TUE',
    3: 'WED',
    4: 'THU',
    5: 'FRI'
  };
  return map[dayIndex] || 'MON';
}

export function calculateBufferMetrics(
  dateStr: string,
  tasks: Task[],
  assignments: Assignment[],
  routine: DailyRoutine = DEFAULT_ROUTINE
): BufferEngineMetrics {
  const dayOfWeek = getDayOfWeekFromDateStr(dateStr);
  const classesToday = WEEKLY_TIMETABLE[dayOfWeek] || [];

  // Calculate fixed class hours for this day
  let classHours = 0;
  classesToday.forEach(c => {
    const parts = c.time.split('-');
    if (parts.length === 2) {
      const startStr = parts[0].trim();
      const endStr = parts[1].trim();
      const startH = parseInt(startStr.split(':')[0], 10);
      const startM = parseInt(startStr.split(':')[1] || '0', 10);
      let endH = parseInt(endStr.split(':')[0], 10);
      const endM = parseInt(endStr.split(':')[1] || '0', 10);
      
      const isEndPm = endStr.toUpperCase().includes('PM');
      const isStartPm = startStr.toUpperCase().includes('PM') || (isEndPm && startH < 12);
      
      let actualStart = startH + (isStartPm && startH !== 12 ? 12 : 0) + startM / 60;
      let actualEnd = endH + (isEndPm && endH !== 12 ? 12 : 0) + endM / 60;
      
      if (actualEnd > actualStart) {
        classHours += (actualEnd - actualStart);
      } else {
        classHours += 1;
      }
    } else {
      classHours += 1;
    }
  });

  // Calculate scheduled tasks and assignment chunks for this date
  const dayTasks = tasks.filter(t => t.date === dateStr && !t.done);
  let taskAssignmentHours = 0;
  dayTasks.forEach(t => {
    taskAssignmentHours += (t.duration || 60) / 60;
  });

  // Add scheduled assignment split sessions for this date
  assignments.forEach(asgn => {
    if (asgn.status !== 'completed' && asgn.splitSessions) {
      asgn.splitSessions.forEach(s => {
        if (s.date === dateStr && !s.completed) {
          taskAssignmentHours += s.durationHours;
        }
      });
    }
  });

  const sleepHours = routine.sleepHours;
  const mealHours = routine.mealHours;
  const isWeekend = new Date(dateStr + 'T00:00:00').getDay() === 0 || new Date(dateStr + 'T00:00:00').getDay() === 6;
  const travelHours = isWeekend ? 0.3 : routine.travelHours;
  const habitHours = sleepHours + mealHours + travelHours;

  const usedHours = habitHours + classHours + taskAssignmentHours;
  const rawFreeBuffer = 24 - usedHours;
  const freeBufferHours = Math.max(0, Math.round(rawFreeBuffer * 10) / 10);

  let status: WorkloadStatus = 'HEALTHY';
  let statusMessage = '';

  if (freeBufferHours >= 3.5) {
    status = 'HEALTHY';
    statusMessage = `${formatHoursMins(freeBufferHours)} Available — Ample time for deep work & recovery.`;
  } else if (freeBufferHours >= 2.0) {
    status = 'BUSY';
    statusMessage = `${formatHoursMins(freeBufferHours)} Available — Moderate schedule. Good balance.`;
  } else if (freeBufferHours >= 0.5) {
    status = 'OVERBOOKED';
    statusMessage = `${formatHoursMins(freeBufferHours)} Available — Tight schedule! Minimize distractions.`;
  } else {
    status = 'IMPOSSIBLE';
    statusMessage = `${formatHoursMins(freeBufferHours)} Available — Workload exceeds capacity! Shift tasks.`;
  }

  return {
    totalHours: 24,
    sleepHours,
    classHours: Math.round(classHours * 10) / 10,
    habitHours: Math.round((mealHours + travelHours) * 10) / 10,
    taskAssignmentHours: Math.round(taskAssignmentHours * 10) / 10,
    usedHours: Math.round(usedHours * 10) / 10,
    freeBufferHours,
    status,
    statusMessage
  };
}

export function getWeeklyChartData(
  targetDateStr: string,
  tasks: Task[],
  assignments: Assignment[],
  routine: DailyRoutine = DEFAULT_ROUTINE
) {
  const targetDate = new Date(targetDateStr + 'T00:00:00');
  const dayIndex = targetDate.getDay(); // 0 = Sun, 1 = Mon ...
  // Calculate Monday of the target week
  const diffToMon = dayIndex === 0 ? -6 : 1 - dayIndex;
  const monday = new Date(targetDate);
  monday.setDate(targetDate.getDate() + diffToMon);

  const daysLabel: Array<{ label: string; offset: number }> = [
    { label: 'MON', offset: 0 },
    { label: 'TUE', offset: 1 },
    { label: 'WED', offset: 2 },
    { label: 'THU', offset: 3 },
    { label: 'FRI', offset: 4 },
    { label: 'SAT', offset: 5 },
    { label: 'SUN', offset: 6 }
  ];

  const todayStr = getTodayDateString();

  return daysLabel.map(d => {
    const curDate = new Date(monday);
    curDate.setDate(monday.getDate() + d.offset);
    const yyyy = curDate.getFullYear();
    const mm = String(curDate.getMonth() + 1).padStart(2, '0');
    const dd = String(curDate.getDate()).padStart(2, '0');
    const dateIso = `${yyyy}-${mm}-${dd}`;

    const metrics = calculateBufferMetrics(dateIso, tasks, assignments, routine);
    return {
      day: d.label,
      dateStr: dateIso,
      buffer: metrics.freeBufferHours,
      load: metrics.usedHours,
      isToday: dateIso === todayStr,
      isSelected: dateIso === targetDateStr
    };
  });
}

export function formatHoursMins(decimalHours: number): string {
  const h = Math.floor(decimalHours);
  const m = Math.round((decimalHours - h) * 60);
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}
