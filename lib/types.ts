export type EmailType = 'promotional' | 'educational' | 'product-launch' | 'welcome' | 'abandoned-cart' | 'win-back';

export type EmailStatus = 'pending' | 'in-progress' | 'copy-ready' | 'approved' | 'changes-requested' | 'done';

export interface CalendarEmail {
  id: string;
  date: string;
  day: string;
  type: EmailType;
  status: EmailStatus;
  theme: string;
  product: string;
  shortDescription: string;
  emailCopyLink: string;
  finalDesignLink: string;
  notes: string;
  productUrl: string;
  collectionUrl: string;
  offerCode: string;
  creativeDirection: string;
}

export interface MonthCalendar {
  client: string;
  year: number;
  month: number;
  emails: CalendarEmail[];
}

export interface ClientInfo {
  slug: string;
  name: string;
  fullName: string;
  description: string;
  color: string;
  months: string[];
}

export interface Comment {
  id: string;
  client_slug: string;
  email_id: string;
  author_name: string;
  comment: string;
  created_at: string;
}
