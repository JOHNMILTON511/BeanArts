import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule, MatButtonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  currentYear = signal(new Date().getFullYear());

  navLinks = [
    { label: 'Home',               link: '/' },
    { label: 'About Us',           link: '/about' },
    { label: 'Our Services',       link: '/services' },
    { label: 'Portfolio',          link: '/portfolio' },
    { label: 'Careers',            link: '/careers' },
    { label: 'Blog',               link: '/blog' },
    { label: 'Privacy Policy',     link: '/privacy' },
    { label: 'Terms & Conditions', link: '/terms-conditions' },
    { label: 'FAQ',                link: '/faq' },
  ];

  
  serviceItems = [
    { label: 'Corporate Gifting',   link: '/services', fragment: 'service-0' },
    { label: 'Custom Printing',     link: '/services', fragment: 'service-1' },
    { label: 'Product Packaging',   link: '/services', fragment: 'service-2' },
    { label: 'Employee Onboarding', link: '/services', fragment: 'service-0' }, // part of gifting category
    { label: 'Global Fulfillment',  link: '/services', fragment: null },         // top of services page
    { label: 'Bulk Orders',         link: '/contact',  fragment: null },
  ];
}