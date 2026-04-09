import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order, OrderStatus } from '../models/order.model';
import { CartItem } from '../models/cart.model';
import { Address } from '../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private http = inject(HttpClient);
  private api  = `${environment.apiUrl}/orders`;

  // Customer: get their orders
  getMyOrders(uid: string): Observable<Order[]> {
    return this.http.get<Order[]>(this.api, { params: { userId: uid } });
  }

  // Admin: get all orders
  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.api);
  }

  getById(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.api}/${id}`);
  }

  placeOrder(
    userId: string, userEmail: string, userName: string,
    companyName: string, items: CartItem[],
    shippingAddress: Address, notes: string,
  ): Observable<Order> {
    const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
    const tax      = Math.round(subtotal * 0.18 * 100) / 100; // 18% GST
    return this.http.post<Order>(this.api, {
      userId, userEmail, userName, companyName, items,
      shippingAddress, notes, subtotal, tax,
      total: subtotal + tax,
    });
  }

  // Admin: update status
  updateStatus(orderId: string, status: OrderStatus, trackingId = ''): Observable<Order> {
    return this.http.patch<Order>(`${this.api}/${orderId}/status`, { status, trackingId });
  }
}
