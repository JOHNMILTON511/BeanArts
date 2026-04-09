import { Component, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './forgot-password.html',
  styleUrl: '../login/auth.css',
})
export class ForgotPassword {
  private fb   = inject(FormBuilder);
  private auth = inject(AuthService);

  loading = signal(false);
  error   = signal('');
  sent    = signal(false);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  async onSubmit(): Promise<void> {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading.set(true);
    this.error.set('');
    try {
      await firstValueFrom(this.auth.resetPassword(this.form.value.email!));
      this.sent.set(true);
    } catch (e: any) {
      const status = e?.status;
      if (status === 404) this.error.set('No account found with this email.');
      else if (status === 0) this.error.set('Network error. Check your connection.');
      else this.error.set(e?.error?.message ?? 'Something went wrong. Please try again.');
    } finally {
      this.loading.set(false);
    }
  }
}
