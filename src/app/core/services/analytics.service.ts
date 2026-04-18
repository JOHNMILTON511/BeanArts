import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { OrderStatus } from '../models/order.model';

export interface AnalyticsSummary {
  totalOrders: number;
  totalRevenue: number;
  totalCustomers: number;
  totalProducts: number;
  pendingOrders: number;
  deliveredOrders: number;
  avgOrderValue: number;
  revenueThisMonth: number;
  revenueLastMonth: number;
  ordersThisMonth: number;
  newCustomersThisMonth: number;
}

export interface DailyRevenue {
  date: string;
  revenue: number;
  orders: number;
}

export interface MonthlyOrders {
  month: string;
  yr: number;
  mo: number;
  orders: number;
  revenue: number;
}

export interface StatusBreakdown {
  status: string;
  count: number;
}

export interface RecentOrder {
  id: string;
  userId: string;
  userName: string;
  companyName: string;
  total: number;
  status: OrderStatus;
  paymentStatus: string;
  createdAt: string;
}

export interface TopCustomer {
  userId: string;
  name: string;
  companyName: string;
  email: string;
  orderCount: number;
  totalSpend: number;
}

export interface TopProduct {
  productId: string;
  name: string;
  totalQuantity: number;
  totalRevenue: number;
  orderCount: number;
}

export interface AnalyticsResponse {
  summary: AnalyticsSummary;
  revenueByDay: DailyRevenue[];
  byMonth: MonthlyOrders[];
  byStatus: StatusBreakdown[];
  recentOrders: RecentOrder[];
  topCustomers: TopCustomer[];
  topProducts: TopProduct[];
}

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private http = inject(HttpClient);

  getAll(params?: {
    revenueDays?: number;
    months?: number;
    topLimit?: number;
    recentLimit?: number;
  }): Observable<AnalyticsResponse> {
    return this.http.get<AnalyticsResponse>(`${environment.apiUrl}/analytics`, {
      params: params as Record<string, string | number> ?? {},
    });
  }
}
