import { Component, OnInit, OnDestroy, HostListener, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule, RouterLink, RouterLinkActive,
    MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule,
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit, OnDestroy {
  private router = inject(Router);
  private routerSub!: Subscription;

  scrolled   = signal(false);
  menuOpen   = signal(false);
  servDrop   = signal(false);

  navItems = [
    { label: 'Home',      link: '/', exact: true },
    { label: 'About',     link: '/about' },
    { label: 'Services',  link: '/services', hasDropdown: true },
    { label: 'Portfolio', link: '/portfolio' },
    { label: 'Contact',   link: '/contact' },
  ];

  serviceLinks = [
    { label: 'Corporate Gifting',  link: '/services#gifting',   icon: 'card_giftcard' },
    { label: 'Custom Printing',    link: '/services#printing',  icon: 'print' },
    { label: 'Product Packaging',  link: '/services#packaging', icon: 'inventory_2' },
    { label: 'Onboarding Kits',    link: '/services#kits',      icon: 'work' },
  ];

  @HostListener('window:scroll')
  onScroll() { this.scrolled.set(window.scrollY > 30); }

  ngOnInit() {
    this.routerSub = this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => { this.menuOpen.set(false); this.servDrop.set(false); });
  }

  ngOnDestroy() { this.routerSub?.unsubscribe(); }
}