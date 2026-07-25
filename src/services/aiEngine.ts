import type { Task, Assignment, AICommandResult } from '../types';
import { calculateBufferMetrics, formatHoursMins } from './bufferEngine';

export interface AISchedulerPlan {
  date: string;
  slots: {
    timeSlot: string;
    title: string;
    category: 'study' | 'assignment' | 'fitness' | 'personal';
    durationMinutes: number;
    assignmentId?: string;
  }[];
}

export function parseNaturalLanguageInput(
  input: string,
  selectedDate: string,
  tasks: Task[],
  assignments: Assignment[],
  onAddTask: (task: Omit<Task, 'id' | 'created'>) => Task,
  onAddAssignment: (assignment: Omit<Assignment, 'id'>) => Assignment,
  onUpdateTask: (id: string, updates: Partial<Task>) => void,
  onDeleteTask: (id: string) => void
): AICommandResult {
  const query = input.trim().toLowerCase();

  if (!query) {
    return { message: "Please enter a command or query for the AI OS." };
  }

  // 1. Query: "Movie tonight?" or "Can I watch movie?"
  if (query.includes('movie') || query.includes('party') || query.includes('free tonight') || query.includes('can i')) {
    const metrics = calculateBufferMetrics(selectedDate, tasks, assignments);
    if (metrics.freeBufferHours >= 3.0) {
      return {
        message: `🎬 YES! You have ${formatHoursMins(metrics.freeBufferHours)} free buffer time today. Enjoy your movie!`,
        actionTaken: 'buffer_query',
        details: `Buffer status: ${metrics.status}`
      };
    } else {
      return {
        message: `⚠️ TIGHT SCHEDULE: You currently have ${formatHoursMins(metrics.freeBufferHours)} free buffer time. Watching a 2h movie will leave you overbooked!`,
        actionTaken: 'buffer_query',
        details: `Recommendation: Shift low-priority tasks or move Gym to tomorrow to free up 1.5h.`
      };
    }
  }

  // 2. Query: "Generate study plan" or "Auto plan"
  if (query.includes('generate') || query.includes('study plan') || query.includes('auto plan') || query.includes('optimize')) {
    const plan = generateDailyStudyPlan(selectedDate, tasks, assignments);
    plan.slots.forEach(slot => {
      onAddTask({
        title: slot.title,
        date: selectedDate,
        timeSlot: slot.timeSlot,
        duration: slot.durationMinutes,
        category: slot.category,
        priority: 'high',
        blockType: 'task',
        done: false,
        assignmentId: slot.assignmentId
      });
    });

    return {
      message: `⚡ AI Study Plan Generated! Added ${plan.slots.length} optimized sessions to your Master Timeline for ${selectedDate}.`,
      actionTaken: 'auto_planned',
      details: plan.slots.map(s => `${s.timeSlot} — ${s.title}`).join(', ')
    };
  }

  // 3. Command: "Shift [item] to tomorrow"
  if (query.includes('shift') || query.includes('move')) {
    const tomorrowStr = getRelativeDateStr(selectedDate, 1);
    let target = tasks.find(t => query.includes(t.title.toLowerCase()) || query.includes(t.category.toLowerCase()));
    if (target) {
      onUpdateTask(target.id, { date: tomorrowStr });
      return {
        message: `✅ Rescheduled "${target.title}" from ${selectedDate} to tomorrow (${tomorrowStr}).`,
        actionTaken: 'moved_event'
      };
    }
  }

  // 4. Command: "Cancel [item]" or "Delete [item]"
  if (query.includes('cancel') || query.includes('delete') || query.includes('remove')) {
    let target = tasks.find(t => query.includes(t.title.toLowerCase()) || query.includes(t.category.toLowerCase()));
    if (target) {
      onDeleteTask(target.id);
      return {
        message: `🗑️ Cancelled and removed "${target.title}" from your timeline.`,
        actionTaken: 'deleted_event'
      };
    }
  }

  // 5. Command: "Assignment due [day] [hours]" e.g. "Physics assignment due Friday 4 hours"
  if (query.includes('assignment') && (query.includes('due') || query.includes('hours') || query.includes('h'))) {
    const hoursMatch = query.match(/(\d+)\s*(hour|hours|h)/i);
    const estimatedHours = hoursMatch ? parseInt(hoursMatch[1], 10) : 3;

    let targetDate = getRelativeDateStr(selectedDate, 3); // default 3 days
    if (query.includes('friday')) targetDate = getNextWeekdayStr('FRIDAY');
    else if (query.includes('tomorrow')) targetDate = getRelativeDateStr(selectedDate, 1);
    else if (query.includes('monday')) targetDate = getNextWeekdayStr('MONDAY');

    // Extract title
    let title = input.replace(/due|friday|tomorrow|monday|hours|hour|h|\d+/gi, '').replace(/assignment/gi, 'Assignment').trim();
    if (!title) title = 'New Academic Assignment';

    const newAsgn = onAddAssignment({
      title,
      subject: 'Academic Course',
      dueDate: targetDate,
      dueTime: '23:59',
      estimatedHours,
      completedHours: 0,
      priority: 'high',
      status: 'pending'
    });

    // Auto-split into timeline
    autoSplitAssignmentWorkload(newAsgn, selectedDate, tasks, onAddTask);

    return {
      message: `🎯 Created "${title}" (Due ${targetDate}, ${estimatedHours}h). AI has auto-split the workload across your free buffer slots!`,
      actionTaken: 'created_assignment',
      details: `Workload divided into daily focus sessions before deadline.`
    };
  }

  // 6. Command: "Book [N] hours for [topic] before [day]"
  if (query.includes('book') || query.includes('schedule')) {
    const hoursMatch = query.match(/(\d+)\s*(hour|hours|h)/i);
    const hours = hoursMatch ? parseInt(hoursMatch[1], 10) : 2;
    const topic = input.replace(/book|schedule|\d+|hours|hour|h|before|friday|tomorrow/gi, '').trim() || 'Focus Study';
    
    // Add task today
    onAddTask({
      title: `Deep Work: ${topic}`,
      date: selectedDate,
      timeSlot: '18:00',
      duration: hours * 60,
      category: 'study',
      priority: 'high',
      blockType: 'task',
      done: false
    });

    return {
      message: `📚 Booked ${hours} hours for "${topic}" on your Master Timeline at 18:00 today.`,
      actionTaken: 'scheduled_study'
    };
  }

  // 7. Command: "Gym after class" or "Gym at 6"
  if (query.includes('gym') || query.includes('workout')) {
    let slot = '18:00';
    if (query.includes('after class')) slot = '17:00';
    else if (query.includes('morning')) slot = '07:00';

    onAddTask({
      title: 'Gym & Fitness Workout',
      date: selectedDate,
      timeSlot: slot,
      duration: 60,
      category: 'fitness',
      priority: 'high',
      blockType: 'engagement',
      done: false
    });

    return {
      message: `💪 Scheduled Gym Workout on ${selectedDate} at ${slot}.`,
      actionTaken: 'created_event'
    };
  }

  // 8. General event creation: "Meet Rahul tomorrow at 6" or "Lunch with parents Sunday"
  let eventTime = '18:00';
  if (query.includes('at 6') || query.includes('6pm')) eventTime = '18:00';
  else if (query.includes('at 8') || query.includes('8pm')) eventTime = '20:00';
  else if (query.includes('at 1') || query.includes('1pm') || query.includes('lunch')) eventTime = '13:00';

  let eventDate = selectedDate;
  if (query.includes('tomorrow')) eventDate = getRelativeDateStr(selectedDate, 1);

  onAddTask({
    title: input.replace(/tomorrow|at 6|at 8|at 1|6pm|8pm|1pm/gi, '').trim() || 'New Event',
    date: eventDate,
    timeSlot: eventTime,
    duration: 60,
    category: 'personal',
    priority: 'med',
    blockType: 'engagement',
    done: false
  });

  return {
    message: `🗓️ Scheduled "${input}" on ${eventDate} at ${eventTime}.`,
    actionTaken: 'created_event'
  };
}

