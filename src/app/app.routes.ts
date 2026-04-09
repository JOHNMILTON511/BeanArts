import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  // ── Public ────────────────────────────────────────────
  { path: '', component: Home, pathMatch: 'full',
    title: 'BeanArts | Premium Corporate Gifting & Packaging' },
  { path: 'home', component: Home,
    title: 'BeanArts | Premium Corporate Gifting & Packaging' },

  { path: 'about',
    loadComponent: () => import('./pages/about/about').then(m => m.About),
    title: 'About Us | BeanArts' },
  { path: 'services',
    loadComponent: () => import('./pages/services/services').then(m => m.Services),
    title: 'Our Services | BeanArts' },
  { path: 'contact',
    loadComponent: () => import('./pages/contact/contact').then(m => m.Contact),
    title: 'Contact Us | BeanArts' },
  { path: 'portfolio',
    loadComponent: () => import('./pages/portfolio/portfolio').then(m => m.Portfolio),
    title: 'Portfolio | BeanArts' },
  { path: 'blog',
    loadComponent: () => import('./Insights/blog/blog').then(m => m.Blog),
    title: 'Insights & Trends | BeanArts' },
  { path: 'careers',
    loadComponent: () => import('./Insights/careers/careers').then(m => m.Careers),
    title: 'Careers at BeanArts' },
  { path: 'privacy',
    loadComponent: () => import('./policy/privacy-policy/privacy-policy').then(m => m.PrivacyPolicy),
    title: 'Privacy Policy | BeanArts' },
  { path: 'terms-conditions',
    loadComponent: () => import('./policy/terms-conditions/terms-conditions').then(m => m.TermsConditions),
    title: 'Terms & Conditions | BeanArts' },
  { path: 'faq',
    loadComponent: () => import('./policy/faq/faq').then(m => m.Faq),
    title: 'FAQ | BeanArts' },

  // ── Dynamic CMS pages (public) ───────────────────────
  { path: 'page/:slug',
    loadComponent: () => import('./pages/page-view/page-view').then(m => m.PageView),
    title: 'BeanArts' },

  // ── Products (public catalog) ─────────────────────────
  { path: 'products',
    loadComponent: () => import('./pages/products/products').then(m => m.Products),
    title: 'Shop Products | BeanArts' },
  { path: 'products/:id',
    loadComponent: () => import('./pages/products/product-detail/product-detail').then(m => m.ProductDetail),
    title: 'Product Details | BeanArts' },

  // ── Auth ──────────────────────────────────────────────
  { path: 'login',
    loadComponent: () => import('./pages/auth/login/login').then(m => m.Login),
    title: 'Sign In | BeanArts' },
  { path: 'register',
    loadComponent: () => import('./pages/auth/register/register').then(m => m.Register),
    title: 'Create Account | BeanArts' },
  { path: 'forgot-password',
    loadComponent: () => import('./pages/auth/forgot-password/forgot-password').then(m => m.ForgotPassword),
    title: 'Reset Password | BeanArts' },

  // ── Customer Dashboard (auth-protected) ───────────────
  { path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/dashboard/dashboard-layout/dashboard-layout').then(m => m.DashboardLayout),
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview',
        loadComponent: () => import('./pages/dashboard/overview/overview').then(m => m.Overview),
        title: 'Dashboard | BeanArts' },
      { path: 'profile',
        loadComponent: () => import('./pages/dashboard/profile/profile').then(m => m.Profile),
        title: 'My Profile | BeanArts' },
      { path: 'orders',
        loadComponent: () => import('./pages/dashboard/my-orders/my-orders').then(m => m.MyOrders),
        title: 'My Orders | BeanArts' },
      { path: 'orders/:id',
        loadComponent: () => import('./pages/dashboard/order-detail/order-detail').then(m => m.OrderDetail),
        title: 'Order Details | BeanArts' },
      { path: 'cart',
        loadComponent: () => import('./pages/dashboard/cart/cart').then(m => m.Cart),
        title: 'My Cart | BeanArts' },
      { path: 'checkout',
        loadComponent: () => import('./pages/dashboard/checkout/checkout').then(m => m.Checkout),
        title: 'Checkout | BeanArts' },
    ]
  },

  // ── Admin Panel (admin-protected) ─────────────────────
  { path: 'admin',
    canActivate: [adminGuard],
    loadComponent: () => import('./pages/admin/admin-layout/admin-layout').then(m => m.AdminLayout),
    children: [
      { path: '', redirectTo: 'orders', pathMatch: 'full' },
      { path: 'orders',
        loadComponent: () => import('./pages/admin/admin-orders/admin-orders').then(m => m.AdminOrders),
        title: 'Manage Orders | BeanArts Admin' },
      { path: 'orders/:id',
        loadComponent: () => import('./pages/admin/admin-order-detail/admin-order-detail').then(m => m.AdminOrderDetail),
        title: 'Order Detail | BeanArts Admin' },
      { path: 'products',
        loadComponent: () => import('./pages/admin/admin-products/admin-products').then(m => m.AdminProducts),
        title: 'Manage Products | BeanArts Admin' },
      { path: 'customers',
        loadComponent: () => import('./pages/admin/admin-customers/admin-customers').then(m => m.AdminCustomers),
        title: 'Customers | BeanArts Admin' },
      { path: 'pages',
        loadComponent: () => import('./pages/admin/admin-pages/admin-pages').then(m => m.AdminPages),
        title: 'Pages | BeanArts Admin' },
    ]
  },

  // ── Fallback ──────────────────────────────────────────
  { path: '404',
    loadComponent: () => import('./pages/not-found/not-found').then(m => m.NotFound),
    title: 'Page Not Found | BeanArts' },
  { path: '**', redirectTo: '/404' },
];
