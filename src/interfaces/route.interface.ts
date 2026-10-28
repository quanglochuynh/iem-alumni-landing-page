export enum AppRoute {
  ROOT = '/',
  CONTACT = '/contact',
  ABOUT = '/about',
  ARTICLES = '/articles',
  ARTICLE = '/article',
  CAREERS = '/careers',
  CAREER = '/career',
  EVENTS = '/events',
  EVENT = '/event',
  WIEMA2025 = '/wiema2025',
  OUR_PEOPLE = '/our-people',
  LOGIN = '/login',
  REGISTER = '/register',
  HOME = '/home',
}

export interface INavRoute {
  name: string;
  href: AppRoute;
}
