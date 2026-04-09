import { Component, signal, inject, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { CartService } from '../../../core/services/cart.service';
import { UserProfile } from '../../../core/models/user.model';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css',
})
export class DashboardLayout implements OnInit {
  private authService = inject(AuthService);
  private cartService = inject(CartService);
  private router      = inject(Router);

  profile     = signal<UserProfile | null>(null);
  sidebarOpen = signal(false);
  readonly cartCount = this.cartService.count;

  navItems = [
    { label: 'Overview',  icon: 'dashboard',      route: '/dashboard/overview' },
    { label: 'My Orders', icon: 'shopping_bag',    route: '/dashboard/orders' },
    { label: 'Cart',      icon: 'shopping_cart',   route: '/dashboard/cart' },
    { label: 'Profile',   icon: 'person_outline',  route: '/dashboard/profile' },
  ];

  ngOnInit(): void {
    const user = this.authService.currentUser;
    if (user) {
      this.profile.set(user);
      this.cartService.loadCart(user.uid);
    }
  }

  async logout(): Promise<void> {
    this.cartService.clearLocal();
    await this.authService.logout();
    this.router.navigate(['/login']);
  }
}
