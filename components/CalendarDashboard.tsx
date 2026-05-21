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
    <div className="min-h-screen bg-gray-50">
      <header className="text-white py-6 px-6" style={{ backgroundColor: brandColor }}>
        <div className="max-w-7xl mx-auto">
          <a href="/" className="text-white/70 text-sm hover:text-white mb-1 inline-block">
            &larr; All Clients
          </a>
          <h1 className="text-2xl font-bold">{clientName}</h1>
          <p className="text-white/80 text-sm mt-0.5">Email Marketing Calendar</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6">
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
