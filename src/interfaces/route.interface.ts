export enum AppRoute {
  HOME = '/',
  CONTACT = '/contact',
  ABOUT = '/about',
  ARTICLES = '/articles',
  ARTICLE = '/article',
  WIEMA2025 = '/wiema2025',
}

export interface INavRoute {
  name: string;
  href: AppRoute;
}
