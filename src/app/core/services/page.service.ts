import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface PageDto {
  id:              string;
  title:           string;
  slug:            string;
  content:         string;
  metaTitle:       string;
  metaDescription: string;
  status:          'draft' | 'published';
  sortOrder:       number;
  createdAt:       Date;
  updatedAt:       Date;
}

export interface SavePageRequest {
  title:           string;
  slug:            string;
  content:         string;
  metaTitle:       string;
  metaDescription: string;
  status:          'draft' | 'published';
  sortOrder:       number;
}

@Injectable({ providedIn: 'root' })
export class PageService {
  private http = inject(HttpClient);
  private api  = `${environment.apiUrl}/pages`;

  // ── Public ───────────────────────────────────────────────────
  getPublished(): Observable<PageDto[]> {
    return this.http.get<PageDto[]>(`${this.api}/public`);
  }

  getBySlug(slug: string): Observable<PageDto> {
    return this.http.get<PageDto>(`${this.api}/public/${slug}`);
  }

  // ── Admin ────────────────────────────────────────────────────
  getAll(): Observable<PageDto[]> {
    return this.http.get<PageDto[]>(this.api);
  }

  getById(id: string): Observable<PageDto> {
    return this.http.get<PageDto>(`${this.api}/${id}`);
  }

  add(req: SavePageRequest): Observable<PageDto> {
    return this.http.post<PageDto>(this.api, req);
  }

  update(id: string, req: SavePageRequest): Observable<PageDto> {
    return this.http.patch<PageDto>(`${this.api}/${id}`, req);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
