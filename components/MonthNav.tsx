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
          className="px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors font-mono-brand tracking-[0.02em]"
          style={{
            background: idx === currentIndex ? 'var(--ink)' : 'var(--paper)',
            color: idx === currentIndex ? 'var(--paper)' : 'var(--muted)',
            border: `1px solid ${idx === currentIndex ? 'var(--ink)' : 'var(--hair)'}`,
          }}
        >
          {getMonthName(cal.month)} {cal.year}
        </button>
      ))}
    </div>
  );
}