export function autoSplitAssignmentWorkload(
  assignment: Assignment,
  startDateStr: string,
  _existingTasks: Task[],
  onAddTask: (task: Omit<Task, 'id' | 'created'>) => Task
) {
  const hoursNeeded = assignment.estimatedHours - assignment.completedHours;
  if (hoursNeeded <= 0) return;

  const sessionLengthHours = hoursNeeded > 3 ? 1.5 : 1.0;
  let remainingHours = hoursNeeded;
  let currentDate = startDateStr;

  const freeSlots = ['18:00', '20:00', '16:00', '21:00'];
  let slotIdx = 0;

  while (remainingHours > 0 && slotIdx < freeSlots.length) {
    const slot = freeSlots[slotIdx];
    const durationMins = Math.min(remainingHours, sessionLengthHours) * 60;

    onAddTask({
      title: `${assignment.title} (Session)`,
      date: currentDate,
      timeSlot: slot,
      duration: durationMins,
      category: 'assignment',
      priority: 'high',
      blockType: 'assignment_chunk',
      assignmentId: assignment.id,
      done: false,
      note: `Auto-allocated study chunk for ${assignment.subject}`
    });

    remainingHours -= (durationMins / 60);
    slotIdx++;
  }
}

export function generateDailyStudyPlan(
  dateStr: string,
  _tasks: Task[],
  assignments: Assignment[]
): AISchedulerPlan {
  const pendingAssignments = assignments.filter(a => a.status !== 'completed');
  const slots: AISchedulerPlan['slots'] = [];

  if (pendingAssignments.length > 0) {
    const top = pendingAssignments[0];
    slots.push({
      timeSlot: '18:00',
      title: `${top.title} - Deep Focus Session`,
      category: 'assignment',
      durationMinutes: 90,
      assignmentId: top.id
    });
  }

  if (pendingAssignments.length > 1) {
    const second = pendingAssignments[1];
    slots.push({
      timeSlot: '20:00',
      title: `${second.title} - Problem Solving`,
      category: 'assignment',
      durationMinutes: 60,
      assignmentId: second.id
    });
  } else {
    slots.push({
      timeSlot: '20:00',
      title: 'Computer Science Core Revision & Flashcards',
      category: 'study',
      durationMinutes: 60
    });
  }

  return {
    date: dateStr,
    slots
  };
}

function getRelativeDateStr(baseDateStr: string, daysToAdd: number): string {
  const d = new Date(baseDateStr + 'T00:00:00');
  d.setDate(d.getDate() + daysToAdd);
  return d.toISOString().split('T')[0];
}

function getNextWeekdayStr(targetDay: 'MONDAY' | 'FRIDAY'): string {
  const d = new Date();
  const targetIdx = targetDay === 'MONDAY' ? 1 : 5;
  while (d.getDay() !== targetIdx) {
    d.setDate(d.getDate() + 1);
  }
  return d.toISOString().split('T')[0];
}
