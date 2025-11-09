import { Routes } from '@angular/router';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { Home } from './pages/home/home';
import { NotFound } from './pages/not-found/not-found';
import { Services } from './pages/services/services';
import { PrivacyPolicy } from './pages/privacy-policy/privacy-policy';

export const routes: Routes = [
    { path: 'home', component: Home },
    { path: '', component: Home, pathMatch:'full' },
    { path: 'about', component: About },
    { path: 'services', component: Services },
    { path: 'contact', component: Contact },
    { path: 'privacy', component: PrivacyPolicy },
    { path: '404', component: NotFound },
    { path: '**', redirectTo: '/404' }
];
