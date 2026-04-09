import { Component, signal, inject, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../../core/services/order.service';
import { Order, OrderStatus, ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '../../../core/models/order.model';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './admin-orders.html',
  styleUrl: './admin-orders.css',
})
export class AdminOrders implements OnInit {
  private orderService = inject(OrderService);

  allOrders  = signal<Order[]>([]);
  loading    = signal(true);
  filter     = signal<OrderStatus | 'all'>('all');

  readonly statusLabels = ORDER_STATUS_LABELS;
  readonly statusColors = ORDER_STATUS_COLORS;
  readonly filterOptions: { value: OrderStatus | 'all'; label: string }[] = [
    { value: 'all', label: 'All Orders' },
    { value: 'pending',       label: 'Pending' },
    { value: 'confirmed',     label: 'Confirmed' },
    { value: 'in_production', label: 'In Production' },
    { value: 'quality_check', label: 'Quality Check' },
    { value: 'dispatched',    label: 'Dispatched' },
    { value: 'delivered',     label: 'Delivered' },
  ];

  get filteredOrders(): Order[] {
    const f = this.filter();
    return f === 'all' ? this.allOrders() : this.allOrders().filter(o => o.status === f);
  }

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe(orders => {
      this.allOrders.set(orders);
      this.loading.set(false);
    });
  }
}
