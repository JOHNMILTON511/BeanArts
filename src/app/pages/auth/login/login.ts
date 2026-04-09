import { Component, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule, ReactiveFormsModule, RouterModule,
    MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule,
  ],
  templateUrl: './login.html',
  styleUrl: './auth.css',
})
export class Login {
  private fb   = inject(FormBuilder);
  private auth = inject(AuthService);

  loading      = signal(false);
  error        = signal('');
  showPassword = signal(false);

  form = this.fb.group({
    email:    ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  async onSubmit(): Promise<void> {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading.set(true);
    this.error.set('');
    try {
      await this.auth.login(this.form.value.email!, this.form.value.password!);
    } catch (e: any) {
      const status = e?.status;
      if (status === 401) this.error.set('Incorrect email or password.');
      else if (status === 429) this.error.set('Too many attempts. Please try after a few minutes.');
      else if (status === 0) this.error.set('Network error. Check your connection.');
      else this.error.set(e?.error?.message ?? 'Something went wrong. Please try again.');
    } finally {
      this.loading.set(false);
    }
  }
}
