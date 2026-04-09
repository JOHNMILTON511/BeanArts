import { Component, signal, inject, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CartService } from '../../../core/services/cart.service';
import { OrderService } from '../../../core/services/order.service';
import { AuthService } from '../../../core/services/auth.service';
import { UserProfile } from '../../../core/models/user.model';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-checkout',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout implements OnInit {
  private fb           = inject(FormBuilder);
  private cartService  = inject(CartService);
  private orderService = inject(OrderService);
  private authService  = inject(AuthService);
  private router       = inject(Router);

  profile   = signal<UserProfile | null>(null);
  loading   = signal(false);
  error     = signal('');

  readonly items    = this.cartService.items;
  readonly subtotal = this.cartService.subtotal;
  get tax():   number { return Math.round(this.subtotal() * 0.18 * 100) / 100; }
  get total(): number { return this.subtotal() + this.tax; }

  form = this.fb.group({
    name:    ['', Validators.required],
    phone:   ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
    line1:   ['', Validators.required],
    line2:   [''],
    city:    ['', Validators.required],
    state:   ['', Validators.required],
    pincode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
    country: ['India', Validators.required],
    notes:   [''],
  });

  ngOnInit(): void {
    const user = this.authService.currentUser;
    if (!user) return;
    this.profile.set(user);
    if (user.addresses?.length) {
      const a = user.addresses[0];
      this.form.patchValue({
        name: a.name, phone: a.phone,
        line1: a.line1, line2: a.line2 ?? '',
        city: a.city, state: a.state,
        pincode: a.pincode, country: a.country,
      });
    }
  }

  async placeOrder(): Promise<void> {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    if (this.items().length === 0) { this.error.set('Your cart is empty.'); return; }
    const user = this.authService.currentUser;
    if (!user) return;

    this.loading.set(true);
    this.error.set('');
    try {
      const v = this.form.value;
      const p = this.profile();
      await firstValueFrom(this.orderService.placeOrder(
        user.uid, user.email, p?.displayName ?? '',
        p?.companyName ?? '', this.items(),
        {
          name:    v.name!,
          phone:   v.phone!,
          line1:   v.line1!,
          line2:   v.line2 ?? '',
          city:    v.city!,
          state:   v.state!,
          pincode: v.pincode!,
          country: v.country!,
        },
        v.notes ?? '',
      ));
      this.cartService.clearCart();
      this.router.navigate(['/dashboard/orders']);
    } catch {
      this.error.set('Failed to place order. Please try again.');
    } finally {
      this.loading.set(false);
    }
  }
}
