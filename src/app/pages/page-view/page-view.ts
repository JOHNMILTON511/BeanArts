import { Component, signal, inject, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml, Title, Meta } from '@angular/platform-browser';
import { PageService, PageDto } from '../../core/services/page.service';

@Component({
  selector: 'app-page-view',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule],
  templateUrl: './page-view.html',
  styleUrl: './page-view.css',
})
export class PageView implements OnInit {
  private route       = inject(ActivatedRoute);
  private pageService = inject(PageService);
  private sanitizer   = inject(DomSanitizer);
  private titleSvc    = inject(Title);
  private meta        = inject(Meta);

  page        = signal<PageDto | null>(null);
  loading     = signal(true);
  notFound    = signal(false);
  safeContent: SafeHtml = '';

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug')!;
    this.pageService.getBySlug(slug).subscribe({
      next: p => {
        this.page.set(p);
        this.safeContent = this.sanitizer.bypassSecurityTrustHtml(p.content ?? '');
        this.titleSvc.setTitle((p.metaTitle || p.title) + ' | BeanArts');
        if (p.metaDescription) {
          this.meta.updateTag({ name: 'description', content: p.metaDescription });
        }
        this.loading.set(false);
      },
      error: () => {
        this.notFound.set(true);
        this.loading.set(false);
      },
    });
  }
}
