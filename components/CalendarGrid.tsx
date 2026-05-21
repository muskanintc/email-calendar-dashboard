'use client';

import { MonthCalendar, CalendarEmail } from '@/lib/types';
import { getCalendarWeeks, getMonthName } from '@/lib/utils';
import { EmailCard } from './EmailCard';

interface Props {
  calendar: MonthCalendar;
  getCommentCount: (emailId: string) => number;
  onEmailClick: (email: CalendarEmail) => void;
}

export function CalendarGrid({ calendar, getCommentCount, onEmailClick }: Props) {
  const weeks = getCalendarWeeks(calendar.year, calendar.month);
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  function getEmailsForDay(day: number | null): CalendarEmail[] {
    if (!day) return [];
    const dateStr = `${calendar.year}-${String(calendar.month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return calendar.emails.filter(e => e.date === dateStr);
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden min-w-[700px]">
      {/* Month/Year header */}
      <div className="bg-gray-800 text-white px-6 py-3">
        <h2 className="text-lg font-semibold">
          {getMonthName(calendar.month)} {calendar.year}
        </h2>
      </div>

      {/* Day name headers */}
      <div className="grid grid-cols-7 border-b border-gray-200">
        {dayNames.map(day => (
          <div
            key={day}
            className="px-2 py-2.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide bg-gray-50 border-r border-gray-200 last:border-r-0"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar weeks */}
      {weeks.map((week, weekIdx) => (
        <div key={weekIdx} className="grid grid-cols-7 border-b border-gray-100 last:border-b-0">
          {week.map((day, dayIdx) => {
            const emails = getEmailsForDay(day);
            const isToday = (() => {
              if (!day) return false;
              const now = new Date();
              return now.getFullYear() === calendar.year
                && now.getMonth() + 1 === calendar.month
                && now.getDate() === day;
            })();

            return (
              <div
                key={dayIdx}
                className={`min-h-[130px] border-r border-gray-100 last:border-r-0 p-1.5 transition-colors ${
                  day ? 'bg-white' : 'bg-gray-50/50'
                } ${isToday ? 'bg-blue-50/50' : ''}`}
              >
                {day && (
                  <>
                    <span className={`text-xs font-medium block mb-1 ${
                      isToday
                        ? 'bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center'
                        : 'text-gray-400'
                    }`}>
                      {day}
                    </span>
                    <div className="space-y-1">
                      {emails.map(email => (
                        <EmailCard
                          key={email.id}
                          email={email}
                          commentCount={getCommentCount(email.id)}
                          onClick={() => onEmailClick(email)}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
