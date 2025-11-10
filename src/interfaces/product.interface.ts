export interface IProductItem {
  deletedAt: null;
  _id: string;
  name: string;
  description: string;
  specifications: Specification[];
  media: Media[];
  isActive: boolean;
  category: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Media {
  name: string;
  type: string;
  url: string;
}

export interface Specification {
  type: string;
  variants: string[];
}
