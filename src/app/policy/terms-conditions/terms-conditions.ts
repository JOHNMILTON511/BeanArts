import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-terms-conditions',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './terms-conditions.html',
  styles: [`
    /* Custom styles for list markers if needed, mostly relying on Tailwind */
  `]
})
export class TermsConditions implements OnInit {
  lastUpdatedDate: string = 'October 25, 2025';

  constructor(private meta: Meta, private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle('Terms & Conditions | BeanArts Corporate Gifting');
    this.meta.updateTag({ 
      name: 'description', 
      content: 'Read the Terms and Conditions for placing corporate orders with BeanArts. Includes payment terms, customization policies, and shipping details.' 
    });
    this.meta.updateTag({ name: 'robots', content: 'noindex, follow' }); // Often legal pages are set to noindex to avoid cluttering search results, but 'index' is fine too.
  }
}