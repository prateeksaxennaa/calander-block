import type { UniversityCalendarEvent } from '../types';

export const UNIVERSITY_ACADEMIC_CALENDAR: UniversityCalendarEvent[] = [
  {
    id: 'uc-1',
    name: 'ODD SEMESTER REGISTRATION & COMMENCEMENT',
    title: 'ODD SEMESTER REGISTRATION & COMMENCEMENT',
    date: '2026-07-20',
    type: 'registration',
    category: 'registration',
    isOfficial: true,
    description: 'Course registration verification & commencement of odd semester classes.'
  },
  {
    id: 'uc-2',
    name: 'INDEPENDENCE DAY (PUBLIC HOLIDAY)',
    title: 'INDEPENDENCE DAY (PUBLIC HOLIDAY)',
    date: '2026-08-15',
    type: 'holiday',
    category: 'holiday',
    isOfficial: true,
    description: 'National holiday - No classes scheduled.'
  },
  {
    id: 'uc-3',
    name: 'MID-SEMESTER EXAMINATION WINDOW',
    title: 'MID-SEMESTER EXAMINATION WINDOW',
    date: '2026-09-14',
    endDate: '2026-09-19',
    type: 'exam',
    category: 'exam',
    isOfficial: true,
    description: 'Mid-term written examinations for all CSE B 5th Semester modules.'
  },
  {
    id: 'uc-4',
    name: 'CAMPUS TECH & INNOVATION FEST - SABRANG',
    title: 'CAMPUS TECH & INNOVATION FEST - SABRANG',
    date: '2026-10-09',
    endDate: '2026-10-11',
    type: 'fest',
    category: 'fest',
    isOfficial: true,
    description: 'Annual cultural & technical symposium.'
  },
  {
    id: 'uc-5',
    name: 'LAB PROJECT PRESENTATIONS & EVALUATION',
    title: 'LAB PROJECT PRESENTATIONS & EVALUATION',
    date: '2026-11-02',
    endDate: '2026-11-04',
    type: 'milestone',
    category: 'milestone',
    isOfficial: true,
    description: 'Full Stack Dev & AI Lab final project submissions.'
  },
  {
    id: 'uc-6',
    name: 'DIWALI ACADEMIC BREAK',
    title: 'DIWALI ACADEMIC BREAK',
    date: '2026-11-08',
    endDate: '2026-11-12',
    type: 'holiday',
    category: 'holiday',
    isOfficial: true,
    description: 'University closed for Diwali festival break.'
  },
  {
    id: 'uc-7',
    name: 'END-SEMESTER PRACTICAL EXAMINATIONS',
    title: 'END-SEMESTER PRACTICAL EXAMINATIONS',
    date: '2026-11-23',
    endDate: '2026-11-27',
    type: 'exam',
    category: 'exam',
    isOfficial: true,
    description: 'Practical lab exams for Full Stack, OS, AI, & CN.'
  },
  {
    id: 'uc-8',
    name: 'END-SEMESTER THEORY EXAMINATIONS',
    title: 'END-SEMESTER THEORY EXAMINATIONS',
    date: '2026-12-01',
    endDate: '2026-12-12',
    type: 'exam',
    category: 'exam',
    isOfficial: true,
    description: 'Final written end-term examinations.'
  },
  {
    id: 'uc-9',
    name: 'ANNUAL CONVOCATION CEREMONY',
    title: 'ANNUAL CONVOCATION CEREMONY',
    date: '2026-12-20',
    type: 'convocation',
    category: 'convocation',
    isOfficial: true,
    description: 'University Convocation Ceremony 2026.'
  }
];
