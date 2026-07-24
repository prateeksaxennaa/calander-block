export interface ClassSlot {
  id: string;
  time: string; // e.g. "9:00 - 9:50 AM"
  subject: string;
  code?: string;
  type: 'lecture' | 'lab' | 'tutorial' | 'elective' | 'coding';
  faculty: string;
  room: string;
  color: string;
}

export type DayOfWeek = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI';

export const WEEKLY_TIMETABLE: Record<DayOfWeek, ClassSlot[]> = {
  MON: [
    {
      id: 'mon-1',
      time: '9:00 - 9:50 AM',
      subject: 'Understanding & Managing Conflicts',
      type: 'lecture',
      faculty: 'Dr. Vijaylakshmi',
      room: 'TB-110',
      color: '#CAFF00' // Lime
    },
    {
      id: 'mon-2',
      time: '10:00 - 10:50 AM',
      subject: 'Discrete Mathematics',
      type: 'lecture',
      faculty: 'Dr. Jaya Gupta',
      room: 'EB1-104',
      color: '#2B2BFF' // Blue
    },
    {
      id: 'mon-3',
      time: '11:00 - 11:50 AM',
      subject: 'Full Stack Development',
      type: 'lecture',
      faculty: 'Mr. Gaurav Raj',
      room: 'EB1-101',
      color: '#CAFF00'
    },
    {
      id: 'mon-4',
      time: '12:00 - 12:50 PM',
      subject: 'Elective (Adv Stats / Matrix / DIP / Entr)',
      type: 'elective',
      faculty: 'Dr. Jaya Gupta / Dr. Tapas Kumar',
      room: 'EB1-101 / EB2-105',
      color: '#FF9500'
    },
    {
      id: 'mon-5',
      time: '2:00 - 2:50 PM',
      subject: 'Discrete Mathematics (Tutorial)',
      type: 'tutorial',
      faculty: 'NF2-Maths (B1)',
      room: 'TB-110',
      color: '#2B2BFF'
    },
    {
      id: 'mon-6',
      time: '3:00 - 3:50 PM',
      subject: 'Computer Network (CS1140)',
      code: 'CS1140',
      type: 'lecture',
      faculty: 'Mr. Devendra Bhavsar',
      room: 'EB2-204',
      color: '#FF3B30'
    },
    {
      id: 'mon-7',
      time: '4:00 - 4:50 PM',
      subject: 'Elective (Cyber Sec / Data Science / Big Data / Cloud)',
      type: 'elective',
      faculty: 'Mr. Devendra Bhavsar / Dr. Satveer Singh',
      room: 'EB2-205 / EB1-002',
      color: '#AF52DE'
    }
  ],
  TUE: [
    {
      id: 'tue-1',
      time: '9:00 - 9:50 AM',
      subject: 'Discrete Mathematics (Tutorial B2)',
      type: 'tutorial',
      faculty: 'Dr. Anshu Yadav',
      room: 'TB-110',
      color: '#2B2BFF'
    },
    {
      id: 'tue-3',
      time: '11:00 - 11:50 AM',
      subject: 'Full Stack Development',
      type: 'lecture',
      faculty: 'Mr. Gaurav Raj',
      room: 'EB2-205',
      color: '#CAFF00'
    },
    {
      id: 'tue-4',
      time: '12:00 - 12:50 PM',
      subject: 'Elective (Adv Stats / Matrix / DIP / Comp Fin)',
      type: 'elective',
      faculty: 'Dr. Jaya Gupta / Dr. Vijaysekhar',
      room: 'EB1-101 / EB2-004',
      color: '#FF9500'
    },
    {
      id: 'tue-5',
      time: '2:00 - 2:50 PM',
      subject: 'Artificial Intelligence',
      type: 'lecture',
      faculty: 'Dr. Akshat Agarwal',
      room: 'IET Amphi',
      color: '#FF3B30'
    },
    {
      id: 'tue-6',
      time: '3:00 - 3:50 PM',
      subject: 'Computer Network (CS1140)',
      code: 'CS1140',
      type: 'lecture',
      faculty: 'Mr. Devendra Bhavsar',
      room: 'EB2-202',
      color: '#2B2BFF'
    },
    {
      id: 'tue-7',
      time: '4:00 - 4:50 PM',
      subject: 'Elective (Cyber Sec / Data Science / Cloud)',
      type: 'elective',
      faculty: 'Mr. Devendra Bhavsar / Dr. Satveer',
      room: 'EB2-205 / TB-107',
      color: '#AF52DE'
    }
  ],
  WED: [
    {
      id: 'wed-1',
      time: '9:00 - 10:50 AM',
      subject: 'Full Stack Development (Lab)',
      type: 'lab',
      faculty: 'Mr. Gaurav Raj',
      room: 'TB105',
      color: '#CAFF00'
    },
    {
      id: 'wed-3',
      time: '11:00 - 11:50 AM',
      subject: 'Elective (Adv Stats / DIP Lab)',
      type: 'lab',
      faculty: 'Dr. Jaya Gupta / Dr. Tapas Kumar',
      room: 'TB-105 / BYOD',
      color: '#FF9500'
    },
    {
      id: 'wed-4',
      time: '12:00 - 12:50 PM',
      subject: 'Elective (Matrix / Diff Eq / Entr / DIP Lab)',
      type: 'elective',
      faculty: 'Dr. Rabia Kamra / Dr. Anant Pratap',
      room: 'EB1-102 / BYOD',
      color: '#FF9500'
    },
    {
      id: 'wed-5',
      time: '2:00 - 2:50 PM',
      subject: 'Artificial Intelligence',
      type: 'lecture',
      faculty: 'Dr. Akshat Agarwal',
      room: 'IET Amphi',
      color: '#FF3B30'
    },
    {
      id: 'wed-6',
      time: '3:00 - 3:50 PM',
      subject: 'Computer Network (CS1140)',
      code: 'CS1140',
      type: 'lecture',
      faculty: 'Mr. Devendra Bhavsar',
      room: 'EB2-202',
      color: '#2B2BFF'
    },
    {
      id: 'wed-7',
      time: '4:00 - 4:50 PM',
      subject: 'Elective (Cyber Sec / Data Sci / Big Data / Cloud)',
      type: 'elective',
      faculty: 'Mr. Devendra Bhavsar / Dr. Satveer',
      room: 'EB2-202 / EB2-206',
      color: '#AF52DE'
    }
  ],
  THU: [
    {
      id: 'thu-1',
      time: '9:00 - 9:50 AM',
      subject: 'Full Stack Development',
      type: 'lecture',
      faculty: 'Mr. Gaurav Raj',
      room: 'EB1-101',
      color: '#CAFF00'
    },
    {
      id: 'thu-2',
      time: '10:00 - 10:50 AM',
      subject: 'Discrete Mathematics',
      type: 'lecture',
      faculty: 'Dr. Jaya Gupta',
      room: 'EB1-104',
      color: '#2B2BFF'
    },
    {
      id: 'thu-3',
      time: '11:00 - 11:50 AM',
      subject: 'Artificial Intelligence',
      type: 'lecture',
      faculty: 'Dr. Akshat Agarwal',
      room: 'IET Amphi',
      color: '#FF3B30'
    },
    {
      id: 'thu-4',
      time: '12:00 - 12:50 PM',
      subject: 'Elective (Adv Stats / Matrix / Comp Fin)',
      type: 'elective',
      faculty: 'Dr. Jaya Gupta / Dr. Rabia Kamra',
      room: 'EB1-101 / EB1-102',
      color: '#FF9500'
    },
    {
      id: 'thu-5',
      time: '2:00 - 2:50 PM',
      subject: 'Understanding & Managing Conflicts',
      type: 'lecture',
      faculty: 'Dr. Vijaylakshmi',
      room: 'TB-110',
      color: '#CAFF00'
    },
    {
      id: 'thu-6',
      time: '3:00 - 4:50 PM',
      subject: 'Coding Hours (Competitive Programming)',
      type: 'coding',
      faculty: 'Self / Mentors',
      room: 'Labs / BYOD',
      color: '#CAFF00'
    }
  ],
  FRI: [
    {
      id: 'fri-1',
      time: '9:00 - 10:50 AM',
      subject: 'Computer Network Lab (CS1140)',
      code: 'CS1140',
      type: 'lab',
      faculty: 'Dr. Ankush Soni / Mr. Devendra Bhavsar',
      room: 'TB105',
      color: '#2B2BFF'
    },
    {
      id: 'fri-3',
      time: '11:00 - 12:50 PM',
      subject: 'Elective Lab (Cyber Sec / Data Science / Big Data / Cloud)',
      type: 'lab',
      faculty: 'Mr. Devendra Bhavsar / Dr. Satveer Singh',
      room: 'BYOD / TB105 / TB109',
      color: '#AF52DE'
    },
    {
      id: 'fri-5',
      time: '2:00 - 2:50 PM',
      subject: 'Discrete Mathematics',
      type: 'lecture',
      faculty: 'Dr. Jaya Gupta',
      room: 'EB1-104',
      color: '#2B2BFF'
    },
    {
      id: 'fri-6',
      time: '3:00 - 4:50 PM',
      subject: 'Artificial Intelligence Lab',
      type: 'lab',
      faculty: 'Dr. Akshat Agarwal / Dr. Ashish Jain',
      room: 'IET Amphi',
      color: '#FF3B30'
    }
  ]
};
