import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select'; 
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
    MatSelectModule
  ],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact implements OnInit {
  contactForm: FormGroup;
  
  isSubmitting = false;
  submissionMessage: string | null = null;
  isSuccess: boolean | null = null;

  // Dropdown options for B2B Segmentation
  serviceOptions = [
    'Corporate Gifting (Hampers)',
    'Employee Welcome Kits',
    'Custom Printing Services',
    'Bespoke Packaging',
    'Other'
  ];

  constructor(
    private fb: FormBuilder,
    private meta: Meta,
    private title: Title
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      companyName: [''], // Optional but good for B2B
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // Basic Indian phone validation
      serviceType: ['', Validators.required], // New Field
      quantity: [''], // New Field
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.title.setTitle('Contact BeanArts | Request a Corporate Gifting Quote');

    this.meta.updateTag({ 
      name: 'description', 
      content: 'Get a quote for premium corporate gifting, employee welcome kits, and bulk printing in Bangalore. Contact BeanArts for custom solutions.' 
    });

    this.meta.updateTag({ 
      name: 'keywords', 
      content: 'Contact BeanArts, Corporate Gifting Quote, Bulk Printing Enquiry, Custom Packaging Suppliers Bangalore' 
    });
  }

  onSubmit() {
    this.submissionMessage = null;
    
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    // Simulate API Call
    const formData = this.contactForm.value;
    console.log('B2B Lead Data:', formData);

    setTimeout(() => {
      this.isSubmitting = false;
      this.isSuccess = true;
      this.submissionMessage = 'Thank you! We have received your enquiry. Our sales team will call you shortly to discuss your requirements.';
      this.contactForm.reset();
      
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.setErrors(null);
      });
    }, 2000);
  }

  hasError(controlName: string, errorType: string) {
    const control = this.contactForm.get(controlName);
    return control && control.hasError(errorType) && control.touched;
  }
}