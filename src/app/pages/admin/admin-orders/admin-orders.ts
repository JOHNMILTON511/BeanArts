import { Component, signal, inject, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
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
  private route        = inject(ActivatedRoute);

  allOrders    = signal<Order[]>([]);
  loading      = signal(true);
  filter       = signal<OrderStatus | 'all'>('all');
  customerFilter = signal<string | null>(null);

  readonly statusLabels = ORDER_STATUS_LABELS;
  readonly statusColors = ORDER_STATUS_COLORS;
  readonly filterOptions: { value: OrderStatus | 'all'; label: string }[] = [
    { value: 'all',          label: 'All Orders' },
    { value: 'pending',      label: 'Pending' },
    { value: 'confirmed',    label: 'Confirmed' },
    { value: 'in_production',label: 'In Production' },
    { value: 'quality_check',label: 'Quality Check' },
    { value: 'dispatched',   label: 'Dispatched' },
    { value: 'delivered',    label: 'Delivered' },
  ];

  get filteredOrders(): Order[] {
    let list = this.allOrders();
    const uid = this.customerFilter();
    if (uid) list = list.filter(o => o.userId === uid);
    const f = this.filter();
    return f === 'all' ? list : list.filter(o => o.status === f);
  }

  ngOnInit(): void {
    const uid = this.route.snapshot.queryParamMap.get('userId');
    if (uid) this.customerFilter.set(uid);

    this.orderService.getAllOrders().subscribe(orders => {
      this.allOrders.set(orders);
      this.loading.set(false);
    });
  }

  clearCustomerFilter(): void { this.customerFilter.set(null); }
}
