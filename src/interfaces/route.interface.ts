export enum AppRoute {
  HOME = '/',
  CONTACT = '/contact',
  ABOUT = '/about',
  ARTICLES = '/articles',
  ARTICLE = '/article',
  CAREERS = '/careers',
  CAREER = '/career',
  EVENTS = '/events',
  EVENT = '/event',
  WIEMA2025 = '/wiema2025',
}

export interface INavRoute {
  name: string;
  href: AppRoute;
}
