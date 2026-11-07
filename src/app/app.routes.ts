import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { authGuard } from './core/auth/guards/auth.guard';
import { guestGuard } from './core/auth/guards/guest.guard';

/**
 * ONE layout for everything (like the demo): navbar + page + footer.
 * Login / signup / forgot-password are normal pages inside it, protected by guestGuard.
 *
 * Public:  home, products, brands, categories (+ details), cart, wishlist
 *          (the demo lets guests open cart / wishlist and shows an empty state)
 * Private: checkout, profile, profile/orders  → authGuard (redirects to /login?callbackUrl=…)
 *
 * Every page is lazy loaded, so each one is its own JS chunk.
 */
export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        title: 'FreshCart',
        loadComponent: () => import('./features/home/pages/home/home.component').then((m) => m.HomeComponent),
      },

      // --- shop
      {
        path: 'products',
        title: 'Products | FreshCart',
        loadComponent: () => import('./features/shop/pages/products/products.component').then((m) => m.ProductsComponent),
      },
      {
        path: 'products/:id',
        title: 'Product | FreshCart',
        loadComponent: () =>
          import('./features/shop/pages/product-details/product-details.component').then((m) => m.ProductDetailsComponent),
      },
      {
        path: 'brands',
        title: 'Brands | FreshCart',
        loadComponent: () => import('./features/brands/pages/brands/brands.component').then((m) => m.BrandsComponent),
      },
      {
        path: 'brands/:id',
        title: 'Brand | FreshCart',
        loadComponent: () =>
          import('./features/brands/pages/brand-details/brand-details.component').then((m) => m.BrandDetailsComponent),
      },
      {
        path: 'categories',
        title: 'Categories | FreshCart',
        loadComponent: () =>
          import('./features/categories/pages/categories/categories.component').then((m) => m.CategoriesComponent),
      },
      {
        path: 'categories/:id',
        title: 'Category | FreshCart',
        loadComponent: () =>
          import('./features/categories/pages/category-details/category-details.component').then(
            (m) => m.CategoryDetailsComponent,
          ),
      },
      {
        path: 'cart',
        title: 'Cart | FreshCart',
        loadComponent: () => import('./features/cart/pages/cart/cart.component').then((m) => m.CartComponent),
      },
      {
        path: 'wishlist',
        title: 'Wishlist | FreshCart',
        loadComponent: () => import('./features/wishlist/pages/wishlist/wishlist.component').then((m) => m.WishlistComponent),
      },

      // --- auth pages (guests only)
      {
        path: 'login',
        title: 'Login | FreshCart',
        canActivate: [guestGuard],
        loadComponent: () => import('./features/auth/pages/login/login.component').then((m) => m.LoginComponent),
      },
      {
        path: 'signup',
        title: 'Sign Up | FreshCart',
        canActivate: [guestGuard],
        loadComponent: () => import('./features/auth/pages/register/register.component').then((m) => m.RegisterComponent),
      },
      {
        path: 'forget-password',
        title: 'Forgot Password | FreshCart',
        canActivate: [guestGuard],
        loadComponent: () =>
          import('./features/auth/pages/forgot-password/forgot-password.component').then((m) => m.ForgotPasswordComponent),
      },

      // --- private pages
      {
        path: '',
        canActivate: [authGuard],
        children: [
          {
            path: 'checkout/:cartId',
            title: 'Checkout | FreshCart',
            loadComponent: () => import('./features/payment/pages/checkout/checkout.component').then((m) => m.CheckoutComponent),
          },
          {
            path: 'profile',
            title: 'My Account | FreshCart',
            loadComponent: () => import('./features/profile/pages/profile/profile.component').then((m) => m.ProfileComponent),
          },
          {
            path: 'profile/orders',
            title: 'My Orders | FreshCart',
            loadComponent: () => import('./features/orders/pages/orders/orders.component').then((m) => m.OrdersComponent),
          },
          // Stripe's return address in the Route API docs
          { path: 'allorders', redirectTo: 'profile/orders' },
        ],
      },

      {
        path: '**',
        title: 'Not found | FreshCart',
        loadComponent: () =>
          import('./features/not-found/pages/not-found/not-found.component').then((m) => m.NotFoundComponent),
      },
    ],
  },
];
