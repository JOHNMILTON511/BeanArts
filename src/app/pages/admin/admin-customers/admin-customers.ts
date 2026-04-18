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

  customers   = signal<UserProfile[]>([]);
  loading     = signal(true);
  search      = signal('');
  togglingId  = signal<string | null>(null);

  // password reset modal
  pwTarget    = signal<UserProfile | null>(null);
  newPassword = signal('');
  pwSaving    = signal(false);
  pwError     = signal('');
  pwDone      = signal(false);
  showPw      = signal(false);

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
      .subscribe({
        next: customers => { this.customers.set(customers); this.loading.set(false); },
        error: ()       => this.loading.set(false),
      });
  }

  toggleStatus(customer: UserProfile): void {
    this.togglingId.set(customer.uid);
    const newActive = !customer.isActive;
    this.http.patch<UserProfile>(
      `${environment.apiUrl}/users/${customer.uid}/status`,
      { isActive: newActive },
    ).subscribe({
      next: updated => {
        this.customers.update(list => list.map(c => c.uid === updated.uid ? updated : c));
        this.togglingId.set(null);
      },
      error: () => this.togglingId.set(null),
    });
  }

  openResetPw(customer: UserProfile): void {
    this.pwTarget.set(customer);
    this.newPassword.set('');
    this.pwError.set('');
    this.pwDone.set(false);
    this.showPw.set(false);
  }

  closeResetPw(): void { this.pwTarget.set(null); }

  savePassword(): void {
    const pw = this.newPassword().trim();
    if (pw.length < 6) { this.pwError.set('Password must be at least 6 characters.'); return; }
    const target = this.pwTarget();
    if (!target) return;

    this.pwSaving.set(true);
    this.pwError.set('');
    this.http.put(`${environment.apiUrl}/users/${target.uid}/password`, { password: pw })
      .subscribe({
        next: () => { this.pwDone.set(true); this.pwSaving.set(false); },
        error: (e) => {
          this.pwError.set(e?.error?.message ?? 'Failed to update password.');
          this.pwSaving.set(false);
        },
      });
  }
}
