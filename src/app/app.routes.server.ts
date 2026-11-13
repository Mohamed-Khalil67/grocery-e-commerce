import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // user-specific pages: the server can't read the logged-in user's token
  { path: 'cart', renderMode: RenderMode.Client },
  { path: 'wishlist', renderMode: RenderMode.Client },
  { path: 'checkout/:cartId', renderMode: RenderMode.Client },
  { path: 'profile', renderMode: RenderMode.Client },
  { path: 'profile/orders', renderMode: RenderMode.Client },
  { path: 'allorders', renderMode: RenderMode.Client },

  // everything else (home, shop, brands, categories, login, signup, forget-password, 404): render on the server
  { path: '**', renderMode: RenderMode.Server },
];
