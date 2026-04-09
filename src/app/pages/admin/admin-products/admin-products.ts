import { Component, signal, inject, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/models/product.model';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './admin-products.html',
  styleUrl: './admin-products.css',
})
export class AdminProducts implements OnInit {
  private productService = inject(ProductService);

  products = signal<Product[]>([]);
  loading  = signal(true);
  search   = signal('');

  get filtered(): Product[] {
    const q = this.search().toLowerCase();
    return q ? this.products().filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)) : this.products();
  }

  ngOnInit(): void {
    this.productService.getAllAdmin().subscribe(products => {
      this.products.set(products);
      this.loading.set(false);
    });
  }

  async toggleStock(product: Product): Promise<void> {
    if (!product.id) return;
    await firstValueFrom(this.productService.update(product.id, { inStock: !product.inStock }));
  }
}
