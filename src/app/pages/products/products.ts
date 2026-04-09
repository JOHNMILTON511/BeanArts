import { Component, signal, inject, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../core/services/product.service';
import { Product, ProductCategory } from '../../core/models/product.model';
import { CartService } from '../../core/services/cart.service';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  private productService = inject(ProductService);
  private cartService    = inject(CartService);
  private authService    = inject(AuthService);
  private router         = inject(Router);

  allProducts  = signal<Product[]>([]);
  loading      = signal(true);
  activeFilter = signal<ProductCategory | 'All'>('All');
  search       = signal('');
  addedId      = signal<string | null>(null);

  readonly categories: (ProductCategory | 'All')[] = ['All', 'Gifting', 'Printing', 'Packaging', 'Merchandise'];

  get filtered(): Product[] {
    let list = this.activeFilter() === 'All'
      ? this.allProducts()
      : this.allProducts().filter(p => p.category === this.activeFilter());
    const q = this.search().toLowerCase();
    if (q) list = list.filter(p => p.name.toLowerCase().includes(q) || p.tags?.some(t => t.toLowerCase().includes(q)));
    return list;
  }

  ngOnInit(): void {
    this.productService.getAll().subscribe(products => {
      this.allProducts.set(products);
      this.loading.set(false);
    });
  }

  addToCart(product: Product): void {
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }
    this.cartService.addItem({
      productId:   product.id,
      variantId:   null,
      variantName: null,
      name:        product.name,
      price:       product.price,
      quantity:    product.minQty || 1,
      imageUrl:    product.images?.[0] ?? '',
    });
    this.addedId.set(product.id);
    setTimeout(() => this.addedId.set(null), 2000);
  }
}
