import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, ProductCategory } from '../models/product.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  private api  = `${environment.apiUrl}/products`;

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.api, { params: { inStock: 'true' } });
  }

  getFeatured(): Observable<Product[]> {
    return this.http.get<Product[]>(this.api, { params: { featured: 'true', inStock: 'true' } });
  }

  getByCategory(category: ProductCategory): Observable<Product[]> {
    return this.http.get<Product[]>(this.api, { params: { category, inStock: 'true' } });
  }

  getById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.api}/${id}`);
  }

  // ── Admin methods ─────────────────────────────────────────────
  getAllAdmin(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.api}/admin`);
  }

  add(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Observable<Product> {
    return this.http.post<Product>(this.api, product);
  }

  update(id: string, data: Partial<Product>): Observable<Product> {
    return this.http.patch<Product>(`${this.api}/${id}`, data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
