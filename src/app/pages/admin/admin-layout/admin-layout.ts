import { Component, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../../../core/services/auth.service';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, MatTooltipModule],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout {
  private authService = inject(AuthService);
  private cartService = inject(CartService);
  private router      = inject(Router);

  sidebarOpen = signal(false);

  navItems = [
    { label: 'Overview',  icon: 'dashboard',     route: '/admin/overview' },
    { label: 'Orders',    icon: 'receipt_long',  route: '/admin/orders' },
    { label: 'Products',  icon: 'inventory_2',   route: '/admin/products' },
    { label: 'Customers', icon: 'group',          route: '/admin/customers' },
    { label: 'Pages',     icon: 'article',        route: '/admin/pages' },
  ];

  async logout(): Promise<void> {
    this.cartService.clearLocal();
    await this.authService.logout();
    this.router.navigate(['/login']);
  }
}
