import {
  Component, signal, inject, ChangeDetectionStrategy,
  OnInit, OnDestroy, ElementRef, viewChild, effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { OrderService } from '../../../core/services/order.service';
import { ProductService } from '../../../core/services/product.service';
import { Order, OrderStatus, ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '../../../core/models/order.model';
import { UserProfile } from '../../../core/models/user.model';
import { environment } from '../../../../environments/environment';
import {
  Chart, ChartConfiguration,
  ArcElement, Tooltip, Legend, DoughnutController,
  LineElement, PointElement, LinearScale, CategoryScale, LineController,
  BarElement, BarController, Filler,
} from 'chart.js';

Chart.register(
  ArcElement, Tooltip, Legend, DoughnutController,
  LineElement, PointElement, LinearScale, CategoryScale, LineController,
  BarElement, BarController, Filler,
);

@Component({
  selector: 'app-admin-overview',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-overview.html',
  styleUrl: './admin-overview.css',
})
export class AdminOverview implements OnInit, OnDestroy {
  private orderService   = inject(OrderService);
  private productService = inject(ProductService);
  private http           = inject(HttpClient);

  orders        = signal<Order[]>([]);
  customerCount = signal(0);
  totalProducts = signal(0);
  loading       = signal(true);

  readonly statusLabels = ORDER_STATUS_LABELS;
  readonly statusColors = ORDER_STATUS_COLORS;

  readonly doughnutCanvas = viewChild<ElementRef<HTMLCanvasElement>>('doughnutCanvas');
  readonly lineCanvas     = viewChild<ElementRef<HTMLCanvasElement>>('lineCanvas');
  readonly barCanvas      = viewChild<ElementRef<HTMLCanvasElement>>('barCanvas');

  private charts: Chart[] = [];
  private chartsInitialized = false;

  get totalOrders()    { return this.orders().length; }
  get totalRevenue()   { return this.orders().reduce((s, o) => s + o.total, 0); }
  get pendingCount()   { return this.orders().filter(o => o.status === 'pending').length; }
  get deliveredCount() { return this.orders().filter(o => o.status === 'delivered').length; }
  get recentOrders()   {
    return [...this.orders()]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 6);
  }

  constructor() {
    effect(() => {
      const doughnut = this.doughnutCanvas();
      const line     = this.lineCanvas();
      const bar      = this.barCanvas();
      const done     = !this.loading();

      if (done && doughnut && line && bar && !this.chartsInitialized) {
        this.buildCharts();
        this.chartsInitialized = true;
      }
    });
  }

  ngOnInit(): void {
    forkJoin({
      orders:    this.orderService.getAllOrders(),
      customers: this.http.get<UserProfile[]>(`${environment.apiUrl}/users`, { params: { role: 'customer' } }),
      products:  this.productService.getAllAdmin(),
    }).subscribe({
      next: ({ orders, customers, products }) => {
        this.orders.set(orders);
        this.customerCount.set(customers.length);
        this.totalProducts.set(products.length);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  ngOnDestroy(): void {
    this.charts.forEach(c => c.destroy());
  }

  private buildCharts(): void {
    this.charts.forEach(c => c.destroy());
    this.charts = [];
    this.buildDoughnut();
    this.buildLine();
    this.buildBar();
  }

  private buildDoughnut(): void {
    const el = this.doughnutCanvas()?.nativeElement;
    if (!el) return;

    const statuses: OrderStatus[] = [
      'pending','confirmed','in_production','quality_check','dispatched','delivered','cancelled',
    ];
    const data   = statuses.map(s => this.orders().filter(o => o.status === s).length);
    const colors = statuses.map(s => this.statusColors[s]);
    const labels = statuses.map(s => this.statusLabels[s]);

    this.charts.push(new Chart(el, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: colors,
          borderWidth: 3,
          borderColor: '#fff',
          hoverOffset: 8,
        }],
      },
      options: {
        cutout: '68%',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { padding: 12, font: { size: 11, family: 'Inter' }, boxWidth: 10, borderRadius: 5 },
          },
          tooltip: {
            callbacks: { label: (ctx) => ` ${ctx.label}: ${ctx.parsed} orders` },
          },
        },
      },
    } as ChartConfiguration));
  }

  private buildLine(): void {
    const el = this.lineCanvas()?.nativeElement;
    if (!el) return;

    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d;
    });
    const labels  = days.map(d => d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }));
    const revenue = days.map(day => {
      const ds = day.toDateString();
      return this.orders()
        .filter(o => new Date(o.createdAt).toDateString() === ds)
        .reduce((s, o) => s + o.total, 0);
    });

    this.charts.push(new Chart(el, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Revenue (₹)',
          data: revenue,
          borderColor: '#4f46e5',
          backgroundColor: 'rgba(79,70,229,0.08)',
          borderWidth: 2.5,
          pointBackgroundColor: '#4f46e5',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7,
          tension: 0.4,
          fill: true,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: { label: (ctx) => ` ₹${Number(ctx.raw).toLocaleString('en-IN')}` },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { font: { size: 11, family: 'Inter' }, color: '#9ca3af' },
          },
          y: {
            grid: { color: '#f3f4f6' },
            border: { dash: [4, 4] },
            ticks: {
              font: { size: 11, family: 'Inter' },
              color: '#9ca3af',
              callback: (v) => '₹' + Number(v).toLocaleString('en-IN'),
            },
          },
        },
      },
    } as ChartConfiguration));
  }

  private buildBar(): void {
    const el = this.barCanvas()?.nativeElement;
    if (!el) return;

    const months = Array.from({ length: 6 }, (_, i) => {
      const d = new Date();
      d.setDate(1);
      d.setMonth(d.getMonth() - (5 - i));
      return d;
    });
    const labels = months.map(d => d.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' }));
    const counts = months.map(m =>
      this.orders().filter(o => {
        const c = new Date(o.createdAt);
        return c.getMonth() === m.getMonth() && c.getFullYear() === m.getFullYear();
      }).length,
    );

    this.charts.push(new Chart(el, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Orders',
          data: counts,
          backgroundColor: counts.map((_, i) =>
            i === counts.length - 1 ? '#4f46e5' : 'rgba(79,70,229,0.55)',
          ),
          borderRadius: 8,
          borderSkipped: false,
          hoverBackgroundColor: '#4338ca',
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: {
            grid: { display: false },
            ticks: { font: { size: 11, family: 'Inter' }, color: '#9ca3af' },
          },
          y: {
            grid: { color: '#f3f4f6' },
            border: { dash: [4, 4] },
            ticks: { stepSize: 1, font: { size: 11, family: 'Inter' }, color: '#9ca3af' },
            beginAtZero: true,
          },
        },
      },
    } as ChartConfiguration));
  }
}
