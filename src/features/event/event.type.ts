export interface TEventThumbnail {
  id: string;
  path: string;
}

export interface TEventPreview {
  id: string;
  locale: string;
  title: string;
  slug: string;
  keywords: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  thumbnail: TEventThumbnail | null;
}

export interface TEventDetailPreview {
  id: string;
  locale: string;
  title: string;
  slug: string;
  keywords: string;
  description: string;
  content: string;
  location: string;
  startDate: Date;
  endDate: Date | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  thumbnail: TEventThumbnail | null;
}
