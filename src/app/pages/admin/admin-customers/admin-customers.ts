import { Component, signal, inject, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UserProfile } from '../../../core/models/user.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-admin-customers',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatIconModule, MatTooltipModule],
  templateUrl: './admin-customers.html',
  styleUrl: './admin-customers.css',
})
export class AdminCustomers implements OnInit {
  private http = inject(HttpClient);
  private fb   = inject(FormBuilder);

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

  // create user modal
  createOpen   = signal(false);
  createSaving = signal(false);
  createError  = signal('');
  createDone   = signal(false);
  showCreatePw = signal(false);

  createForm = this.fb.group({
    displayName:  ['', [Validators.required, Validators.minLength(2)]],
    companyName:  ['', Validators.required],
    email:        ['', [Validators.required, Validators.email]],
    phone:        ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
    password:     ['', [Validators.required, Validators.minLength(6)]],
  });

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

  openCreate(): void {
    this.createForm.reset();
    this.createError.set('');
    this.createDone.set(false);
    this.showCreatePw.set(false);
    this.createOpen.set(true);
  }

  closeCreate(): void { this.createOpen.set(false); }

  saveCreate(): void {
    if (this.createForm.invalid) { this.createForm.markAllAsTouched(); return; }
    this.createSaving.set(true);
    this.createError.set('');
    const { email, password, displayName, companyName, phone } = this.createForm.value;
    this.http.post<UserProfile>(`${environment.apiUrl}/auth/register`, {
      email, password, displayName, companyName, phone: phone || undefined,
    }).subscribe({
      next: (user) => {
        this.customers.update(list => [user, ...list]);
        this.createDone.set(true);
        this.createSaving.set(false);
      },
      error: (e) => {
        const status = e?.status;
        if (status === 409) this.createError.set('An account with this email already exists.');
        else if (status === 0) this.createError.set('Network error. Check your connection.');
        else this.createError.set(e?.error?.message ?? 'Failed to create user.');
        this.createSaving.set(false);
      },
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
