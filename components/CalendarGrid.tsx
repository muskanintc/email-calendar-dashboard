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
    <div className="border overflow-hidden min-w-[700px]" style={{ borderColor: 'var(--ink)', background: 'var(--paper)' }}>
      {/* Month/Year header */}
      <div className="px-6 py-3 border-b" style={{ background: 'var(--ink)', borderColor: 'var(--ink)' }}>
        <h2 className="text-lg font-semibold text-white" style={{ letterSpacing: '-0.015em' }}>
          {getMonthName(calendar.month)} {calendar.year}
        </h2>
      </div>

      {/* Day name headers */}
      <div className="grid grid-cols-7 border-b" style={{ borderColor: 'var(--ink)' }}>
        {dayNames.map(day => (
          <div
            key={day}
            className="px-2 py-2.5 text-center font-mono-brand text-[10.5px] font-medium uppercase border-r last:border-r-0"
            style={{ letterSpacing: '0.14em', color: 'var(--muted)', background: 'var(--paper-2)', borderColor: 'var(--hair)' }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar weeks */}
      {weeks.map((week, weekIdx) => (
        <div key={weekIdx} className="grid grid-cols-7 border-b last:border-b-0" style={{ borderColor: 'var(--hair)' }}>
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
                className="min-h-[130px] border-r last:border-r-0 p-1.5 transition-colors"
                style={{
                  borderColor: 'var(--hair)',
                  background: isToday ? '#fef2f2' : (day ? 'var(--paper)' : 'var(--paper-2)')
                }}
              >
                {day && (
                  <>
                    <span
                      className="text-xs font-medium block mb-1"
                      style={{
                        color: isToday ? 'var(--accent)' : 'var(--muted-2)',
                        fontWeight: isToday ? 700 : 500,
                      }}
                    >
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
