export function getCalendarWeeks(year: number, month: number): (number | null)[][] {
  const firstDay = new Date(year, month - 1, 1).getDay();
  const startDay = firstDay === 0 ? 6 : firstDay - 1; // Mon=0, Sun=6
  const daysInMonth = new Date(year, month, 0).getDate();

  const weeks: (number | null)[][] = [];
  let currentWeek: (number | null)[] = new Array(startDay).fill(null);

  for (let day = 1; day <= daysInMonth; day++) {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) currentWeek.push(null);
    weeks.push(currentWeek);
  }

  return weeks;
}

export function getMonthName(month: number): string {
  return new Date(2026, month - 1, 1).toLocaleString('default', { month: 'long' });
}

export function getEmailTypeColor(type: string): string {
  const colors: Record<string, string> = {
    promotional: 'bg-purple-100 text-purple-700',
    educational: 'bg-teal-100 text-teal-700',
    'product-launch': 'bg-orange-100 text-orange-700',
    welcome: 'bg-blue-100 text-blue-700',
    'abandoned-cart': 'bg-red-100 text-red-700',
    'win-back': 'bg-pink-100 text-pink-700',
  };
  return colors[type] || 'bg-gray-100 text-gray-700';
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    done: 'bg-emerald-100 text-emerald-700 border-emerald-300',
    pending: 'bg-amber-100 text-amber-700 border-amber-300',
    'in-progress': 'bg-blue-100 text-blue-700 border-blue-300',
    'copy-ready': 'bg-violet-100 text-violet-700 border-violet-300',
    approved: 'bg-emerald-100 text-emerald-700 border-emerald-300',
    'changes-requested': 'bg-rose-100 text-rose-700 border-rose-300',
  };
  return colors[status] || 'bg-gray-100 text-gray-700';
}

export function getStatusBorderHex(status: string): string {
  const colors: Record<string, string> = {
    done: '#10b981',
    pending: '#f59e0b',
    'in-progress': '#3b82f6',
    'copy-ready': '#8b5cf6',
    approved: '#10b981',
    'changes-requested': '#f43f5e',
  };
  return colors[status] || '#d1d5db';
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    done: 'Sent',
    'copy-ready': 'Copy Ready',
    approved: 'Approved',
    pending: 'Pending',
    'in-progress': 'In Progress',
    'changes-requested': 'Changes',
  };
  return labels[status] || status;
}

export function getEmailTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    promotional: 'promo',
    educational: 'edu',
    'product-launch': 'launch',
    welcome: 'welcome',
    'abandoned-cart': 'cart',
    'win-back': 'winback',
  };
  return labels[type] || type;
}
