import {
  Component, signal, inject, ChangeDetectionStrategy, OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';
import { Product, ProductCategory, ProductVariant } from '../../../core/models/product.model';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './admin-products.html',
  styleUrl: './admin-products.css',
})
export class AdminProducts implements OnInit {
  private productService = inject(ProductService);
  private fb             = inject(FormBuilder);

  products = signal<Product[]>([]);
  loading  = signal(true);
  search   = signal('');

  showForm     = signal(false);
  editingId    = signal<string | null>(null);
  saving       = signal(false);
  formError    = signal('');
  deleteTarget = signal<Product | null>(null);
  deleting     = signal(false);

  readonly categories: ProductCategory[] = ['Gifting', 'Printing', 'Packaging', 'Merchandise'];

  form = this.fb.group({
    name:        ['', [Validators.required, Validators.minLength(2)]],
    category:    ['Gifting' as ProductCategory, Validators.required],
    description: [''],
    price:       [0, [Validators.required, Validators.min(1)]],
    minQty:      [50, [Validators.required, Validators.min(1)]],
    tagsInput:   [''],
    inStock:     [true],
    featured:    [false],
    images:      this.fb.array([this.fb.control('')]),
    variants:    this.fb.array([]),
  });

  get imagesArray(): FormArray  { return this.form.get('images')  as FormArray; }
  get variantsArray(): FormArray { return this.form.get('variants') as FormArray; }

  get filtered(): Product[] {
    const q = this.search().toLowerCase();
    return q
      ? this.products().filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
      : this.products();
  }

  ngOnInit(): void {
    this.productService.getAllAdmin().subscribe(products => {
      this.products.set(products);
      this.loading.set(false);
    });
  }

  openCreate(): void {
    this.editingId.set(null);
    this.formError.set('');
    this.form.reset({ name: '', category: 'Gifting', description: '', price: 0, minQty: 50, tagsInput: '', inStock: true, featured: false });
    while (this.imagesArray.length)   this.imagesArray.removeAt(0);
    while (this.variantsArray.length) this.variantsArray.removeAt(0);
    this.imagesArray.push(this.fb.control(''));
    this.showForm.set(true);
  }

  openEdit(product: Product): void {
    this.editingId.set(product.id);
    this.formError.set('');

    while (this.imagesArray.length)   this.imagesArray.removeAt(0);
    while (this.variantsArray.length) this.variantsArray.removeAt(0);

    const imgs = product.images?.length ? product.images : [''];
    imgs.forEach(url => this.imagesArray.push(this.fb.control(url)));

    (product.variants || []).forEach(v =>
      this.variantsArray.push(this.fb.group({
        id:      [v.id],
        label:   [v.label,  Validators.required],
        price:   [v.price,  [Validators.required, Validators.min(0)]],
        inStock: [v.inStock],
      }))
    );

    this.form.patchValue({
      name:        product.name,
      category:    product.category,
      description: product.description,
      price:       product.price,
      minQty:      product.minQty,
      tagsInput:   (product.tags || []).join(', '),
      inStock:     product.inStock,
      featured:    product.featured,
    });
    this.showForm.set(true);
  }

  closeForm(): void {
    this.showForm.set(false);
    this.editingId.set(null);
  }

  addImage(): void   { this.imagesArray.push(this.fb.control('')); }
  removeImage(i: number): void { if (this.imagesArray.length > 1) this.imagesArray.removeAt(i); }

  addVariant(): void {
    this.variantsArray.push(this.fb.group({
      id:      [crypto.randomUUID()],
      label:   ['', Validators.required],
      price:   [0,  [Validators.required, Validators.min(0)]],
      inStock: [true],
    }));
  }
  removeVariant(i: number): void { this.variantsArray.removeAt(i); }

  async onSave(): Promise<void> {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving.set(true);
    this.formError.set('');

    const v = this.form.value;
    const payload = {
      name:        v.name!,
      category:    v.category as ProductCategory,
      description: v.description || '',
      price:       Number(v.price),
      minQty:      Number(v.minQty),
      images:      (v.images as string[]).filter(u => u?.trim()),
      tags:        (v.tagsInput || '').split(',').map((t: string) => t.trim()).filter(Boolean),
      inStock:     !!v.inStock,
      featured:    !!v.featured,
      variants:    this.variantsArray.value as ProductVariant[],
    };

    try {
      const id = this.editingId();
      if (id) {
        const updated = await firstValueFrom(this.productService.update(id, payload));
        this.products.update(list => list.map(p => p.id === id ? updated : p));
      } else {
        const created = await firstValueFrom(this.productService.add(payload));
        this.products.update(list => [created, ...list]);
      }
      this.closeForm();
    } catch {
      this.formError.set('Failed to save product. Please try again.');
    } finally {
      this.saving.set(false);
    }
  }

  async toggleStock(product: Product): Promise<void> {
    if (!product.id) return;
    const updated = await firstValueFrom(this.productService.update(product.id, { inStock: !product.inStock }));
    this.products.update(list => list.map(p => p.id === product.id ? updated : p));
  }

  async toggleFeatured(product: Product): Promise<void> {
    if (!product.id) return;
    const updated = await firstValueFrom(this.productService.update(product.id, { featured: !product.featured }));
    this.products.update(list => list.map(p => p.id === product.id ? updated : p));
  }

  confirmDelete(product: Product): void  { this.deleteTarget.set(product); }
  cancelDelete(): void                    { this.deleteTarget.set(null); }

  async executeDelete(): Promise<void> {
    const target = this.deleteTarget();
    if (!target?.id) return;
    this.deleting.set(true);
    try {
      await firstValueFrom(this.productService.delete(target.id));
      this.products.update(list => list.filter(p => p.id !== target.id));
      this.deleteTarget.set(null);
    } catch {
      // keep dialog open on error
    } finally {
      this.deleting.set(false);
    }
  }
}
