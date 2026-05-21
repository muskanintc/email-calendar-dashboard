'use client';

import { MonthCalendar } from '@/lib/types';
import { getMonthName } from '@/lib/utils';

interface Props {
  calendars: MonthCalendar[];
  currentIndex: number;
  onChange: (index: number) => void;
}

export function MonthNav({ calendars, currentIndex, onChange }: Props) {
  return (
    <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
      {calendars.map((cal, idx) => (
        <button
          key={`${cal.year}-${cal.month}`}
          onClick={() => onChange(idx)}
          className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
            idx === currentIndex
              ? 'bg-gray-900 text-white shadow-sm'
              : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          {getMonthName(cal.month)} {cal.year}
        </button>
      ))}
    </div>
  );
}
