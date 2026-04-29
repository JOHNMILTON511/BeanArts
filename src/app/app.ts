import { afterNextRender, ChangeDetectionStrategy, Component, inject, OnDestroy, signal, computed } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterModule, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';

/** Routes that should render without the public header/footer shell */
const STANDALONE_PREFIXES = ['/dashboard', '/admin', '/login', '/register', '/forgot-password'];

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnDestroy {
  protected readonly title = signal('BeanArts');

  /** Tracks current URL path, updated on every NavigationEnd */
  protected readonly currentUrl = signal('/');

  /** True only on public marketing/catalog pages */
  protected readonly showPublicShell = computed(() => {
    const url = this.currentUrl();
    return !STANDALONE_PREFIXES.some(prefix => url.startsWith(prefix));
  });

  private router      = inject(Router);
  private routerSub!: Subscription;
  private barEl: HTMLElement | null = null;
  private barTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    // Set initial URL synchronously so SSR renders correctly
    this.currentUrl.set(this.router.url || '/');

    afterNextRender(() => {
      // Mark doc as JS-ready → scroll-reveal animations activate,
      // SSR hydration flash is prevented (see styles.css ba-ready guard)
      document.documentElement.classList.add('ba-ready');

      // Fade out the init loader (only present in CSR / slow-network)
      const loader = document.getElementById('ba-init-loader');
      if (loader) {
        loader.style.transition = 'opacity 350ms ease';
        loader.style.opacity = '0';
        loader.style.pointerEvents = 'none';
        setTimeout(() => loader.remove(), 380);
      }

      // Wire up route-level progress bar
      this.barEl = document.getElementById('ba-route-bar');
      this.routerSub = this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          // Update current URL for shell visibility
          this.currentUrl.set(event.urlAfterRedirects);
        }

        if (!this.barEl) return;
        if (event instanceof NavigationStart) {
          this.barEl.classList.remove('ba-bar-complete');
          this.barEl.style.opacity = '1';
          this.barEl.style.width = '30%';
          setTimeout(() => { if (this.barEl) this.barEl.style.width = '70%'; }, 150);
        } else if (
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel ||
          event instanceof NavigationError
        ) {
          this.barEl.style.width = '100%';
          if (this.barTimer) clearTimeout(this.barTimer);
          this.barTimer = setTimeout(() => {
            if (this.barEl) this.barEl.classList.add('ba-bar-complete');
          }, 300);
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
    if (this.barTimer) clearTimeout(this.barTimer);
  }
}
