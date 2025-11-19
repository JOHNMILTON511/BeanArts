import { afterNextRender, Component, signal } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';
import Aos from 'aos';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer,RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('BeanArts');

  constructor() {
    // afterNextRender is a new hook in Angular 17+ that runs ONLY in the browser
    // ensuring this code never runs on the server (SSR)
    afterNextRender(() => {
      Aos.init({
        once: true,
        duration: 800,
        easing: 'ease-in-out',
      });
    });
  }
}
