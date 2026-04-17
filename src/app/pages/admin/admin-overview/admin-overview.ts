import {
  Component, signal, inject, ChangeDetectionStrategy,
  OnInit, OnDestroy, ElementRef, viewChild, effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderService } from '../../../core/services/order.service';
import { Order, OrderStatus, ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '../../../core/models/order.model';
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
  private orderService = inject(OrderService);

  orders  = signal<Order[]>([]);
  loading = signal(true);

  readonly statusLabels = ORDER_STATUS_LABELS;
  readonly statusColors = ORDER_STATUS_COLORS;

  // Canvas refs — only populated when @else block is in the DOM
  readonly doughnutCanvas = viewChild<ElementRef<HTMLCanvasElement>>('doughnutCanvas');
  readonly lineCanvas     = viewChild<ElementRef<HTMLCanvasElement>>('lineCanvas');
  readonly barCanvas      = viewChild<ElementRef<HTMLCanvasElement>>('barCanvas');

  private charts: Chart[] = [];
  private chartsInitialized = false;

  // ── Computed stats ──────────────────────────────────────
  get totalOrders()    { return this.orders().length; }
  get totalRevenue()   { return this.orders().reduce((s, o) => s + o.total, 0); }
  get pendingCount()   { return this.orders().filter(o => o.status === 'pending').length; }
  get deliveredCount() { return this.orders().filter(o => o.status === 'delivered').length; }
  get customerCount()  { return new Set(this.orders().map(o => o.userId)).size; }
  get recentOrders()   {
    return [...this.orders()]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 6);
  }

  constructor() {
    // Watch all three viewChild signals + loading together.
    // When the @else block renders, Angular sets all three canvas signals.
    // The effect re-runs at that point — no setTimeout timing required.
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
    // TODO: swap mock → real API once OrdersController is deployed
    // this.orderService.getAllOrders().subscribe({
    //   next: (orders) => { this.orders.set(orders); this.loading.set(false); },
    //   error: () => this.loading.set(false),
    // });
    this.orders.set(this.buildMockOrders());
    this.loading.set(false);
  }

  // ── Mock data (remove when API is live) ─────────────────────
  private buildMockOrders(): Order[] {
    const ago = (days: number): Date => {
      const d = new Date();
      d.setDate(d.getDate() - days);
      return d;
    };
    const addr = { name: 'Office', phone: '9876543210', line1: '123 MG Road', city: 'Bengaluru', state: 'Karnataka', pincode: '560001', country: 'India' };

    const raw = [
      { id: 'ord-0001', userId: 'u1', userEmail: 'raj@infosys.com',   userName: 'Raj Kumar',   companyName: 'Infosys Ltd',         total: 58820, subtotal: 49000, status: 'delivered',     createdAt: ago(165), updatedAt: ago(160) },
      { id: 'ord-0002', userId: 'u2', userEmail: 'priya@wipro.com',   userName: 'Priya Nair',  companyName: 'Wipro Technologies',  total: 35400, subtotal: 30000, status: 'delivered',     createdAt: ago(152), updatedAt: ago(148) },
      { id: 'ord-0003', userId: 'u3', userEmail: 'anu@tcs.com',       userName: 'Anupama R',   companyName: 'TCS',                 total: 94400, subtotal: 80000, status: 'delivered',     createdAt: ago(141), updatedAt: ago(138) },
      { id: 'ord-0004', userId: 'u4', userEmail: 'deepak@hdfc.com',   userName: 'Deepak Iyer', companyName: 'HDFC Bank',           total: 23600, subtotal: 20000, status: 'cancelled',     createdAt: ago(135), updatedAt: ago(134) },
      { id: 'ord-0005', userId: 'u1', userEmail: 'raj@infosys.com',   userName: 'Raj Kumar',   companyName: 'Infosys Ltd',         total: 47200, subtotal: 40000, status: 'delivered',     createdAt: ago(122), updatedAt: ago(119) },
      { id: 'ord-0006', userId: 'u5', userEmail: 'meera@amazon.com',  userName: 'Meera S',     companyName: 'Amazon India',        total: 118000,subtotal:100000, status: 'delivered',     createdAt: ago(110), updatedAt: ago(105) },
      { id: 'ord-0007', userId: 'u6', userEmail: 'kiran@bosch.com',   userName: 'Kiran Reddy', companyName: 'Bosch India',         total: 70800, subtotal: 60000, status: 'delivered',     createdAt: ago(98),  updatedAt: ago(95)  },
      { id: 'ord-0008', userId: 'u2', userEmail: 'priya@wipro.com',   userName: 'Priya Nair',  companyName: 'Wipro Technologies',  total: 29500, subtotal: 25000, status: 'delivered',     createdAt: ago(90),  updatedAt: ago(87)  },
      { id: 'ord-0009', userId: 'u7', userEmail: 'siva@google.com',   userName: 'Sivakumar T', companyName: 'Google India',        total: 141600,subtotal:120000, status: 'delivered',     createdAt: ago(82),  updatedAt: ago(79)  },
      { id: 'ord-0010', userId: 'u8', userEmail: 'lata@microsoft.com',userName: 'Lata M',      companyName: 'Microsoft India',     total: 82600, subtotal: 70000, status: 'delivered',     createdAt: ago(75),  updatedAt: ago(72)  },
      { id: 'ord-0011', userId: 'u3', userEmail: 'anu@tcs.com',       userName: 'Anupama R',   companyName: 'TCS',                 total: 41300, subtotal: 35000, status: 'cancelled',     createdAt: ago(68),  updatedAt: ago(67)  },
      { id: 'ord-0012', userId: 'u9', userEmail: 'ravi@flipkart.com', userName: 'Ravi Shankar',companyName: 'Flipkart',            total: 59000, subtotal: 50000, status: 'delivered',     createdAt: ago(62),  updatedAt: ago(58)  },
      { id: 'ord-0013', userId: 'u5', userEmail: 'meera@amazon.com',  userName: 'Meera S',     companyName: 'Amazon India',        total: 35400, subtotal: 30000, status: 'delivered',     createdAt: ago(55),  updatedAt: ago(50)  },
      { id: 'ord-0014', userId: 'u10',userEmail: 'arjun@swiggy.com',  userName: 'Arjun M',     companyName: 'Swiggy',              total: 23600, subtotal: 20000, status: 'dispatched',    createdAt: ago(42),  updatedAt: ago(40)  },
      { id: 'ord-0015', userId: 'u6', userEmail: 'kiran@bosch.com',   userName: 'Kiran Reddy', companyName: 'Bosch India',         total: 47200, subtotal: 40000, status: 'quality_check', createdAt: ago(35),  updatedAt: ago(33)  },
      { id: 'ord-0016', userId: 'u11',userEmail: 'kavya@zomato.com',  userName: 'Kavya P',     companyName: 'Zomato',              total: 94400, subtotal: 80000, status: 'delivered',     createdAt: ago(30),  updatedAt: ago(25)  },
      { id: 'ord-0017', userId: 'u1', userEmail: 'raj@infosys.com',   userName: 'Raj Kumar',   companyName: 'Infosys Ltd',         total: 70800, subtotal: 60000, status: 'in_production', createdAt: ago(22),  updatedAt: ago(20)  },
      { id: 'ord-0018', userId: 'u12',userEmail: 'hari@ola.com',      userName: 'Harish N',    companyName: 'Ola Cabs',            total: 35400, subtotal: 30000, status: 'confirmed',     createdAt: ago(18),  updatedAt: ago(17)  },
      { id: 'ord-0019', userId: 'u7', userEmail: 'siva@google.com',   userName: 'Sivakumar T', companyName: 'Google India',        total: 59000, subtotal: 50000, status: 'in_production', createdAt: ago(14),  updatedAt: ago(12)  },
      { id: 'ord-0020', userId: 'u8', userEmail: 'lata@microsoft.com',userName: 'Lata M',      companyName: 'Microsoft India',     total: 47200, subtotal: 40000, status: 'confirmed',     createdAt: ago(10),  updatedAt: ago(9)   },
      { id: 'ord-0021', userId: 'u13',userEmail: 'divya@myntra.com',  userName: 'Divya K',     companyName: 'Myntra',              total: 23600, subtotal: 20000, status: 'quality_check', createdAt: ago(7),   updatedAt: ago(6)   },
      { id: 'ord-0022', userId: 'u9', userEmail: 'ravi@flipkart.com', userName: 'Ravi Shankar',companyName: 'Flipkart',            total: 82600, subtotal: 70000, status: 'pending',       createdAt: ago(5),   updatedAt: ago(5)   },
      { id: 'ord-0023', userId: 'u14',userEmail: 'suma@paytm.com',    userName: 'Suma R',      companyName: 'Paytm',               total: 35400, subtotal: 30000, status: 'pending',       createdAt: ago(3),   updatedAt: ago(3)   },
      { id: 'ord-0024', userId: 'u10',userEmail: 'arjun@swiggy.com',  userName: 'Arjun M',     companyName: 'Swiggy',              total: 58820, subtotal: 49000, status: 'pending',       createdAt: ago(2),   updatedAt: ago(2)   },
      { id: 'ord-0025', userId: 'u15',userEmail: 'neel@byju.com',     userName: 'Neelesh V',   companyName: "Byju's",              total: 70800, subtotal: 60000, status: 'confirmed',     createdAt: ago(1),   updatedAt: ago(1)   },
      { id: 'ord-0026', userId: 'u11',userEmail: 'kavya@zomato.com',  userName: 'Kavya P',     companyName: 'Zomato',              total: 118000,subtotal:100000, status: 'pending',       createdAt: ago(0),   updatedAt: ago(0)   },
    ];

    return raw.map(o => ({
      ...o,
      tax:           Math.round((o.subtotal * 0.18) * 100) / 100,
      items:         [],
      shippingAddress: addr,
      notes:         '',
      trackingId:    o.status === 'dispatched' || o.status === 'delivered' ? 'TRK' + o.id.slice(-4) : '',
      paymentStatus: (o.status === 'delivered' ? 'paid' : 'pending') as 'paid' | 'pending' | 'failed',
    }));
  }

  ngOnDestroy(): void {
    this.charts.forEach(c => c.destroy());
  }

  // ── Build all charts ────────────────────────────────────
  private buildCharts(): void {
    this.charts.forEach(c => c.destroy());
    this.charts = [];
    this.buildDoughnut();
    this.buildLine();
    this.buildBar();
  }

  // 1. Orders by Status — Doughnut
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
            labels: {
              padding: 12,
              font: { size: 11, family: 'Inter' },
              boxWidth: 10,
              borderRadius: 5,
            },
          },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.label}: ${ctx.parsed} orders`,
            },
          },
        },
      },
    } as ChartConfiguration));
  }

  // 2. Revenue — Last 7 Days (Line)
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
            callbacks: {
              label: (ctx) => ` ₹${Number(ctx.raw).toLocaleString('en-IN')}`,
            },
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

  // 3. Orders — Last 6 Months (Bar)
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
            ticks: {
              stepSize: 1,
              font: { size: 11, family: 'Inter' },
              color: '#9ca3af',
            },
            beginAtZero: true,
          },
        },
      },
    } as ChartConfiguration));
  }
}
