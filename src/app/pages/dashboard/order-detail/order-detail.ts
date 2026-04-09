import { Component, signal, inject, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../core/services/order.service';
import { Order, ORDER_STATUS_LABELS, ORDER_STATUS_COLORS, OrderStatus } from '../../../core/models/order.model';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule],
  templateUrl: './order-detail.html',
  styleUrl: './order-detail.css',
})
export class OrderDetail implements OnInit {
  private route        = inject(ActivatedRoute);
  private orderService = inject(OrderService);

  order   = signal<Order | null>(null);
  loading = signal(true);

  readonly statusLabels = ORDER_STATUS_LABELS;
  readonly statusColors = ORDER_STATUS_COLORS;

  readonly allStatuses: OrderStatus[] = [
    'pending','confirmed','in_production','quality_check','dispatched','delivered'
  ];

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.orderService.getById(id).subscribe(order => {
      this.order.set(order ?? null);
      this.loading.set(false);
    });
  }

  isReached(status: OrderStatus): boolean {
    const o = this.order();
    if (!o) return false;
    return this.allStatuses.indexOf(o.status) >= this.allStatuses.indexOf(status);
  }
}
