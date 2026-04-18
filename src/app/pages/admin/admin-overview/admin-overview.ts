import {
  Component, signal, inject, ChangeDetectionStrategy,
  OnInit, OnDestroy, ElementRef, viewChild, effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AnalyticsService, AnalyticsResponse, StatusBreakdown } from '../../../core/services/analytics.service';
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS, OrderStatus } from '../../../core/models/order.model';
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
  private analyticsService = inject(AnalyticsService);

  data    = signal<AnalyticsResponse | null>(null);
  loading = signal(true);

  readonly statusLabels = ORDER_STATUS_LABELS as Record<string, string>;
  readonly statusColors = ORDER_STATUS_COLORS as Record<string, string>;

  readonly doughnutCanvas = viewChild<ElementRef<HTMLCanvasElement>>('doughnutCanvas');
  readonly lineCanvas     = viewChild<ElementRef<HTMLCanvasElement>>('lineCanvas');
  readonly barCanvas      = viewChild<ElementRef<HTMLCanvasElement>>('barCanvas');

  private charts: Chart[] = [];
  private chartsInitialized = false;

  constructor() {
    effect(() => {
      const doughnut = this.doughnutCanvas();
      const line     = this.lineCanvas();
      const bar      = this.barCanvas();
      const done     = !this.loading();
      const d        = this.data();

      if (done && d && doughnut && line && bar && !this.chartsInitialized) {
        this.buildCharts(d);
        this.chartsInitialized = true;
      }
    });
  }

  ngOnInit(): void {
    this.analyticsService.getAll().subscribe({
      next: (d) => {
        this.data.set(d);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  ngOnDestroy(): void {
    this.charts.forEach(c => c.destroy());
  }

  private buildCharts(d: AnalyticsResponse): void {
    this.charts.forEach(c => c.destroy());
    this.charts = [];
    this.buildDoughnut(d.byStatus);
    this.buildLine(d.revenueByDay);
    this.buildBar(d.byMonth);
  }

  private buildDoughnut(byStatus: StatusBreakdown[]): void {
    const el = this.doughnutCanvas()?.nativeElement;
    if (!el) return;

    const statuses: OrderStatus[] = [
      'pending','confirmed','in_production','quality_check','dispatched','delivered','cancelled',
    ];
    const statusMap = Object.fromEntries(byStatus.map(s => [s.status, s.count]));
    const data   = statuses.map(s => statusMap[s] ?? 0);
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

  private buildLine(revenueByDay: { date: string; revenue: number }[]): void {
    const el = this.lineCanvas()?.nativeElement;
    if (!el) return;

    const labels  = revenueByDay.map(r =>
      new Date(r.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
    );
    const revenue = revenueByDay.map(r => r.revenue);

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

  private buildBar(byMonth: { month: string; orders: number }[]): void {
    const el = this.barCanvas()?.nativeElement;
    if (!el) return;

    const labels = byMonth.map(m => m.month);
    const counts = byMonth.map(m => m.orders);

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
