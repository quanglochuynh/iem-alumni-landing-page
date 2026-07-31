export interface TCareerThumbnail {
  id: string;
  path: string;
  name?: string;
  parentPath?: string;
  type?: string;
  size?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TCareerPreview {
  id: string;
  locale: string;
  title: string;
  slug: string;
  location: string;
  jobType: string;
  experienceLevel: string;
  salary: string | null;
  keywords: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  thumbnail: TCareerThumbnail | null;
}

export interface TCareerDetailPreview {
  id: string;
  locale: string;
  title: string;
  slug: string;
  location: string;
  jobType: string;
  experienceLevel: string;
  salary: string | null;
  keywords: string;
  description: string;
  content: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  thumbnail: TCareerThumbnail | null;
}
