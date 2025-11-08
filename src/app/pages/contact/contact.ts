import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-contact',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  contactForm: FormGroup;
  
  // State variables for UI feedback
  isSubmitting = false;
  submissionMessage: string | null = null;
  isSuccess: boolean | null = null;

  constructor(private fb: FormBuilder) {
    // Initialize the form with controls and validators
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  /**
   * Handles the form submission.
   * This simulates an API call (like EmailJS or a backend endpoint).
   */
  onSubmit() {
    this.submissionMessage = null; // Clear previous messages
    
    if (this.contactForm.invalid) {
      // Mark all fields as touched to display errors
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    // --- Start of Simulated API Call ---
    // In a real application, you would make an HTTP POST request here.
    const formData = this.contactForm.value;
    console.log('Attempting to send message:', formData);

    // Simulate network delay
    setTimeout(() => {
      this.isSubmitting = false;

      // Simulate success 90% of the time, or failure 10%
      const success = Math.random() > 0.1; 

      if (success) {
        this.isSuccess = true;
        this.submissionMessage = 'Thank you! Your message has been sent successfully. We will get back to you shortly.';
        this.contactForm.reset(); // Reset the form fields
      } else {
        this.isSuccess = false;
        this.submissionMessage = 'Failed to send the message. Please ensure all details are correct and try again.';
      }
    }, 2000); // 2 second delay
    // --- End of Simulated API Call ---
  }

  // Helper method to determine if a form control should show an error
  hasError(controlName: string, errorType: string) {
    const control = this.contactForm.get(controlName);
    return control && control.hasError(errorType) && control.touched;
  }
}
