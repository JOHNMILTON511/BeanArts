import { Component, signal, inject, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { OrderService } from '../../../core/services/order.service';
import { CartService } from '../../../core/services/cart.service';
import { Order } from '../../../core/models/order.model';
import { UserProfile } from '../../../core/models/user.model';
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '../../../core/models/order.model';

@Component({
  selector: 'app-overview',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule],
  templateUrl: './overview.html',
  styleUrl: './overview.css',
})
export class Overview implements OnInit {
  private authService  = inject(AuthService);
  private orderService = inject(OrderService);
  private cartService  = inject(CartService);

  profile       = signal<UserProfile | null>(null);
  recentOrders  = signal<Order[]>([]);
  readonly cartCount = this.cartService.count;
  readonly statusLabels = ORDER_STATUS_LABELS;
  readonly statusColors = ORDER_STATUS_COLORS;

  ngOnInit(): void {
    const user = this.authService.currentUser;
    if (!user) return;
    this.profile.set(user);
    this.orderService.getMyOrders(user.uid).subscribe(orders => {
      this.recentOrders.set(orders.slice(0, 3));
    });
  }
}
