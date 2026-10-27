export interface Album {
  id: ID;
  name: string;
  description: string;
  showOnLandingPage: boolean;
  createdAt: Date;
  updatedAt: Date;
  images: Image[];
}

export enum ID {
  Cmvqr9Ec8000Kpsp7085D5Lxx = 'cmvqr9ec8000kpsp7085d5lxx',
}

export interface Image {
  id: string;
  albumId: ID;
  fileId: string;
  position: number;
  createdAt: Date;
  file: File;
}

export interface File {
  id: string;
  path: string;
  thumbnailPath: string;
  type: Type;
}

export enum Type {
  ImageJPEG = 'image/jpeg',
}
