'use client';

import { CalendarEmail } from '@/lib/types';

interface Props {
  emails: CalendarEmail[];
}

export function StatsBar({ emails }: Props) {
  const total = emails.length;
  const done = emails.filter(e => e.status === 'done').length;
  const pending = emails.filter(e => e.status === 'pending').length;
  const copyReady = emails.filter(e => e.status === 'copy-ready').length;
  const approved = emails.filter(e => e.status === 'approved').length;
  const changesRequested = emails.filter(e => e.status === 'changes-requested').length;
  const progress = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-6 mb-4 border-b pb-4" style={{ borderColor: 'var(--hair)' }}>
      <div className="border-t pt-4" style={{ borderColor: 'var(--ink)' }}>
        <p className="font-mono-brand text-[10.5px] font-medium tracking-[0.14em] uppercase mb-3" style={{ color: 'var(--muted)' }}>Total</p>
        <p className="text-[38px] font-semibold" style={{ letterSpacing: '-0.035em', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{total}</p>
      </div>
      <div className="border-t pt-4" style={{ borderColor: 'var(--ink)' }}>
        <p className="font-mono-brand text-[10.5px] font-medium tracking-[0.14em] uppercase mb-3 text-emerald-600">Done</p>
        <p className="text-[38px] font-semibold text-emerald-700" style={{ letterSpacing: '-0.035em', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{done}</p>
      </div>
      {approved > 0 && (
        <div className="border-t pt-4" style={{ borderColor: 'var(--ink)' }}>
          <p className="font-mono-brand text-[10.5px] font-medium tracking-[0.14em] uppercase mb-3 text-emerald-600">Approved</p>
          <p className="text-[38px] font-semibold text-emerald-700" style={{ letterSpacing: '-0.035em', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{approved}</p>
        </div>
      )}
      {copyReady > 0 && (
        <div className="border-t pt-4" style={{ borderColor: 'var(--ink)' }}>
          <p className="font-mono-brand text-[10.5px] font-medium tracking-[0.14em] uppercase mb-3 text-violet-600">Copy Ready</p>
          <p className="text-[38px] font-semibold text-violet-700" style={{ letterSpacing: '-0.035em', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{copyReady}</p>
        </div>
      )}
      {pending > 0 && (
        <div className="border-t pt-4" style={{ borderColor: 'var(--ink)' }}>
          <p className="font-mono-brand text-[10.5px] font-medium tracking-[0.14em] uppercase mb-3 text-amber-600">Pending</p>
          <p className="text-[38px] font-semibold text-amber-700" style={{ letterSpacing: '-0.035em', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{pending}</p>
        </div>
      )}
      {changesRequested > 0 && (
        <div className="border-t pt-4" style={{ borderColor: 'var(--ink)' }}>
          <p className="font-mono-brand text-[10.5px] font-medium tracking-[0.14em] uppercase mb-3 text-rose-600">Changes Req.</p>
          <p className="text-[38px] font-semibold text-rose-700" style={{ letterSpacing: '-0.035em', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{changesRequested}</p>
        </div>
      )}
      <div className="border-t pt-4" style={{ borderColor: 'var(--ink)' }}>
        <p className="font-mono-brand text-[10.5px] font-medium tracking-[0.14em] uppercase mb-3" style={{ color: 'var(--muted)' }}>Progress</p>
        <p className="text-[38px] font-semibold" style={{ letterSpacing: '-0.035em', lineHeight: 1, fontVariantNumeric: 'tabular-nums', color: 'var(--accent)' }}>{progress}%</p>
        <div className="mt-2.5 h-1 overflow-hidden" style={{ background: 'var(--hair)' }}>
          <div
            className="h-full transition-all duration-500"
            style={{ width: `${progress}%`, background: 'var(--accent)' }}
          />
        </div>
      </div>
    </div>
  );
}
