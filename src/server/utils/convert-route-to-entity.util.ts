const mapping: Record<string, string> = {
  'customer-profiles': 'customer_profile',
  menus: 'menu',
  orders: 'order',
  'order-items': 'order_item',
  ratings: 'rating',
  restaurants: 'restaurant',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
