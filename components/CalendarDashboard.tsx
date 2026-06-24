'use client';

import { useState, useEffect, useCallback } from 'react';
import { MonthCalendar, CalendarEmail, Comment } from '@/lib/types';
import { CalendarGrid } from './CalendarGrid';
import { MonthNav } from './MonthNav';
import { StatsBar } from './StatsBar';
import { CommentModal } from './CommentModal';
import { supabase } from '@/lib/supabase';

interface Props {
  calendars: MonthCalendar[];
  clientName: string;
  clientSlug: string;
  brandColor: string;
}

export function CalendarDashboard({ calendars, clientName, clientSlug, brandColor }: Props) {
  const sortedCalendars = [...calendars].sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    return a.month - b.month;
  });

  const [currentIndex, setCurrentIndex] = useState(sortedCalendars.length - 1);
  const [selectedEmail, setSelectedEmail] = useState<CalendarEmail | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  const currentCalendar = sortedCalendars[currentIndex];

  const loadComments = useCallback(async () => {
    if (!supabase) return;
    const { data } = await supabase
      .from('comments')
      .select('*')
      .eq('client_slug', clientSlug)
      .order('created_at', { ascending: true });
    if (data) setComments(data);
  }, [clientSlug]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  function getCommentCount(emailId: string): number {
    return comments.filter(c => c.email_id === emailId).length;
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--paper)' }}>
      {/* Topbar */}
      <div className="border-b" style={{ borderColor: 'var(--ink)' }}>
        <div className="max-w-7xl mx-auto px-8 py-2.5 flex justify-between font-mono-brand text-[11px] tracking-[0.06em]" style={{ color: 'var(--muted)' }}>
          <span className="font-medium uppercase" style={{ color: 'var(--ink)' }}>{clientName} - Email Calendar</span>
          <span>Interconnections</span>
        </div>
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-8 pt-6 pb-6 border-b" style={{ borderColor: 'var(--hair)' }}>
        <a href="/" className="font-mono-brand text-[12px] tracking-[0.04em] hover:text-[var(--accent)] transition-colors inline-block mb-3" style={{ color: 'var(--muted)' }}>
          &larr; All Clients
        </a>
        <div className="flex items-end justify-between">
          <div>
            <span className="font-mono-brand text-[11.5px] font-medium tracking-[0.08em] block mb-2" style={{ color: 'var(--accent)' }}>
              Email Calendar
            </span>
            <h1 className="text-[28px] font-semibold" style={{ letterSpacing: '-0.025em', lineHeight: '1.05' }}>{clientName}</h1>
          </div>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>Email Marketing Calendar</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-6">
        <MonthNav
          calendars={sortedCalendars}
          currentIndex={currentIndex}
          onChange={setCurrentIndex}
        />
        <StatsBar emails={currentCalendar.emails} />
        <div className="overflow-x-auto calendar-scroll">
          <CalendarGrid
            calendar={currentCalendar}
            getCommentCount={getCommentCount}
            onEmailClick={setSelectedEmail}
          />
        </div>
      </div>

      {selectedEmail && (
        <CommentModal
          email={selectedEmail}
          clientSlug={clientSlug}
          comments={comments.filter(c => c.email_id === selectedEmail.id)}
          onClose={() => setSelectedEmail(null)}
          onCommentAdded={loadComments}
        />
      )}
    </div>
  );
}
