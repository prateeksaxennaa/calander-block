import type { Assignment, HourlyLogItem, DailyRoutine } from '../types';

export const DEFAULT_ROUTINE: DailyRoutine = {
  sleepHours: 7.5,
  mealHours: 2.0,
  travelHours: 1.0,
  gymHours: 1.0,
  fixedClassHours: 4.5
};

export const INITIAL_ASSIGNMENTS: Assignment[] = [];

export const INITIAL_HOURLY_LOGS: HourlyLogItem[] = [];
