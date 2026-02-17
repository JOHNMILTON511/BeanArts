import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  signal,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIconModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit, OnDestroy {
  private router     = inject(Router);
  private platformId = inject(PLATFORM_ID);
  private routerSub!: Subscription;

  /** True once user scrolls past 24px — triggers shadow on header */
  scrolled   = signal(false);

  /** Mobile menu open state */
  menuOpen   = signal(false);

  /** Services dropdown open */
  servDrop   = signal(false);

  navItems = [
    { label: 'Home',      link: '/',          exact: true },
    { label: 'About',     link: '/about',      exact: false },
    { label: 'Services',  link: '/services',   exact: false, hasDropdown: true },
    { label: 'Portfolio', link: '/portfolio',  exact: false },
    { label: 'Contact',   link: '/contact',    exact: false },
  ];

  serviceLinks = [
    { label: 'Corporate Gifting',   link: '/services', fragment: 'service-0', icon: 'card_giftcard' },
    { label: 'Custom Printing',     link: '/services', fragment: 'service-1', icon: 'print' },
    { label: 'Product Packaging',   link: '/services', fragment: 'service-2', icon: 'inventory_2' },
    { label: 'Onboarding Kits',     link: '/services', fragment: 'service-0', icon: 'work' },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.scrolled.set(window.scrollY > 24);
    }
  }

  ngOnInit(): void {
    this.routerSub = this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        this.menuOpen.set(false);
        this.servDrop.set(false);
      });
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }
}