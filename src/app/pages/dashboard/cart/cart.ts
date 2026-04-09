import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  readonly cartService = inject(CartService);
  readonly items    = this.cartService.items;
  readonly subtotal = this.cartService.subtotal;

  updateQty(productId: string, variantId: string | null, qty: number): void {
    this.cartService.updateQty(productId, variantId, qty);
  }

  remove(productId: string, variantId: string | null): void {
    this.cartService.removeItem(productId, variantId);
  }

  get tax(): number { return Math.round(this.subtotal() * 0.18 * 100) / 100; }
  get total(): number { return this.subtotal() + this.tax; }
}
