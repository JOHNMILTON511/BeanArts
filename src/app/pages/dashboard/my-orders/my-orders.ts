import { Component, signal, inject, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { OrderService } from '../../../core/services/order.service';
import { Order, ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '../../../core/models/order.model';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule],
  templateUrl: './my-orders.html',
  styleUrl: './my-orders.css',
})
export class MyOrders implements OnInit {
  private authService  = inject(AuthService);
  private orderService = inject(OrderService);

  orders  = signal<Order[]>([]);
  loading = signal(true);
  readonly statusLabels = ORDER_STATUS_LABELS;
  readonly statusColors = ORDER_STATUS_COLORS;

  ngOnInit(): void {
    const user = this.authService.currentUser;
    if (!user) return;
    this.orderService.getMyOrders(user.uid).subscribe(orders => {
      this.orders.set(orders);
      this.loading.set(false);
    });
  }
}
