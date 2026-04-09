import { inject, Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { CartItem } from '../models/cart.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CartService {
  private http = inject(HttpClient);
  private api  = `${environment.apiUrl}/cart`;

  private _items = signal<CartItem[]>([]);
  readonly items  = this._items.asReadonly();

  readonly count = computed(() =>
    this._items().reduce((sum, i) => sum + i.quantity, 0)
  );
  readonly subtotal = computed(() =>
    this._items().reduce((sum, i) => sum + i.price * i.quantity, 0)
  );

  private uid: string | null = null;

  // Call when user logs in
  async loadCart(uid: string): Promise<void> {
    this.uid = uid;
    try {
      const cart = await firstValueFrom(
        this.http.get<{ items: CartItem[] }>(`${this.api}/${uid}`)
      );
      this._items.set(cart.items ?? []);
    } catch {
      this._items.set([]);
    }
  }

  // Call on logout
  clearLocal(): void {
    this.uid = null;
    this._items.set([]);
  }

  addItem(item: CartItem): void {
    const current = this._items();
    const idx = current.findIndex(
      i => i.productId === item.productId && i.variantId === item.variantId
    );
    const updated = idx >= 0
      ? current.map((i, index) =>
          index === idx ? { ...i, quantity: i.quantity + item.quantity } : i
        )
      : [...current, item];
    this._items.set(updated);
    this.persist(updated);
  }

  updateQty(productId: string, variantId: string | null, quantity: number): void {
    const updated = quantity <= 0
      ? this._items().filter(i => !(i.productId === productId && i.variantId === variantId))
      : this._items().map(i =>
          i.productId === productId && i.variantId === variantId ? { ...i, quantity } : i
        );
    this._items.set(updated);
    this.persist(updated);
  }

  removeItem(productId: string, variantId: string | null): void {
    this.updateQty(productId, variantId, 0);
  }

  clearCart(): void {
    this._items.set([]);
    this.persist([]);
  }

  private persist(items: CartItem[]): void {
    if (!this.uid) return;
    this.http.put(`${this.api}/${this.uid}`, { items }).subscribe();
  }
}
