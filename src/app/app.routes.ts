import { Routes } from '@angular/router';
import { Home } from './pages/home/home';

export const routes: Routes = [
    {
        path: 'home',
        component: Home,
        title: 'BeanArts | Premium Corporate Gifting & Packaging'
    },
    {
        path: '',
        component: Home,
        pathMatch: 'full',
        title: 'BeanArts | Premium Corporate Gifting & Packaging'
    },
    {
        path: 'about',
        loadComponent: () => import('./pages/about/about').then(m => m.About),
        title: 'About Us - Our Story | BeanArts'
    },
    {
        path: 'services',
        loadComponent: () => import('./pages/services/services').then(m => m.Services),
        title: 'Our Services - Custom Gifting, Printing & Packaging | BeanArts'
    },
    {
        path: 'contact',
        loadComponent: () => import('./pages/contact/contact').then(m => m.Contact),
        title: 'Contact Us & Request a Quote | BeanArts'
    },
    {
        path: 'portfolio',
        loadComponent: () => import('./pages/portfolio/portfolio').then(m => m.Portfolio),
        title: 'Portfolio | BeanArts'
    },
    {
        path: 'blog',
        loadComponent: () => import('./Insights/blog/blog').then(m => m.Blog),
        title: 'Insights & Trends | BeanArts'
    },
    {
        path: 'careers',
        loadComponent: () => import('./Insights/careers/careers').then(m => m.Careers),
        title: 'Careers at BeanArts'
    },
    {
        path: 'privacy',
        loadComponent: () => import('./policy/privacy-policy/privacy-policy').then(m => m.PrivacyPolicy),
        title: 'Privacy Policy | BeanArts'
    },
    {
        path: 'terms-conditions',
        loadComponent: () => import('./policy/terms-conditions/terms-conditions').then(m => m.TermsConditions),
        title: 'Terms & Conditions | BeanArts'
    },
    {
        path: 'faq',
        loadComponent: () => import('./policy/faq/faq').then(m => m.Faq),
        title: 'FAQ | BeanArts'
    },
    {
        path: '404',
        loadComponent: () => import('./pages/not-found/not-found').then(m => m.NotFound),
        title: 'Page Not Found | BeanArts'
    },
    {
        path: '**',
        redirectTo: '/404'
    }
];
