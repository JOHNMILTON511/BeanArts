import { Component, NgZone, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import emailjs from '@emailjs/browser';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact implements OnInit {
  contactForm: FormGroup;
  isSubmitting = false;
  submissionMessage: string | null = null;
  isSuccess = false;

  serviceOptions: string[] = [
    'Corporate Gifting',
    'Custom Gift Hampers',
    'Employee Onboarding Kits',
    'Festive Gifts',
    'Packaging Design & Printing',
    'Branding & Merchandise'
  ];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private zone: NgZone
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      companyName: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      serviceType: ['', Validators.required],
      quantity: [''],
      message: ['', Validators.required]
    });
  }
  ngOnInit(): void {

  }

  // Helper for HTML validation  
  hasError(controlName: string, error: string) {
    return this.contactForm.get(controlName)?.touched &&
      this.contactForm.get(controlName)?.hasError(error);
  }

  // 🔥 Handle form submit  
  onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      this.snackBar.open('Please fill all required fields correctly.', 'Close', {
        duration: 3000,
        panelClass: 'snackbar-error',
      });
      return;
    }

    this.isSubmitting = true;
    this.submissionMessage = null;

    const formData = this.contactForm.value;

    const templateParams = {
      name: formData.name,
      companyName: formData.companyName || 'Not provided',
      email: formData.email,
      phone: formData.phone,
      serviceType: formData.serviceType,
      quantity: formData.quantity || 'Not specified',
      message: formData.message,
      date: new Date().toLocaleString()
    };

    const SERVICE_ID = 'service_gk6yg89';
    const TEMPLATE_ID = 'template_z9epm4d';
    const PUBLIC_KEY = 'VOA5cCVlS7fSwk7iC';

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then(() => {
        this.zone.run(() => {
          this.isSubmitting = false;
          this.isSuccess = true;
          this.submissionMessage = "Your enquiry has been sent successfully!";
          this.contactForm.reset();

          this.snackBar.open('Enquiry sent successfully!', 'Close', {
            duration: 3000,
            panelClass: 'snackbar-success'
          });
        });
      })
      .catch(() => {
        this.zone.run(() => {
          this.isSubmitting = false;   // 🔥 FIX
          this.isSuccess = false;
          this.submissionMessage = "Something went wrong. Please try again.";

          this.snackBar.open('Failed to send enquiry. Try again!', 'Close', {
            duration: 3000,
            panelClass: 'snackbar-error'
          });
        });
      });

  }
}