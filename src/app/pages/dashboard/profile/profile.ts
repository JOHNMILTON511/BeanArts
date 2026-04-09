import { Component, signal, inject, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';
import { UserProfile } from '../../../core/models/user.model';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  private fb          = inject(FormBuilder);
  private authService = inject(AuthService);
  private userService = inject(UserService);

  profile  = signal<UserProfile | null>(null);
  saving   = signal(false);
  saved    = signal(false);
  error    = signal('');

  form = this.fb.group({
    displayName: ['', [Validators.required, Validators.minLength(2)]],
    companyName: ['', Validators.required],
    phone:       [''],
    gstNumber:   [''],
  });

  ngOnInit(): void {
    const user = this.authService.currentUser;
    if (!user) return;
    this.profile.set(user);
    this.form.patchValue({
      displayName: user.displayName,
      companyName: user.companyName,
      phone:       user.phone ?? '',
      gstNumber:   user.gstNumber ?? '',
    });
  }

  async save(): Promise<void> {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const user = this.authService.currentUser;
    if (!user) return;
    this.saving.set(true);
    this.error.set('');
    this.saved.set(false);
    try {
      const v       = this.form.value;
      const updated = await firstValueFrom(this.userService.updateProfile(user.uid, {
        displayName: v.displayName!,
        companyName: v.companyName!,
        phone:       v.phone ?? '',
        gstNumber:   v.gstNumber ?? '',
      }));
      this.profile.set(updated);
      this.authService.updateCachedUser(updated);
      this.saved.set(true);
      setTimeout(() => this.saved.set(false), 3000);
    } catch {
      this.error.set('Failed to save. Please try again.');
    } finally {
      this.saving.set(false);
    }
  }
}
