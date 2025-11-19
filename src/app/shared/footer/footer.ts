import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true, 
  imports: [
    CommonModule, 
    RouterLink,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  navLinks = [
    { label: 'Home', link: '/' },
    { label: 'About Us', link: '/about' }, 
    { label: 'Our Services', link: '/services' },
    { label: 'Request a Quote', link: '/contact' }, 
    { label: 'Blogs', link: '/blog' },
    { label: 'Careers', link: '/careers' },
    { label: 'Privacy Policy', link: '/privacy' },
    { label: 'Terms & Conditions', link: '/terms-conditions' },
    { label: 'FAQ', link: '/faq' },
  ];

  currentYear = signal(new Date().getFullYear());
}
