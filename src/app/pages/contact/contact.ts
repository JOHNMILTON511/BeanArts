import { Component, NgZone, OnInit, AfterViewInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Meta, Title } from '@angular/platform-browser';
import emailjs from '@emailjs/browser';

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
    MatSnackBarModule,
  ],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact implements OnInit, AfterViewInit, OnDestroy {
  private fb         = inject(FormBuilder);
  private snackBar   = inject(MatSnackBar);
  private zone       = inject(NgZone);
  private platformId = inject(PLATFORM_ID);
  private observer!: IntersectionObserver;

  contactForm: FormGroup;
  isSubmitting = false;
  submissionMessage: string | null = null;
  isSuccess = false;

  serviceOptions: string[] = [
    'Corporate Gifting',
    'Custom Gift Hampers',
    'Employee Onboarding Kits',
    'Festive Gifts',
    'Product Packaging Design',
    'Custom Printing Services',
    'Branding & Merchandise',
    'Bulk Orders (2000+ units)',
  ];

  constructor(private meta: Meta, private title: Title) {
    this.contactForm = this.fb.group({
      name:        ['', Validators.required],
      companyName: [''],
      email:       ['', [Validators.required, Validators.email]],
      phone:       ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      serviceType: ['', Validators.required],
      quantity:    [''],
      message:     ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.title.setTitle('Contact Us — Quote for Corporate Gifting & Packaging | BeanArts');
      this.meta.updateTag({
        name: 'description',
        content: 'Get a custom quote for corporate gifting, employee kits, and printing services. Contact BeanArts today for premium solutions across India.',
      });
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupScrollReveal();
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private setupScrollReveal(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            this.observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => this.observer.observe(el));
  }

  hasError(controlName: string, error: string): boolean {
    return (
      !!this.contactForm.get(controlName)?.touched &&
      !!this.contactForm.get(controlName)?.hasError(error)
    );
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      this.snackBar.open('⚠️ Please fill all required fields correctly.', 'Close', {
        duration: 3000,
        panelClass: 'snackbar-error',
      });
      return;
    }

    this.isSubmitting = true;
    this.submissionMessage = null;

    const formData = this.contactForm.value;
    const templateParams = {
      name:        formData.name,
      companyName: formData.companyName || 'Not provided',
      email:       formData.email,
      phone:       formData.phone,
      serviceType: formData.serviceType,
      quantity:    formData.quantity || 'Not specified',
      message:     formData.message,
      date:        new Date().toLocaleString(),
    };

    const SERVICE_ID  = 'service_gk6yg89';
    const TEMPLATE_ID = 'template_z9epm4d';
    const PUBLIC_KEY  = 'VOA5cCVlS7fSwk7iC';

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then(() => {
        this.zone.run(() => {
          this.isSubmitting = false;
          this.isSuccess = true;
          this.submissionMessage = '✅ Your enquiry has been sent successfully! We\'ll respond within 24 hours.';
          this.contactForm.reset();
          this.snackBar.open('✅ Enquiry sent successfully!', 'Close', {
            duration: 4000,
            panelClass: 'snackbar-success',
          });
        });
      })
      .catch(() => {
        this.zone.run(() => {
          this.isSubmitting = false;
          this.isSuccess = false;
          this.submissionMessage = '❌ Something went wrong. Please try again or call us directly.';
          this.snackBar.open('⚠️ Failed to send enquiry. Try again!', 'Close', {
            duration: 3000,
            panelClass: 'snackbar-error',
          });
        });
      });
  }
}