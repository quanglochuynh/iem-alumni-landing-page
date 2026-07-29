export interface IParams<T extends Record<string, any>> {
  params: T;
}

export interface ILocaleParams<T = object> {
  children: React.ReactNode;
  params: Promise<{ locale: string } & T>;
}
