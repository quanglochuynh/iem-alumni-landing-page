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
  LOGIN = '/login',
  REGISTER = '/register',
  HOME = '/home',
  ACTIVATE_ACCOUNT = '/activate-account',
}

export interface INavRoute {
  name: string;
  href: AppRoute;
}
