import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import AOS from 'aos';
import 'aos/dist/aos.css';

bootstrapApplication(App, appConfig)
  .then(() => {
    // Initialize AOS after the app boots so `data-aos` attributes are handled
    try {
      AOS.init({
        once: true, // whether animation should happen only once - while scrolling down
        duration: 800,
        easing: 'ease-in-out',
      });
    } catch (e) {
      // ignore init errors in environments where AOS may not run
      // (e.g., server-side rendering)
      // console.warn('AOS init failed', e);
    }
  })
  .catch((err) => console.error(err));
