import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, RouterLink, MatIconModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  navLinks = [
    { label: 'Home', link: '/' },
    { label: 'About', link: '/about' },
    { label: 'Services', link: '/services' },
    { label: 'Contact', link: '/contact' },
    { label: 'Privacy Policy', link: '/privacy' },
  ];
}
