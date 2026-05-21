import fs from 'fs';
import path from 'path';
import { ClientInfo, MonthCalendar } from '@/lib/types';
import { CalendarDashboard } from '@/components/CalendarDashboard';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ client: string }>;
}

export default async function ClientCalendarPage({ params }: PageProps) {
  const { client } = await params;

  const clientsPath = path.join(process.cwd(), 'data', 'clients.json');
  const clients: ClientInfo[] = JSON.parse(fs.readFileSync(clientsPath, 'utf8'));
  const clientInfo = clients.find(c => c.slug === client);

  if (!clientInfo) notFound();

  const calendars: MonthCalendar[] = [];
  const calDir = path.join(process.cwd(), 'data', 'calendars', client);

  if (fs.existsSync(calDir)) {
    const files = fs.readdirSync(calDir).filter(f => f.endsWith('.json'));
    for (const file of files) {
      const content = fs.readFileSync(path.join(calDir, file), 'utf8');
      calendars.push(JSON.parse(content));
    }
  }

  if (calendars.length === 0) notFound();

  return (
    <CalendarDashboard
      calendars={calendars}
      clientName={clientInfo.fullName}
      clientSlug={clientInfo.slug}
      brandColor={clientInfo.color}
    />
  );
}

export async function generateStaticParams() {
  const clientsPath = path.join(process.cwd(), 'data', 'clients.json');
  const clients: ClientInfo[] = JSON.parse(fs.readFileSync(clientsPath, 'utf8'));
  return clients.map(c => ({ client: c.slug }));
}
