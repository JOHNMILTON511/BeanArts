import { Component, signal, inject, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../../core/services/order.service';
import { Order, OrderStatus, ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '../../../core/models/order.model';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-admin-order-detail',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './admin-order-detail.html',
  styleUrl: './admin-order-detail.css',
})
export class AdminOrderDetail implements OnInit {
  private route        = inject(ActivatedRoute);
  private orderService = inject(OrderService);

  order      = signal<Order | null>(null);
  loading    = signal(true);
  saving     = signal(false);
  saved      = signal(false);
  saveError  = signal('');

  newStatus    = signal<OrderStatus>('pending');
  trackingId   = signal('');

  readonly statusLabels = ORDER_STATUS_LABELS;
  readonly statusColors = ORDER_STATUS_COLORS;
  readonly statusOptions: OrderStatus[] = [
    'pending','confirmed','in_production','quality_check','dispatched','delivered'
  ];

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.orderService.getById(id).subscribe(order => {
      if (order) {
        this.order.set(order);
        this.newStatus.set(order.status);
        this.trackingId.set(order.trackingId ?? '');
      }
      this.loading.set(false);
    });
  }

  async updateOrder(): Promise<void> {
    const o = this.order();
    if (!o?.id) return;
    this.saving.set(true);
    this.saved.set(false);
    this.saveError.set('');
    try {
      await firstValueFrom(this.orderService.updateStatus(o.id, this.newStatus(), this.trackingId()));
      this.saved.set(true);
      setTimeout(() => this.saved.set(false), 3000);
    } catch {
      this.saveError.set('Failed to update. Please try again.');
    } finally {
      this.saving.set(false);
    }
  }
}
