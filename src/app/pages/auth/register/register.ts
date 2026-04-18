import { Component, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

function passwordMatch(control: AbstractControl): ValidationErrors | null {
  const pw  = control.get('password')?.value;
  const cpw = control.get('confirmPassword')?.value;
  return pw && cpw && pw !== cpw ? { mismatch: true } : null;
}

@Component({
  selector: 'app-register',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: '../login/auth.css',
})
export class Register {
  private fb   = inject(FormBuilder);
  private auth = inject(AuthService);

  loading      = signal(false);
  error        = signal('');
  showPw       = signal(false);
  showConfirm  = signal(false);

  form = this.fb.group({
    displayName:  ['', [Validators.required, Validators.minLength(2)]],
    companyName:  ['', [Validators.required]],
    email:        ['', [Validators.required, Validators.email]],
    phone:        ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
    password:     ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required],
  }, { validators: passwordMatch });

  async onSubmit(): Promise<void> {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading.set(true);
    this.error.set('');
    try {
      const { email, password, displayName, companyName, phone } = this.form.value;
      await this.auth.register(email!, password!, displayName!, companyName!, phone ?? '');
    } catch (e: any) {
      const status = e?.status;
      if (status === 409) this.error.set('An account with this email already exists.');
      else if (status === 0) this.error.set('Network error. Check your connection.');
      else this.error.set(e?.error?.message ?? 'Registration failed. Please try again.');
    } finally {
      this.loading.set(false);
    }
  }
}
