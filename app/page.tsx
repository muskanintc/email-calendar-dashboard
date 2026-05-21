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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gray-900 text-white py-10 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold tracking-tight">Email Calendar Dashboard</h1>
          <p className="text-gray-400 mt-2">Email marketing calendars for all clients</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {clientStats.map(client => {
            const progress = client.totalEmails > 0
              ? Math.round((client.doneEmails / client.totalEmails) * 100)
              : 0;

            return (
              <a
                key={client.slug}
                href={`/${client.slug}`}
                className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-all group block"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: client.color }}
                  />
                  <h2 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {client.name}
                  </h2>
                </div>
                <p className="text-sm text-gray-500 mb-4 leading-relaxed">{client.description}</p>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-400">{client.latestMonth}</span>
                  <span className="font-medium">
                    <span className="text-emerald-600">{client.doneEmails}</span>
                    <span className="text-gray-300"> / </span>
                    <span className="text-gray-600">{client.totalEmails}</span>
                    <span className="text-gray-400 ml-1">done</span>
                  </span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </a>
            );
          })}
        </div>
      </main>

      <footer className="text-center py-6 text-xs text-gray-400">
        Email Calendar Dashboard
      </footer>
    </div>
  );
}
