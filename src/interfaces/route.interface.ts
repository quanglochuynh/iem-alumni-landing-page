export enum AppRoute {
  HOME = '/',
  WARRANTY = '/policy/warranty',
  EXCHANGE_POLICY = '/policy/product-exchange', // product exchange policy
  PAYMENT_POLICY = '/policy/payment-transportation', // product exchange policy
  INSPECTION_POLICY = '/policy/inspection', // product exchange policy
  PRIVACY = '/policy/privacy',
  CONTACT = '/contact',
  ABOUT = '/about',
  INSTRUCTION = '/instruction',
  BLOGS = '/blogs',
  BLOG = '/blog',
  GLASS_PRINT = '/glass-print',
  MOUSE_PAD = '/mouse-pad',
  MONITOR_STAND = '/monitor-shelf',
  CART = '/checkout/cart',
  SHIPPING_CUSTOMER = '/checkout/shipping/customer',
  SHIPPING_ADDRESS = '/checkout/shipping/address',
  SUMMARY = '/checkout/summary',
  ORDER = '/order',
  PRODUCTS = '/products',
  SINGLE_PRINT = '/glass-print/single-print',
  MULTI_PRINT = '/glass-print/multi-print',
}

export interface INavRoute {
  name: string;
  href: AppRoute;
}
