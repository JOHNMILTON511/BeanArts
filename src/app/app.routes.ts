import { Routes } from '@angular/router';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { Home } from './pages/home/home';
import { NotFound } from './pages/not-found/not-found';
import { Services } from './pages/services/services';
import { PrivacyPolicy } from './policy/privacy-policy/privacy-policy';
import { TermsConditions } from './policy/terms-conditions/terms-conditions';
import { Faq } from './policy/faq/faq';
import { Portfolio } from './pages/portfolio/portfolio';
import { Blog } from './Insights/blog/blog';
import { Careers } from './Insights/careers/careers';

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
        component: About,
        title: 'About Us - Our Story | BeanArts'
    },
    {
        path: 'services',
        component: Services,
        title: 'Our Services - Custom Gifting, Printing & Packaging | BeanArts'
    },
    {
        path: 'contact',
        component: Contact,
        title: 'Contact Us & Request a Quote | BeanArts'
    },
    {
        path: 'privacy',
        component: PrivacyPolicy,
        title: 'Privacy Policy | BeanArts'
    },
    {
        path: '404',
        component: NotFound,
        title: 'Page Not Found | BeanArts'
    },
    {
        path: 'blog',
        component: Blog,
        title: 'Insights & Trends | BeanArts'
    },
    {
        path: 'careers',
        component: Careers,
        title: 'Careers at BeanArts'
    },
    {
        path: 'terms-conditions',
        component: TermsConditions,
        title: 'Terms & Conditions | BeanArts'
    },
    {
        path: 'faq',
        component: Faq,
        title: 'FAQ | BeanArts'
    },
    {
        path: 'portfolio',
        component: Portfolio,
        title: 'Portfolio | BeanArts'
    },
    {
        path: '**',
        redirectTo: '/404'
    }

];