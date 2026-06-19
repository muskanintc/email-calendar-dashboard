'use client';

import { CalendarEmail } from '@/lib/types';
import { getEmailTypeColor, getEmailTypeLabel, getStatusBorderHex, getStatusColor, getStatusLabel } from '@/lib/utils';

interface Props {
  email: CalendarEmail;
  commentCount: number;
  onClick: () => void;
}

export function EmailCard({ email, commentCount, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-md p-1.5 border-l-4 bg-white hover:bg-gray-50 shadow-sm border border-gray-100 transition-all hover:shadow-md cursor-pointer"
      style={{ borderLeftColor: getStatusBorderHex(email.status) }}
    >
      <div className="flex items-center gap-1 mb-0.5 flex-wrap">
        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium leading-none ${getEmailTypeColor(email.type)}`}>
          {getEmailTypeLabel(email.type)}
        </span>
        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold leading-none border ${getStatusColor(email.status)}`}>
          {getStatusLabel(email.status)}
        </span>
        {commentCount > 0 && (
          <span className="ml-auto text-[10px] text-blue-500 font-medium">
            {commentCount}
          </span>
        )}
      </div>
      <p className="text-[11px] font-semibold text-gray-800 leading-tight" style={{
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}>
        {email.theme}
      </p>
    </button>
  );
}
