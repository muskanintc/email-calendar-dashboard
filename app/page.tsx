import fs from 'fs';
import path from 'path';
import { ClientInfo, MonthCalendar } from '@/lib/types';
import { getMonthName } from '@/lib/utils';

export const dynamic = 'force-static';

export default function Home() {
  const clientsPath = path.join(process.cwd(), 'data', 'clients.json');
  const clients: ClientInfo[] = JSON.parse(fs.readFileSync(clientsPath, 'utf8'));

  const clientStats = clients.map(client => {
    let totalEmails = 0;
    let doneEmails = 0;
    let latestMonth = '';

    client.months.forEach(month => {
      const calPath = path.join(process.cwd(), 'data', 'calendars', client.slug, `${month}.json`);
      if (fs.existsSync(calPath)) {
        const cal: MonthCalendar = JSON.parse(fs.readFileSync(calPath, 'utf8'));
        totalEmails += cal.emails.length;
        doneEmails += cal.emails.filter(e => e.status === 'done').length;
        latestMonth = `${getMonthName(cal.month)} ${cal.year}`;
      }
    });

    return { ...client, totalEmails, doneEmails, latestMonth };
  });

  return (
    <div className="min-h-screen" style={{ background: 'var(--paper)' }}>
      {/* Topbar */}
      <div className="border-b" style={{ borderColor: 'var(--ink)' }}>
        <div className="max-w-[1280px] mx-auto px-8 py-2.5 flex justify-between font-mono-brand text-[11px] tracking-[0.06em]" style={{ color: 'var(--muted)' }}>
          <span className="font-medium uppercase" style={{ color: 'var(--ink)' }}>Email Calendar Dashboard</span>
          <span>Interconnections</span>
        </div>
      </div>

      {/* Page heading */}
      <div className="max-w-[1280px] mx-auto px-8 mt-8 pb-6 border-b" style={{ borderColor: 'var(--hair)' }}>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-2 pt-3">
            <span className="font-mono-brand text-[11.5px] font-medium tracking-[0.08em]" style={{ color: 'var(--accent)' }}>
              001 - Clients
            </span>
          </div>
          <div className="col-span-7">
            <h1 className="text-[44px] font-semibold leading-[0.98]" style={{ letterSpacing: '-0.035em' }}>
              Email <span style={{ color: 'var(--accent)' }}>Calendar</span>
            </h1>
          </div>
          <div className="col-span-3 self-end border-t pt-3 text-sm leading-relaxed" style={{ borderColor: 'var(--ink)', color: 'var(--muted)' }}>
            Email marketing calendars for all clients
          </div>
        </div>
      </div>

      {/* Client cards */}
      <main className="max-w-[1280px] mx-auto px-8 py-9">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {clientStats.map((client, i) => {
            const progress = client.totalEmails > 0
              ? Math.round((client.doneEmails / client.totalEmails) * 100)
              : 0;

            return (
              <a
                key={client.slug}
                href={`/${client.slug}`}
                className="block border-t pt-4 transition-colors group"
                style={{ borderColor: 'var(--ink)' }}
              >
                <div className="font-mono-brand text-[10.5px] font-medium tracking-[0.14em] uppercase mb-2" style={{ color: 'var(--muted)' }}>
                  Client {String(i + 1).padStart(2, '0')}
                </div>
                <h2 className="text-[17px] font-semibold mb-2 transition-colors group-hover:text-[var(--accent)]" style={{ letterSpacing: '-0.015em' }}>
                  {client.name}
                </h2>
                <p className="text-[13px] leading-relaxed mb-4" style={{ color: 'var(--ink-soft)' }}>
                  {client.description}
                </p>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="font-mono-brand text-[11px] tracking-[0.04em]" style={{ color: 'var(--muted-2)' }}>{client.latestMonth}</span>
                  <span className="font-mono-brand text-[11px] tracking-[0.04em]">
                    <span style={{ color: 'var(--accent)' }}>{client.doneEmails}</span>
                    <span style={{ color: 'var(--muted-2)' }}> / {client.totalEmails} done</span>
                  </span>
                </div>
                <div className="h-1 overflow-hidden" style={{ background: 'var(--hair)' }}>
                  <div
                    className="h-full transition-all duration-500"
                    style={{ width: `${progress}%`, background: 'var(--accent)' }}
                  />
                </div>
              </a>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t" style={{ borderColor: 'var(--ink)' }}>
        <div className="max-w-[1280px] mx-auto px-8 py-5 flex justify-between font-mono-brand text-[11px] tracking-[0.06em] uppercase" style={{ color: 'var(--muted)' }}>
          <span className="font-medium" style={{ color: 'var(--ink)' }}>
            interconnections<span style={{ color: 'var(--accent)' }}>.</span>
          </span>
          <span>Email Calendar Dashboard</span>
        </div>
      </footer>
    </div>
  );
}
