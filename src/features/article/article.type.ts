export interface TArticlePreview {
  id: string;
  title: string;
  description: string;
  locale: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  keywords: string;
  author: Author;
  thumbnail: Thumbnail;
}

export interface Author {
  id: string;
  name: string;
  avatar: null | {
    id: string;
    path: string;
  };
}

export interface Thumbnail {
  id: string;
  name: string;
  path: string;
  parentPath: string;
  type: string;
  size: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
}

export interface TArticleDetailPreview {
  id: string;
  locale: string;
  title: string;
  slug: string;
  keywords: string;
  description: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  thumbnail: Thumbnail;
  author: Author;
}
