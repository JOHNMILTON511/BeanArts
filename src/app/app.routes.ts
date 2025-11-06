import { Routes } from '@angular/router';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { Home } from './pages/home/home';
import { NotFound } from './pages/not-found/not-found';
import { Services } from './pages/services/services';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'about', component: About },
    { path: 'services', component: Services },
    { path: 'contact', component: Contact },
    // This must be the LAST route in your array
    { path: '404', component: NotFound },
    { path: '**', redirectTo: '/404' }
];
