import {
  Component, signal, inject, ChangeDetectionStrategy,
  OnInit, ViewChild, ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';
import { PageService, PageDto, SavePageRequest } from '../../../core/services/page.service';

@Component({
  selector: 'app-admin-pages',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './admin-pages.html',
  styleUrl: './admin-pages.css',
})
export class AdminPages implements OnInit {
  private pageService = inject(PageService);
  private fb          = inject(FormBuilder);
  private sanitizer   = inject(DomSanitizer);

  pages       = signal<PageDto[]>([]);
  loading     = signal(true);
  saving      = signal(false);
  error       = signal('');
  search      = signal('');

  /** 'list' | 'form' */
  view        = signal<'list' | 'form'>('list');
  editingPage = signal<PageDto | null>(null);

  /** 'write' | 'preview' */
  editorTab   = signal<'write' | 'preview'>('write');

  previewHtml: SafeHtml = '';

  form = this.fb.group({
    title:           ['', [Validators.required, Validators.minLength(2)]],
    slug:            ['', [Validators.required, Validators.pattern(/^[a-z0-9-]+$/)]],
    content:         [''],
    metaTitle:       [''],
    metaDescription: [''],
    status:          ['draft' as 'draft' | 'published', Validators.required],
    sortOrder:       [0],
  });

  get filtered(): PageDto[] {
    const q = this.search().toLowerCase();
    return q
      ? this.pages().filter(p => p.title.toLowerCase().includes(q) || p.slug.includes(q))
      : this.pages();
  }

  // ── Lifecycle ─────────────────────────────────────────────
  ngOnInit(): void { this.loadPages(); }

  private loadPages(): void {
    this.loading.set(true);
    this.pageService.getAll().subscribe({
      next:  pages => { this.pages.set(pages); this.loading.set(false); },
      error: ()    => this.loading.set(false),
    });
  }

  // ── Navigation ────────────────────────────────────────────
  openAdd(): void {
    this.editingPage.set(null);
    this.error.set('');
    this.editorTab.set('write');
    this.form.reset({ status: 'draft', sortOrder: 0, content: '', metaTitle: '', metaDescription: '', slug: '', title: '' });
    this.view.set('form');
  }

  openEdit(page: PageDto): void {
    this.editingPage.set(page);
    this.error.set('');
    this.editorTab.set('write');
    this.form.patchValue({
      title:           page.title,
      slug:            page.slug,
      content:         page.content,
      metaTitle:       page.metaTitle,
      metaDescription: page.metaDescription,
      status:          page.status,
      sortOrder:       page.sortOrder,
    });
    this.view.set('form');
  }

  cancel(): void {
    this.view.set('list');
    this.editingPage.set(null);
    this.error.set('');
  }

  // ── Auto-generate slug from title ─────────────────────────
  onTitleChange(value: string): void {
    if (this.editingPage()) return; // don't overwrite slug when editing
    const slug = value.toLowerCase().trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
    this.form.patchValue({ slug }, { emitEvent: false });
  }

  // ── Editor tabs ───────────────────────────────────────────
  switchTab(tab: 'write' | 'preview'): void {
    if (tab === 'preview') {
      const html = this.form.value.content ?? '';
      this.previewHtml = this.sanitizer.bypassSecurityTrustHtml(html);
    }
    this.editorTab.set(tab);
  }

  // ── Save ──────────────────────────────────────────────────
  async save(): Promise<void> {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving.set(true);
    this.error.set('');

    const v = this.form.value;
    const req: SavePageRequest = {
      title:           v.title!,
      slug:            v.slug!,
      content:         v.content ?? '',
      metaTitle:       v.metaTitle ?? '',
      metaDescription: v.metaDescription ?? '',
      status:          v.status as 'draft' | 'published',
      sortOrder:       v.sortOrder ?? 0,
    };

    try {
      const editing = this.editingPage();
      if (editing) {
        const updated = await firstValueFrom(this.pageService.update(editing.id, req));
        this.pages.update(list => list.map(p => p.id === updated.id ? updated : p));
      } else {
        const created = await firstValueFrom(this.pageService.add(req));
        this.pages.update(list => [created, ...list]);
      }
      this.view.set('list');
      this.editingPage.set(null);
    } catch (e: any) {
      this.error.set(e?.error?.message ?? 'Failed to save. Please try again.');
    } finally {
      this.saving.set(false);
    }
  }

  // ── Delete ────────────────────────────────────────────────
  async deletePage(page: PageDto): Promise<void> {
    if (!confirm(`Delete "${page.title}"? This cannot be undone.`)) return;
    try {
      await firstValueFrom(this.pageService.delete(page.id));
      this.pages.update(list => list.filter(p => p.id !== page.id));
    } catch {
      alert('Failed to delete. Please try again.');
    }
  }

  // ── Toggle status quickly ─────────────────────────────────
  async toggleStatus(page: PageDto): Promise<void> {
    const newStatus = page.status === 'published' ? 'draft' : 'published';
    try {
      const updated = await firstValueFrom(this.pageService.update(page.id, {
        title: page.title, slug: page.slug, content: page.content,
        metaTitle: page.metaTitle, metaDescription: page.metaDescription,
        sortOrder: page.sortOrder, status: newStatus,
      }));
      this.pages.update(list => list.map(p => p.id === updated.id ? updated : p));
    } catch {
      alert('Failed to update status.');
    }
  }
}
