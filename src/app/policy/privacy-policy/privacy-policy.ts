import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule // Added for routerLink
  ],
  templateUrl: './privacy-policy.html',
  styleUrl: './privacy-policy.css',
})
export class PrivacyPolicy implements OnInit {
  lastUpdatedDate: string = 'October 25, 2025';

  constructor(private meta: Meta, private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle('Privacy Policy | BeanArts - Data Protection & Security');

    this.meta.updateTag({ 
      name: 'description', 
      content: 'BeanArts is committed to protecting your data. Read our Privacy Policy to understand how we handle corporate gifting orders and personal information.' 
    });

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
  }
}