import { Component, signal, inject, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserProfile } from '../../../core/models/user.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-admin-customers',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './admin-customers.html',
  styleUrl: './admin-customers.css',
})
export class AdminCustomers implements OnInit {
  private http = inject(HttpClient);

  customers = signal<UserProfile[]>([]);
  loading   = signal(true);
  search    = signal('');

  get filtered(): UserProfile[] {
    const q = this.search().toLowerCase();
    if (!q) return this.customers();
    return this.customers().filter(c =>
      c.displayName?.toLowerCase().includes(q) ||
      c.email?.toLowerCase().includes(q) ||
      c.companyName?.toLowerCase().includes(q)
    );
  }

  ngOnInit(): void {
    this.http.get<UserProfile[]>(`${environment.apiUrl}/users`, { params: { role: 'customer' } })
      .subscribe(customers => {
        this.customers.set(customers);
        this.loading.set(false);
      });
  }
}
