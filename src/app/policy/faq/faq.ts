import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion'; 
import { MatIconModule } from '@angular/material/icon';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './faq.html',
  styles: [`
    .mat-expansion-panel-header-title { font-weight: 600; color: #1f2937; }
    .mat-expansion-panel-header.mat-expanded { height: 64px; }
  `]
})
export class Faq implements OnInit {
  
  faqs = [
    {
      category: 'Orders & Customization',
      items: [
        { q: 'What is your Minimum Order Quantity (MOQ)?', a: 'For most customized items, our MOQ starts at 50 units. However, for premium luxury hampers, we can accommodate orders as low as 10 units. Please contact us for specific product MOQs.' },
        { q: 'Can I see a sample before placing a bulk order?', a: 'Yes! We highly recommend sampling. We can provide a pre-production sample with your logo for a nominal fee, which is adjusted against the final invoice if the order is confirmed.' },
        { q: 'What file formats do you need for my logo?', a: 'We require high-resolution vector files (AI, EPS, PDF, or CDR) to ensure the best print quality. If you only have a JPEG/PNG, our design team can help recreate it for a small charge.' }
      ]
    },
    {
      category: 'Shipping & Logistics',
      items: [
        { q: 'Do you ship directly to employee addresses?', a: 'Yes, we specialize in multi-location shipping. Just provide us with an Excel sheet of addresses, and we handle the individual packaging and dispatch to your employees homes globally.' },
        { q: 'How long does delivery take?', a: 'Standard production time is 7-10 business days after design approval. Shipping within India takes 3-5 days. International shipping varies by country.' }
      ]
    },
    {
      category: 'Payment & Returns',
      items: [
        { q: 'What are your payment terms?', a: 'We require a 50% advance to start production and the remaining 50% before dispatch. We accept Bank Transfer, UPI, and Corporate Credit Cards.' },
        { q: 'Can I return customized gifts?', a: 'Since items are branded with your specific logo, we cannot accept returns unless the product is damaged or defective upon arrival.' }
      ]
    }
  ];

  constructor(private meta: Meta, private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle('FAQ | Common Questions about BeanArts Corporate Gifting');
    this.meta.updateTag({ 
      name: 'description', 
      content: 'Find answers to common questions about BeanArts corporate gifting: MOQs, shipping, customization options, and payment terms.' 
    });
  }
}