import { Component, signal, inject, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';
import { AuthService } from '../../../core/services/auth.service';
import { Product, ProductVariant } from '../../../core/models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail implements OnInit {
  private route          = inject(ActivatedRoute);
  private router         = inject(Router);
  private productService = inject(ProductService);
  private cartService    = inject(CartService);
  private authService    = inject(AuthService);

  product         = signal<Product | null>(null);
  loading         = signal(true);
  selectedVariant = signal<ProductVariant | null>(null);
  quantity        = signal(1);
  activeImage     = signal(0);
  added           = signal(false);

  get price(): number {
    return this.selectedVariant()?.price ?? this.product()?.price ?? 0;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.productService.getById(id).subscribe(product => {
      if (product) {
        this.product.set(product);
        this.quantity.set(product.minQty || 1);
        if (product.variants?.length) {
          this.selectedVariant.set(product.variants[0]);
        }
      }
      this.loading.set(false);
    });
  }

  selectVariant(v: ProductVariant): void {
    this.selectedVariant.set(v);
  }

  protected Math = Math;

  addToCart(): void {
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }
    const p = this.product();
    if (!p) return;
    const v = this.selectedVariant();
    this.cartService.addItem({
      productId:   p.id,
      variantId:   v?.id ?? null,
      variantName: v?.label ?? null,
      name:        p.name,
      price:       this.price,
      quantity:    this.quantity(),
      imageUrl:    p.images?.[0] ?? '',
    });
    this.added.set(true);
    setTimeout(() => this.added.set(false), 2500);
  }

  goToCart(): void {
    this.router.navigate(['/dashboard/cart']);
  }
}
