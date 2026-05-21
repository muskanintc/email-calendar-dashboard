'use client';

import { CalendarEmail } from '@/lib/types';

interface Props {
  emails: CalendarEmail[];
}

export function StatsBar({ emails }: Props) {
  const total = emails.length;
  const done = emails.filter(e => e.status === 'done').length;
  const pending = emails.filter(e => e.status === 'pending').length;
  const inProgress = emails.filter(e => e.status === 'in-progress').length;
  const progress = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
      <div className="bg-white rounded-lg border border-gray-200 p-3">
        <p className="text-xs text-gray-500 font-medium">Total</p>
        <p className="text-2xl font-bold text-gray-900">{total}</p>
      </div>
      <div className="bg-emerald-50 rounded-lg border border-emerald-200 p-3">
        <p className="text-xs text-emerald-600 font-medium">Done</p>
        <p className="text-2xl font-bold text-emerald-700">{done}</p>
      </div>
      <div className="bg-amber-50 rounded-lg border border-amber-200 p-3">
        <p className="text-xs text-amber-600 font-medium">Pending</p>
        <p className="text-2xl font-bold text-amber-700">{pending}</p>
      </div>
      <div className="bg-blue-50 rounded-lg border border-blue-200 p-3">
        <p className="text-xs text-blue-600 font-medium">In Progress</p>
        <p className="text-2xl font-bold text-blue-700">{inProgress}</p>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-3 col-span-2 sm:col-span-1">
        <p className="text-xs text-gray-500 font-medium">Progress</p>
        <p className="text-2xl font-bold text-gray-900">{progress}%</p>
        <div className="mt-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
